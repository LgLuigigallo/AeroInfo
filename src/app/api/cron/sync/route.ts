import { NextRequest, NextResponse } from 'next/server';
import { scraperEngine } from '@/lib/scraper/engine';
import { airportsData } from '@/data/airports';
import { supabase } from '@/lib/supabase';
import { sendAirportPublishedEmail } from '@/lib/email';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify Bearer authorization for Vercel Cron or secret key
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const { searchParams } = new URL(request.url);
  const targetIata = searchParams.get('iata')?.toUpperCase();
  const isForce = searchParams.get('force') === 'true';

  if (process.env.NODE_ENV === 'production' && cronSecret && !isForce) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const listToSync = targetIata
      ? airportsData.filter((a) => a.iata.toUpperCase() === targetIata)
      : airportsData;

    console.info(`🔄 [CRON_SYNC] Running sync for ${listToSync.length} airports (target: ${targetIata || 'ALL'})...`);
    const results = await scraperEngine.runWeeklySync(listToSync);

    // If Supabase is connected, record the sync logs and notify pending requesters
    let notifiedUsersCount = 0;
    if (supabase) {
      try {
        for (const res of results) {
          await supabase.from('sync_logs').insert({
            airport_iata: res.airportIata,
            official_url: res.sourceUrl,
            status: res.success ? 'SUCCESS' : 'FAILED',
            changes_detected: Boolean(res.discrepanciesFound?.length),
            log_details: res
          });
        }

        // Check for pending airport indexing requests to notify users
        const { data: pendingRequests } = await supabase
          .from('airport_requests')
          .select('*')
          .in('status', ['pending', 'queued_weekly']);

        if (pendingRequests && pendingRequests.length > 0) {
          for (const req of pendingRequests) {
            if (req.requester_email) {
              const matchedAirport = airportsData.find(
                (a) =>
                  (req.iata_code && a.iata.toUpperCase() === req.iata_code.toUpperCase()) ||
                  a.name_it.toLowerCase().includes(req.query.toLowerCase()) ||
                  a.city_it.toLowerCase().includes(req.query.toLowerCase())
              );

              if (matchedAirport) {
                await sendAirportPublishedEmail({
                  to: req.requester_email,
                  airportName: matchedAirport.name_it,
                  airportIata: matchedAirport.iata,
                  airportUrl: `https://aero-info.vercel.app/?airport=${matchedAirport.iata.toLowerCase()}`
                });

                await supabase
                  .from('airport_requests')
                  .update({ status: 'notified', updated_at: new Date().toISOString() })
                  .eq('id', req.id);

                notifiedUsersCount++;
              }
            }
          }
        }
      } catch (dbErr) {
        console.warn('Sync logs or notifications note:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      executionDate: new Date().toISOString(),
      airportsProcessed: results.length,
      notifiedUsersCount,
      results
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal sync error' },
      { status: 500 }
    );
  }
}
