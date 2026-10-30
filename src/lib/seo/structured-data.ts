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
  const country = (isItalian ? airport.country_it : airport.country_en) || '';

  const domHours = airport.recommendedArrivalHours?.domestic || 2;
  const intHours = airport.recommendedArrivalHours?.international || 3;
  const waitMin = airport.averageSecurityWaitMin || 15;

  const security = airport.securityPolicy;
  const has3D = Boolean(security?.has3DScanners);
  const liquidsAllowance = security ? (isItalian ? security.liquidsAllowance_it : security.liquidsAllowance_en) : '';
  const scannersNote = security ? (isItalian ? security.scannersNote_it : security.scannersNote_en) : '';
  const electronicsInBag = Boolean(security?.electronicsInBag);

  const mapsUrl = airport.coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${airport.coordinates.lat},${airport.coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${displayName} ${city}`)}`;

  const questions: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }> = [];

  // 1. Regole liquidi e scanner 3D EDS-CB C3
  const liquidsAnswerIt = has3D
    ? `Nello scalo di ${displayName} (${airport.iata}) sono operative corsie di sicurezza con scanner tomografici 3D EDS-CB C3: ${scannersNote || liquidsAllowance}. ${electronicsInBag ? 'Dispositivi elettronici come laptop e tablet possono rimanere all’interno del bagaglio a mano.' : 'I dispositivi elettronici devono essere estratti se richiesto dal personale di sicurezza.'}`
    : `All'aeroporto di ${displayName} (${airport.iata}) si applica la normativa di sicurezza standard: i liquidi sono consentiti esclusivamente in contenitori singoli da massimo 100 ml ciascuno, racchiusi in una busta trasparente e richiudibile della capienza massima di 1 litro. Dispositivi elettronici e liquidi devono essere estratti e riposti nelle vaschette ai controlli.`;

  const liquidsAnswerEn = has3D
    ? `At ${displayName} (${airport.iata}), security screening checkpoints equipped with EDS-CB C3 3D scanners are operational: ${scannersNote || liquidsAllowance}. ${electronicsInBag ? 'Electronic devices (laptops and tablets) can remain inside your cabin baggage.' : 'Electronic devices must be removed if requested by screening staff.'}`
    : `At ${displayName} (${airport.iata}), standard aviation security regulations apply: liquids are permitted only in individual containers of maximum 100ml each, placed in a single transparent, resealable bag of up to 1-litre capacity. Liquids and large electronic devices must be removed for separate screening at security.`;

  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Quali sono le regole sui liquidi e la presenza di scanner 3D a ${displayName}?`
      : `What are the liquids rules and 3D scanner guidelines at ${displayName}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian ? liquidsAnswerIt : liquidsAnswerEn,
    },
  });

  // 2. Powerbank e batterie al litio nel bagaglio a mano
  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Come vanno trasportate le powerbank e le batterie al litio sui voli da ${displayName}?`
      : `How should powerbanks and lithium batteries be carried on flights from ${displayName}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? `Tutte le powerbank, le batterie al litio sciolte di ricambio e le sigarette elettroniche devono essere trasportate esclusivamente nel bagaglio a mano (con potenza massima di 100 Wh, oppure fino a 160 Wh previa autorizzazione della compagnia aerea). È severamente vietato imbarcare powerbank nel bagaglio registrato da stiva per norme internazionali di prevenzione incendi (ICAO/EASA).`
        : `All powerbanks, spare lithium batteries, and e-cigarettes must strictly be packed inside your cabin carry-on baggage (rated up to 100 Wh, or up to 160 Wh with prior airline approval). Transporting powerbanks in checked hold luggage is strictly prohibited under international aviation safety regulations (ICAO/EASA).`,
    },
  });

  // 3. Anticipo consigliato in aeroporto
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
          ? `L'aeroporto di ${displayName} (${airport.iata}) è collegato al centro di ${city} tramite: ${transportSummary}. Sono inoltre disponibili servizi taxi ufficiali con tariffario esposto.`
          : `${displayName} (${airport.iata}) is connected to ${city} city centre via: ${transportSummary}. Official airport taxis with posted flat fares are also available.`,
      },
    });
  }

  // 5. Indirizzo, coordinate e indicazioni stradali
  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Dove si trova ${displayName} e come ottenere indicazioni stradali?`
      : `Where is ${displayName} located and how do I get driving directions?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? `${displayName} si trova a ${city}, ${country} (coordinate: ${airport.coordinates?.lat?.toFixed(4)}° N, ${airport.coordinates?.lng?.toFixed(4)}° E). È possibile calcolare il percorso e le indicazioni stradali dirette su Google Maps all'indirizzo: ${mapsUrl}`
        : `${displayName} is located in ${city}, ${country} (coordinates: ${airport.coordinates?.lat?.toFixed(4)}° N, ${airport.coordinates?.lng?.toFixed(4)}° E). Direct driving directions can be opened on Google Maps at: ${mapsUrl}`,
    },
  });

  // 6. Codici identificativi IATA, ICAO e sito ufficiale
  const icaoText = airport.icao ? ` (codice ICAO: ${airport.icao})` : '';
  const icaoTextEn = airport.icao ? ` (ICAO code: ${airport.icao})` : '';
  const websiteText = airport.officialWebsite ? ` Il sito web ufficiale dell'aeroporto è: ${airport.officialWebsite}` : '';
  const websiteTextEn = airport.officialWebsite ? ` The official airport website is: ${airport.officialWebsite}` : '';

  questions.push({
    '@type': 'Question',
    name: isItalian
      ? `Quali sono i codici identificativi e il sito ufficiale di ${displayName}?`
      : `What are the official codes and website for ${displayName}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isItalian
        ? `Il codice IATA di ${displayName} è ${airport.iata}${icaoText}.${websiteText}`
        : `The IATA code for ${displayName} is ${airport.iata}${icaoTextEn}.${websiteTextEn}`,
    },
  });

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
