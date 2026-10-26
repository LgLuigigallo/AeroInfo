'use client';

import React from 'react';
import { Search, Compass, CheckCircle2, Plane, Sparkles, ShieldCheck } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { AirplaneSkyAnimation } from './AirplaneSkyAnimation';

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

  return (
    <div className="relative w-full pt-4 sm:pt-8 pb-12 sm:pb-16 flex flex-col items-center">
      {/* Background Stylized Airplane Flight Animation */}
      <AirplaneSkyAnimation />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-2 sm:px-4 space-y-6 sm:space-y-8">
        
        {/* Verification Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-[#B3E5E0] dark:border-zinc-800 text-[11px] font-mono text-[#05668D] dark:text-[#5EAAA8] shadow-2xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wide">
            {lang === 'it' ? 'Fonti Ufficiali Verificate • Aggiornato 2026' : 'Verified Official Sources • 2026 Updates'}
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#05668D] dark:text-white leading-[1.12]">
            {t('minimalHeroTitle')}
          </h1>
        </div>

        {/* Search Console Slot */}
        <div className="w-full max-w-2xl mx-auto pt-1">
          {children}
        </div>

        {/* Explanatory Caption below Search Bar */}
        <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {t('minimalHeroSubtitle')}
        </p>

        {/* 3 Step Cards / Pills as in user's mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2">
          {/* Step 1 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border-2 border-[#05668D]/20 dark:border-zinc-800 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#5EAAA8] transition-all group">
            <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
              {t('step1')}
            </span>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border-2 border-[#05668D]/20 dark:border-zinc-800 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#5EAAA8] transition-all group">
            <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
              {t('step2')}
            </span>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border-2 border-[#05668D]/20 dark:border-zinc-800 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#F4D35E] transition-all group">
            <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#F4D35E] transition-colors">
              {t('step3')}
            </span>
          </div>
        </div>

        {/* Quick Hubs Pill Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F4D35E]" />
            {t('popularHubs')}:
          </span>
          {quickHubs.map((hub) => (
            <button
              key={hub.iata}
              type="button"
              onClick={() => onSelectAirport(hub)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 hover:bg-[#E8F1F2] dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 hover:border-[#5EAAA8] text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs group"
            >
              <span className="font-mono font-bold text-xs text-[#05668D] dark:text-[#5EAAA8]">
                {hub.iata}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {lang === 'it' ? hub.city_it : hub.city_en}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
