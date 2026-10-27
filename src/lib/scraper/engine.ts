import * as cheerio from 'cheerio';
import { Airport, SecurityPolicy, VenueItem, VenueCategory } from '@/types/airport';
import { isSafeOutboundUrl } from '@/lib/security/ssrf';

export interface ScrapingResult {
  airportIata: string;
  sourceUrl: string;
  success: boolean;
  policyVerified?: boolean;
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
  AMS: 'https://www.schiphol.nl/en/prepare-for-your-flight-at-schiphol/prepare-for-security/',

  // Ireland
  DUB: 'https://www.dublinairport.com/at-the-airport/security',

  // Portugal
  LIS: 'https://www.ana.pt/en/content-topic/plan-your-trip',

  // Austria
  VIE: 'https://www.viennaairport.com/passagiere/flughafen/sicherheitskontrolle',

  // Denmark
  CPH: 'https://www.cph.dk/en/practical/security',

  // Sweden
  ARN: 'https://www.swedavia.com/arlanda/security-control/',

  // Finland
  HEL: 'https://www.finavia.fi/en/airports/helsinki-airport/before-flight/security-control',

  // Poland
  WAW: 'https://airportchopin.com/en/info/security',
  KRK: 'https://krakowairport.pl/en/passenger/security-control',

  // Hungary
  BUD: 'https://www.bud.hu/en/flight-and-travel-information/travel/security-screening',

  // Greece
  ATH: 'https://www.aia.gr/traveler/security-information',

  // Switzerland
  ZRH: 'https://www.flughafen-zuerich.ch/en/passengers/fly/all-about-the-flight/what-is-allowed-in-your-baggage',

  // UK & USA & Japan
  LHR: 'https://www.heathrow.com/at-the-airport/airport-security',
  JFK: 'https://www.tsa.gov/travel/security-screening',
  HND: 'https://tokyo-haneda.com/en/passenger_guide/security/index.html',

  // Additional airports already present in the live catalogue
  BLQ: 'https://www.bologna-airport.it/guida-al-viaggio/sicurezza-e-controlli/',
  BRI: 'https://www.aeroportidipuglia.it/norme-di-sicurezza',
  CTA: 'https://www.aeroporto.catania.it',
  DJG: 'https://www.egsa-alger.dz',
  DXB: 'https://www.dubaiairports.ae/before-you-fly/security-customs',
  HER: 'https://www.ypa.gr',
  HKG: 'https://www.hongkongairport.com/en/passenger-guide/airport-security/',
  IBZ: 'https://www.aena.es/es/ibiza/equipajes-controles.html',
  LGW: 'https://www.gatwickairport.com/passenger-guide/security.html',
  LPA: 'https://www.aena.es/es/gran-canaria.html',
  PMI: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',
  PMO: 'https://www.aeroportodipalermo.it',
  PSA: 'https://www.pisa-airport.com/it/passeggeri/in-aeroporto/sicurezza.html',
  QUR: 'https://www.enac.gov.it',
  RAK: 'https://www.onda.ma',
  STR: 'https://www.stuttgart-airport.com/security-checks',
  TFS: 'https://www.aena.es/es/tenerife-sur.html'
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
  private readonly maxRedirects = 5;
  private readonly maxHtmlBytes = 2_000_000;

