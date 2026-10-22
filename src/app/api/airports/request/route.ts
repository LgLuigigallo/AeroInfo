import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AirportScraperEngine, OFFICIAL_DOMAIN_WHITELIST } from '@/lib/scraper/engine';
import { sendRequestConfirmationEmail } from '@/lib/email';
import { CITY_TO_IATA } from '@/lib/compiler/aviation-registry';
import { getClientIp, checkRateLimit } from '@/lib/security/rate-limit';
import { sanitizePostgrestParam, isValidEmail } from '@/lib/security/sanitize';

export const maxDuration = 60;

/**
 * GET /api/airports/request?query=...
 * Checks if a pending indexing request already exists for this airport.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('query')?.trim();

    if (!rawQuery || rawQuery.length < 2) {
      return NextResponse.json({ exists: false });
    }

    const sanitizedQuery = sanitizePostgrestParam(rawQuery);
    if (sanitizedQuery.length < 2) {
      return NextResponse.json({ exists: false });
    }

    const cleanUpper = sanitizedQuery.toUpperCase();
    const cleanLower = sanitizedQuery.toLowerCase();
    const isIataCandidate = /^[A-Z]{3}$/.test(cleanUpper);
    const targetIata = isIataCandidate ? cleanUpper : CITY_TO_IATA[cleanUpper] || null;

    if (supabase) {
      let checkQuery = supabase
        .from('airport_requests')
        .select('id, query, iata_code, status, scheduled_for, created_at')
        .in('status', ['pending', 'queued', 'queued_weekly', 'verified', 'scraped']);

      if (targetIata) {
        checkQuery = checkQuery.or(`iata_code.ilike.${targetIata},query.ilike.%${cleanLower}%`);
      } else {
        checkQuery = checkQuery.ilike('query', `%${cleanLower}%`);
      }

      const { data, error } = await checkQuery.limit(1);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          exists: true,
          request: {
            id: data[0].id,
            query: data[0].query,
            iata_code: data[0].iata_code,
            status: data[0].status,
            scheduled_for: data[0].scheduled_for
          }
        });
      }
    }

    return NextResponse.json({ exists: false });
  } catch (err: any) {
    console.error('Error in GET /api/airports/request:', err);
    return NextResponse.json({ exists: false });
  }
}

/**
 * POST /api/airports/request
 * Creates a new airport request or subscribes an email to an already requested airport.
 */
