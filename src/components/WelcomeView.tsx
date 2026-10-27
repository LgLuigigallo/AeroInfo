'use client';

import React from 'react';
import Link from 'next/link';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { airportPath } from '@/lib/airport-slug';
import { AirplaneSkyAnimation } from './AirplaneSkyAnimation';

interface WelcomeViewProps {
  airports: Airport[];
  onSelectAirport: (airport: Airport) => void;
  children?: React.ReactNode; // Slot for SearchBar
}

const POPULAR_IATAS = ['FCO', 'MXP', 'BGY', 'LIN', 'BLQ', 'NAP', 'CTA', 'PMO', 'BCN', 'MAD', 'CDG', 'AMS', 'LHR', 'FRA'];

export function WelcomeView({ airports, onSelectAirport, children }: WelcomeViewProps) {
  const { lang, t } = useLanguage();
  const isItalian = lang === 'it';

  // Extract popular airports in priority order
  const popularAirports = POPULAR_IATAS
    .map((code) => airports.find((a) => a.iata.toUpperCase() === code))
    .filter((a): a is Airport => Boolean(a));

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

      {/* 2. Full-Width Hero Title (Expansive typography spanning the screen) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center pt-1 sm:pt-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight text-[#05668D] dark:text-white leading-[1.14]">
          {t('minimalHeroTitle')}
        </h1>
      </div>

      {/* 3. Search Console Slot (Ergonomic centered width) */}
      <div className="w-full max-w-2xl mx-auto pt-3 sm:pt-4 px-4">
        {children}
      </div>

      {/* 4. Explanatory Caption below Search Bar with capital "Il" */}
      <p className="text-center text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed pt-2 px-4">
        {t('minimalHeroSubtitle')}
      </p>

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

      {/* 6. Scali più cercati in Italia ed Europa (Internal Crawlable Links per Googlebot e Viaggiatori) */}
      {popularAirports.length > 0 && (
        <section aria-label={isItalian ? 'Scali più cercati' : 'Popular airports'} className="w-full max-w-4xl mx-auto pt-8 px-4 text-center space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {isItalian ? 'Scali più cercati in Italia ed Europa' : 'Popular airports in Italy and Europe'}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {popularAirports.map((airport) => (
              <Link
                key={airport.iata}
                href={airportPath(airport, lang)}
                onClick={() => onSelectAirport(airport)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-[#05668D] dark:hover:border-[#5EAAA8] hover:text-[#05668D] dark:hover:text-[#5EAAA8] transition-all shadow-2xs group"
              >
                <span className="font-mono font-bold text-[#05668D] dark:text-[#5EAAA8] group-hover:scale-105 transition-transform">
                  {airport.iata}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {isItalian ? airport.name_it : airport.name_en}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
