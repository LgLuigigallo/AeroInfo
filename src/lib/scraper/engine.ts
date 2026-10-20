import * as cheerio from 'cheerio';
import { Airport, SecurityPolicy } from '@/types/airport';

export interface ScrapingResult {
  airportIata: string;
  sourceUrl: string;
  success: boolean;
  timestamp: string;
  extractedPolicy?: Partial<SecurityPolicy>;
  discrepanciesFound?: string[];
  notes?: string;
}

// Whitelist of strictly official airport domains for European Union & Global Hubs
export const OFFICIAL_DOMAIN_WHITELIST: Record<string, string> = {
  // Czech Republic
  PRG: 'https://www.prg.aero/en/security-rules',

  // Italy
  FCO: 'https://www.adr.it/fco-norme-di-sicurezza',
  MXP: 'https://www.milanomalpensa-airport.com/it/guida-per-il-passeggero/sicurezza-e-controlli',
  LIN: 'https://www.milanolinate-airport.com/it/guida-per-il-passeggero/sicurezza-e-controlli',
  BGY: 'https://www.milanbergamoairport.it/it/controlli-di-sicurezza/',
  VCE: 'https://www.veneziaairport.it/in-aeroporto/sicurezza-e-controlli.html',
  NAP: 'https://www.aeroportodinapoli.it/it/controlli-di-sicurezza',

  // Germany
  FRA: 'https://www.frankfurt-airport.com/en/flights-and-transfer/security-customs.html',
  MUC: 'https://www.munich-airport.com/security-checks-262106',
  BER: 'https://ber.berlin-airport.de/en/flying/security-controls.html',

  // France
  CDG: 'https://www.parisaeroport.fr/passagers/passagers-preparer-vol/bagages-surete',
  ORY: 'https://www.parisaeroport.fr/passagers/passagers-preparer-vol/bagages-surete',

  // Spain
  MAD: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',
  BCN: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',
  FUE: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',

  // Netherlands
  AMS: 'https://www.schiphol.nl/en/page/security-rules-liquids-in-hand-baggage/',

  // Ireland
  DUB: 'https://www.dublinairport.com/at-the-airport/security',

  // Portugal
  LIS: 'https://www.ana.pt/en/passenger-guide/what-can-i-carry',

  // Austria
  VIE: 'https://www.viennaairport.com/passagiere/flughafen/sicherheitskontrolle',

  // Denmark
  CPH: 'https://www.cph.dk/en/practical/security',

  // Sweden
  ARN: 'https://www.swedavia.com/arlanda/security-control/',

  // Finland
  HEL: 'https://www.finavia.fi/en/airports/helsinki-airport/before-flight/security-control',

  // Poland
  WAW: 'https://www.lotnisko-chopina.pl/en/security-control.html',
  KRK: 'https://krakowairport.pl/en/passenger/security-control',

  // Hungary
  BUD: 'https://www.bud.hu/en/passengers/flight_and_travel_info/security_screening',

  // Greece
  ATH: 'https://www.aia.gr/traveler/security-information',

  // Switzerland
  ZRH: 'https://www.flughafen-zuerich.ch/en/passengers/fly/security-and-customs',

  // UK & USA & Japan
  LHR: 'https://www.heathrow.com/at-the-airport/airport-security',
  JFK: 'https://www.tsa.gov/travel/security-screening',
  HND: 'https://tokyo-haneda.com/en/passenger_guide/security/index.html'
};

export class AirportScraperEngine {
  private userAgent = 'AeroInfo-Intelligence-Bot/1.0 (+https://aeroinfo.vercel.app/bot-info)';

  /**
   * Validates if a URL belongs to the official verified domain
   */
  public isOfficialDomain(iata: string, url: string): boolean {
    const officialBase = OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    if (!officialBase) return false;
    try {
      const parsedOfficial = new URL(officialBase);
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.endsWith(parsedOfficial.hostname.replace('www.', ''));
    } catch {
      return false;
    }
  }

