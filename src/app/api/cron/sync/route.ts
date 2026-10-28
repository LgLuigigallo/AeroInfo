import { NextRequest, NextResponse } from 'next/server';
import { scraperEngine } from '@/lib/scraper/engine';
import { supabase, getLiveAirports, isSupabaseAdminConfigured } from '@/lib/supabase';
import { airportCompilerEngine } from '@/lib/compiler/engine';
import { evaluateAirportSeoQuality, saveAirportSeoEvaluation, SITE_URL } from '@/lib/seo/airports';
import { submitToIndexNow } from '@/lib/seo/indexnow';
import { airportPath } from '@/lib/airport-slug';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify Bearer authorization for Vercel Cron or secret key (fail-closed)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const { searchParams } = new URL(request.url);
  const targetIata = searchParams.get('iata')?.toUpperCase();

  if (process.env.NODE_ENV === 'production') {
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized: invalid or missing cron secret' }, { status: 401 });
    }
  }

  if (!supabase || !isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: 'Cron persistence requires Supabase configuration and SUPABASE_SERVICE_ROLE_KEY.' }, { status: 503 });
  }

  try {
    // 1. Autonomous Compilation: Process all pending user requests into published airports
    console.info('🚀 [CRON_SYNC] Running autonomous compiler for pending user requests...');
    const compileReport = await airportCompilerEngine.processPendingRequests();
    console.info('✅ [CRON_SYNC] Autonomous compiler finished:', compileReport);

    // 2. Fetch full active airport list (from Supabase or local fallback)
    const activeAirports = await getLiveAirports();
    const pendingAirports = activeAirports
      .filter((airport) => airport.seoStatus === 'pending_quality')
      // FIFO avoids starvation when new requests keep arriving.
      .sort((a, b) => (Date.parse(a.createdAt || '') || 0) - (Date.parse(b.createdAt || '') || 0));
    const alreadyEvaluated = activeAirports.filter((airport) => airport.seoStatus !== 'pending_quality');
    const listToSync = targetIata
      ? activeAirports.filter((a) => a.iata.toUpperCase() === targetIata)
      : [...pendingAirports, ...alreadyEvaluated].slice(0, 15); // New records are reviewed first.

    console.info(`🔄 [CRON_SYNC] Running sync for ${listToSync.length} airports (target: ${targetIata || 'BATCH'})...`);
    const syncResults = await scraperEngine.runWeeklySync(listToSync);

    // 3. Persist only facts extracted from an explicit official security rule.
    const persistenceErrors: string[] = [];
    const urlsForIndexNow = new Set<string>();
    if (supabase) {
      try {
        for (const res of syncResults) {
          try {
          if (res.success && res.policyVerified && res.extractedPolicy) {
            const { data: airportRow, error: airportError } = await supabase.from('airports').select('id').eq('iata_code', res.airportIata).maybeSingle();
            if (airportError) throw airportError;
            if (airportRow?.id) {
              const { data: policyRow, error: policyReadError } = await supabase.from('security_policies').select('id').eq('airport_id', airportRow.id).maybeSingle();
              if (policyReadError) throw policyReadError;
              const policy = res.extractedPolicy;
              const verifiedThisRun = Boolean(policy.lastVerifiedDate);
              const payload = {
                ...(typeof policy.has3DScanners === 'boolean' ? { has_3d_scanners: policy.has3DScanners } : {}),
                ...(typeof policy.liquidsMustBeRemoved === 'boolean' ? { liquids_must_be_removed: policy.liquidsMustBeRemoved } : {}),
                ...(policy.liquidsAllowance_it ? { liquids_allowance_it: policy.liquidsAllowance_it } : {}),
                ...(policy.liquidsAllowance_en ? { liquids_allowance_en: policy.liquidsAllowance_en } : {}),
                ...(typeof policy.liquidsUnverified === 'boolean' ? { liquids_unverified: policy.liquidsUnverified } : {}),
                ...(typeof policy.electronicsInBag === 'boolean' ? { electronics_in_bag: policy.electronicsInBag } : {}),
                ...(typeof policy.electronicsUnverified === 'boolean' ? { electronics_unverified: policy.electronicsUnverified } : {}),
                official_source_url: res.sourceUrl,
                ...(verifiedThisRun ? { source_verified_at: `${policy.lastVerifiedDate}T00:00:00.000Z` } : {}),
              };
              const policyWrite = policyRow?.id
                ? await supabase.from('security_policies').update(payload).eq('id', policyRow.id)
                : await supabase.from('security_policies').insert({ ...payload, airport_id: airportRow.id });
              if (policyWrite.error) throw policyWrite.error;
            }
          }

          if (res.extractedVenues?.length) {
            const { data: airportRow, error: airportError } = await supabase.from('airports').select('id').eq('iata_code', res.airportIata).maybeSingle();
            if (airportError) throw airportError;
            const verifiedVenues = res.extractedVenues.filter((venue) => !venue.isUnverified && venue.terminal && venue.location);
            if (airportRow?.id && verifiedVenues.length) {
              const { data: existingVenues, error: venuesError } = await supabase
                .from('venues').select('id, name').eq('airport_id', airportRow.id);
              if (venuesError) throw venuesError;
              for (const venue of verifiedVenues) {
                const existing = existingVenues?.find((item) => item.name.trim().toLocaleLowerCase() === venue.name.trim().toLocaleLowerCase());
                const payload = {
                  airport_id: airportRow.id,
                  name: venue.name,
                  category: venue.category,
                  terminal: venue.terminal,
                  location: venue.location,
                  hours: venue.hours || null,
                  is_24_hours: Boolean(venue.is24Hours),
                  is_unverified: false,
                };
                const write = existing
                  ? await supabase.from('venues').update(payload).eq('id', existing.id)
                  : await supabase.from('venues').insert(payload);
                if (write.error) throw write.error;
              }
            }
          }

          // 4. Audit the resulting record. The SEO state is independent of the
          // airport request's email/publication status.
          const originalAirport = activeAirports.find((airport) => airport.iata.toUpperCase() === res.airportIata.toUpperCase());
          if (originalAirport?.seoStatus) {
            const verifiedThisRun = res.success && res.policyVerified && Boolean(res.extractedPolicy?.lastVerifiedDate);
            const refreshedAirport = verifiedThisRun && res.extractedPolicy
              ? {
                  ...originalAirport,
                  securityPolicy: {
                    ...originalAirport.securityPolicy,
                    ...res.extractedPolicy,
                    lastVerifiedDate: res.extractedPolicy.lastVerifiedDate || originalAirport.securityPolicy.lastVerifiedDate,
                  },
                }
              : originalAirport;
            const reasons = evaluateAirportSeoQuality(refreshedAirport);
            const hasPlaceholder = reasons.some((reason) => reason.includes('segnaposto/generici'));
            const status = hasPlaceholder
              ? 'blocked'
              : reasons.length > 0
                ? 'pending_quality'
                : verifiedThisRun || originalAirport.seoStatus === 'indexable'
                  ? 'indexable'
                  : 'pending_quality';
            await saveAirportSeoEvaluation(refreshedAirport, status, reasons);

            // Collect URLs for IndexNow if newly indexable, updated, or compiled this run
            if (status === 'indexable') {
              const wasNotIndexable = originalAirport.seoStatus !== 'indexable';
              const wasCompiledThisRun = compileReport.publishedIatas.includes(refreshedAirport.iata);
              if (wasNotIndexable || verifiedThisRun || wasCompiledThisRun) {
                urlsForIndexNow.add(`${SITE_URL}${airportPath(refreshedAirport, 'it')}`);
                urlsForIndexNow.add(`${SITE_URL}${airportPath(refreshedAirport, 'en')}`);
              }
            }
          }

          // 5. Keep the operational crawl record for diagnostics.
          const { error: logError } = await supabase.from('sync_logs').insert({
            airport_iata: res.airportIata,
            official_url: res.sourceUrl,
            status: res.success ? 'SUCCESS' : 'FAILED',
            changes_detected: Boolean(res.discrepanciesFound?.length),
            log_details: res
          });
          if (logError) console.warn(`Could not save sync log for ${res.airportIata}:`, logError.message);
          } catch (airportError) {
            console.warn(`Could not persist sync results for ${res.airportIata}:`, airportError);
            persistenceErrors.push(`${res.airportIata}: ${airportError instanceof Error ? airportError.message : 'database write failed'}`);
          }
        }
      } catch (dbErr) {
        console.warn('Sync logs note:', dbErr);
      }
    }

    // 6. IndexNow Notification for search engines (Bing, Copilot, Seznam, Yandex)
    let indexNowReport: {
      submittedCount: number;
      success: boolean;
      statusCode?: number;
      message: string;
    } | null = null;

    if (urlsForIndexNow.size > 0) {
      urlsForIndexNow.add(`${SITE_URL}/`);
      urlsForIndexNow.add(`${SITE_URL}/en`);

      try {
        const urlsList = Array.from(urlsForIndexNow);
        console.info(`📡 [CRON_SYNC] Submitting ${urlsList.length} updated URLs to IndexNow...`);
        const indexNowResult = await submitToIndexNow(urlsList);
        indexNowReport = {
          submittedCount: indexNowResult.submittedCount,
          success: indexNowResult.success,
          statusCode: indexNowResult.statusCode,
          message: indexNowResult.message,
        };
        console.info('✅ [CRON_SYNC] IndexNow submission complete:', indexNowReport);
      } catch (err) {
        console.warn('⚠️ [CRON_SYNC] IndexNow submission warning:', err);
        indexNowReport = {
          submittedCount: 0,
          success: false,
          message: err instanceof Error ? err.message : 'IndexNow submission failed',
        };
      }
    }

    return NextResponse.json({
      success: persistenceErrors.length === 0,
      executionDate: new Date().toISOString(),
      compileReport,
      airportsProcessed: syncResults.length,
      indexNowReport,
      syncResults,
      persistenceErrors,
    }, { status: persistenceErrors.length ? 500 : 200 });
  } catch (error: unknown) {
    console.error('Error in cron sync:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal sync error' },
      { status: 500 }
    );
  }
}
