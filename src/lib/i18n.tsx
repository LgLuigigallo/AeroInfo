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
  requestAirportTitle: { it: 'Aeroporto non ancora censito', en: 'Airport not yet indexed' },
  requestAirportDesc: { 
    it: 'Questo aeroporto non è ancora presente nel nostro catalogo verificato. Puoi richiederne l\'inserimento prioritario: verificheremo le normative e i servizi sui canali ufficiali dell\'ente aeroportuale e pubblicheremo la scheda completa entro l\'aggiornamento programmato.', 
    en: 'This airport is not yet in our verified catalog. You can request priority addition: we will verify regulations and amenities through official airport channels and publish the full profile within the scheduled update.' 
  },
  requestAirportBtn: { it: 'Richiedi Censimento Aeroporto', en: 'Request Airport Addition' },
  requestAirportEmailPlaceholder: { it: 'La tua email per ricevere la notifica (opzionale)', en: 'Your email for publication alert (optional)' },
  requestAirportSubmitting: { it: 'Registrazione richiesta e verifica in corso...', en: 'Registering request and verifying...' },
  requestAirportSuccess: { 
    it: 'Richiesta presa in carico con successo! Le informazioni ufficiali verranno verificate e pubblicate nel catalogo.', 
    en: 'Request submitted successfully! Official information will be verified and published in the catalog.' 
  },
  
  // Already Requested & Email Subscription
  alreadyRequestedBadge: { it: 'Verifica già in corso', en: 'Verification in Progress' },
  alreadyRequestedTitle: { it: 'Aeroporto già in fase di verifica', en: 'Airport Already in Verification' },
  alreadyRequestedDesc: {
    it: 'Questo aeroporto è già stato richiesto ed è attualmente in lavorazione per il prossimo aggiornamento programmato. Non è necessario inviare una nuova richiesta: inserisci la tua email per ricevere l\'avviso non appena la scheda ufficiale sarà online.',
    en: 'This airport has already been requested and is currently being processed for the upcoming scheduled update. No need to request it again: enter your email below to receive an alert when the official profile goes live.'
  },
  subscribeAlertBtn: { it: 'Avvisami alla Pubblicazione', en: 'Notify Me When Published' },
  subscribeAlertSubmitting: { it: 'Iscrizione notifica in corso...', en: 'Subscribing to alert...' },
  subscribeAlertSuccess: {
    it: 'Email registrata! Riceverai una notifica non appena la scheda dell\'aeroporto sarà online.',
    en: 'Email registered! You will receive an alert as soon as the airport profile is live.'
  },
  emailRequiredNotice: {
    it: 'Inserisci un indirizzo email valido per ricevere la notifica.',
    en: 'Please enter a valid email address to receive notification.'
  },
  
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

  // Multi-Airport City & Terminal Rules
  cityMultiAirport: { it: 'Altri aeroporti della stessa città:', en: 'Other airports serving this city:' },
  terminalRulesTitle: { it: 'Regole Differenziate per Terminal', en: 'Specific Rules by Terminal' },
  terminalRule3DActive: { it: 'Scanner 3D Attivo', en: '3D Scanner Active' },
  terminalRuleTraditional: { it: 'Scanner Tradizionale', en: 'Standard Scanner' },
  liquidsInBagBadge: { it: 'Liquidi e bottiglie nel bagaglio', en: 'Liquids & bottles inside bag' },
  liquids100mlBadge: { it: 'Limite 100ml in busta 1L', en: '100ml limit in 1L bag' },
  electronicsInBagBadge: { it: 'Laptop nel bagaglio', en: 'Laptops stay in bag' },
  electronicsOutBadge: { it: 'Laptop fuori', en: 'Laptops taken out' },

  // Amenities POI & Scarcity
  amenityAvailability: { it: 'Disponibilità effettiva:', en: 'Actual availability:' },
  availabilityAbundant: { it: 'Abbondante (su quasi tutte le sedute)', en: 'Abundant (at nearly all seats)' },
  availabilityModerate: { it: 'Moderata (solo tavoli e colonne dedicate)', en: 'Moderate (dedicated desks/pillars)' },
  availabilityScarce: { it: 'Limitata / Rara (solo punti specifici segnalati)', en: 'Limited / Scarce (only specific marked spots)' },
  poiExactLocation: { it: 'Posizione esatta verificata:', en: 'Exact verified location:' },
  scarcityWarning: { it: 'Attenzione disponibilità:', en: 'Availability notice:' },

  // Tabs
  tabSecurity: { it: 'Sicurezza & Bagagli', en: 'Security & Luggage' },
  tabMap: { it: 'Mappa Terminal & POI', en: 'Terminal Map & POI' },
  tabTerminals: { it: 'Terminal & Compagnie', en: 'Terminals & Airlines' },
  tabDifficulty: { it: 'Difficoltà & Tempi', en: 'Complexity & Wait Times' },
  tabAmenities: { it: 'Prese & Servizi', en: 'Power & Amenities' },
  tabFood: { it: 'Ristorazione & Duty-Free', en: 'Food & Shopping' },
  tabTransport: { it: 'Arrivi & Trasporti', en: 'Arrivals & Transport' },

  // Interactive Terminal Map
  mapTitle: { it: 'Mappa Interattiva del Terminal & Punti di Interesse', en: 'Interactive Terminal Map & Points of Interest' },
  mapSubtitle: { it: 'Localizzazione spaziale esatta di prese elettriche, fontanelle d\'acqua, controlli 3D, gate e ristorazione.', en: 'Exact spatial layout of power outlets, drinking water fountains, 3D checkpoints, gates, and dining.' },
  filterAll: { it: 'Tutti i punti', en: 'All locations' },
  filterPower: { it: 'Prese & Ricarica', en: 'Power & Charging' },
  filterWater: { it: 'Fontanelle Acqua', en: 'Drinking Water' },
  filterSecurity: { it: 'Controlli Sicurezza', en: 'Security Checkpoints' },
  filterDining: { it: 'Ristoranti & Bar', en: 'Dining & Cafés' },
  filterShops: { it: 'Duty Free & Negozi', en: 'Duty Free & Shops' },
  filterGates: { it: 'Gates Imbarco', en: 'Boarding Gates' },
  filterRelax: { it: 'Aree Relax', en: 'Relax Areas' },
  selectTerminal: { it: 'Seleziona Terminal:', en: 'Select Terminal:' },
  openOfficialMap: { it: 'Apri Mappa Ufficiale Aeroporto', en: 'Open Official Airport Map' },
  mapClickInstruction: { it: 'Clicca su un punto d\'interesse sulla mappa per visualizzare i dettagli completi, disponibilità e note.', en: 'Click any point of interest on the map to inspect full details, availability, and tips.' },
  selectedPoiTitle: { it: 'Dettaglio Punto Selezionato', en: 'Selected Location Details' },
  poiListTitle: { it: 'Elenco Punti di Interesse nel Terminal', en: 'Terminal Points of Interest Directory' },
  zoneCheckinSecurity: { it: 'Area Check-in & Varchi Sicurezza', en: 'Check-in & Security Screening Zone' },
  zoneAirsideCommercial: { it: 'Piazza Commerciale & Duty-Free', en: 'Central Airside & Duty-Free Plaza' },
  zoneGates: { it: 'Moli Partenze & Gates', en: 'Departure Piers & Gates' },
  verifiedOfficialLocation: { it: 'Posizione verificata da fonte ufficiale', en: 'Verified official airport location' },
  noPoisFoundForFilter: { it: 'Nessun punto presente per la categoria selezionata in questo terminal.', en: 'No points found for the selected category in this terminal.' },

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
    it: 'Le informazioni vengono sincronizzate automaticamente ogni 24 ore dai siti web ufficiali degli aeroporti.', 
    en: 'Information is synchronized automatically every 24 hours from official airport websites.' 
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