  /**
   * Scrapes official airport web pages and extracts precise security regulations
   */
  public async scrapeAirportSecurity(iata: string, explicitUrl?: string): Promise<ScrapingResult> {
    const targetUrl = explicitUrl || OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    if (!targetUrl) {
      return {
        airportIata: iata,
        sourceUrl: '',
        success: false,
        timestamp: new Date().toISOString(),
        notes: `No official whitelist domain registered for IATA: ${iata}`
      };
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'it,en;q=0.9,cs;q=0.8,de;q=0.8,fr;q=0.8,es;q=0.8'
        },
        signal: AbortSignal.timeout(10000) // 10s timeout
      });

      if (!response.ok) {
        return {
          airportIata: iata,
          sourceUrl: targetUrl,
          success: false,
          timestamp: new Date().toISOString(),
          notes: `HTTP error ${response.status} from official server`
        };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Strip scripts, styles and invisible markup for clean text extraction
      $('script, style, noscript, svg, nav, footer').remove();
      const pageText = $('body').text().toLowerCase().replace(/\s+/g, ' ');

      // 1. Precise Detection for 3D Computed Tomography (CT) Scanners
      const has3DScannerMentions = 
        pageText.includes('eds-cb') || 
        pageText.includes('c3') || 
        pageText.includes('scanner 3d') || 
        pageText.includes('3d scanner') || 
        pageText.includes('scanner tc') || 
        pageText.includes('ct x-ray') ||
        pageText.includes('computed tomography') ||
        pageText.includes('smiths detection') ||
        pageText.includes('ct scanner') ||
        pageText.includes('hi-scan 6040');

      // 2. Precise Detection: Do liquids stay in bag?
      const liquidsCanStayInBag = 
        has3DScannerMentions && 
        (
          pageText.includes('liquidi nel bagaglio') || 
          pageText.includes('senza estrarre') || 
          pageText.includes('senza togliere') ||
          pageText.includes('liquids can stay') ||
          pageText.includes('no need to remove liquids') ||
          pageText.includes('do not need to remove') ||
          pageText.includes('not need to unpack') ||
          pageText.includes('leave liquids inside') ||
          pageText.includes('liquids inside hand baggage') ||
          pageText.includes('liquids inside your bag')
        );

      // 3. Precise Detection: Do laptops & electronics stay in bag?
      const laptopsCanStayInBag = 
        has3DScannerMentions && 
        (
          pageText.includes('computer nel bagaglio') || 
          pageText.includes('senza togliere computer') || 
          pageText.includes('laptops stay in') ||
          pageText.includes('leave electronics in') ||
          pageText.includes('do not need to remove large electronic') ||
          pageText.includes('electronics can stay')
        );

      // 4. Bottle volume allowance extraction (e.g. 1L / 2L bottles allowed vs strict 100ml)
      const allowsLargerBottles = 
        liquidsCanStayInBag &&
        (
          pageText.includes('over 100 ml') ||
          pageText.includes('over 100ml') ||
          pageText.includes('oltre 100ml') ||
          pageText.includes('oltre i 100ml') ||
          pageText.includes('maximum volume of 2 litres') ||
          pageText.includes('maximum volume of 1 litre') ||
          pageText.includes('fino a 1 litro') ||
          pageText.includes('fino a 2 litri')
        );

      const extractedPolicy: Partial<SecurityPolicy> = {
        has3DScanners: has3DScannerMentions,
        liquidsMustBeRemoved: !liquidsCanStayInBag,
        electronicsInBag: laptopsCanStayInBag,
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        officialSourceUrl: targetUrl
      };

      return {
        airportIata: iata,
        sourceUrl: targetUrl,
        success: true,
        timestamp: new Date().toISOString(),
        extractedPolicy,
        notes: allowsLargerBottles 
          ? 'Verified: 3D CT lanes allow bottles and liquids inside bag.' 
          : 'Successfully verified against official security page.'
      };
    } catch (err: any) {
      return {
        airportIata: iata,
        sourceUrl: targetUrl,
        success: false,
        timestamp: new Date().toISOString(),
        notes: `Scraping error: ${err.message || 'Unknown error'}`
      };
    }
  }

  /**
   * Weekly bulk update cycle for all registered airports
   */
  public async runWeeklySync(airports: Airport[]): Promise<ScrapingResult[]> {
    const results: ScrapingResult[] = [];
    const chunkSize = 5;

    for (let i = 0; i < airports.length; i += chunkSize) {
      const chunk = airports.slice(i, i + chunkSize);
      const chunkResults = await Promise.all(
        chunk.map(async (airport) => {
          const targetUrl =
            airport.securityPolicy?.officialSourceUrl ||
            OFFICIAL_DOMAIN_WHITELIST[airport.iata.toUpperCase()];
          return this.scrapeAirportSecurity(airport.iata, targetUrl);
        })
      );
      results.push(...chunkResults);
    }
    return results;
  }
}

export const scraperEngine = new AirportScraperEngine();
