'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ChevronDown,
  Plane,
  X
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CountryFlag } from '@/components/CountryFlag';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportPath } from '@/lib/airport-slug';
import type { Airport, Language } from '@/types/airport';

type FilterCategory = 'all' | '3d_active' | 'standard' | 'italy' | 'international';

interface ScannersHubClientProps {
  airports: Airport[];
  lang: Language;
}

function ScannersHubContent({ airports, lang }: ScannersHubClientProps) {
  const { t } = useLanguage();
  const isItalian = lang === 'it';
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterCategory>('all');

  // Filter airports dynamically
  const filteredAirports = useMemo(() => {
    return airports.filter((airport) => {
      const has3D = Boolean(airport.securityPolicy?.has3DScanners);
      const isItaly = airport.countryCode?.toUpperCase() === 'IT';

      // Category filter
      if (filter === '3d_active' && !has3D) return false;
      if (filter === 'standard' && has3D) return false;
      if (filter === 'italy' && !isItaly) return false;
      if (filter === 'international' && isItaly) return false;

      // Text search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const name = (isItalian ? airport.name_it : airport.name_en).toLowerCase();
      const city = (isItalian ? airport.city_it : airport.city_en).toLowerCase();
      const iata = airport.iata.toLowerCase();

      return name.includes(q) || city.includes(q) || iata.includes(q);
    });
  }, [airports, filter, searchQuery, isItalian]);

  // Key metrics
  const c3Count = airports.filter((a) => a.securityPolicy?.has3DScanners).length;
  const standardCount = airports.length - c3Count;

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#05668D] selection:text-white">
      <Header />

      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-16 max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href={isItalian ? '/' : '/en'} className="hover:text-[#05668D] dark:hover:text-white transition-colors">
                AeroInfo
              </Link>
            </li>
            <span>/</span>
            <li aria-current="page" className="text-zinc-700 dark:text-zinc-200 font-semibold">
              {isItalian ? 'Scanner 3D Aeroporti' : '3D Airport Scanners'}
            </li>
          </ol>
        </nav>

        {/* Hero Header Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] text-xs font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
            <span>{isItalian ? 'OSSERVATORIO SICUREZZA 2026' : 'AIRPORT SECURITY MONITOR 2026'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            {isItalian 
              ? 'Scanner 3D negli Aeroporti: Dove Sono Attivi e Regole sui Liquidi' 
              : 'Airports with 3D Scanners: Active Locations & Liquids Rules'}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {isItalian 
              ? 'Gli scanner tomografici volumetrici EDS-CB C3 permettono ai viaggiatori di non estrarre liquidi e computer portatili dal bagaglio a mano durante i controlli. Consulta la mappa aggiornata degli scali dotati di scanner 3D e verifica le regole applicate prima della partenza.'
              : 'Next-generation EDS-CB C3 computed tomography scanners allow passengers to leave liquids and laptops inside carry-on luggage. Browse our verified directory of airports operating 3D scanners versus standard 100ml checkpoints.'}
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 block uppercase">
                {isItalian ? 'Scali Censiti' : 'Airports Tracked'}
              </span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">{airports.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block uppercase font-bold">
                {isItalian ? 'Scanner 3D C3' : '3D C3 Scanners'}
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{c3Count}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block uppercase">
                {isItalian ? 'Standard 100ml' : 'Standard 100ml'}
              </span>
              <span className="text-2xl font-black text-zinc-700 dark:text-zinc-300">{standardCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-[#05668D] dark:text-[#5EAAA8] block uppercase font-bold">
                {isItalian ? 'Tempo ai Varchi C3' : 'C3 Wait Time'}
              </span>
              <span className="text-2xl font-black text-[#05668D] dark:text-[#5EAAA8]">~8-12m</span>
            </div>
          </div>
        </section>

        {/* Warning Banner: Il Paradosso del Volo di Ritorno */}
        <section className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-900 dark:text-amber-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{isItalian ? 'Avvertenza fondamentale: il paradosso del volo di ritorno' : 'Crucial Warning: The Return Flight Trap'}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90">
            {isItalian ? (
              <>
                Se parti da un aeroporto con scanner 3D (come Milano Linate o Roma Fiumicino) dove è consentito non estrarre liquidi, ricorda che <strong>al volo di ritorno o in caso di scalo di transito</strong> in un aeroporto con controlli tradizionali (come Napoli, Palermo, Parigi Beauvais, ecc.) si applicherà tassativamente la regola classica dei 100 ml con busta trasparente da 1 litro. I liquidi superiori a 100 ml ti verranno sequestrati. Prepara sempre il bagaglio tenendo conto dell&apos;aeroporto con le regole più restrittive del tuo itinerario.
              </>
            ) : (
              <>
                If departing from an airport equipped with 3D scanners (like Milan Linate or Rome Fiumicino) where you can keep liquids in your luggage, remember that on <strong>your return flight or transit stop</strong> through an airport with conventional checkpoints (such as Naples, Palermo, or Paris Beauvais), standard 100ml clear-bag rules strictly apply. Containers over 100ml will be confiscated. Always pack for the strictest checkpoint on your entire journey.
              </>
            )}
          </p>
        </section>

        {/* Interactive Search & Filter Toolbar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isItalian ? 'Cerca per città, aeroporto o codice IATA (es. Malpensa, FCO, Londra)...' : 'Search by city, airport name or IATA code (e.g. FCO, Malpensa, London)...'}
                className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#05668D] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                  filter === 'all'
                    ? 'bg-[#05668D] text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {isItalian ? 'Tutti' : 'All'} ({airports.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('3d_active')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                  filter === '3d_active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                {isItalian ? 'Scanner 3D Attivi' : '3D Scanners'} ({c3Count})
              </button>
              <button
                type="button"
                onClick={() => setFilter('standard')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                  filter === 'standard'
                    ? 'bg-zinc-700 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {isItalian ? 'Standard 100ml' : 'Standard 100ml'} ({standardCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('italy')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                  filter === 'italy'
                    ? 'bg-[#05668D] text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {isItalian ? 'Italia' : 'Italy'}
              </button>
              <button
                type="button"
                onClick={() => setFilter('international')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                  filter === 'international'
                    ? 'bg-[#05668D] text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {isItalian ? 'Estero' : 'International'}
              </button>
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            {isItalian 
              ? `Visualizzati ${filteredAirports.length} aeroporti su ${airports.length}` 
              : `Showing ${filteredAirports.length} of ${airports.length} airports`}
          </div>
        </section>

        {/* Airport Cards Directory Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAirports.map((airport) => {
            const has3D = Boolean(airport.securityPolicy?.has3DScanners);
            const name = isItalian ? airport.name_it : airport.name_en;
            const city = isItalian ? airport.city_it : airport.city_en;
            const country = isItalian ? airport.country_it : airport.country_en;
            const path = airportPath(airport, lang);
            const note = isItalian
              ? (airport.securityPolicy?.scannersNote_it || airport.securityPolicy?.liquidsAllowance_it || '')
              : (airport.securityPolicy?.scannersNote_en || airport.securityPolicy?.liquidsAllowance_en || '');

            return (
              <article
                key={airport.id || airport.iata}
                className="p-5 rounded-3xl bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Status Tag & IATA Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[#05668D] text-white">
                      {airport.iata}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full ${
                        has3D
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {has3D 
                        ? (isItalian ? 'Scanner 3D C3' : '3D C3 Scanners') 
                        : (isItalian ? 'Standard 100 ml' : 'Standard 100ml')}
                    </span>
                  </div>

                  {/* Airport Name & City */}
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors flex items-center gap-2">
                      <Link href={path} className="focus:outline-none">
                        {name}
                      </Link>
                      {airport.countryCode && (
                        <CountryFlag countryCode={airport.countryCode} countryName={country} />
                      )}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {city}, {country}
                    </p>
                  </div>

                  {/* Rule summary description */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {note}
                  </p>
                </div>

                {/* Footer action link */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-zinc-400">
                    {has3D 
                      ? (isItalian ? 'Liquidi & PC nel bagaglio' : 'Liquids & PC in bag') 
                      : (isItalian ? 'Estrazione obbligatoria' : 'Extraction required')}
                  </span>
                  <Link
                    href={path}
                    className="inline-flex items-center gap-1 font-bold text-[#05668D] dark:text-[#5EAAA8] group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>{isItalian ? 'Dossier' : 'Profile'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {filteredAirports.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl shadow-xs space-y-2">
            <Plane className="w-8 h-8 text-zinc-300 mx-auto" />
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {isItalian ? 'Nessun aeroporto corrisponde ai criteri di ricerca' : 'No airports match your search criteria'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="text-xs text-[#05668D] dark:text-[#5EAAA8] font-bold hover:underline"
            >
              {isItalian ? 'Reimposta filtri' : 'Reset filters'}
            </button>
          </div>
        )}

        {/* 100% Borderless FAQ Accordion Section */}
        <section className="space-y-4 pt-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {isItalian ? 'Domande Frequenti' : 'Frequently Asked Questions'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {isItalian ? 'Tutto ciò che devi sapere sugli scanner 3D' : 'Everything You Need to Know About 3D Scanners'}
            </h2>
          </div>

          <div className="space-y-3">
            <details className="group rounded-3xl bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                <span>{isItalian ? 'Cosa sono gli scanner tomografici 3D EDS-CB C3?' : 'What are EDS-CB C3 3D scanners in airports?'}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform group-open:rotate-180 shrink-0" />
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2">
                <p>
                  {isItalian
                    ? 'Gli scanner EDS-CB C3 (Explosive Detection System for Cabin Baggage) utilizzano la tomografia computerizzata volumetrica ad altissima risoluzione per analizzare il contenuto dei bagagli a mano. A differenza dei macchinari radiogeni 2D tradizionali, creano un modello tridimensionale navigabile che identifica con estrema precisione liquidi infiammabili ed esplosivi solidi.'
                    : 'EDS-CB C3 scanners use high-resolution computed tomography to inspect carry-on baggage. Unlike conventional 2D X-ray systems, they generate a 3D volumetric model that precisely detects flammable liquids and explosive compounds without requiring unpacking.'}
                </p>
              </div>
            </details>

            <details className="group rounded-3xl bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                <span>{isItalian ? 'La presenza di scanner 3D elimina sempre il limite dei 100 ml?' : 'Does having 3D scanners remove the 100ml limit at all airports?'}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform group-open:rotate-180 shrink-0" />
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2">
                <p>
                  {isItalian
                    ? 'No. Anche se gli scanner C3 sono tecnicamente in grado di scansionare volumi maggiori (fino a 2 litri), nell\'Unione Europea e in Italia la Commissione Europea ha stabilito temporaneamente il ripristino del limite di 100 ml per contenitore in molti scali. Il vantaggio immediato e permanente resta comunque quello di non dover estrarre i liquidi e i computer dal bagaglio a mano.'
                    : 'No. While C3 scanners can technically handle larger volumes, regulatory standardizations across Europe temporarily maintain the 100ml container rule at many hubs. The immediate and permanent benefit for passengers is keeping liquids and laptops securely inside baggage.'}
                </p>
              </div>
            </details>

            <details className="group rounded-3xl bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                <span>{isItalian ? 'Devo togliere computer e tablet dallo zaino con gli scanner 3D?' : 'Do I need to unpack laptops and tablets with 3D scanners?'}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform group-open:rotate-180 shrink-0" />
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2">
                <p>
                  {isItalian
                    ? 'No. Nei varchi di sicurezza dove sono attivi gli scanner 3D, computer portatili, tablet, reflex e caricatori possono rimanere riposti all\'interno del bagaglio a mano, riducendo drasticamente i tempi di attesa e il disordine ai rulli.'
                    : 'No. At security checkpoints equipped with active 3D scanners, laptops, tablets, cameras, and chargers can stay inside your cabin bag, drastically reducing queue times and tray handling.'}
                </p>
              </div>
            </details>

            <details className="group rounded-3xl bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                <span>{isItalian ? 'Cosa succede se faccio scalo in un aeroporto senza scanner 3D?' : 'What happens during a transfer at an airport without 3D scanners?'}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform group-open:rotate-180 shrink-0" />
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2">
                <p>
                  {isItalian
                    ? 'Se il tuo volo prevede uno scalo con passaggio ai controlli di sicurezza (particolarmente frequente per i transiti extra-Schengen o tra compagnie diverse), il controllo successivo applicherà le proprie regole locali. Se il secondo aeroporto non dispone di scanner 3D, qualsiasi contenitore superiore a 100 ml verrà confiscato.'
                    : 'If your flight involves a connection requiring a security rescreening, that airport will apply its own local screening technology. If the transfer airport lacks 3D scanners, any liquid container over 100ml will be confiscated immediately.'}
                </p>
              </div>
            </details>
          </div>
        </section>

      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}

export function ScannersHubClient(props: ScannersHubClientProps) {
  return (
    <LanguageProvider initialLang={props.lang}>
      <ScannersHubContent {...props} />
    </LanguageProvider>
  );
}
