'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types/airport';

interface Translations {
  [key: string]: {
    it: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation & Branding
  brandName: { it: 'AeroInfo', en: 'AeroInfo' },
  tagline: { 
    it: 'L\'aggregatore essenziale per chi viaggia nei principali aeroporti del mondo.', 
    en: 'The essential intelligence aggregator for travelers in global airports.' 
  },
  searchPlaceholder: { 
    it: 'Cerca aeroporto (es. FCO, Malpensa, JFK, Londra, Roma)...', 
    en: 'Search airport (e.g. FCO, Malpensa, JFK, London, Rome)...' 
  },
  searchShortcut: { it: 'Premi / per cercare', en: 'Press / to search' },
  popularHubs: { it: 'Aeroporti Principali', en: 'Major Hubs' },
  recentSearches: { it: 'Ricerche Recenti', en: 'Recent Searches' },
  clearRecent: { it: 'Cancella', en: 'Clear' },
  noResults: { it: 'Nessun aeroporto trovato per', en: 'No airports found for' },
  
  // Verification Badges & Modal
  verifiedOfficial: { it: 'Fonte Ufficiale Certificata', en: 'Official Certified Source' },
  verifiedDate: { it: 'Ultima verifica ufficiale', en: 'Last official verification' },
  unverifiedBadgeTitle: { it: 'Dato non verificato sul sito ufficiale', en: 'Data not verified on official site' },
  unverifiedModalHeading: { it: 'Informazione Non Verificata', en: 'Unverified Information' },
  unverifiedModalBody: { 
    it: 'Questa informazione non è stata verificata sul sito ufficiale, ma è derivata dall\'esperienza di altri viaggiatori.', 
    en: 'This information has not been verified on the official website, but is derived from other travelers\' experiences.' 
  },
  unverifiedModalAdvice: {
    it: 'Ti consigliamo di verificare sempre con il personale di terra al banco check-in o al varco di sicurezza.',
    en: 'We recommend checking directly with airport ground staff at check-in or security lanes.'
  },
  closeModal: { it: 'Ho capito', en: 'Understood' },

  // Tabs
  tabSecurity: { it: 'Sicurezza & Bagagli', en: 'Security & Luggage' },
  tabTerminals: { it: 'Terminal & Compagnie', en: 'Terminals & Airlines' },
  tabDifficulty: { it: 'Difficoltà & Tempi', en: 'Complexity & Wait Times' },
  tabAmenities: { it: 'Prese & Servizi', en: 'Power & Amenities' },
  tabFood: { it: 'Ristorazione & Duty-Free', en: 'Food & Shopping' },
  tabTransport: { it: 'Arrivi & Trasporti', en: 'Arrivals & Transport' },

  // Security Policy
  securityNotice: { it: 'Regolamento Controlli di Sicurezza', en: 'Security Screening Rules' },
  scanners3DActive: { it: 'Scanner 3D EDS-CB di nuova generazione attivi', en: 'Next-gen 3D EDS-CB Scanners active' },
  scannersStandard: { it: 'Scanner tradizionali a raggi X', en: 'Traditional X-Ray Scanners' },
  liquidsTitle: { it: 'Regola Liquidi', en: 'Liquids Policy' },
  liquidsKeepInBag: { it: 'I liquidi possono restare all\'interno del bagaglio a mano', en: 'Liquids can stay inside carry-on luggage' },
  liquidsMustRemove: { it: 'Obbligo di estrarre i liquidi dal bagaglio in busta da 1L (max 100ml cad.)', en: 'Must remove liquids in 1L clear bag (max 100ml each)' },
  electronicsTitle: { it: 'Dispositivi Elettronici (Laptop / Tablet)', en: 'Electronic Devices (Laptops / Tablets)' },
  electronicsInBagText: { it: 'Computer e tablet possono rimanere dentro la borsa', en: 'Computers and tablets can stay inside bag' },
  electronicsOutText: { it: 'Obbligo di estrarre laptop e tablet dalle custodie', en: 'Must take laptops and tablets out of bags' },
  dronesTitle: { it: 'Politica Droni', en: 'Drone Policy' },
  powerbanksTitle: { it: 'Powerbank & Batterie al Litio', en: 'Powerbanks & Lithium Batteries' },
  officialSourceLink: { it: 'Consulta la pagina ufficiale dell\'aeroporto', en: 'Check official airport webpage' },

  // Airlines & Terminals
  searchAirlinePlaceholder: { it: 'Filtra compagnia aerea (es. ITA, Ryanair, Lufthansa)...', en: 'Filter airline (e.g. ITA, Ryanair, Lufthansa)...' },
  noAirlinesFound: { it: 'Nessuna compagnia aerea trovata', en: 'No airlines found' },
  airlineTableColName: { it: 'Compagnia', en: 'Airline' },
  airlineTableColCode: { it: 'Codice', en: 'Code' },
  airlineTableColTerminal: { it: 'Terminal Partenze', en: 'Departure Terminal' },
  airlineTableColCheckin: { it: 'Area Banchi Check-in', en: 'Check-in Desks' },
  interTerminalTransfers: { it: 'Collegamenti tra Terminal', en: 'Inter-Terminal Connections' },

  // Difficulty & Times
  difficultyScore: { it: 'Indice di Difficoltà & Organizzazione', en: 'Complexity & Efficiency Score' },
  avgSecurityWait: { it: 'Tempo medio stimato ai controlli', en: 'Estimated avg. security wait' },
  minutes: { it: 'minuti', en: 'minutes' },
  recommendedArrival: { it: 'Anticipo arrivo consigliato', en: 'Recommended arrival in advance' },
  domesticSchengen: { it: 'Voli Nazionali / Schengen', en: 'Domestic / Schengen flights' },
  internationalLongHaul: { it: 'Voli Intercontinentali', en: 'Intercontinental flights' },
  hours: { it: 'ore prima', en: 'hours before' },
  tipsTitle: { it: 'Consigli per il viaggiatore', en: 'Traveler advice & navigation tips' },

  // Amenities
  powerChargingTitle: { it: 'Poltrone con ricarica & Prese USB/AC', en: 'Seats with Power Outlets & USB/AC' },
  wifiTitle: { it: 'Rete Wi-Fi', en: 'Wi-Fi Network' },
  waterRefillTitle: { it: 'Fontanelle & Ricarica Borracce', en: 'Drinking Water & Bottle Refill' },
  quietAreaTitle: { it: 'Aree Relax & Zone Silenziose', en: 'Relax Areas & Quiet Zones' },
  luggageStorageTitle: { it: 'Deposito Bagagli', en: 'Luggage Storage' },
  smokingAreaTitle: { it: 'Aree Fumatori', en: 'Smoking Areas' },

  // Food & Shopping
  allCategories: { it: 'Tutte le categorie', en: 'All categories' },
  dining: { it: 'Ristoranti', en: 'Restaurants' },
  cafe: { it: 'Bar & Caffè', en: 'Cafes & Coffee' },
  grabAndGo: { it: 'Grab & Go', en: 'Grab & Go' },
  dutyFree: { it: 'Duty-Free', en: 'Duty-Free' },
  shopping: { it: 'Shopping & Moda', en: 'Shopping & Fashion' },
  pharmacy: { it: 'Farmacia & Salute', en: 'Pharmacy & Health' },

  // Transport
  transportTitle: { it: 'Come raggiungere la città o l\'aeroporto', en: 'How to reach the city or the airport' },
  estDuration: { it: 'Durata media', en: 'Avg. Duration' },
  frequency: { it: 'Frequenza', en: 'Frequency' },
  estCost: { it: 'Costo indicativo', en: 'Approx. Cost' },
  pickupPoint: { it: 'Punto di salita', en: 'Pickup Location' },

  // Footer & Disclaimer
  weeklyUpdateNotice: { 
    it: 'Le informazioni vengono sincronizzate settimanalmente dai siti web ufficiali degli aeroporti.', 
    en: 'Information is synchronized weekly from official airport websites.' 
  },
  footerDisclaimer: {
    it: 'I regolamenti sui liquidi e le disposizioni dei terminali possono variare senza preavviso. Le informazioni con il badge "i" rosso provengono da segnalazioni di viaggiatori non ancora confermate dall\'ente aeroportuale.',
    en: 'Liquids regulations and terminal gates may change without prior notice. Items tagged with the red "i" badge stem from traveler reports not yet confirmed by airport management.'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('it');

  useEffect(() => {
    const saved = localStorage.getItem('aeroinfo_lang') as Language;
    if (saved === 'it' || saved === 'en') {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'it') {
        setLangState('it');
      } else {
        setLangState('en');
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('aeroinfo_lang', newLang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return String(key);
    return entry[lang] || entry.it || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
