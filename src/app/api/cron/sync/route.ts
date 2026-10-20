import { NextRequest, NextResponse } from 'next/server';
import { scraperEngine } from '@/lib/scraper/engine';
import { airportsData } from '@/data/airports';
import { supabase } from '@/lib/supabase';

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

    // If Supabase is connected, record the sync logs
    if (supabase) {
      for (const res of results) {
        await supabase.from('sync_logs').insert({
          airport_iata: res.airportIata,
          official_url: res.sourceUrl,
          status: res.success ? 'SUCCESS' : 'FAILED',
          changes_detected: Boolean(res.discrepanciesFound?.length),
          log_details: res
        });
      }
    }

    return NextResponse.json({
      success: true,
      executionDate: new Date().toISOString(),
      airportsProcessed: results.length,
      results
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal sync error' },
      { status: 500 }
    );
  }
}
