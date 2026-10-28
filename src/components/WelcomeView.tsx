'use client';

import React from 'react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { AirplaneSkyAnimation } from './AirplaneSkyAnimation';
import { AirportDepartureBoard } from './AirportDepartureBoard';

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

      {/* 2. Full-Width Hero Title (Aeronautical Airport Departure Board) */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 text-center pt-1 sm:pt-2">
        <h1 className="tracking-tight text-center">
          <span className="sr-only">{t('minimalHeroTitle')}</span>
          <AirportDepartureBoard text={t('minimalHeroTitle')} enableAnimation={true} />
        </h1>
      </div>

      {/* 3. Search Console Slot (Ergonomic centered width) */}
      <div className="w-full max-w-2xl mx-auto pt-3 sm:pt-4 px-4">
        {children}
      </div>

      {/* 4. Explanatory Caption below Search Bar with capital "Il" */}
      <h2 className="text-center text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed pt-2 px-4">
        {t('minimalHeroSubtitle')}
      </h2>

      {/* 5. 3 Step Cards - Pulite, con numeri al centro, senza icone e SENZA BORDI */}
      <div className="w-full max-w-4xl mx-auto pt-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          
          {/* Fase 1 */}
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group">
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
