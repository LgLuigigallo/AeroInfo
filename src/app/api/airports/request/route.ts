import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AirportScraperEngine, OFFICIAL_DOMAIN_WHITELIST } from '@/lib/scraper/engine';
import { sendRequestConfirmationEmail } from '@/lib/email';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, email } = body;

    console.info('✈️ [AIRPORT_REQUEST] Received user request:', {
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

    // 1. Check if official domain is already known in whitelist
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
        console.warn(`Instant scrape attempt failed for ${candidateIata}:`, err);
      }
    }

    // 2. Save request in Supabase if configured
    let recordId = 'req-' + Date.now();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('airport_requests')
          .insert({
            query: query.trim(),
            iata_code: candidateIata,
            requester_email: email ? email.trim() : null,
            status: instantScrapeSuccess ? 'scraped' : 'queued_weekly',
            scraped_data: scrapedPolicy || null,
            created_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (data?.id) {
          recordId = data.id;
        }
        if (error) {
          console.warn('Supabase airport_requests insert note (table might need creation):', error.message);
        }
      } catch (dbErr) {
        console.warn('Database error when saving request:', dbErr);
      }
    }

    // 3. Dispatch Confirmation Email if user provided an email address
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

    // 4. Return confirmation response
    return NextResponse.json({
      success: true,
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
