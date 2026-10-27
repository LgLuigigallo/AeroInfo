import * as cheerio from 'cheerio';

const PROD_BASE = 'https://www.aero-info.eu';

const auditTargets = [
  { group: 'Core', name: 'Robots.txt', path: '/robots.txt' },
  { group: 'Core', name: 'Sitemap.xml', path: '/sitemap.xml' },
  { group: 'Home', name: 'Home (IT)', path: '/' },
  { group: 'Home', name: 'Home (EN)', path: '/en' },
  { group: 'Redirects', name: 'Short IATA Slug FCO (IT)', path: '/aeroporti/fco' },
  { group: 'Redirects', name: 'Short IATA Slug LHR (EN)', path: '/en/airports/lhr' },
  { group: 'Redirects', name: 'Short IATA Slug MXP (IT)', path: '/aeroporti/mxp' },
  { group: 'Airports IT', name: 'Roma Fiumicino (FCO)', path: '/aeroporti/aeroporto-internazionale-leonardo-da-vinci-fiumicino-fco' },
  { group: 'Airports IT', name: 'Milano Malpensa (MXP)', path: '/aeroporti/aeroporto-di-milano-malpensa-mxp' },
  { group: 'Airports IT', name: 'Napoli Capodichino (NAP)', path: '/aeroporti/aeroporto-internazionale-di-napoli-capodichino-nap' },
  { group: 'Airports IT', name: 'Bologna Marconi (BLQ)', path: '/aeroporti/aeroporto-di-bologna-guglielmo-marconi-blq' },
  { group: 'Airports IT', name: 'Praga Václav Havel (PRG)', path: '/aeroporti/aeroporto-di-praga-v-clav-havel-prg' },
  { group: 'Airports EN', name: 'London Heathrow (LHR)', path: '/en/airports/london-heathrow-airport-lhr' },
  { group: 'Airports EN', name: 'Rome Fiumicino (FCO)', path: '/en/airports/leonardo-da-vinci-international-airport-fiumicino-fco' },
  { group: 'Guides', name: 'Liquids Guide (IT)', path: '/guide/liquidi-bagaglio-a-mano' },
  { group: 'Guides', name: 'Liquids Guide (EN)', path: '/en/guides/liquids-in-carry-on-baggage' },
  { group: 'Edge Cases', name: 'Nonexistent Slug (404 test)', path: '/aeroporti/aeroporto-inesistente-xyz-999' },
];

async function runProductionAudit() {
  console.log(`\n================================================================================`);
  console.log(`🚀 AUDIT SEO IN TEMPO REALE SU PRODUZIONE: ${PROD_BASE}`);
  console.log(`Data e Ora: ${new Date().toISOString()}`);
  console.log(`================================================================================\n`);

  const results = [];

  for (const target of auditTargets) {
    const url = `${PROD_BASE}${target.path}`;
    const startTime = Date.now();
    try {
      const res = await fetch(url, { redirect: 'manual' });
      const duration = Date.now() - startTime;
      const status = res.status;
      const headers = Object.fromEntries(res.headers.entries());

      const itemResult = {
        group: target.group,
        name: target.name,
        path: target.path,
        status,
        duration,
        headers: {
          contentType: headers['content-type'],
          cacheControl: headers['cache-control'],
          location: headers['location'],
          strictTransportSecurity: headers['strict-transport-security'],
          contentSecurityPolicy: Boolean(headers['content-security-policy']),
          xRobotsTag: headers['x-robots-tag'] || null
        }
      };

      if (target.path === '/robots.txt') {
        const text = await res.text();
        itemResult.robotsContent = text;
        itemResult.hasSitemap = text.includes('sitemap.xml');
        itemResult.disallows = text.split('\n').filter(l => l.startsWith('Disallow:'));
      } else if (target.path === '/sitemap.xml') {
        const xml = await res.text();
        const $ = cheerio.load(xml, { xmlMode: true });
        const urls = $('url loc').map((_, el) => $(el).text()).get();
        itemResult.sitemapCount = urls.length;
        itemResult.sampleUrls = urls.slice(0, 5);
      } else if (status === 200) {
        const html = await res.text();
        const $ = cheerio.load(html);

        itemResult.htmlLang = $('html').attr('lang');
        itemResult.title = $('title').text();
        itemResult.metaDescription = $('meta[name="description"]').attr('content');
        itemResult.robots = $('meta[name="robots"]').attr('content');
        itemResult.canonical = $('link[rel="canonical"]').attr('href');
        itemResult.alternates = $('link[rel="alternate"]').map((_, el) => ({
          lang: $(el).attr('hreflang'),
          href: $(el).attr('href')
        })).get();

        itemResult.h1 = $('h1').map((_, el) => $(el).text().trim()).get();
        itemResult.h2Count = $('h2').length;

        // Structured Data extraction
        const jsonLdScripts = $('script[type="application/ld+json"]').map((_, el) => {
          try {
            return JSON.parse($(el).text());
          } catch {
            return { error: 'invalid JSON' };
          }
        }).get();

        itemResult.structuredDataTypes = jsonLdScripts.flatMap(sd => {
          if (sd['@graph']) return sd['@graph'].map(g => g['@type']);
          return [sd['@type']];
        });

        itemResult.hasAirportSchema = itemResult.structuredDataTypes.includes('Airport');
        itemResult.hasBreadcrumbs = itemResult.structuredDataTypes.includes('BreadcrumbList');
        itemResult.htmlSizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
      }

      results.push(itemResult);
      console.log(`[HTTP ${status}] ${target.group.padEnd(12)} | ${target.name.padEnd(32)} | ${duration}ms`);
      if (itemResult.headers.location) console.log(`   -> Redirect to: ${itemResult.headers.location}`);
      if (itemResult.sitemapCount) console.log(`   -> URLs in sitemap: ${itemResult.sitemapCount}`);
      if (itemResult.robots) console.log(`   -> meta robots: ${itemResult.robots}`);
      if (itemResult.hasAirportSchema) console.log(`   -> Schema.org Airport: SI (valido)`);
    } catch (err) {
      console.error(`[ERROR] ${target.name}:`, err.message);
      results.push({ ...target, error: err.message });
    }
  }

  console.log(`\n================================================================================`);
  console.log(`SCAN COMPLETATO: ${results.length} RISORSE VERIFICATE.`);
  console.log(`================================================================================\n`);

  return results;
}

runProductionAudit().then(res => {
  import('node:fs').then(fs => {
    fs.writeFileSync('production_audit_results.json', JSON.stringify(res, null, 2));
    console.log('Report raw salvato in production_audit_results.json');
  });
});
