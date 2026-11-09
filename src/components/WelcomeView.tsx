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

export function WelcomeView({ airports, onSelectAirport, children }: WelcomeViewProps) {
  const { lang, t } = useLanguage();
  const isItalian = lang === 'it';

  const TOP_HUBS_IATAS = ['FCO', 'MXP', 'LIN', 'BGY', 'NAP', 'VCE', 'BLQ', 'CTA', 'PMO', 'BRI', 'LHR', 'MAD', 'BCN', 'CDG', 'AMS', 'FRA'];
  const featuredAirports = TOP_HUBS_IATAS
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
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
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
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
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
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/90 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
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

      {/* 6. Directory Guide ai Principali Scali Aeroportuali (100% Borderless) */}
      {featuredAirports.length > 0 && (
        <section aria-label="Principali aeroporti e informazioni sui controlli" className="w-full max-w-4xl mx-auto pt-10 px-4 space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              {isItalian ? 'Informazioni e regole sui principali aeroporti' : 'Major Airport Guides & Travel Rules'}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isItalian 
                ? 'Guide pratiche e aggiornate su scanner 3D, liquidi nel bagaglio e tempi di attesa' 
                : 'Up-to-date travel guides on 3D scanners, carry-on liquids and security checkpoints'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 w-full">
            {featuredAirports.map((item) => {
              const cityName = isItalian ? item.city_it : item.city_en;
              const has3D = Boolean(item.securityPolicy?.has3DScanners);
              const path = airportPath(item, lang);

              return (
                <Link
                  key={item.iata}
                  href={path}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectAirport(item);
                  }}
                  className="group rounded-2xl bg-white/95 dark:bg-zinc-900/90 p-3 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between gap-2"
                  title={isItalian ? `Informazioni Aeroporto ${item.name_it} (${item.iata})` : `${item.name_en} (${item.iata}) Airport Information`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-[#05668D] text-white">
                      {item.iata}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      has3D 
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-[#FD6E6E]/15 text-[#FD6E6E] dark:text-[#FD6E6E]'
                    }`}>
                      {has3D ? 'Scanner 3D' : '100 ml'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors line-clamp-1">
                      {isItalian ? `Info ${cityName}` : `${cityName} Info`}
                    </span>
                    <span className="text-[10.5px] text-zinc-400 dark:text-zinc-500 line-clamp-1 block">
                      {isItalian ? item.name_it : item.name_en}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
