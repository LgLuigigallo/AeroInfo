'use client';

import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Compass, 
  Zap, 
  Layers, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Plane
} from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';

interface WelcomeViewProps {
  airports: Airport[];
  onSelectAirport: (airport: Airport) => void;
  children?: React.ReactNode; // Slot for SearchBar
}

export function WelcomeView({ airports, onSelectAirport, children }: WelcomeViewProps) {
  const { lang, t } = useLanguage();

  // Curated prominent hubs for instant 1-click access
  const quickHubCodes = ['FCO', 'MXP', 'LIN', 'BGY', 'NAP', 'CTA', 'CDG', 'LHR', 'JFK', 'DXB'];
  const quickHubs = quickHubCodes
    .map((code) => airports.find((a) => a.iata.toUpperCase() === code))
    .filter((a): a is Airport => Boolean(a));

  // Featured showcase airports (Top destinations)
  const showcaseCodes = ['FCO', 'MXP', 'LIN', 'BGY', 'LHR', 'JFK'];
  const showcaseAirports = showcaseCodes
    .map((code) => airports.find((a) => a.iata.toUpperCase() === code))
    .filter((a): a is Airport => Boolean(a));

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="text-center space-y-5 pt-4 sm:pt-8 max-w-3xl mx-auto">
        {/* Verification Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wide uppercase font-semibold">
            {lang === 'it' ? 'Database Ufficiale Certificato • Aggiornamento Continuo 24h' : 'Official Certified Database • 24h Continuous Sync'}
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
            {t('welcomeTitle')}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Search Console Container */}
        <div className="pt-2 max-w-2xl mx-auto">
          {children}
        </div>

        {/* Quick Hubs Pill Strip */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t('quickHubsTitle')}
          </span>
          {quickHubs.map((hub) => (
            <button
              key={hub.iata}
              type="button"
              onClick={() => onSelectAirport(hub)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs group"
            >
              <span className="font-mono font-bold text-xs text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {hub.iata}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {lang === 'it' ? hub.city_it : hub.city_en}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4 Core Intelligence Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: 3D Scanners */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
              {t('pillarSecurityTitle')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('pillarSecurityDesc')}
            </p>
          </div>
          <div className="pt-2 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
            {lang === 'it' ? 'Verifica Terminal per Terminal' : 'Terminal-Specific Checks'}
          </div>
        </div>

        {/* Pillar 2: Interactive Maps & Outlets */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
              {t('pillarMapTitle')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('pillarMapDesc')}
            </p>
          </div>
          <div className="pt-2 text-[10px] font-mono text-blue-700 dark:text-blue-400 font-semibold uppercase">
            {lang === 'it' ? 'Prese AC/USB • Fontanelle' : 'AC/USB Outlets • Water Refill'}
          </div>
        </div>

        {/* Pillar 3: Terminals & Airlines */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
              {t('pillarTerminalsTitle')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('pillarTerminalsDesc')}
            </p>
          </div>
          <div className="pt-2 text-[10px] font-mono text-purple-700 dark:text-purple-400 font-semibold uppercase">
            {lang === 'it' ? 'Directory Compagnie & Navette' : 'Airlines Directory & Transfers'}
          </div>
        </div>

        {/* Pillar 4: Wait Times & Arrival */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
              {t('pillarTimesTitle')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('pillarTimesDesc')}
            </p>
          </div>
          <div className="pt-2 text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold uppercase">
            {lang === 'it' ? 'Stima Code • Ore Anticipo' : 'Queue Estimates • Arrival Time'}
          </div>
        </div>
      </section>

      {/* Featured Verified Airports Showcase */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {t('featuredAirportsTitle')}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {lang === 'it' ? 'Dossier completi verificati con regolamento liquidi e terminal aggiornati' : 'Full certified airport profiles with verified liquid allowances'}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Plane className="w-3.5 h-3.5 text-zinc-400" />
            <span>{airports.length} {lang === 'it' ? 'aeroporti censiti' : 'indexed airports'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseAirports.map((airport) => {
            const rules = airport.securityPolicy.terminalRules;
            const hasMixed = rules && rules.length > 1 && rules.some(r => r.has3DScanners) && rules.some(r => !r.has3DScanners);
            const has3D = airport.securityPolicy.has3DScanners;

            return (
              <div
                key={airport.iata}
                onClick={() => onSelectAirport(airport)}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono font-bold text-sm tracking-wider">
                        {airport.iata}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        {lang === 'it' ? airport.city_it : airport.city_en}, {lang === 'it' ? airport.country_it : airport.country_en}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      hasMixed
                        ? 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/20'
                        : has3D
                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20'
                    }`}>
                      {hasMixed 
                        ? (lang === 'it' ? '3D / 100ml per Terminal' : '3D / 100ml by Terminal')
                        : has3D 
                          ? (lang === 'it' ? 'Scanner 3D Attivo' : '3D Active')
                          : (lang === 'it' ? 'Standard 100ml' : '100ml Standard')}
                    </span>
                  </div>

                  <h3 className="font-bold text-zinc-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lang === 'it' ? airport.name_it : airport.name_en}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {lang === 'it' ? airport.navigationAdvice_it : airport.navigationAdvice_en}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span>~{airport.averageSecurityWaitMin}m {lang === 'it' ? 'coda' : 'queue'}</span>
                    <span>•</span>
                    <span>{airport.difficultyRating}/5 {lang === 'it' ? 'difficoltà' : 'complexity'}</span>
                  </div>

                  <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 text-xs">
                    <span>{lang === 'it' ? 'Apri dossier' : 'Open dossier'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
