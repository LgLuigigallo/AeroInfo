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
        item: lang === 'it' ? `${SITE_URL}/` : `${SITE_URL}/en`,
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

export function getAirportFaqStructuredData(airport: Airport, lang: Language) {
  const isItalian = lang === 'it';
  const displayName = (isItalian ? airport.name_it : airport.name_en) || airport.iata;
  const city = (isItalian ? airport.city_it : airport.city_en) || '';
  const policy = airport.securityPolicy;
  const has3D = Boolean(policy?.has3DScanners);

  const questions: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }> = [];

  // 1. Regole liquidi
  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Quali sono le regole sui liquidi nel bagaglio a mano a ${displayName} (${airport.iata})?`
      : `What are the carry-on liquids rules at ${displayName} (${airport.iata})?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? (has3D
            ? `${displayName} (${airport.iata}) dispone di scanner tomografici 3D EDS-CB C3 di nuova generazione. ${policy?.liquidsAllowance_it || 'I liquidi possono rimanere all’interno del bagaglio a mano.'}`
            : `A ${displayName} (${airport.iata}) si applica la normativa standard sui liquidi: contenitori di capienza massima 100 ml ciascuno, inseriti in un'unica busta trasparente richiudibile da massimo 1 litro, da presentare separatamente ai varchi.`)
        : (has3D
            ? `${displayName} (${airport.iata}) is equipped with next-gen 3D EDS-CB C3 scanners. ${policy?.liquidsAllowance_en || 'Liquids can stay inside carry-on luggage.'}`
            : `At ${displayName} (${airport.iata}), standard security rules apply: containers must be no larger than 100ml each, placed in a single transparent resealable bag of up to 1 litre, and screened separately.`),
    },
  });

  // 2. Dispositivi elettronici & Scanner 3D
  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Bisogna estrarre computer portatili e liquidi ai controlli di ${displayName}?`
      : `Do I need to take laptops and liquids out of my bag at ${displayName} security?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? (policy?.electronicsInBag
            ? `No, grazie ai varchi con scanner tomografici 3D a ${displayName}, computer portatili, tablet e liquidi possono rimanere all'interno del bagaglio a mano.`
            : `Sì, ai controlli di sicurezza di ${displayName} è obbligatorio estrarre computer portatili, tablet e la busta dei liquidi per riporli separatamente nelle vaschette prima del controllo a raggi X.`)
        : (policy?.electronicsInBag
            ? `No, thanks to advanced 3D scanning technology at ${displayName}, laptops, tablets, and liquids can remain inside your carry-on luggage.`
            : `Yes, at ${displayName} security screening you must take out laptops, tablets, and your liquids bag to place them in separate trays for X-ray inspection.`),
    },
  });

  // 3. Anticipo consigliato in aeroporto
  const domHours = airport.recommendedArrivalHours?.domestic || 2;
  const intHours = airport.recommendedArrivalHours?.international || 3;
  const waitMin = airport.averageSecurityWaitMin || 15;
  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Quanto tempo prima bisogna arrivare in aeroporto a ${displayName}?`
      : `How early should I arrive at ${displayName} before departure?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? `Per le partenze da ${displayName} (${airport.iata}) si consiglia di arrivare con ${domHours} ore di anticipo per i voli nazionali o Schengen e ${intHours} ore prima per i voli internazionali extra-Schengen. Il tempo medio stimato di attesa ai controlli di sicurezza è di circa ${waitMin} minuti.`
        : `For departures from ${displayName} (${airport.iata}), travelers are advised to arrive at least ${domHours} hours early for domestic or Schengen flights, and ${intHours} hours for non-Schengen international flights. Average security wait time is approximately ${waitMin} minutes.`,
    },
  });

  // 4. Trasporti verso il centro
  if (airport.transports && airport.transports.length > 0) {
    const transportSummary = airport.transports
      .slice(0, 3)
      .map((t) => (isItalian ? `${t.name_it} (~${t.duration}, ${t.estimatedCost})` : `${t.name_en} (~${t.duration}, ${t.estimatedCost})`))
      .join(', ');

    questions.push({
      '@type': 'Question',
      name: isItalian
        ? `Come raggiungere il centro di ${city} dall'aeroporto di ${displayName}?`
        : `How do I get to ${city} city centre from ${displayName}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isItalian
          ? `L'aeroporto di ${displayName} (${airport.iata}) è collegato al centro di ${city} tramite: ${transportSummary}. Sono inoltre disponibili servizi taxi ufficiali e navette.`
          : `${displayName} (${airport.iata}) is connected to ${city} city centre via: ${transportSummary}. Official airport taxis and express shuttles are also available.`,
      },
    });
  }

  return {
    '@type': 'FAQPage',
    mainEntity: questions,
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
  const faqEntity = getAirportFaqStructuredData(airport, lang);

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbs, airportEntity, faqEntity],
  };
}

export function getGuideStructuredData(
  title: string,
  description: string,
  path: string,
  reviewedAt: string,
  lang: 'it' | 'en'
) {
  const isItalian = lang === 'it';
  const url = `${SITE_URL}${path}`;

  const faqEntity = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isItalian
          ? 'Qual è la regola generale sui liquidi nel bagaglio a mano negli aeroporti UE?'
          : 'What is the general carry-on liquids rule at EU airports?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isItalian
            ? 'La regola generale della Commissione Europea consente liquidi in contenitori da massimo 100 ml ciascuno, contenuti in una singola busta trasparente e richiudibile di capacità non superiore a 1 litro.'
            : 'The general European Commission rule permits liquids in containers of up to 100ml each, placed in a single transparent resealable plastic bag of up to 1 litre.',
        },
      },
      {
        '@type': 'Question',
        name: isItalian
          ? 'La presenza di scanner 3D elimina sempre il limite dei 100 ml?'
          : 'Do 3D scanners remove the 100ml limit at all airports?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isItalian
            ? 'No. Anche se gli scanner tomografici 3D (EDS-CB C3) consentono di non estrarre liquidi e computer dal bagaglio, le normative locali e comunitarie possono mantenere il limite dei 100 ml. È fondamentale verificare le istruzioni del singolo scalo di partenza e di transito.'
            : 'No. While 3D CT scanners (EDS-CB C3) allow leaving liquids and electronics inside luggage, local regulations may still require the 100ml limit. Always verify the rules of your departure and transfer airports.',
        },
      },
      {
        '@type': 'Question',
        name: isItalian
          ? 'I farmaci e gli alimenti per neonati sono esenti dal limite dei 100 ml?'
          : 'Are medicines and baby food exempt from the 100ml liquid limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isItalian
            ? 'Sì. I medicinali necessari per il viaggio (preferibilmente con prescrizione medica) e gli alimenti o latte per neonati sono generalmente esenti dal limite dei 100 ml e dalla busta da 1 litro, ma devono essere dichiarati e ispezionati separatamente ai controlli.'
            : 'Yes. Essential travel medicines (preferably with prescription) and baby food or milk are exempt from the 100ml container rule and 1-litre bag, but must be declared and screened separately at checkpoints.',
        },
      },
    ],
  };

  const articleEntity = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: `${reviewedAt}T00:00:00Z`,
    dateModified: `${reviewedAt}T00:00:00Z`,
    inLanguage: isItalian ? 'it' : 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [articleEntity, faqEntity],
  };
}