  private async readHtml(response: Response): Promise<string> {
    const declaredLength = Number(response.headers.get('content-length') || 0);
    if (declaredLength > this.maxHtmlBytes) throw new Error('Official page exceeded the 2 MB response limit.');
    if (!response.body) return '';

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let html = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > this.maxHtmlBytes) {
        await reader.cancel();
        throw new Error('Official page exceeded the 2 MB response limit.');
      }
      html += decoder.decode(value, { stream: true });
    }
    return html + decoder.decode();
  }

  private async fetchOfficialPage(iata: string, startUrl: string): Promise<{ response?: Response; finalUrl: string; error?: string }> {
    let currentUrl = startUrl;
    for (let redirectCount = 0; redirectCount <= this.maxRedirects; redirectCount += 1) {
      if (!isSafeOutboundUrl(currentUrl) || !this.isOfficialDomain(iata, currentUrl)) {
        return { finalUrl: currentUrl, error: 'Security check: destination is outside the verified official domain.' };
      }

      try {
        const response = await fetch(currentUrl, {
          redirect: 'manual',
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'it,en;q=0.9,cs;q=0.8,de;q=0.8,fr;q=0.8,es;q=0.8',
          },
          signal: AbortSignal.timeout(10000),
        });

        if (![301, 302, 303, 307, 308].includes(response.status)) {
          return { response, finalUrl: currentUrl };
        }

        const location = response.headers.get('location');
        if (!location || redirectCount === this.maxRedirects) {
          return { finalUrl: currentUrl, error: 'Official page returned an invalid or excessive redirect chain.' };
        }
        currentUrl = new URL(location, currentUrl).toString();
      } catch (error) {
        return { finalUrl: currentUrl, error: error instanceof Error ? error.message : 'Official page request failed.' };
      }
    }

    return { finalUrl: currentUrl, error: 'Official page returned an excessive redirect chain.' };
  }

  private async discoverOfficialSecurityUrls(iata: string, officialWebsite?: string): Promise<string[]> {
    const canonical = OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    const siteUrl = [officialWebsite, canonical].find((candidate) => Boolean(candidate && this.isOfficialDomain(iata, candidate)));
    if (!siteUrl) return [];

    const { response } = await this.fetchOfficialPage(iata, siteUrl);
    if (!response?.ok) return [];
    const contentType = response.headers.get('content-type') || '';
    if (contentType && !/(text\/html|application\/xhtml\+xml)/i.test(contentType)) return [];

    try {
      const html = await this.readHtml(response);
      const $ = cheerio.load(html);
      const matches = new Map<string, number>();
      const relevant = /security|screening|checkpoint|baggage|luggage|liquid|prohibited|bagagli|sicurezza|controlli|sicherheitskontrolle|sicherheit|seguridade|seguridad|sûreté/i;
      $('a[href]').each((_, element) => {
        const anchor = $(element);
        const label = `${anchor.text()} ${anchor.attr('title') || ''}`.trim();
        if (!relevant.test(`${label} ${anchor.attr('href') || ''}`)) return;
        try {
          const url = new URL(anchor.attr('href') || '', siteUrl).toString();
          if (this.isOfficialDomain(iata, url) && isSafeOutboundUrl(url)) {
            const score = (/security|sicurezza|sicherheit|seguridad|sûreté/i.test(label) ? 2 : 0)
              + (/security|screening|sicurezza|sicherheit|seguridad|sûreté/i.test(url) ? 3 : 0)
              + (/screen|liquid|baggage|bagagli|luggage/i.test(url) ? 1 : 0);
            matches.set(url, Math.max(matches.get(url) || 0, score));
          }
        } catch {
          // Ignore malformed and non-HTTP links.
        }
      });
      return [...matches.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([url]) => url);
    } catch {
      return [];
    }
  }

  private hasExplicitLiquidsRule(html: string): boolean {
    const $ = cheerio.load(html);
    $('script, style, noscript, svg, nav, footer').remove();
    const text = $('body').text().toLowerCase().replace(/\s+/g, ' ');
    const mentionsLiquids = /liquids?|liquidi|líquidos|flüssigkeiten|liquides/.test(text);
    const statesHandling = /(?:must|have to|need to|required to|permitted to|allowed to|can|may|should).{0,100}(?:remove|take out|extract|remain|stay|keep|carry)|(?:remove|take out|extract|remain|stay|keep|carry).{0,100}(?:liquids?|liquidi|líquidos|flüssigkeiten|liquides)/.test(text);
    return mentionsLiquids && statesHandling;
  }

  /**
   * Validates if a URL belongs to the official verified domain
   */
  public isOfficialDomain(iata: string, url: string): boolean {
    const officialBase = OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    if (!officialBase) return false;
    try {
      const parsedOfficial = new URL(officialBase);
      const parsedUrl = new URL(url);
      const officialHost = parsedOfficial.hostname.replace(/^www\./, '');
      const requestedHost = parsedUrl.hostname.replace(/^www\./, '');
      return requestedHost === officialHost || requestedHost.endsWith(`.${officialHost}`);
    } catch {
      return false;
    }
  }

  /**
   * Scrapes official airport web pages and extracts precise security regulations
   */
  public async scrapeAirportSecurity(iata: string, explicitUrl?: string, officialWebsite?: string): Promise<ScrapingResult> {
    const canonicalUrl = OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    const targetUrl = explicitUrl || canonicalUrl;
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
      const discoveredUrls = await this.discoverOfficialSecurityUrls(iata, officialWebsite);
      const candidateUrls = [...new Set([targetUrl, canonicalUrl, ...discoveredUrls].filter((url): url is string => Boolean(url)))];
      const failures: string[] = [];
      let response: Response | undefined;
      let fallbackResponse: Response | undefined;
      let fallbackUrl = targetUrl;
      let resolvedUrl = targetUrl;

      for (const candidateUrl of candidateUrls) {
        if (!this.isOfficialDomain(iata, candidateUrl) || !isSafeOutboundUrl(candidateUrl)) continue;
        const fetched = await this.fetchOfficialPage(iata, candidateUrl);
        if (fetched.response?.ok) {
          const contentType = fetched.response.headers.get('content-type') || '';
          if (!contentType || /(text\/html|application\/xhtml\+xml)/i.test(contentType)) {
            let html: string;
            try {
              html = await this.readHtml(fetched.response.clone());
            } catch {
              failures.push(`${new URL(candidateUrl).pathname}: response exceeded the safe HTML limit`);
              continue;
            }
            if (this.hasExplicitLiquidsRule(html)) {
              response = fetched.response;
              resolvedUrl = fetched.finalUrl;
              break;
            }
            fallbackResponse ??= fetched.response;
            fallbackUrl = fetched.finalUrl;
            failures.push(`${new URL(candidateUrl).pathname}: page loaded without an explicit liquids rule`);
            continue;
          }
          failures.push(`${new URL(candidateUrl).pathname}: non-HTML response`);
        } else {
          failures.push(`${new URL(candidateUrl).pathname}: ${fetched.response ? `HTTP ${fetched.response.status}` : fetched.error || 'request failed'}`);
        }
      }

      if (!response && fallbackResponse) {
        response = fallbackResponse;
        resolvedUrl = fallbackUrl;
      }

      if (!response) {
        const accessDenied = failures.some((failure) => /HTTP (401|403)\b/.test(failure));
        return {
          airportIata: iata,
          sourceUrl: targetUrl,
          success: false,
          timestamp: new Date().toISOString(),
          notes: accessDenied
            ? `The official website denied automated access; source availability could not be confirmed (${failures.slice(0, 3).join('; ')}).`
            : `Official source unavailable after safe fallback checks (${failures.slice(0, 3).join('; ') || 'no eligible source'}).`,
        };
      }

      const html = await this.readHtml(response);
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

      const liquidsMustBeRemoved =
        pageText.includes('remove liquids from your bag') ||
        pageText.includes('remove all liquids') ||
        pageText.includes('take liquids out of your bag') ||
        pageText.includes('estrarre i liquidi') ||
        pageText.includes('rimuovere i liquidi dal bagaglio') ||
        pageText.includes('liquidi devono essere estratti');
      const explicitLiquidsRule = liquidsCanStayInBag || liquidsMustBeRemoved;

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

      const policyVerified = explicitLiquidsRule;
      const extractedPolicy: Partial<SecurityPolicy> = {
        ...(has3DScannerMentions ? { has3DScanners: true } : {}),
        ...(explicitLiquidsRule ? {
          liquidsMustBeRemoved: liquidsMustBeRemoved,
          liquidsAllowance_it: liquidsCanStayInBag
            ? 'La fonte ufficiale indica che i liquidi possono restare nel bagaglio a mano.'
            : 'La fonte ufficiale indica che i liquidi devono essere estratti dal bagaglio a mano.',
          liquidsAllowance_en: liquidsCanStayInBag
            ? 'The official source says liquids may remain inside cabin baggage.'
            : 'The official source says liquids must be removed from cabin baggage.',
          liquidsUnverified: false,
        } : {}),
        ...(laptopsCanStayInBag ? { electronicsInBag: true, electronicsUnverified: false } : {}),
        ...(policyVerified ? { lastVerifiedDate: new Date().toISOString().split('T')[0] } : {}),
        officialSourceUrl: targetUrl,
      };

      return {
        airportIata: iata,
        sourceUrl: resolvedUrl,
        success: true,
        policyVerified,
        timestamp: new Date().toISOString(),
        extractedPolicy: Object.keys(extractedPolicy).length > 1 ? extractedPolicy : undefined,
        notes: allowsLargerBottles 
          ? 'Verified: 3D CT lanes allow bottles and liquids inside bag.' 
          : policyVerified
            ? 'Official page contained an explicit liquids rule; only supported fields were extracted.'
            : 'Official page loaded, but no explicit security rule could be confirmed.'
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

              const terminal = item.terminalOrBoardingAreaLabel ? `Terminal ${item.terminalOrBoardingAreaLabel}` : '';
              const location = item.areaLabel ? `${item.areaLabel} (post-controlli)` : '';
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
                hours: typeof item.openingHours === 'string' ? item.openingHours : '',
                isUnverified: !terminal || !location,
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

            let terminal = '';
            let rawLoc = '';
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

            let termLabel = terminal;
            if (terminal.includes('T1') && !terminal.includes('T3')) {
              termLabel = 'Terminal 1';
            } else if (terminal.includes('T3') && !terminal.includes('T1')) {
              termLabel = 'Terminal 3';
            } else if (rawLoc.includes('A/') || rawLoc.includes('Gate A')) {
              termLabel = 'Terminal 1';
            } else if (rawLoc.includes('E/') || rawLoc.includes('Gate E')) {
              termLabel = 'Terminal 3';
            }

            const cleanLoc = rawLoc.replace(/^A\/Area comune A/i, 'Area Imbarchi A (Partenze)')
                                 .replace(/^E\/Area comune E/i, 'Area Imbarchi E (Partenze)')
                                 .replace(/^A\/A([0-9\-]+)/i, 'Gate A$1')
                                 .replace(/^E\/E([0-9\-]+)/i, 'Gate E$1');

            const hours = '';

            venues.push({
              id: `${iata.toLowerCase()}-v-${venues.length + 1}`,
              name,
              category,
              terminal: termLabel,
              location: cleanLoc,
              hours,
              isUnverified: !terminal || !cleanLoc,
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
          const targetUrl = airport.securityPolicy?.officialSourceUrl || OFFICIAL_DOMAIN_WHITELIST[airport.iata.toUpperCase()];
          const secResult = await this.scrapeAirportSecurity(airport.iata, targetUrl, airport.officialWebsite);

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
