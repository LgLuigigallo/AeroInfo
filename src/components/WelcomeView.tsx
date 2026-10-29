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
    <div className="w-full pt-1 sm:pt-3 pb-12 sm:pb-16 flex flex-col items-center">
      
      {/* 1. Full-Width Flight Horizon with Feathered Edges & Transparent Background */}
      <div 
        className="w-full relative overflow-hidden pointer-events-none select-none bg-transparent"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <div className="w-full h-24 sm:h-28 md:h-32 lg:h-36 relative">
          <AirplaneSkyAnimation />
        </div>
      </div>

      {/* 2. Full-Width Hero Title (Two clean lines for maximum readability & aesthetic balance) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center pt-1 sm:pt-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight text-[#05668D] dark:text-white leading-[1.12] text-balance">
          <span className="block">{t('minimalHeroTitleLine1')}</span>
          <span className="block text-[#05668D] dark:text-zinc-100">{t('minimalHeroTitleLine2')}</span>
        </h1>
      </div>

      {/* 3. Search Console Slot (Ergonomic centered width) */}
      <div className="w-full max-w-2xl mx-auto pt-3 sm:pt-4 px-4">
        {children}
      </div>

      {/* 4. Explanatory Caption below Search Bar with capital "Il" */}
      <h2 className="text-center text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed pt-2 px-4 text-balance">
        {t('minimalHeroSubtitle')}
      </h2>

      {/* 5. 3 Step Cards - Strutturate, con numeri al centro, armonia di palette */}
      <div className="w-full max-w-4xl mx-auto pt-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          
          {/* Fase 1 */}
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-[#B3E5E0]/40 dark:border-zinc-800 hover:border-[#5EAAA8]/60 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
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
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-[#B3E5E0]/40 dark:border-zinc-800 hover:border-[#5EAAA8]/60 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#5EAAA8] font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#5EAAA8] group-hover:text-white transition-all">
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
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-[#F4D35E]/30 dark:border-zinc-800 hover:border-[#F4D35E]/70 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#F4D35E]/20 dark:bg-zinc-800 text-amber-800 dark:text-[#F4D35E] font-mono font-black text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#F4D35E] group-hover:text-zinc-950 transition-all">
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
