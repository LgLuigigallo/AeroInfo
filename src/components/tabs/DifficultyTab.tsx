'use client';

import React from 'react';
import { Gauge, Clock, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';
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
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 2:
        return 'text-teal-700 bg-teal-50 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800';
      case 3:
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 4:
        return 'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800';
      case 5:
      default:
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Difficulty Score Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <Gauge className="w-4 h-4" />
            <span>{t('difficultyScore')}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              {airport.difficultyRating}
            </span>
            <span className="text-neutral-400 font-medium text-sm">/ 5</span>
          </div>

          <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(airport.difficultyRating)}`}>
            {lang === 'it' ? airport.difficultyLabel_it : airport.difficultyLabel_en}
          </div>
        </div>

        {/* Average Wait Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>{t('avgSecurityWait')}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              ~{airport.averageSecurityWaitMin}
            </span>
            <span className="text-neutral-500 font-medium text-sm">{t('minutes')}</span>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {lang === 'it' ? 'Stima media ai varchi standard negli orari di punta.' : 'Estimated average wait during peak hours.'}
          </p>
        </div>

        {/* Recommended Arrival */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>{t('recommendedArrival')}</span>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500">{t('domesticSchengen')}:</span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {airport.recommendedArrivalHours.domestic} {t('hours')}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-neutral-500">{t('internationalLongHaul')}:</span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {airport.recommendedArrivalHours.international} {t('hours')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tips Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
            {t('tipsTitle')}
          </h4>
        </div>

        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
          {lang === 'it' ? airport.navigationAdvice_it : airport.navigationAdvice_en}
        </p>
      </div>
    </div>
  );
}
