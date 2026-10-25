const SITE_URL = 'https://www.aero-info.eu';

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
