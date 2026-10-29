'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Droplets, 
  Luggage, 
  ShieldCheck, 
  Map as MapIcon, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  Zap, 
  Plane, 
  Info, 
  BatteryCharging, 
  Pill, 
  ShoppingBag, 
  Sparkles,
  Search,
  Edit3
} from 'lucide-react';
import { Airport, Language, SuggestCategory } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { cleanOfficialWebsiteUrl } from '@/lib/aviation-authority';
import { airportPath } from '@/lib/airport-slug';
import { TerminalMapTab } from './tabs/TerminalMapTab';
import { SearchBar } from './SearchBar';
import { SuggestAirportEditModal } from './SuggestAirportEditModal';
import { CountryFlag } from './CountryFlag';
import { AirportFaqSection } from './AirportFaqSection';

interface AirportBubblesViewProps {
  airport: Airport;
  airports: Airport[];
  onBack: () => void;
  onSelectAirport: (airport: Airport) => void;
  onRefreshAirports?: () => Promise<Airport[] | void>;
}

type BubbleId = 'liquids' | 'baggage' | 'general' | 'map';

export function AirportBubblesView({ 
  airport, 
  airports, 
  onBack, 
  onSelectAirport,
  onRefreshAirports 
}: AirportBubblesViewProps) {
  const { lang, t } = useLanguage();
  const [activeModal, setActiveModal] = useState<BubbleId | null>(null);
  const [airlineSearch, setAirlineSearch] = useState('');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestCategory, setSuggestCategory] = useState<SuggestCategory>('liquids');

  const handleOpenSuggest = (cat?: SuggestCategory) => {
    if (cat) {
      setSuggestCategory(cat);
    } else if (activeModal === 'liquids') {
      setSuggestCategory('liquids');
    } else if (activeModal === 'baggage') {
      setSuggestCategory('baggage');
    } else if (activeModal === 'general') {
      setSuggestCategory('general');
    } else if (activeModal === 'map') {
      setSuggestCategory('map');
    } else {
      setSuggestCategory('liquids');
    }
    setIsSuggestModalOpen(true);
  };

  const isItalian = lang === 'it';
  const name = isItalian ? airport.name_it : airport.name_en;
  const city = isItalian ? airport.city_it : airport.city_en;
  const country = isItalian ? airport.country_it : airport.country_en;
  const policy = airport.securityPolicy;

  // Synchronize browser URL bar instantly on language change without reloading
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetPath = airportPath(airport, lang);
      if (
        window.location.pathname !== targetPath &&
        (window.location.pathname.startsWith('/aeroporti/') || window.location.pathname.startsWith('/en/airports/'))
      ) {
        window.history.replaceState(null, '', targetPath + window.location.search + window.location.hash);
      }
    }
  }, [airport, lang]);

  // Clean source URL
  const officialUrl = policy.officialSourceUrl 
    ? cleanOfficialWebsiteUrl(policy.officialSourceUrl, airport.iata) 
    : null;

  // Verification date
  const verifiedDateFormatted = policy.lastVerifiedDate
    ? new Intl.DateTimeFormat(isItalian ? 'it-IT' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${policy.lastVerifiedDate}T00:00:00Z`))
    : null;

  // Filter airlines
  const filteredAirlines = (airport.airlines || []).filter((airline) => {
    if (!airlineSearch) return true;
    const q = airlineSearch.toLowerCase();
    return (
      airline.airlineName.toLowerCase().includes(q) ||
      airline.iataCode.toLowerCase().includes(q) ||
      airline.terminal.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Search Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <Link
          href={isItalian ? '/' : '/en'}
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#05668D] dark:hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{isItalian ? '← Cambia aeroporto' : '← Change airport'}</span>
        </Link>

        <div className="w-full sm:w-80">
          <SearchBar
            selectedAirport={airport}
            onSelectAirport={onSelectAirport}
            airports={airports}
            onRefreshAirports={onRefreshAirports}
          />
        </div>
      </div>

      {/* Airport Identification Card (Clean & Minimal - Borderless) */}
      <section className="rounded-3xl bg-white/95 dark:bg-zinc-900/90 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[#05668D] text-white">
                {airport.iata}
              </span>
              {airport.icao && (
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]">
                  {airport.icao}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5 flex-wrap">
              <span>{name}</span>
              {airport.countryCode && (
                <CountryFlag countryCode={airport.countryCode} countryName={country} />
              )}
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {city}, {country}
            </p>

            {airport.otherCityAirports && airport.otherCityAirports.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-zinc-400 font-medium">{isItalian ? 'Stessa area:' : 'Same area:'}</span>
                {airport.otherCityAirports.map((other) => {
                  const match = airports.find((a) => a.iata.toUpperCase() === other.iata.toUpperCase());
                  const href = match ? airportPath(match, lang) : undefined;
                  const label = isItalian ? other.name_it : other.name_en;

                  return href ? (
                    <Link
                      key={other.iata}
                      href={href}
                      onClick={(e) => {
                        if (match) {
                          e.preventDefault();
                          onSelectAirport(match);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1F2]/70 hover:bg-[#5EAAA8]/20 dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-semibold transition-colors cursor-pointer text-xs"
                      title={label}
                    >
                      <span>{other.iata}</span>
                      <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
                        ({label})
                      </span>
                    </Link>
                  ) : (
                    <button
                      key={other.iata}
                      type="button"
                      onClick={() => {
                        if (match) onSelectAirport(match);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1F2]/70 hover:bg-[#5EAAA8]/20 dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-semibold transition-colors cursor-pointer text-xs"
                      title={label}
                    >
                      <span>{other.iata}</span>
                      <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
                        ({label})
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Verification Badge & Source */}
          <div className="flex flex-col items-start sm:items-end gap-1 text-xs">
            <div className="inline-flex items-center gap-1.5 text-[#05668D] dark:text-[#5EAAA8] font-medium bg-[#E8F1F2] dark:bg-zinc-800/80 px-2.5 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
              <span>{t('verifiedOfficial')}</span>
            </div>
            {verifiedDateFormatted && (
              <span className="text-[11px] text-zinc-400 font-mono">
                {isItalian ? 'Aggiornato al' : 'Verified on'} {verifiedDateFormatted}
              </span>
            )}
            {officialUrl && (
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#05668D] dark:text-[#5EAAA8] hover:underline pt-0.5"
              >
                <span>{isItalian ? 'Consulta il sito ufficiale' : 'Visit official website'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4 Main Interactive Bubbles Grid - 4 In una fila a tutto schermo */}
      <section aria-label="Informazioni essenziali aeroporto" className="space-y-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {isItalian ? 'Scegli cosa vuoi sapere' : 'Choose what you want to know'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
          
          {/* Bolla 1: Regole dei Liquidi */}
          <button
            type="button"
            onClick={() => setActiveModal('liquids')}
            className="group text-left p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 h-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center gap-1 group-hover:bg-[#05668D] group-hover:text-white transition-colors">
                  <span>{t('bubbleTapToExplore')}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
                  {t('bubbleLiquids')}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {policy.has3DScanners 
                    ? (isItalian ? 'Scanner 3D presenti: puoi portare liquidi oltre 100ml e lasciarli nel bagaglio a mano.' : '3D scanners installed: you can bring liquids over 100ml and leave them inside your bag.')
                    : (isItalian ? 'Norma standard: max 100ml a flacone in busta trasparente da 1 litro.' : 'Standard rule: max 100ml per container in a 1-liter clear plastic bag.')}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#05668D] dark:text-[#5EAAA8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EAAA8] shrink-0" />
              <span className="truncate">{isItalian ? 'Flaconi, sacchetto trasparente, deroghe' : 'Bottles, clear bag, exemptions'}</span>
            </div>
          </button>

          {/* Bolla 2: Regole dei Bagagli */}
          <button
            type="button"
            onClick={() => setActiveModal('baggage')}
            className="group text-left p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 h-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Luggage className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center gap-1 group-hover:bg-[#05668D] group-hover:text-white transition-colors">
                  <span>{t('bubbleTapToExplore')}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
                  {t('bubbleBaggage')}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {policy.electronicsInBag
                    ? (isItalian ? 'Dispositivi elettronici: non serve estrarre laptop e tablet dal bagaglio.' : 'Electronic devices: no need to remove laptops and tablets from cabin bag.')
                    : (isItalian ? 'Dispositivi elettronici: estrarre laptop e tablet nei vassoi ai controlli.' : 'Electronic devices: take laptops and tablets out into security trays.')}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#05668D] dark:text-[#5EAAA8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#05668D] shrink-0" />
              <span className="truncate">{isItalian ? 'Elettronica, misure cabina, stiva e compagnie' : 'Electronics, cabin limits, hold & airlines'}</span>
            </div>
          </button>

          {/* Bolla 3: Altre Regole Generali */}
          <button
            type="button"
            onClick={() => setActiveModal('general')}
            className="group text-left p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 h-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F4D35E]/20 dark:bg-zinc-800 text-amber-800 dark:text-[#F4D35E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F4D35E]/20 dark:bg-zinc-800 text-amber-800 dark:text-[#F4D35E] flex items-center gap-1 group-hover:bg-[#F4D35E] group-hover:text-zinc-950 transition-colors">
                  <span>{t('bubbleTapToExplore')}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-[#F4D35E] transition-colors">
                  {t('bubbleGeneral')}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {isItalian
                    ? 'Regolamentazione droni, powerbank al litio, medicinali, cibo per neonati e duty free.'
                    : 'Regulations for drones, lithium powerbanks, medicines, baby food and duty free.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-[#F4D35E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4D35E] shrink-0" />
              <span className="truncate">{isItalian ? 'Droni, batterie max 100Wh, farmaci essenziali' : 'Drones, 100Wh batteries, critical meds'}</span>
            </div>
          </button>

          {/* Bolla 4: Mappa */}
          <button
            type="button"
            onClick={() => setActiveModal('map')}
            className="group text-left p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 h-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#5EAAA8]/20 dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MapIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center gap-1 group-hover:bg-[#5EAAA8] group-hover:text-white transition-colors">
                  <span>{t('bubbleTapToExplore')}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#5EAAA8] transition-colors">
                  {t('bubbleMap')}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {isItalian
                    ? 'Mappa interattiva dei terminal, varchi sicurezza, prese di ricarica, acqua potabile e gate.'
                    : 'Interactive terminal map with security lanes, power sockets, drinking water and gates.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#05668D] dark:text-[#5EAAA8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EAAA8] shrink-0" />
              <span className="truncate">{isItalian ? 'Terminal, varchi, prese, acqua e gate' : 'Terminals, checkpoints, power, water'}</span>
            </div>
          </button>

        </div>
      </section>

      {/* Clean & Semantic FAQ Accordions for Travelers and Search Engines */}
      <AirportFaqSection airport={airport} lang={lang} />

      {/* MODAL / SHEET DETAIL OVERLAY */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Click */}
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveModal(null)} 
            aria-hidden="true" 
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            
            {/* Modal Header with Category Switcher Tabs */}
            <div className="p-4 sm:p-5 bg-[#E8F1F2]/60 dark:bg-zinc-800/60 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#05668D] text-white shadow-xs">
                    {airport.iata}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-700/80 shadow-xs flex items-center justify-center text-zinc-500 hover:text-[#05668D] dark:hover:text-white hover:bg-white dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  title="Chiudi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Tab Switcher between the 4 bubbles */}
              <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/70 dark:bg-zinc-900/60 text-xs shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveModal('liquids')}
                  className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeModal === 'liquids'
                      ? 'bg-[#05668D] text-white shadow-xs font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#05668D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">{isItalian ? 'Liquidi' : 'Liquids'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('baggage')}
                  className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeModal === 'baggage'
                      ? 'bg-[#05668D] text-white shadow-xs font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#05668D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Luggage className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">{isItalian ? 'Bagagli' : 'Baggage'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('general')}
                  className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeModal === 'general'
                      ? 'bg-[#05668D] text-white shadow-xs font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#05668D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">{isItalian ? 'Altre Regole' : 'General'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('map')}
                  className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeModal === 'map'
                      ? 'bg-[#05668D] text-white shadow-xs font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-[#05668D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">{isItalian ? 'Mappa' : 'Map'}</span>
                </button>
              </div>
            </div>

            {/* Modal Body with Dedicated Clean Content (No wall of text!) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white dark:bg-zinc-900">
              
              {/* TAB 1: LIQUIDI */}
              {activeModal === 'liquids' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Status Banner */}
                  <div className={`p-4 sm:p-5 rounded-2xl shadow-2xs ${
                    policy.has3DScanners
                      ? 'bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                      : 'bg-amber-500/10 text-amber-950 dark:text-amber-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {policy.has3DScanners ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">
                          {policy.has3DScanners
                            ? (isItalian ? 'Scanner 3D EDS-CB C3 Attivi' : '3D EDS-CB C3 Scanners Active')
                            : (isItalian ? 'Limite Standard 100ml in Vigore' : 'Standard 100ml Rule in Force')}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed opacity-90">
                          {isItalian ? policy.liquidsAllowance_it : policy.liquidsAllowance_en}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Per-Terminal Exceptions if any */}
                  {policy.terminalRules && policy.terminalRules.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                        {isItalian ? 'Differenze per Terminal' : 'Differences by Terminal'}
                      </h4>
                      <div className="grid gap-2">
                        {policy.terminalRules.map((tr) => (
                          <div 
                            key={tr.terminalName}
                            className="p-3 rounded-xl bg-[#E8F1F2]/50 dark:bg-zinc-800/50 flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <span className="font-bold text-zinc-900 dark:text-white">{tr.terminalName}</span>
                              <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                                {isItalian ? tr.notes_it : tr.notes_en}
                              </p>
                            </div>
                            <span className={`px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                              tr.has3DScanners 
                                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                                : 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                            }`}>
                              {tr.has3DScanners ? 'Scanner 3D' : '100ml standard'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Essential Bite-Sized Rule Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-[#E8F1F2]/40 dark:bg-zinc-800/40 space-y-1.5 shadow-2xs">
                      <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-[#05668D]" />
                        {isItalian ? 'Estrazione dal bagaglio' : 'Removal from cabin bag'}
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {policy.liquidsMustBeRemoved
                          ? (isItalian ? 'I liquidi vanno estratti e posizionati nei vassoi prima del varco.' : 'Liquids must be taken out of your bag into the inspection tray.')
                          : (isItalian ? 'I liquidi possono rimanere chiusi all\'interno del tuo bagaglio a mano.' : 'Liquids can stay packed inside your cabin bag.')}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#E8F1F2]/40 dark:bg-zinc-800/40 space-y-1.5 shadow-2xs">
                      <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-[#5EAAA8]" />
                        {isItalian ? 'Farmaci e latte neonati' : 'Meds & infant food'}
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {isItalian 
                          ? 'Medicinali salvavita e cibo per infanti sono sempre ammessi oltre i 100ml necessari per il viaggio.' 
                          : 'Essential liquid medicines and infant milk are always exempt from 100ml limits.'}
                      </p>
                    </div>
                  </div>

                  {/* Suggest Edit Link */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleOpenSuggest('liquids')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] hover:text-[#5EAAA8] dark:hover:text-[#B3E5E0] font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isItalian ? 'Suggerisci modifica' : 'Suggest edit'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: BAGAGLI */}
              {activeModal === 'baggage' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Electronics Check Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/50 dark:bg-zinc-800/50 flex items-start gap-3.5 shadow-2xs">
                    <Zap className="w-5 h-5 text-[#05668D] dark:text-[#5EAAA8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                        {isItalian ? 'Laptop, Tablet e Dispositivi Elettronici' : 'Laptops, Tablets & Electronic Devices'}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {isItalian ? policy.electronicsNote_it : policy.electronicsNote_en}
                      </p>
                    </div>
                  </div>

                  {/* Standard Dimensions Cabin vs Hold */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/30 dark:bg-zinc-800/40 space-y-2 shadow-2xs">
                      <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-sm">
                        <Luggage className="w-4 h-4 text-[#05668D]" />
                        {isItalian ? 'Bagaglio a Mano (Cabina)' : 'Cabin Baggage'}
                      </span>
                      <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <li>• {isItalian ? 'Trolley standard:' : 'Standard trolley:'} 55 x 40 x 20-23 cm (8-10 kg)</li>
                        <li>• {isItalian ? 'Borsa/Zaino sotto il sedile:' : 'Small personal item:'} 40 x 30 x 15-20 cm</li>
                        <li>• {isItalian ? 'Vietati oggetti taglienti o forbici > 6cm' : 'Forbidden: blades or scissors > 6cm'}</li>
                      </ul>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/30 dark:bg-zinc-800/40 space-y-2 shadow-2xs">
                      <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-sm">
                        <Plane className="w-4 h-4 text-[#5EAAA8]" />
                        {isItalian ? 'Bagaglio da Stiva (Registrato)' : 'Checked Baggage (Hold)'}
                      </span>
                      <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <li className="text-red-600 dark:text-red-400 font-semibold">• {isItalian ? 'VIETATO in stiva: Powerbank & Batterie al litio' : 'FORBIDDEN in hold: Powerbanks & Lithium batteries'}</li>
                        <li className="text-red-600 dark:text-red-400 font-semibold">• {isItalian ? 'VIETATO in stiva: Sigarette elettroniche' : 'FORBIDDEN in hold: E-cigarettes'}</li>
                        <li>• {isItalian ? 'Ammessi liquidi > 100ml ben protetti' : 'Liquids > 100ml allowed in hold'}</li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Airlines in this Airport */}
                  {airport.airlines && airport.airlines.length > 0 && (
                    <div className="space-y-2.5 pt-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                          {isItalian ? 'Compagnie aeree e Terminal' : 'Airlines & Terminals'}
                        </h4>
                        <input
                          type="text"
                          value={airlineSearch}
                          onChange={(e) => setAirlineSearch(e.target.value)}
                          placeholder={isItalian ? 'Filtra compagnia...' : 'Filter airline...'}
                          className="px-3 py-1.5 text-xs rounded-xl border border-zinc-200/70 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 w-36 sm:w-48 shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#05668D]"
                        />
                      </div>
                      <div className="max-h-36 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                        {filteredAirlines.slice(0, 10).map((al, idx) => (
                          <div 
                            key={`${al.iataCode}-${idx}`}
                            className="p-2.5 rounded-xl bg-[#E8F1F2]/40 dark:bg-zinc-800/40 flex items-center justify-between shadow-2xs"
                          >
                            <span className="font-semibold text-zinc-900 dark:text-white truncate pr-2">
                              {al.airlineName}
                            </span>
                            <span className="font-mono font-bold text-[#05668D] dark:text-[#5EAAA8] shrink-0">
                              {al.terminal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggest Edit Link */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleOpenSuggest('baggage')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] hover:text-[#5EAAA8] dark:hover:text-[#B3E5E0] font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isItalian ? 'Suggerisci modifica' : 'Suggest edit'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: ALTRE REGOLE GENERALI */}
              {activeModal === 'general' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Drones Policy Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/30 dark:bg-zinc-800/40 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                        <Plane className="w-4 h-4 text-amber-600" />
                        {isItalian ? 'Regolamentazione Droni' : 'Drone Regulations'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold ${
                        policy.droneAllowedInCabin
                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                          : 'bg-red-500/15 text-red-800 dark:text-red-300'
                      }`}>
                        {policy.droneAllowedInCabin ? (isItalian ? 'Ammesso in cabina' : 'Cabin allowed') : (isItalian ? 'Non in cabina' : 'No cabin')}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {isItalian ? policy.dronePolicy_it : policy.dronePolicy_en}
                    </p>
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>{isItalian ? 'Le batterie del drone devono essere rimosse e trasportate in cabina.' : 'Drone batteries must be detached and carried in cabin.'}</span>
                    </div>
                  </div>

                  {/* Powerbanks & Lithium Batteries */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/30 dark:bg-zinc-800/40 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                        <BatteryCharging className="w-4 h-4 text-[#05668D]" />
                        {isItalian ? 'Powerbank e Batterie al Litio' : 'Powerbanks & Lithium Batteries'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#05668D]/10 text-[#05668D] dark:text-[#5EAAA8]">
                        Max {policy.maxPowerbankWh || 100} Wh
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {isItalian ? policy.powerbankPolicy_it : policy.powerbankPolicy_en}
                    </p>
                    <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      <span>{isItalian ? 'MAI nel bagaglio registrato in stiva: rischio di incendio a bordo.' : 'NEVER pack loose lithium batteries in checked luggage.'}</span>
                    </div>
                  </div>

                  {/* Duty Free & STEB Bags */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F1F2]/30 dark:bg-zinc-800/40 space-y-2 shadow-2xs">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#5EAAA8]" />
                      {isItalian ? 'Acquisti Duty Free e Buste Sigillate (STEB)' : 'Duty Free Purchases & STEB Security Bags'}
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {isItalian
                        ? 'I liquidi e profumi acquistati nei negozi oltre i controlli devono essere sigillati dal negoziante nella busta trasparente a prova di manomissione con scontrino ben visibile all\'interno, specialmente in caso di scalo.'
                        : 'Duty free liquids and perfumes bought airside must remain sealed inside tamper-evident STEB bags with receipt visible, especially on connecting flights.'}
                    </p>
                  </div>

                  {/* Suggest Edit Link */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleOpenSuggest('general')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] hover:text-[#5EAAA8] dark:hover:text-[#B3E5E0] font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isItalian ? 'Suggerisci modifica' : 'Suggest edit'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: MAPPA */}
              {activeModal === 'map' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="text-xs text-zinc-500">
                    {isItalian
                      ? 'Esplora i punti di interesse, varchi sicurezza, prese e fontanelle dei terminal.'
                      : 'Explore points of interest, security checkpoints, sockets and water refill stations.'}
                  </div>
                  {/* Interactive Terminal Map Tab */}
                  <div className="rounded-2xl overflow-hidden shadow-xs">
                    <TerminalMapTab airport={airport} />
                  </div>

                  {/* Suggest Edit Link */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleOpenSuggest('map')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] hover:text-[#5EAAA8] dark:hover:text-[#B3E5E0] font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isItalian ? 'Suggerisci modifica' : 'Suggest edit'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Close Bar */}
            <div className="p-3.5 sm:p-4 bg-[#E8F1F2]/40 dark:bg-zinc-850 flex items-center justify-between text-xs gap-3">
              {officialUrl ? (
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] hover:text-[#5EAAA8] dark:hover:text-[#B3E5E0] font-semibold truncate transition-colors"
                >
                  <span>{isItalian ? 'Consulta il sito ufficiale' : 'Visit official website'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ) : <div />}

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full sm:w-auto px-6 py-2 rounded-xl bg-[#05668D] hover:bg-[#5EAAA8] text-white font-bold transition-all cursor-pointer text-center text-xs ml-auto shadow-xs shrink-0"
              >
                {isItalian ? 'Chiudi' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Suggest Airport Edit Modal */}
      <SuggestAirportEditModal
        airport={airport}
        isOpen={isSuggestModalOpen}
        initialCategory={suggestCategory}
        onClose={() => setIsSuggestModalOpen(false)}
      />

    </div>
  );
}
