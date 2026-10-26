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
      <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Riquadro Riservato All'Animazione (Senza pill ridondante) */}
        <div className="w-full max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#E8F1F2]/80 via-[#E8F1F2]/30 to-white/10 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-transparent border border-[#B3E5E0]/60 dark:border-zinc-800 p-2 sm:p-3 relative overflow-hidden shadow-2xs">
          <div className="w-full h-24 sm:h-28 relative">
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

        {/* Explanatory Caption below Search Bar */}
        <p className="text-center text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {t('minimalHeroSubtitle')}
        </p>

        {/* 3 Step Cards - Minimalist, centered phase numbers 1, 2, 3, no icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto pt-2 w-full">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-[#5EAAA8] transition-all group">
            {/* Centered Phase Number */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-mono font-black text-sm flex items-center justify-center border border-[#B3E5E0]/60 dark:border-zinc-700 shadow-2xs group-hover:scale-105 group-hover:bg-[#05668D] group-hover:text-white transition-all">
                1
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
                {isItalian ? 'Cerca l\'aeroporto' : 'Search airport'}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isItalian 
                  ? 'Digita la città, il nome o il codice IATA per trovare subito il tuo scalo.' 
                  : 'Type city, airport name or 3-letter IATA code to find your terminal.'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-[#5EAAA8] transition-all group">
            {/* Centered Phase Number */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] font-mono font-black text-sm flex items-center justify-center border border-[#B3E5E0]/60 dark:border-zinc-700 shadow-2xs group-hover:scale-105 group-hover:bg-[#05668D] group-hover:text-white transition-all">
                2
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
                {isItalian ? 'Leggi solo ciò che serve' : 'Read what you need'}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isItalian 
                  ? 'Niente muri di testo: apri le 4 bolle per liquidi, bagagli, regole generali e mappa.' 
                  : 'Zero wall of text: tap the 4 clear bubbles for liquids, baggage, rules and map.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-[#F4D35E] transition-all group">
            {/* Centered Phase Number */}
            <div className="mb-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-amber-50 dark:bg-zinc-800 text-amber-700 dark:text-[#F4D35E] font-mono font-black text-sm flex items-center justify-center border border-[#F4D35E]/60 dark:border-zinc-700 shadow-2xs group-hover:scale-105 group-hover:bg-[#F4D35E] group-hover:text-zinc-900 transition-all">
                3
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#F4D35E] transition-colors">
                {isItalian ? 'Parti senza problemi' : 'Travel hassle-free'}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isItalian 
                  ? 'Supera i controlli di sicurezza e l\'imbarco senza sorprese o intoppi.' 
                  : 'Clear security and boarding gates smoothly with verified requirements.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
