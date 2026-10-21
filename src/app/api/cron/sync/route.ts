import { NextRequest, NextResponse } from 'next/server';
import { scraperEngine } from '@/lib/scraper/engine';
import { supabase, getLiveAirports } from '@/lib/supabase';
import { airportCompilerEngine } from '@/lib/compiler/engine';

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
    // 1. Autonomous Compilation: Process all pending user requests into published airports
    console.info('🚀 [CRON_SYNC] Running autonomous compiler for pending user requests...');
    const compileReport = await airportCompilerEngine.processPendingRequests();
    console.info('✅ [CRON_SYNC] Autonomous compiler finished:', compileReport);

    // 2. Fetch full active airport list (from Supabase or local fallback)
    const activeAirports = await getLiveAirports();
    const listToSync = targetIata
      ? activeAirports.filter((a) => a.iata.toUpperCase() === targetIata)
      : activeAirports.slice(0, 15); // Sync first batch within function timeout limits

    console.info(`🔄 [CRON_SYNC] Running sync for ${listToSync.length} airports (target: ${targetIata || 'BATCH'})...`);
    const syncResults = await scraperEngine.runWeeklySync(listToSync);

    // 3. Record sync logs in Supabase if configured
    if (supabase) {
      try {
        for (const res of syncResults) {
          await supabase.from('sync_logs').insert({
            airport_iata: res.airportIata,
            official_url: res.sourceUrl,
            status: res.success ? 'SUCCESS' : 'FAILED',
            changes_detected: Boolean(res.discrepanciesFound?.length),
            log_details: res
          });
        }
      } catch (dbErr) {
        console.warn('Sync logs note:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      executionDate: new Date().toISOString(),
      compileReport,
      airportsProcessed: syncResults.length,
      syncResults
    });
  } catch (error: any) {
    console.error('Error in cron sync:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal sync error' },
      { status: 500 }
    );
  }
}
