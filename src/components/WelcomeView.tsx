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
    <div className="w-full pt-2 sm:pt-4 pb-12 sm:pb-16 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 text-center">
        
        {/* Riquadro Riservato All'Animazione - Senza bordi, sfondo aerodinamico sfumato */}
        <div className="w-full max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#E8F1F2]/80 via-[#E8F1F2]/30 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/30 dark:to-transparent p-2 sm:p-3 relative overflow-hidden">
          <div className="w-full h-22 sm:h-28 relative">
            <AirplaneSkyAnimation />
          </div>
        </div>

        {/* Hero Title (Strictly below the animation area) */}
        <div className="text-center space-y-2 pt-1">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#05668D] dark:text-white leading-[1.12]">
            {t('minimalHeroTitle')}
          </h1>
        </div>

        {/* Search Console Slot */}
        <div className="w-full max-w-2xl mx-auto pt-1">
          {children}
        </div>

        {/* Explanatory Caption below Search Bar with capital "Il" */}
        <p className="text-center text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {t('minimalHeroSubtitle')}
        </p>

        {/* 3 Step Cards - Pulite, con numeri al centro, senza icone e SENZA BORDI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto pt-2 w-full">
          
          {/* Fase 1 */}
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group">
            {/* Numero fase centrato */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#05668D] group-hover:text-white transition-all">
                1
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#05668D] dark:text-white transition-colors">
                {t('step1')}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>
          </div>

          {/* Fase 2 */}
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group">
            {/* Numero fase centrato */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#05668D] group-hover:text-white transition-all">
                2
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#05668D] dark:text-white transition-colors">
                {t('step2')}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>
          </div>

          {/* Fase 3 */}
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group">
            {/* Numero fase centrato con accento gold */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-amber-50 dark:bg-zinc-800 text-amber-700 dark:text-[#F4D35E] font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#F4D35E] group-hover:text-zinc-900 transition-all">
                3
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#05668D] dark:text-white transition-colors">
                {t('step3')}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
