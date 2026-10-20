import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AirportScraperEngine, OFFICIAL_DOMAIN_WHITELIST } from '@/lib/scraper/engine';
import { sendRequestConfirmationEmail } from '@/lib/email';

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

    const cleanLower = query.toLowerCase();
    const isIataCandidate = /^[a-zA-Z]{3}$/.test(cleanLower);

    if (supabase) {
      let checkQuery = supabase
        .from('airport_requests')
        .select('id, query, iata_code, status, scheduled_for, created_at')
        .in('status', ['pending', 'queued', 'queued_weekly', 'verified', 'scraped']);

      if (isIataCandidate) {
        checkQuery = checkQuery.or(`iata_code.ilike.${cleanLower},query.ilike.%${cleanLower}%`);
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
    const candidateIata = isIataCandidate ? cleanedQuery : null;
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
          message_it: 'Questo aeroporto è già stato richiesto ed è in fase di verifica. Inserisci la tua email per ricevere la notifica non appena sarà pubblicato.',
          message_en: 'This airport has already been requested and is currently being processed. Enter your email to be notified once published.'
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

      return NextResponse.json({
        success: true,
        alreadyRequested: true,
        isSubscriberAdded: true,
        message_it: 'Email registrata con successo! Riceverai una notifica non appena la scheda dell\'aeroporto sarà online.',
        message_en: 'Email registered successfully! You will receive a notification as soon as the airport profile goes live.',
        emailStatus
      });
    }

    // 3. New request: Check if official domain is known in whitelist for instant pre-check
    let scrapedPolicy = null;
    let instantScrapeSuccess = false;

    if (candidateIata && OFFICIAL_DOMAIN_WHITELIST[candidateIata]) {
      try {
        const scraper = new AirportScraperEngine();
        const scrapeRes = await scraper.scrapeAirportSecurity(candidateIata);
        if (scrapeRes.success) {
          instantScrapeSuccess = true;
          scrapedPolicy = scrapeRes;
        }
      } catch (err) {
        console.warn(`Instant check attempt failed for ${candidateIata}:`, err);
      }
    }

    // 4. Save new request in Supabase if configured
    let recordId = 'req-' + Date.now();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('airport_requests')
          .insert({
            query: query.trim(),
            iata_code: candidateIata,
            requester_email: email ? email.trim() : null,
            status: instantScrapeSuccess ? 'verified' : 'queued_weekly',
            scraped_data: scrapedPolicy || null,
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

    // 5. Dispatch Confirmation Email if user provided an email address
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

    // 6. Return confirmation response
    return NextResponse.json({
      success: true,
      alreadyRequested: false,
      message_it: instantScrapeSuccess
        ? 'Verifica ufficiale completata con successo! Le informazioni sono state confermate e verranno pubblicate all\'aggiornamento programmato.'
        : 'Richiesta di censimento registrata con successo! Le informazioni ufficiali verranno verificate e pubblicate entro l\'aggiornamento programmato.',
      message_en: instantScrapeSuccess
        ? 'Official verification completed! Regulations verified and will be published at the scheduled refresh.'
        : 'Airport request submitted successfully! Official information will be verified and published within the scheduled update.',
      requestId: recordId,
      status: instantScrapeSuccess ? 'verified' : 'queued',
      scheduledFor: 'Entro 24 ore (Aggiornamento Giornaliero Automatico)',
      isInstantVerified: instantScrapeSuccess,
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