export async function POST(request: NextRequest) {
  try {
    // 0. Rate limiting by IP (max 5 submissions per 10 minutes)
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(clientIp, 5, 600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Too many airport requests from this network.',
          message_it: 'Troppe richieste inviate in breve tempo. Per favore riprova tra qualche minuto.',
          message_en: 'Too many requests sent. Please try again in a few minutes.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000))
          }
        }
      );
    }

    // 1. Content-Length & Payload Size Limit (max 10KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return NextResponse.json(
        { success: false, error: 'Payload too large (max 10KB)' },
        { status: 413 }
      );
    }

    // 2. Safe JSON Parsing
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed or invalid JSON payload' },
        { status: 400 }
      );
    }

    const { query, email } = body || {};

    console.info('✈️ [AIRPORT_REQUEST] Handling user request:', {
      query: typeof query === 'string' ? query.slice(0, 100) : query,
      email: typeof email === 'string' ? email.slice(0, 100) : email,
      clientIp,
      timestamp: new Date().toISOString()
    });

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    if (query.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is too long (max 100 characters)' },
        { status: 400 }
      );
    }

    // Email format validation (RFC 5322 compliance)
    if (email && (typeof email !== 'string' || !isValidEmail(email))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address format',
          message_it: 'Inserisci un indirizzo email valido (es. nome@dominio.com).',
          message_en: 'Please enter a valid email address.'
        },
        { status: 400 }
      );
    }

    // Sanitization against control characters and PostgREST injection
    const sanitizedQuery = sanitizePostgrestParam(query);
    if (sanitizedQuery.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Query is too short or contains invalid characters' },
        { status: 400 }
      );
    }

    const cleanedQuery = sanitizedQuery.toUpperCase();
    const isIataCandidate = /^[A-Z]{3}$/.test(cleanedQuery);
    let candidateIata: string | null = isIataCandidate ? cleanedQuery : null;
    if (!candidateIata && CITY_TO_IATA[cleanedQuery]) {
      candidateIata = CITY_TO_IATA[cleanedQuery];
    }
    const cleanLower = sanitizedQuery.toLowerCase();

    // 1. Check if an existing request is ALREADY pending in Supabase
    let existingRequest = null;
    if (supabase) {
      let checkQuery = supabase
        .from('airport_requests')
        .select('id, query, iata_code, status, scheduled_for')
        .in('status', ['pending', 'queued', 'queued_weekly', 'verified', 'scraped']);

      if (candidateIata) {
        checkQuery = checkQuery.or(`iata_code.ilike.${candidateIata},query.ilike.%${cleanLower}%`);
      } else {
        checkQuery = checkQuery.ilike('query', `%${cleanLower}%`);
      }

      const { data } = await checkQuery.limit(1);
      if (data && data.length > 0) {
        existingRequest = data[0];
      }
    }

    // 2. If already requested, user can ONLY register their email for updates
    if (existingRequest) {
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return NextResponse.json({
          success: false,
          alreadyRequested: true,
          message_it: 'Questo aeroporto è già stato richiesto ed è in coda per il prossimo aggiornamento programmato di domani. Inserisci la tua email per ricevere la notifica.',
          message_en: 'This airport has already been requested and is queued for tomorrow\'s scheduled update. Enter your email to be notified.'
        }, { status: 400 });
      }

      // Record subscriber in Supabase
      if (supabase) {
        await supabase.from('airport_requests').insert({
          query: existingRequest.query,
          iata_code: existingRequest.iata_code || candidateIata,
          requester_email: email.trim(),
          status: 'queued',
          created_at: new Date().toISOString()
        });
      }

      // Send confirmation email to subscriber
      let emailStatus: { sent: boolean; provider?: string; error?: string } = { sent: false };
      try {
        const mailRes = await sendRequestConfirmationEmail({
          to: email.trim(),
          airportQuery: existingRequest.query || cleanedQuery
        });
        emailStatus = { sent: mailRes.success, provider: mailRes.provider, error: mailRes.error };
      } catch (err: any) {
        console.error('Failed to dispatch subscriber confirmation email:', err);
        emailStatus = { sent: false, error: err.message };
      }

      const thankYouMsg_it = email
        ? 'La scheda ufficiale verrà presto elaborata e riceverai news alla email indicata (controlla anche lo spam).'
        : `La scheda ufficiale per "${existingRequest.query || query.trim()}" verrà presto elaborata e pubblicata nei prossimi aggiornamenti.`;
      const thankYouMsg_en = email
        ? 'The official dossier will soon be processed and you will receive news at the specified email (check your spam folder too).'
        : `The official dossier for "${existingRequest.query || query.trim()}" will soon be processed and published in upcoming updates.`;

      return NextResponse.json({
        success: true,
        alreadyRequested: true,
        isSubscriberAdded: true,
        thankYouLine_it: thankYouMsg_it,
        thankYouLine_en: thankYouMsg_en,
        message_it: thankYouMsg_it,
        message_en: thankYouMsg_en,
        emailStatus
      });
    }

    // 3. Queue new request for NEXT DAY'S scheduled sync cycle (03:00 UTC)
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 1);
    scheduledDate.setUTCHours(3, 0, 0, 0);

    let recordId = 'req-' + Date.now();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('airport_requests')
          .insert({
            query: query.trim(),
            iata_code: candidateIata,
            requester_email: email ? email.trim() : null,
            status: 'queued',
            scheduled_for: scheduledDate.toISOString(),
            created_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (data?.id) {
          recordId = data.id;
        }
        if (error) {
          console.warn('Supabase airport_requests insert note:', error.message);
        }
      } catch (dbErr) {
        console.warn('Database error when saving request:', dbErr);
      }
    }

    // 4. Dispatch Confirmation Email if user provided an email address
    let emailStatus: { sent: boolean; provider?: string; error?: string } = { sent: false };
    if (email && typeof email === 'string' && email.includes('@')) {
      try {
        const mailRes = await sendRequestConfirmationEmail({
          to: email.trim(),
          airportQuery: cleanedQuery
        });
        emailStatus = {
          sent: mailRes.success,
          provider: mailRes.provider,
          error: mailRes.error
        };
      } catch (err: any) {
        console.error('Failed to trigger confirmation email:', err);
        emailStatus = { sent: false, error: err.message };
      }
    }

    // 5. Build Thank-You response without mentioning specific hours
    const thankYouLine_it = email
      ? 'La scheda ufficiale verrà presto elaborata e riceverai news alla email indicata (controlla anche lo spam).'
      : `La scheda ufficiale per "${query.trim()}" verrà presto elaborata e pubblicata nei prossimi aggiornamenti.`;
    const thankYouLine_en = email
      ? 'The official dossier will soon be processed and you will receive news at the specified email (check your spam folder too).'
      : `The official dossier for "${query.trim()}" will soon be processed and published in upcoming updates.`;

    return NextResponse.json({
      success: true,
      alreadyRequested: false,
      isInstantlyPublished: false,
      airportIata: candidateIata,
      query: query.trim(),
      status: 'queued',
      scheduledFor: 'Prossimo aggiornamento programmato',
      thankYouLine_it,
      thankYouLine_en,
      message_it: thankYouLine_it,
      message_en: thankYouLine_en,
      requestId: recordId,
      emailStatus
    });
  } catch (error: any) {
    console.error('Error handling airport request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
