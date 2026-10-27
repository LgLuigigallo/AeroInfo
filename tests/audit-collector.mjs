import * as cheerio from 'cheerio';

const BASE = 'http://localhost:3000';

const urlsToTest = [
  { name: 'Home (IT)', path: '/' },
  { name: 'Home (EN)', path: '/en' },
  { name: 'Robots.txt', path: '/robots.txt' },
  { name: 'Sitemap.xml', path: '/sitemap.xml' },
  { name: 'Airport Short Slug FCO (IT)', path: '/aeroporti/fco' },
  { name: 'Airport Short Slug LHR (EN)', path: '/en/airports/lhr' },
  { name: 'Airport Full Slug FCO (IT)', path: '/aeroporti/aeroporto-internazionale-leonardo-da-vinci-fiumicino-fco' },
  { name: 'Airport Full Slug MXP (IT)', path: '/aeroporti/aeroporto-di-milano-malpensa-mxp' },
  { name: 'Airport Full Slug PRG (IT)', path: '/aeroporti/aeroporto-di-praga-v-clav-havel-prg' },
  { name: 'Airport Nonexistent (404)', path: '/aeroporti/aeroporto-sconosciuto-xyz' },
  { name: 'Legacy Query URL', path: '/?airport=PRG' },
  { name: 'Liquids Guide (IT)', path: '/guide/liquidi-bagaglio-a-mano' },
  { name: 'Liquids Guide (EN)', path: '/en/guides/liquids-in-carry-on-baggage' },
];

async function audit() {
  console.log('🔍 INIZIO AUDIT SEO AUTOMATIZZATO — AEROPLANO / AEROINFO\n');

  for (const item of urlsToTest) {
    const fullUrl = `${BASE}${item.path}`;
    try {
      const res = await fetch(fullUrl, { redirect: 'manual' });
      const status = res.status;
      const headers = Object.fromEntries(res.headers.entries());

      console.log(`================================================================`);
      console.log(`TARGET: ${item.name} (${item.path})`);
      console.log(`STATUS: HTTP ${status}`);
      if (headers.location) console.log(`REDIRECT LOCATION: ${headers.location}`);

      if (item.path.endsWith('.txt')) {
        const text = await res.text();
        console.log(`TEXT PREVIEW:\n${text.trim()}`);
        continue;
      }

      if (item.path.endsWith('.xml')) {
        const text = await res.text();
        const $ = cheerio.load(text, { xmlMode: true });
        const urlCount = $('url').length;
        console.log(`XML SITEMAP URL COUNT: ${urlCount}`);
        const sampleUrls = $('url loc').slice(0, 5).map((_, el) => $(el).text()).get();
        console.log(`SAMPLE URLS:`, sampleUrls);
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      const htmlLang = $('html').attr('lang');
      const title = $('title').text();
      const metaDesc = $('meta[name="description"]').attr('content');
      const robots = $('meta[name="robots"]').attr('content');
      const canonical = $('link[rel="canonical"]').attr('href');
      const alternates = $('link[rel="alternate"]').map((_, el) => ({
        hreflang: $(el).attr('hreflang'),
        href: $(el).attr('href'),
      })).get();

      const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
      const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
      const h3s = $('h3').map((_, el) => $(el).text().trim()).get();

      const jsonLdScripts = $('script[type="application/ld+json"]').map((_, el) => {
        try {
          return JSON.parse($(el).html());
        } catch (e) {
          return { error: 'invalid JSON' };
        }
      }).get();

      const internalLinks = $('a[href]').map((_, el) => $(el).attr('href')).get();
      const airportLinks = internalLinks.filter(href => href.startsWith('/aeroporti/') || href.startsWith('/en/airports/'));

      console.log(`HTML LANG: ${htmlLang}`);
      console.log(`TITLE: ${title}`);
      console.log(`META DESCRIPTION: ${metaDesc ? metaDesc.slice(0, 100) + '...' : 'ASSENTE'}`);
      console.log(`ROBOTS META: ${robots || 'ASSENTE (Default index, follow)'}`);
      console.log(`CANONICAL: ${canonical || 'ASSENTE'}`);
      console.log(`ALTERNATES (${alternates.length}):`, alternates);
      console.log(`H1 (${h1s.length}):`, h1s);
      console.log(`H2 COUNT: ${h2s.length} — SAMPLE:`, h2s.slice(0, 4));
      console.log(`H3 COUNT: ${h3s.length} — SAMPLE:`, h3s.slice(0, 4));
      console.log(`JSON-LD SCRIPTS (${jsonLdScripts.length}):`);
      for (const ld of jsonLdScripts) {
        if (ld['@graph']) {
          console.log(`  - @graph entities:`, ld['@graph'].map(e => e['@type']));
        } else {
          console.log(`  - entity:`, ld['@type']);
        }
      }
      console.log(`INTERNAL AIRPORT LINKS: ${airportLinks.length} trovati.`);
      if (airportLinks.length > 0) {
        console.log(`  Sample:`, airportLinks.slice(0, 4));
      }

      // Check if SSR has tables or text content
      const tablesCount = $('table').length;
      console.log(`TABLES IN SSR: ${tablesCount}`);
    } catch (err) {
      console.error(`ERROR AUDITING ${item.path}:`, err.message);
    }
  }
}

audit();
