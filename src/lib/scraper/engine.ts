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

// Whitelist of strictly official airport domains
export const OFFICIAL_DOMAIN_WHITELIST: Record<string, string> = {
  FCO: 'https://www.adr.it/fiumicino',
  MXP: 'https://www.milanomalpensa-airport.com',
  LHR: 'https://www.heathrow.com',
  CDG: 'https://www.parisaeroport.fr',
  JFK: 'https://www.jfkairport.com',
  HND: 'https://tokyo-haneda.com',
  AMS: 'https://www.schiphol.nl',
  DXB: 'https://www.dubaiairports.ae',
  MAD: 'https://www.aena.es',
  FRA: 'https://www.frankfurt-airport.com'
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
   * Scrapes official airport web pages and extracts security regulations
   */
  public async scrapeAirportSecurity(iata: string): Promise<ScrapingResult> {
    const officialUrl = OFFICIAL_DOMAIN_WHITELIST[iata.toUpperCase()];
    if (!officialUrl) {
      return {
        airportIata: iata,
        sourceUrl: '',
        success: false,
        timestamp: new Date().toISOString(),
        notes: `No official whitelist domain registered for IATA: ${iata}`
      };
    }

    try {
      const response = await fetch(officialUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'it,en;q=0.9'
        },
        signal: AbortSignal.timeout(10000) // 10s timeout
      });

      if (!response.ok) {
        return {
          airportIata: iata,
          sourceUrl: officialUrl,
          success: false,
          timestamp: new Date().toISOString(),
          notes: `HTTP error ${response.status} from official server`
        };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Strip scripts and styles for text analysis
      $('script, style, noscript').remove();
      const pageText = $('body').text().toLowerCase();

      // Heuristic extraction for 3D scanner status
      const has3DScannerMentions = 
        pageText.includes('eds-cb') || 
        pageText.includes('c3') || 
        pageText.includes('scanner 3d') || 
        pageText.includes('3d scanner') || 
        pageText.includes('scanner tc') ||
        pageText.includes('smiths detection');

      const liquidsCanStayInBag = 
        has3DScannerMentions && 
        (pageText.includes('liquidi nel bagaglio') || 
         pageText.includes('senza estrarre') || 
         pageText.includes('liquids can stay') ||
         pageText.includes('no need to remove liquids'));

      const laptopsCanStayInBag = 
        has3DScannerMentions && 
        (pageText.includes('computer nel bagaglio') || 
         pageText.includes('senza togliere computer') || 
         pageText.includes('laptops stay in') ||
         pageText.includes('leave electronics in'));

      const extractedPolicy: Partial<SecurityPolicy> = {
        has3DScanners: has3DScannerMentions,
        liquidsMustBeRemoved: !liquidsCanStayInBag,
        electronicsInBag: laptopsCanStayInBag,
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        officialSourceUrl: officialUrl
      };

      return {
        airportIata: iata,
        sourceUrl: officialUrl,
        success: true,
        timestamp: new Date().toISOString(),
        extractedPolicy,
        notes: 'Successfully verified against official domain.'
      };
    } catch (err: any) {
      return {
        airportIata: iata,
        sourceUrl: officialUrl,
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
    for (const airport of airports) {
      const result = await this.scrapeAirportSecurity(airport.iata);
      results.push(result);
      // Politeness pause between requests
      await new Promise((res) => setTimeout(res, 1200));
    }
    return results;
  }
}

export const scraperEngine = new AirportScraperEngine();
