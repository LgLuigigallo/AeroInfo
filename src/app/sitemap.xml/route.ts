import { airportPath } from '@/lib/airport-slug';
import { getAirportSeoStatus, getIndexableAirports, SITE_URL } from '@/lib/seo/airports';
import { liquidsGuide } from '@/lib/seo/content-guides';

async function generateSitemapXml(): Promise<string> {
  'use cache';
  const airports = await getIndexableAirports();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const addUrl = (loc: string, lastmod?: string, alternates?: { it: string; en: string; es?: string }) => {
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    if (lastmod) {
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    if (alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="it" href="${alternates.it}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />\n`;
      if (alternates.es) {
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${alternates.es}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.it}" />\n`;
    }
    xml += '  </url>\n';
  };

  // Homepages
  const homeAlts = { it: `${SITE_URL}/`, en: `${SITE_URL}/en`, es: `${SITE_URL}/es` };
  addUrl(`${SITE_URL}/`, undefined, homeAlts);
  addUrl(`${SITE_URL}/en`, undefined, homeAlts);
  addUrl(`${SITE_URL}/es`, undefined, homeAlts);

  // Guides
  const guideIt = new URL(liquidsGuide.it.path, SITE_URL).toString();
  const guideEn = new URL(liquidsGuide.en.path, SITE_URL).toString();
  const guideEs = `${SITE_URL}/es/guides/liquids-in-carry-on-baggage`;
  const guideAlts = { it: guideIt, en: guideEn, es: guideEs };
  addUrl(guideIt, `${liquidsGuide.it.reviewedAt}T00:00:00.000Z`, guideAlts);
  addUrl(guideEn, `${liquidsGuide.en.reviewedAt}T00:00:00.000Z`, guideAlts);
  addUrl(guideEs, `${liquidsGuide.en.reviewedAt}T00:00:00.000Z`, guideAlts);

  // 3D Scanners Hub
  const hubIt = `${SITE_URL}/scanner-3d-aeroporti`;
  const hubEn = `${SITE_URL}/en/3d-scanners-airports`;
  const hubEs = `${SITE_URL}/es/3d-scanners-airports`;
  const hubAlts = { it: hubIt, en: hubEn, es: hubEs };
  const today = '2026-10-31T00:00:00.000Z';
  addUrl(hubIt, today, hubAlts);
  addUrl(hubEn, today, hubAlts);
  addUrl(hubEs, today, hubAlts);

  // Airports
  for (const airport of airports) {
    if (getAirportSeoStatus(airport) !== 'indexable') continue;
    const it = new URL(airportPath(airport, 'it'), SITE_URL).toString();
    const en = new URL(airportPath(airport, 'en'), SITE_URL).toString();
    const es = new URL(airportPath(airport, 'es'), SITE_URL).toString();
    const verifiedDate = airport.securityPolicy.lastVerifiedDate;
    const lastmod = verifiedDate ? `${verifiedDate}T00:00:00.000Z` : undefined;
    const airportAlts = { it, en, es };
    addUrl(it, lastmod, airportAlts);
    addUrl(en, lastmod, airportAlts);
    addUrl(es, lastmod, airportAlts);
  }

  xml += '</urlset>\n';
  return xml;
}

export async function GET() {
  const xml = await generateSitemapXml();

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
