import assert from 'node:assert';
import { readFileSync } from 'node:fs';

console.log('🧪 VERIFYING AUTONOMOUS CATALOG EXPANSION & SEO INTEGRITY...');

// 1. Verify engine.ts exports autoExpandCatalog
const engineFile = readFileSync('src/lib/compiler/engine.ts', 'utf8');
assert(
  engineFile.includes('public async autoExpandCatalog'),
  'engine.ts must implement autoExpandCatalog method'
);
assert(
  engineFile.includes('evaluateAirportSeoQuality(compiledAirport)'),
  'autoExpandCatalog must audit SEO quality'
);
assert(
  engineFile.includes('saveAirportSeoEvaluation(compiledAirport, targetStatus, seoReasons)'),
  'autoExpandCatalog must persist SEO evaluation to Supabase'
);

// 2. Verify cron sync route invokes autoExpandCatalog when compiledAirportsCount is 0
const cronSyncFile = readFileSync('src/app/api/cron/sync/route.ts', 'utf8');
assert(
  cronSyncFile.includes('autoExpandReport = await airportCompilerEngine.autoExpandCatalog()'),
  'cron sync route must invoke autoExpandCatalog when pending requests are 0'
);
assert(
  cronSyncFile.includes('compileReport.compiledAirportsCount === 0'),
  'cron sync route must check compiledAirportsCount === 0 before auto-expanding'
);
assert(
  cronSyncFile.includes('urlsForIndexNow.add(`${SITE_URL}${airportPath(autoExpandReport.airport, \'it\')}`)'),
  'cron sync route must immediately queue Italian URL for IndexNow'
);
assert(
  cronSyncFile.includes('urlsForIndexNow.add(`${SITE_URL}${airportPath(autoExpandReport.airport, \'en\')}`)'),
  'cron sync route must immediately queue English URL for IndexNow'
);
assert(
  cronSyncFile.includes('autoExpandReport,'),
  'cron sync route must return autoExpandReport in response payload'
);

// 3. Verify that candidate IATAs are present in STATIC_SEO_APPROVED_IATAS
const seoAirportsFile = readFileSync('src/lib/seo/airports.ts', 'utf8');
const expectedIatas = ['VCE', 'CTA', 'PMO', 'FLR', 'TRN', 'VRN', 'CAG', 'LPA', 'TFS', 'IST', 'BRU', 'SIN'];
for (const iata of expectedIatas) {
  assert(
    seoAirportsFile.includes(`'${iata}'`),
    `STATIC_SEO_APPROVED_IATAS in airports.ts must contain ${iata}`
  );
}

// 4. Verify authority domains whitelist in evaluateAirportSeoQuality
assert(
  seoAirportsFile.includes('aena.es') &&
  seoAirportsFile.includes('enac.gov.it') &&
  seoAirportsFile.includes('aeroportidipuglia.it'),
  'evaluateAirportSeoQuality must include official authority domains'
);

console.log('✅ ALL AUTONOMOUS EXPANSION TESTS PASSED SUCCESSFULLY!');
