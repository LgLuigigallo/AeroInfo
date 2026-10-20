'use client';

import React from 'react';
import { Gauge, Clock, Compass } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';

interface DifficultyTabProps {
  airport: Airport;
}

export function DifficultyTab({ airport }: DifficultyTabProps) {
  const { lang, t } = useLanguage();

  // Difficulty badge colors
  const getDifficultyColor = (rating: number) => {
    switch (rating) {
      case 1:
        return 'text-emerald-700 bg-emerald-500/10 border-emerald-500/25 dark:text-emerald-300';
      case 2:
        return 'text-teal-700 bg-teal-500/10 border-teal-500/25 dark:text-teal-300';
      case 3:
        return 'text-amber-700 bg-amber-500/10 border-amber-500/25 dark:text-amber-300';
      case 4:
        return 'text-orange-700 bg-orange-500/10 border-orange-500/25 dark:text-orange-300';
      case 5:
      default:
        return 'text-rose-700 bg-rose-500/10 border-rose-500/25 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-5">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Difficulty Score Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            <span>{t('difficultyScore')}</span>
          </div>

          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tabular-nums">
              {airport.difficultyRating}
            </span>
            <span className="text-zinc-400 text-xs">/ 5</span>
          </div>

          <div className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getDifficultyColor(airport.difficultyRating)}`}>
            {lang === 'it' ? airport.difficultyLabel_it : airport.difficultyLabel_en}
          </div>
        </div>

        {/* Average Wait Time */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('avgSecurityWait')}</span>
          </div>

          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tabular-nums">
              ~{airport.averageSecurityWaitMin}
            </span>
            <span className="text-zinc-500 text-xs">{t('minutes')}</span>
          </div>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {lang === 'it' ? 'Stima media ai varchi standard negli orari di punta.' : 'Estimated average wait during peak hours.'}
          </p>
        </div>

        {/* Recommended Arrival */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('recommendedArrival')}</span>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 text-[11px] font-sans">{t('domesticSchengen')}:</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {airport.recommendedArrivalHours.domestic} {t('hours')}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-500 text-[11px] font-sans">{t('internationalLongHaul')}:</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {airport.recommendedArrivalHours.international} {t('hours')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tips Card */}
      <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700/80">
            <Compass className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
            {t('tipsTitle')}
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {lang === 'it' ? airport.navigationAdvice_it : airport.navigationAdvice_en}
        </p>
      </div>
    </div>
  );
}
