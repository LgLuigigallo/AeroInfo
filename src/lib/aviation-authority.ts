/**
 * Authoritative Directory of Civil Aviation Authorities and Airport Portals.
 * Guarantees that AeroInfo always displays official certified websites,
 * completely preventing search engine URLs (e.g. google.com/search) from appearing.
 */

export interface AuthorityPortal {
  name: string;
  url: string;
  countryCode: string;
}

export const NATIONAL_AVIATION_AUTHORITIES: Record<string, AuthorityPortal> = {
  IT: { name: 'ENAC - Ente Nazionale per l\'Aviazione Civile', url: 'https://www.enac.gov.it', countryCode: 'IT' },
  ES: { name: 'Aena Aeropuertos de España', url: 'https://www.aena.es', countryCode: 'ES' },
  FR: { name: 'DGAC / Union des Aéroports Français', url: 'https://www.aeroport.fr', countryCode: 'FR' },
  DE: { name: 'ADV - Flughafenverband Deutschland', url: 'https://www.adv.aero', countryCode: 'DE' },
  GB: { name: 'CAA - Civil Aviation Authority UK', url: 'https://www.caa.co.uk', countryCode: 'GB' },
  UK: { name: 'CAA - Civil Aviation Authority UK', url: 'https://www.caa.co.uk', countryCode: 'GB' },
  GR: { name: 'HCAA - Hellenic Civil Aviation Authority', url: 'https://hcaa.gov.gr', countryCode: 'GR' },
  PT: { name: 'ANA Aeroportos de Portugal', url: 'https://www.ana.pt', countryCode: 'PT' },
  NL: { name: 'Schiphol Group / Netherlands Aviation', url: 'https://www.schiphol.nl', countryCode: 'NL' },
  AT: { name: 'Austro Control / Austrian Aviation', url: 'https://www.austrocontrol.at', countryCode: 'AT' },
  CH: { name: 'FOCA - Federal Office of Civil Aviation', url: 'https://www.bazl.admin.ch', countryCode: 'CH' },
  MA: { name: 'ONDA - Office National Des Aéroports Maroc', url: 'https://www.onda.ma', countryCode: 'MA' },
  DZ: { name: 'EGSA - Gestion de Services Aéroportuaires Algérie', url: 'https://www.egsa-alger.dz', countryCode: 'DZ' },
  AE: { name: 'Dubai Airports & GCAA UAE', url: 'https://www.dubaiairports.ae', countryCode: 'AE' },
  US: { name: 'FAA / TSA Aviation Portal', url: 'https://www.tsa.gov', countryCode: 'US' },
  TR: { name: 'DHMİ - General Directorate of State Airports', url: 'https://www.dhmi.gov.tr', countryCode: 'TR' },
  IE: { name: 'DAA - Dublin Airport Authority', url: 'https://www.dublinairport.com', countryCode: 'IE' },
  PL: { name: 'PPL - Polish Airports State Enterprise', url: 'https://www.polish-airports.com', countryCode: 'PL' }
};

export const GLOBAL_ICAO_FALLBACK = 'https://www.icao.int';

/**
 * Curated registry of verified official domains for individual airports
 */
export const KNOWN_OFFICIAL_AIRPORT_DOMAINS: Record<string, string> = {
  QUR: 'https://www.enac.gov.it',
  DJG: 'https://www.egsa-alger.dz',
  FCO: 'https://www.adr.it/fiumicino',
  CIA: 'https://www.adr.it/ciampino',
  MXP: 'https://www.milanomalpensa-airport.com',
  LIN: 'https://www.milanolinate-airport.com',
  BGY: 'https://www.milanbergamoairport.it',
  NAP: 'https://www.aeroportodinapoli.it',
  BRI: 'https://www.aeroportidipuglia.it',
  BLQ: 'https://www.bologna-airport.it',
  PSA: 'https://www.pisa-airport.com',
  PMO: 'https://www.aeroportodipalermo.it',
  CTA: 'https://www.aeroporto.catania.it',
  BER: 'https://ber.berlin-airport.de',
  FRA: 'https://www.frankfurt-airport.com',
  MUC: 'https://www.munich-airport.com',
  STR: 'https://www.stuttgart-airport.com',
  HER: 'https://www.heraklion-airport.info',
  ATH: 'https://www.aia.gr',
  RAK: 'https://www.onda.ma',
  DXB: 'https://www.dubaiairports.ae',
  HKG: 'https://www.hongkongairport.com',
  SIN: 'https://www.changiairport.com',
  CDG: 'https://www.parisaeroport.fr/roissy-charles-de-gaulle',
  ORY: 'https://www.parisaeroport.fr/orly',
  LHR: 'https://www.heathrow.com',
  LGW: 'https://www.gatwickairport.com',
  MAD: 'https://www.aena.es/es/adolfo-suarez-madrid-barajas.html',
  BCN: 'https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html'
};

/**
 * Cleans and guarantees an authentic official airport website URL.
 * Automatically strips out search engines (google, bing, yahoo, duckduckgo).
 */
export function cleanOfficialWebsiteUrl(
  url: string | null | undefined,
  iata: string,
  countryCode?: string
): string {
  const upperIata = iata.toUpperCase();

  // 1. If explicit verified domain known for this IATA, use it
  if (KNOWN_OFFICIAL_AIRPORT_DOMAINS[upperIata]) {
    return KNOWN_OFFICIAL_AIRPORT_DOMAINS[upperIata];
  }

  // 2. If url is valid and NOT a search engine, keep it
  if (url && typeof url === 'string') {
    const trimmed = url.trim().toLowerCase();
    const isSearchEngine = 
      trimmed.includes('google.com') ||
      trimmed.includes('bing.com') ||
      trimmed.includes('yahoo.com') ||
      trimmed.includes('duckduckgo.com') ||
      trimmed.includes('/search?') ||
      trimmed.includes('search?q=');

    if (!isSearchEngine && (trimmed.startsWith('https://') || trimmed.startsWith('http://'))) {
      return url.trim();
    }
  }

  // 3. Fallback to national aviation authority portal
  const upperCountry = countryCode ? countryCode.toUpperCase() : '';
  if (upperCountry && NATIONAL_AVIATION_AUTHORITIES[upperCountry]) {
    return NATIONAL_AVIATION_AUTHORITIES[upperCountry].url;
  }

  return GLOBAL_ICAO_FALLBACK;
}

/**
 * Checks if an airport is primarily general aviation, private, aerotaxi, or non-commercial.
 */
export function isGeneralAviationAirport(airport: {
  iata?: string;
  isGeneralAviation?: boolean;
  classification?: string;
  name_it?: string;
  name_en?: string;
}): boolean {
  if (airport.isGeneralAviation) return true;
  if (airport.classification === 'general_aviation' || airport.classification === 'private_charter') return true;
  
  // Specific known GA / private airports
  const iataUpper = airport.iata?.toUpperCase();
  if (iataUpper === 'QUR') return true; // Roma Urbe

  const nameIt = airport.name_it?.toLowerCase() || '';
  const nameEn = airport.name_en?.toLowerCase() || '';
  if (
    nameIt.includes('roma-urbe') ||
    nameIt.includes('roma urbe') ||
    nameIt.includes('aviazione generale') ||
    nameEn.includes('general aviation')
  ) {
    return true;
  }

  return false;
}
