import { airportPath } from '@/lib/airport-slug';
import type { Airport, Language } from '@/types/airport';

export const SITE_URL = 'https://www.aero-info.eu';

export function getSiteStructuredData() {
  return {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'AeroInfo',
      url: `${SITE_URL}/`,
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'AeroInfo',
      url: `${SITE_URL}/`,
      inLanguage: ['it', 'en'],
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  };
}

export function getAirportBreadcrumbStructuredData(displayName: string, lang: 'it' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'it' ? 'Aeroporti' : 'Airports',
        item: `${SITE_URL}/`,
      },
      { '@type': 'ListItem', position: 2, name: displayName },
    ],
  };
}

export function getAirportStructuredData(airport: Airport, lang: Language) {
  const isItalian = lang === 'it';
  const displayName = (isItalian ? airport.name_it : airport.name_en) || airport.iata;
  const alternateName = isItalian ? airport.name_en : airport.name_it;
  const city = (isItalian ? airport.city_it : airport.city_en) || '';
  const country = (isItalian ? airport.country_it : airport.country_en) || '';
  const path = airportPath(airport, lang);
  const url = `${SITE_URL}${path}`;

  const sameAs: string[] = [];
  if (airport.officialWebsite && /^https?:\/\//i.test(airport.officialWebsite)) {
    sameAs.push(airport.officialWebsite);
  }

  return {
    '@type': 'Airport',
    '@id': `${url}#airport`,
    name: displayName,
    ...(alternateName && alternateName !== displayName ? { alternateName } : {}),
    iataCode: airport.iata.toUpperCase(),
    ...(airport.icao ? { icaoCode: airport.icao.toUpperCase() } : {}),
    url,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: airport.coordinates.lat,
      longitude: airport.coordinates.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: airport.countryCode || country,
    },
    description: isItalian
      ? `Guida ufficiale e verificata su sicurezza, scanner 3D, regole liquidi, terminal e trasporti per l'aeroporto di ${displayName} (${airport.iata}).`
      : `Official verified travel guide for security, 3D scanners, liquids rules, terminals, and ground transport at ${displayName} (${airport.iata}).`,
  };
}

export function getAirportCombinedStructuredData(airport: Airport, lang: Language) {
  const isItalian = lang === 'it';
  const displayName = (isItalian ? airport.name_it : airport.name_en) || airport.iata;
  const path = airportPath(airport, lang);
  const url = `${SITE_URL}${path}`;

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isItalian ? 'Aeroporti' : 'Airports',
        item: isItalian ? `${SITE_URL}/` : `${SITE_URL}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: displayName,
        item: url,
      },
    ],
  };

  const airportEntity = getAirportStructuredData(airport, lang);

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbs, airportEntity],
  };
}
