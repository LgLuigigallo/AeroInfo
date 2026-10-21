import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AirportScraperEngine, OFFICIAL_DOMAIN_WHITELIST } from '@/lib/scraper/engine';
import { sendRequestConfirmationEmail } from '@/lib/email';
import { CITY_TO_IATA } from '@/lib/compiler/aviation-registry';

export const maxDuration = 60;

/**
 * GET /api/airports/request?query=...
 * Checks if a pending indexing request already exists for this airport.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ exists: false });
    }

    const cleanUpper = query.trim().toUpperCase();
    const cleanLower = query.trim().toLowerCase();
    const isIataCandidate = /^[a-zA-Z]{3}$/.test(cleanLower);
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
    const body = await request.json();
    const { query, email } = body;

    console.info('✈️ [AIRPORT_REQUEST] Handling user request:', {
      query,
      email,
      timestamp: new Date().toISOString()
    });

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const cleanedQuery = query.trim().toUpperCase();
    const isIataCandidate = /^[A-Z]{3}$/.test(cleanedQuery);
    let candidateIata: string | null = isIataCandidate ? cleanedQuery : null;
    if (!candidateIata && CITY_TO_IATA[cleanedQuery]) {
      candidateIata = CITY_TO_IATA[cleanedQuery];
    }
    const cleanLower = query.trim().toLowerCase();

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

      const thankYouMsg_it = `Grazie! Abbiamo aggiunto la tua email per l'aeroporto "${existingRequest.query || query.trim()}". Riceverai la notifica non appena la scheda sarà online domani.`;
      const thankYouMsg_en = `Thank you! Your email has been registered for "${existingRequest.query || query.trim()}". You will be notified once published tomorrow.`;

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

    // 5. Build Thank-You response (scheduled for next day)
    const thankYouLine_it = `Grazie per la tua richiesta! Abbiamo preso in carico la segnalazione per l'aeroporto di "${query.trim()}". La scheda ufficiale verrà elaborata e pubblicata nel ciclo programmato di domani alle ore 03:00.`;
    const thankYouLine_en = `Thank you for your request! We have queued your submission for "${query.trim()}". The official airport dossier will be processed and published in tomorrow's scheduled 03:00 update.`;

    return NextResponse.json({
      success: true,
      alreadyRequested: false,
      isInstantlyPublished: false,
      airportIata: candidateIata,
      query: query.trim(),
      status: 'queued',
      scheduledFor: 'Domani alle ore 03:00',
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
