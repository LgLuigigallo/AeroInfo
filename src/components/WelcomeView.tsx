'use client';

import React from 'react';
import { Search, Layers, Plane, CheckCircle2 } from 'lucide-react';
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
        
        {/* Riquadro Riservato All'Animazione (Dedicato in alto, sopra la scritta) */}
        <div className="w-full max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#E8F1F2]/80 via-[#E8F1F2]/30 to-white/10 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-transparent border border-[#B3E5E0]/60 dark:border-zinc-800 p-2 sm:p-3 relative overflow-hidden shadow-2xs">
          {/* Animated Sky Stage */}
          <div className="w-full h-24 sm:h-30 relative">
            <AirplaneSkyAnimation />
          </div>

          {/* Verification Status Pill */}
          <div className="flex justify-center -mt-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-[#B3E5E0] dark:border-zinc-800 text-[11px] font-mono text-[#05668D] dark:text-[#5EAAA8] shadow-2xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold tracking-wide">
                {isItalian ? 'Fonti Ufficiali Verificate • Aggiornato 2026' : 'Verified Official Sources • 2026 Updates'}
              </span>
            </div>
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

        {/* 3 Step Cards - Redesigned, Elegant & Coherent with Template */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto pt-2 w-full">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between text-left shadow-2xs hover:shadow-md hover:border-[#5EAAA8] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]">
                01
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
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between text-left shadow-2xs hover:shadow-md hover:border-[#5EAAA8] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#B3E5E0]/40 dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]">
                02
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
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-[#B3E5E0]/70 dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between text-left shadow-2xs hover:shadow-md hover:border-[#F4D35E] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-zinc-800 text-amber-600 dark:text-[#F4D35E] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                <Plane className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-zinc-800 text-amber-700 dark:text-[#F4D35E]">
                03
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
