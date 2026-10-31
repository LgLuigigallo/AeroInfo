/**
 * Unified Analytics helper for Google Analytics 4 (GA4) and Microsoft Clarity.
 * Safely dispatches standard and custom conversion/engagement events.
 */

type GtagEventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: GtagEventParams) => void;
    clarity?: (command: string, ...args: any[]) => void;
  }
}

/**
 * Low-level event dispatcher to GA4 and Clarity
 */
export function trackEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === 'undefined') return;

  // 1. Google Analytics 4
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch {
      // Ignore gtag tracking errors
    }
  }

  // 2. Microsoft Clarity
  if (typeof window.clarity === 'function') {
    try {
      window.clarity('event', eventName);
      if (params) {
        // Tag session attributes when relevant
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined && value !== null) {
            window.clarity('set', key, String(value));
          }
        }
      }
    } catch {
      // Ignore clarity tracking errors
    }
  }
}

/**
 * 1. Tracks when a user switches the interface language (IT <-> EN)
 */
export function trackLanguageSwitch(targetLang: 'it' | 'en', currentLang: 'it' | 'en') {
  trackEvent('language_switch', {
    target_language: targetLang,
    previous_language: currentLang,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * 2. Tracks when a user clicks on the carry-on liquids guide link
 */
export function trackGuideClick(sourceLocation: string, currentLang: 'it' | 'en') {
  trackEvent('guide_click', {
    guide_topic: 'liquids_rules',
    source_location: sourceLocation,
    language: currentLang,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * 3. Tracks when a user clicks or focuses the airport search bar
 */
export function trackSearchBarClick(location: string = 'home_hero', currentLang?: string) {
  trackEvent('search_bar_click', {
    search_location: location,
    language: currentLang || (typeof window !== 'undefined' ? (window.location.pathname.startsWith('/en') ? 'en' : 'it') : 'it'),
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Tracks when a user selects an airport from the search dropdown
 */
export function trackAirportSelect(iata: string, airportName: string) {
  trackEvent('airport_select', {
    airport_iata: iata,
    airport_name: airportName,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}
