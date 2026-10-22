'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Gauge, 
  Zap, 
  Utensils, 
  Train, 
  ExternalLink,
  MapPin,
  CheckCircle2,
  Calendar,
  Compass,
  AlertTriangle,
  Edit3,
  Split
} from 'lucide-react';
import { Airport, PendingSuggestionNotice } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { SecurityTab } from './tabs/SecurityTab';
import { TerminalMapTab } from './tabs/TerminalMapTab';
import { TerminalsTab } from './tabs/TerminalsTab';
import { DifficultyTab } from './tabs/DifficultyTab';
import { AmenitiesTab } from './tabs/AmenitiesTab';
import { TransportTab } from './tabs/TransportTab';
import { SuggestAirportEditModal } from './SuggestAirportEditModal';
import { UnverifiedBadge } from './UnverifiedBadge';

interface AirportDetailProps {
  airport: Airport;
  onSelectAirport?: (iata: string) => void;
}

type TabType = 'security' | 'map' | 'terminals' | 'difficulty' | 'amenities' | 'transport';

export function AirportDetail({ airport, onSelectAirport }: AirportDetailProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('security');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pendingNotice, setPendingNotice] = useState<PendingSuggestionNotice | null>(null);
  const [selectedSecurityTerminalIdx, setSelectedSecurityTerminalIdx] = useState<number | null>(null);

  useEffect(() => {
    setSelectedSecurityTerminalIdx(null);
  }, [airport.iata]);

  const fetchPendingNotice = useCallback(async () => {
    try {
      const res = await fetch(`/api/airports/suggest?iata=${airport.iata}`);
      const data = await res.json();
      if (data.hasPending && data.pendingNotice) {
        setPendingNotice(data.pendingNotice);
      } else {
        setPendingNotice(null);
      }
    } catch {
      // ignore
    }
  }, [airport.iata]);

  useEffect(() => {
    fetchPendingNotice();
  }, [fetchPendingNotice]);

  const tabListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (tabListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleTabClick = (tabId: TabType, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tabId);
    if (tabListRef.current) {
      const container = tabListRef.current;
      const button = event.currentTarget;
      const targetScroll = button.offsetLeft - container.offsetLeft - 12;
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  };

  const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { 
      id: 'security', 
      label: t('tabSecurity'), 
      shortLabel: lang === 'it' ? 'Sicurezza' : 'Security',
      icon: <ShieldCheck className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'map', 
      label: t('tabMap'), 
      shortLabel: lang === 'it' ? 'Mappa & Cibo' : 'Map & Dining',
      icon: <Compass className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'terminals', 
      label: t('tabTerminals'), 
      shortLabel: lang === 'it' ? 'Terminal' : 'Terminals',
      icon: <Layers className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'difficulty', 
      label: t('tabDifficulty'), 
      shortLabel: lang === 'it' ? 'Tempi & Info' : 'Wait Times',
      icon: <Gauge className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'amenities', 
      label: t('tabAmenities'), 
      shortLabel: lang === 'it' ? 'Prese & Servizi' : 'Power & Water',
      icon: <Zap className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'transport', 
      label: t('tabTransport'), 
      shortLabel: lang === 'it' ? 'Trasporti' : 'Transport',
      icon: <Train className="w-3.5 h-3.5" /> 
    }
  ];

  const has3D = airport.securityPolicy.has3DScanners;
  const terminalRules = airport.securityPolicy.terminalRules;
  const hasMultipleTerminals = Boolean(terminalRules && terminalRules.length > 1);
  const hasMixedTerminals = Boolean(
    terminalRules &&
    terminalRules.length > 1 &&
    terminalRules.some((r) => r.has3DScanners) &&
    terminalRules.some((r) => !r.has3DScanners)
  );

  const handleSelectTerminalFromHeader = (idx: number) => {
    setSelectedSecurityTerminalIdx(idx);
    setActiveTab('security');
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      {/* Master Dossier Top Identity Header */}
      <div className="p-5 sm:p-7 bg-zinc-50/60 dark:bg-zinc-900/40 space-y-5 border-b border-zinc-200/80 dark:border-zinc-800">
        {/* Top Identification Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono font-bold text-sm tracking-wider shadow-xs">
                {airport.iata}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] font-semibold border border-zinc-200/60 dark:border-zinc-700/60">
                {airport.icao}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {lang === 'it' ? airport.city_it : airport.city_en}, {lang === 'it' ? airport.country_it : airport.country_en}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {lang === 'it' ? airport.name_it : airport.name_en}
            </h2>
          </div>

          {/* Quick Authority Link & Verification Timestamp */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors font-medium text-[11px] cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'it' ? 'Suggerisci modifica' : 'Suggest edit'}</span>
              </button>

              <a
                href={airport.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors font-medium text-[11px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono">{new URL(airport.officialWebsite).hostname.replace('www.', '')}</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </div>

            <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500 text-[11px] font-mono">
              <Calendar className="w-3 h-3" />
              <span>{t('verifiedDate')}: {airport.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Pending Traveler Suggestion Notice (collapsible info banner) */}
        {pendingNotice && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <UnverifiedBadge 
                note_it={pendingNotice.note_it} 
                note_en={pendingNotice.note_en} 
              />
              <div className="leading-snug">
                <span className="font-bold text-amber-950 dark:text-amber-100">
                  {lang === 'it' ? 'Segnalazione viaggiatori in corso di verifica:' : 'Traveler report pending verification:'}
                </span>{' '}
                <span className="text-zinc-700 dark:text-zinc-300">
                  {lang === 'it' 
                    ? 'possibili modifiche imminenti alle informazioni (in attesa di riscontro ufficiale sul portale dell\'aeroporto).'
                    : 'possible imminent updates to information (awaiting official confirmation on airport portal).'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="shrink-0 text-[11px] font-semibold text-amber-800 dark:text-amber-300 hover:underline cursor-pointer"
            >
              {lang === 'it' ? 'Aggiungi dettagli →' : 'Add details →'}
            </button>
          </div>
        )}

        {/* Primary Scanner Regulation Verdict Card */}
        {hasMixedTerminals ? (
          <div className="p-4 sm:p-5 rounded-xl border border-blue-500/30 dark:border-blue-400/30 bg-blue-500/5 dark:bg-blue-950/20 space-y-3.5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Split className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-500/15 text-blue-800 dark:text-blue-200 border border-blue-500/30">
                      {t('rulesVaryByTerminal')}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      {t('checkBoardingPassNotice')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white mt-0.5 leading-snug">
                    {t('rulesVarySubtitle')}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800 sm:pl-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block">{lang === 'it' ? 'Attesa Controlli' : 'Security Queue'}</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">~{airport.averageSecurityWaitMin} min</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block">{lang === 'it' ? 'Complessità' : 'Complexity'}</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">{airport.difficultyRating}/5</span>
                </div>
              </div>
            </div>

            {/* Clear Side-by-Side Terminal Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {terminalRules?.map((rule, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectTerminalFromHeader(idx)}
                  className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-2 transition-all cursor-pointer hover:shadow-xs group ${
                    rule.has3DScanners
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500/30 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/40 dark:border-emerald-700/40'
                      : 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/30 dark:bg-amber-950/30 dark:hover:bg-amber-950/40 dark:border-amber-700/40'
                  }`}
                  title={lang === 'it' ? 'Clicca per dettagli di questo terminal' : 'Click for this terminal details'}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white group-hover:underline">
                      {rule.terminalName}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      rule.has3DScanners
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950'
                        : 'bg-amber-600 text-white dark:bg-amber-500 dark:text-zinc-950'
                    }`}>
                      {rule.has3DScanners 
                        ? (lang === 'it' ? 'Scanner 3D C3' : '3D C3 Scanner') 
                        : (lang === 'it' ? 'Standard 100ml' : 'Standard 100ml')}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] leading-snug">
                    <div className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${rule.has3DScanners ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span>
                        {rule.has3DScanners 
                          ? (lang === 'it' ? 'Liquidi e laptop restano nel bagaglio' : 'Liquids and laptops stay inside bag')
                          : (lang === 'it' ? 'Liquidi estratti in busta 1L (max 100ml cad.)' : 'Liquids unpacked in 1L bag (max 100ml each)')}
                      </span>
                    </div>
                    {!rule.has3DScanners && (
                      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 pl-3">
                        <span>{lang === 'it' ? '• Laptop ed elettronica estratti nelle vaschette' : '• Laptops and tablets removed into trays'}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-1 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center justify-end">
                    <span>{lang === 'it' ? 'Apri scheda sicurezza →' : 'Open security tab →'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
            has3D
              ? 'bg-emerald-500/5 border-emerald-500/25 dark:bg-emerald-950/20 dark:border-emerald-800/40'
              : 'bg-amber-500/5 border-amber-500/25 dark:bg-amber-950/20 dark:border-amber-800/40'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                has3D
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}>
                {has3D ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                    has3D
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                  }`}>
                    {has3D ? (lang === 'it' ? 'Scanner 3D EDSCB Attivo' : '3D EDSCB Scanners Active') : (lang === 'it' ? 'Regolamento Standard 100ml' : 'Standard 100ml Rule')}
                  </span>
                  {hasMultipleTerminals && (
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      ({lang === 'it' ? 'Valido per tutti i terminal' : 'Valid for all terminals'})
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 leading-snug">
                  {has3D
                    ? (lang === 'it' ? 'I liquidi e i dispositivi elettronici possono restare all\'interno del bagaglio a mano.' : 'Liquids and laptops can remain inside carry-on luggage.')
                    : (lang === 'it' ? 'I liquidi devono essere in flaconi da max 100ml in busta trasparente da 1L ed estratti al controllo.' : 'Liquids must be in max 100ml containers in a 1L clear plastic bag and removed.')}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800 sm:pl-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">{lang === 'it' ? 'Attesa Controlli' : 'Security Queue'}</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">~{airport.averageSecurityWaitMin} min</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">{lang === 'it' ? 'Complessità' : 'Complexity'}</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">{airport.difficultyRating}/5</span>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Airport City Switcher Banner */}
        {airport.otherCityAirports && airport.otherCityAirports.length > 0 && (
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{t('cityMultiAirport')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {airport.otherCityAirports.map((other) => (
                <button
                  key={other.iata}
                  type="button"
                  onClick={() => onSelectAirport?.(other.iata)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700 shadow-2xs group"
                >
                  <span className="px-1.5 py-0.5 rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-mono font-bold group-hover:bg-blue-600 transition-colors">
                    {other.iata}
                  </span>
                  <span>{lang === 'it' ? other.name_it : other.name_en}</span>
                  {other.distanceInfo && (
                    <span className="text-[10px] text-zinc-400 font-mono">
                      • {other.distanceInfo}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Integrated Sticky Tabs Bar (stuck to top on scroll with Airport Anchor) */}
      <div className="sticky top-15 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md py-2.5 px-3 sm:px-6 border-b border-zinc-200/80 dark:border-zinc-800 transition-colors shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Airport Anchor Badge: ensures passenger always knows which airport they are viewing */}
          <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-zinc-200 dark:border-zinc-800">
            <span className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono font-bold text-xs shadow-xs">
              {airport.iata}
            </span>
            <span className="hidden md:inline text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[140px]">
              {lang === 'it' ? airport.city_it : airport.city_en}
            </span>
          </div>

          <div className="relative flex-1 min-w-0">
            {/* Left scroll fade indicator for mobile/tablet */}
            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 transition-opacity duration-200 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Horizontal Scrollable Tabs Track */}
            <div
              ref={tabListRef}
              onScroll={checkScroll}
              className="flex items-center gap-2 overflow-x-auto py-0.5 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={(e) => handleTabClick(tab.id, e)}
                    className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-semibold shrink-0 snap-center transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm border border-zinc-900 dark:border-white font-bold ring-2 ring-zinc-900/10 dark:ring-white/20'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-zinc-700/60 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <span className={`shrink-0 ${isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline tracking-tight">{tab.label}</span>
                    <span className="sm:hidden tracking-tight font-bold">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Right scroll fade indicator for mobile/tablet */}
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 transition-opacity duration-200 ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Active Tab Content Area (Inside the same master frame!) */}
      <div className="p-4 sm:p-7 bg-white dark:bg-zinc-900 min-h-[480px] animate-in fade-in-50 duration-150">
        {activeTab === 'security' && (
          <SecurityTab 
            airport={airport} 
            selectedTerminalIdx={selectedSecurityTerminalIdx}
            onSelectTerminalIdx={setSelectedSecurityTerminalIdx}
          />
        )}
        {activeTab === 'map' && <TerminalMapTab airport={airport} />}
        {activeTab === 'terminals' && <TerminalsTab airport={airport} />}
        {activeTab === 'difficulty' && <DifficultyTab airport={airport} />}
        {activeTab === 'amenities' && <AmenitiesTab airport={airport} />}
        {activeTab === 'transport' && <TransportTab airport={airport} />}
      </div>

      {/* Floating Action Bubble: Suggerisci Modifica (Always visible on scroll) */}
      <aside
        aria-label={lang === 'it' ? 'Suggerisci modifica aeroporto' : 'Suggest airport edit'}
        className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-zinc-700/60 dark:border-zinc-300 cursor-pointer group"
          title={lang === 'it' ? `Suggerisci una modifica per ${airport.name_it}` : `Suggest an edit for ${airport.name_en}`}
        >
          <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-600 flex items-center justify-center shrink-0">
            <Edit3 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-bold tracking-tight">
            {lang === 'it' ? 'Suggerisci modifica' : 'Suggest edit'}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 dark:bg-zinc-100 dark:text-zinc-800 font-mono text-[10px] font-bold">
            {airport.iata}
          </span>
        </button>
      </aside>

      {/* Suggest Airport Edit Modal */}
      <SuggestAirportEditModal
        airport={airport}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuggestionSubmitted={fetchPendingNotice}
      />
    </div>
  );
}
