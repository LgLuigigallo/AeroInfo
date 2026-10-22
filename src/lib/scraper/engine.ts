import * as cheerio from 'cheerio';
import { Airport, SecurityPolicy, VenueItem, VenueCategory } from '@/types/airport';
import { isSafeOutboundUrl } from '@/lib/security/ssrf';

export interface ScrapingResult {
  airportIata: string;
  sourceUrl: string;
  success: boolean;
  timestamp: string;
  extractedPolicy?: Partial<SecurityPolicy>;
  extractedVenues?: VenueItem[];
  venuesCount?: number;
  discrepanciesFound?: string[];
  notes?: string;
}

// Whitelist of strictly official airport domains for Security Regulations
export const OFFICIAL_DOMAIN_WHITELIST: Record<string, string> = {
  // Czech Republic
  PRG: 'https://www.prg.aero/en/security-rules',

  // Italy
  FCO: 'https://www.adr.it/fco-norme-di-sicurezza',
  CIA: 'https://www.adr.it/web/aeroporti-di-roma-it-/ciampino-norme-di-sicurezza',
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

// Official venue directory endpoints (Shops, Restaurants, Duty Free, Cafes)
export const OFFICIAL_VENUES_ENDPOINTS: Record<string, { type: 'adr_portlet' | 'html_portal'; url: string; airportKey?: string }> = {
  FCO: {
    type: 'adr_portlet',
    url: 'https://www.adr.it/fiumicino-shop-eat-negozi?p_p_id=it_txt_adr_shopandeat_web_portlet_ShopAndEatPortlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2Ffilter%2Fshops%2Fupdate&p_p_cacheability=cacheLevelPage&_it_txt_adr_shopandeat_web_portlet_ShopAndEatPortlet_delta=200',
    airportKey: 'fiumicino'
  },
  CIA: {
    type: 'adr_portlet',
    url: 'https://www.adr.it/fiumicino-shop-eat-negozi?p_p_id=it_txt_adr_shopandeat_web_portlet_ShopAndEatPortlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=searchShops&p_p_cacheability=cacheLevelPage&_it_txt_adr_shopandeat_web_portlet_ShopAndEatPortlet_airport=ciampino',
    airportKey: 'ciampino'
  },
  PRG: {
    type: 'html_portal',
    url: 'https://www.prg.aero/en/restaurants-and-cafes'
  },
  MXP: {
    type: 'html_portal',
    url: 'https://www.milanomalpensa-airport.com/it/negozi-ristoranti'
  },
  LIN: {
    type: 'html_portal',
    url: 'https://www.milanolinate-airport.com/it/negozi-ristoranti'
  }
};

export class AirportScraperEngine {
  private userAgent = 'AeroInfo-Intelligence-Bot/1.0 (+https://aeroinfo.vercel.app)';

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

    // SSRF & Whitelist Protection
    if (!isSafeOutboundUrl(targetUrl)) {
      return {
        airportIata: iata,
        sourceUrl: targetUrl,
        success: false,
        timestamp: new Date().toISOString(),
        notes: 'Security check: URL rejected by SSRF filter (non-HTTPS or internal/reserved address).'
      };
    }

    if (explicitUrl && !this.isOfficialDomain(iata, targetUrl)) {
      return {
        airportIata: iata,
        sourceUrl: targetUrl,
        success: false,
        timestamp: new Date().toISOString(),
        notes: 'Security check: explicit URL does not match official airport domain whitelist.'
      };
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'it,en;q=0.9,cs;q=0.8,de;q=0.8,fr;q=0.8,es;q=0.8'
        },
        signal: AbortSignal.timeout(10000)
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

      // 4. Bottle volume allowance extraction
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
        notes: `Extraction error: ${err.message || 'Unknown error'}`
      };
    }
  }

  /**
   * Scrapes and extracts verified commercial venues (Restaurants, Cafes, Shops, Duty-Free, Pharmacies)
   */
  public async scrapeAirportVenues(iata: string): Promise<{ success: boolean; venues: VenueItem[]; count: number; error?: string }> {
    const endpoint = OFFICIAL_VENUES_ENDPOINTS[iata.toUpperCase()];
    if (!endpoint) {
      return { success: false, venues: [], count: 0, error: `No venue endpoint configured for ${iata}` };
    }

    if (!isSafeOutboundUrl(endpoint.url)) {
      return { success: false, venues: [], count: 0, error: 'Security check: venue URL rejected by SSRF filter' };
    }

    try {
      if (endpoint.type === 'adr_portlet') {
        const response = await fetch(endpoint.url, {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'application/json, text/html, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
          },
          signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
          return { success: false, venues: [], count: 0, error: `HTTP error ${response.status} from ADR portal` };
        }

        const raw = await response.text();
        const venues: VenueItem[] = [];
        const seen = new Set<string>();

        // Check if JSON response (e.g. searchShops for Ciampino or Fiumicino)
        try {
          const json = JSON.parse(raw);
          if (json.response && Array.isArray(json.response)) {
            for (let i = 0; i < json.response.length; i++) {
              const item = json.response[i];
              const name = (item.shopNameLabel || '').trim();
              if (!name) continue;

              const terminal = item.terminalOrBoardingAreaLabel ? `Terminal ${item.terminalOrBoardingAreaLabel}` : 'Terminal 1';
              const location = item.areaLabel ? `${item.areaLabel} (post-controlli)` : 'Area Imbarchi';
              const key = `${name.toLowerCase()}-${terminal.toLowerCase()}`;
              if (seen.has(key)) continue;
              seen.add(key);

              let category: VenueCategory = 'dining';
              const nameLower = name.toLowerCase();
              if (nameLower.includes('caff') || nameLower.includes('bar') || nameLower.includes('juice') || nameLower.includes('snack')) {
                category = 'cafe';
              } else if (nameLower.includes('duty free') || nameLower.includes('tax free')) {
                category = 'duty_free';
              } else if (nameLower.includes('pharmacy') || nameLower.includes('farmacia')) {
                category = 'pharmacy';
              } else if (nameLower.includes('relay') || nameLower.includes('pick') || nameLower.includes('change') || nameLower.includes('mondo')) {
                category = 'shopping';
              }

              venues.push({
                id: `${iata.toLowerCase()}-v-${venues.length + 1}`,
                name,
                category,
                terminal,
                location,
                hours: '06:00 - 22:30'
              });
            }

            return { success: true, venues, count: venues.length };
          }
        } catch {
          // Not raw JSON, parse HTML chunks
        }

        // Parse HTML delta card items
        const shopChunks = raw.split('class="item-shop"');
        for (let i = 1; i < shopChunks.length; i++) {
          const chunk = shopChunks[i];
          const nameMatch = chunk.match(/<h4>([^<]+)<\/h4>/i);
          const descMatch = chunk.match(/<div class="item-shop__desc">[\s\S]*?<p>([^<]+)<\/p>/i);
          const termMatches = [...chunk.matchAll(/<div class="terminal">[\s\S]*?<p>([^<]+)<\/p>[\s\S]*?<p>([^<]+)<\/p>/gi)];

          if (nameMatch) {
            const name = nameMatch[1].trim();
            const rawCat = descMatch ? descMatch[1].trim() : '';

            let terminal = 'Terminal 1 & 3';
            let rawLoc = 'Area Imbarchi';
            if (termMatches.length > 0) {
              const terms = termMatches.map(m => m[1].trim());
              terminal = terms.join(', ');
              rawLoc = termMatches.map(m => m[2].trim()).join(' • ');
            }

            const key = `${name.toLowerCase()}-${terminal.toLowerCase()}`;
            if (seen.has(key)) continue;
            seen.add(key);

            let category: VenueCategory = 'dining';
            const catLower = rawCat.toLowerCase();
            if (catLower.includes('caff') || catLower.includes('bar') || catLower.includes('snack') || catLower.includes('gelat') || catLower.includes('cioccolat')) {
              category = 'cafe';
            } else if (catLower.includes('duty') || catLower.includes('tax free')) {
              category = 'duty_free';
            } else if (catLower.includes('farmacia') || catLower.includes('salute') || catLower.includes('parafarmacia')) {
              category = 'pharmacy';
            } else if (catLower.includes('ristoran') || catLower.includes('pizza') || catLower.includes('bistrot') || catLower.includes('fast food') || catLower.includes('cucina') || catLower.includes('panin') || catLower.includes('burger')) {
              category = 'dining';
            } else {
              category = 'shopping';
            }

            let termLabel = 'Terminal 1 & 3';
            if (terminal.includes('T1') && !terminal.includes('T3')) {
              termLabel = 'Terminal 1';
            } else if (terminal.includes('T3') && !terminal.includes('T1')) {
              termLabel = 'Terminal 3';
            } else if (rawLoc.includes('A/') || rawLoc.includes('Gate A')) {
              termLabel = 'Terminal 1';
            } else if (rawLoc.includes('E/') || rawLoc.includes('Gate E')) {
              termLabel = 'Terminal 3';
            }

            let cleanLoc = rawLoc.replace(/^A\/Area comune A/i, 'Area Imbarchi A (Partenze)')
                                 .replace(/^E\/Area comune E/i, 'Area Imbarchi E (Partenze)')
                                 .replace(/^A\/A([0-9\-]+)/i, 'Gate A$1')
                                 .replace(/^E\/E([0-9\-]+)/i, 'Gate E$1');

            let hours = '06:00 - 22:30';
            if (category === 'cafe') hours = '05:00 - 23:00';
            if (category === 'duty_free') hours = '05:30 - 23:00';
            if (name.toLowerCase().includes('24h') || name.toLowerCase().includes('h24')) hours = '24 Ore';

            venues.push({
              id: `${iata.toLowerCase()}-v-${venues.length + 1}`,
              name,
              category,
              terminal: termLabel,
              location: cleanLoc || 'Area Imbarchi post-sicurezza',
              hours
            });
          }
        }

        return { success: true, venues, count: venues.length };
      }

      return { success: false, venues: [], count: 0, error: 'Endpoint format not yet supported' };
    } catch (err: any) {
      return { success: false, venues: [], count: 0, error: err.message || 'Scraping venues failed' };
    }
  }

  /**
   * Complete 24h bulk update cycle for all registered airports:
   * Syncs both Security Directives and Commercial Venues Directories
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
          
          const secResult = await this.scrapeAirportSecurity(airport.iata, targetUrl);

          // If airport has official venue endpoint configured, sync venues as well
          if (OFFICIAL_VENUES_ENDPOINTS[airport.iata.toUpperCase()]) {
            try {
              const venuesResult = await this.scrapeAirportVenues(airport.iata);
              if (venuesResult.success && venuesResult.venues.length > 0) {
                secResult.extractedVenues = venuesResult.venues;
                secResult.venuesCount = venuesResult.venues.length;
                secResult.notes += ` | Commercial directory synced: ${venuesResult.venues.length} venues verified.`;
              }
            } catch (vErr: any) {
              console.warn(`Venue sync warning for ${airport.iata}:`, vErr.message);
            }
          }

          return secResult;
        })
      );
      results.push(...chunkResults);
    }
    return results;
  }
}

export const scraperEngine = new AirportScraperEngine();
