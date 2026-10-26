'use client';

import React from 'react';
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
  const isItalian = lang === 'it';

  return (
    <div className="w-full pt-4 sm:pt-8 pb-16 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 text-center">
        
        {/* Seamless, borderless animated sky horizon */}
        <div className="w-full h-20 sm:h-24 relative overflow-hidden pointer-events-none select-none">
          <AirplaneSkyAnimation />
        </div>

        {/* Hero Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#05668D] dark:text-white leading-[1.12]">
            {t('minimalHeroTitle')}
          </h1>
        </div>

        {/* Search Console Slot (Primary CTA) */}
        <div className="w-full max-w-2xl mx-auto pt-1">
          {children}
        </div>

        {/* Explanatory Caption below Search Bar */}
        <p className="text-sm sm:text-base font-normal text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {t('minimalHeroSubtitle')}
        </p>

        {/* Subtle, Minimalist Scope Indicators (No heavy boxes) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1F2]/80 dark:bg-zinc-900 border border-[#B3E5E0]/60 dark:border-zinc-800 font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#05668D]" />
            {isItalian ? 'Liquidi 100ml & Scanner 3D' : 'Liquids 100ml & 3D Scanners'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1F2]/80 dark:bg-zinc-900 border border-[#B3E5E0]/60 dark:border-zinc-800 font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EAAA8]" />
            {isItalian ? 'Bagaglio a mano & PC' : 'Cabin baggage & Laptops'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1F2]/80 dark:bg-zinc-900 border border-[#B3E5E0]/60 dark:border-zinc-800 font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4D35E]" />
            {isItalian ? 'Droni & Powerbank al litio' : 'Drones & Lithium powerbanks'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1F2]/80 dark:bg-zinc-900 border border-[#B3E5E0]/60 dark:border-zinc-800 font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#05668D]" />
            {isItalian ? 'Mappa varchi e terminal' : 'Terminal maps & gates'}
          </span>
        </div>

      </div>
    </div>
  );
}
