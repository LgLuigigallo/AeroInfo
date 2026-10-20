'use client';

import React, { useState } from 'react';
import { Utensils, Coffee, ShoppingBag, Pill, Clock } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface FoodTabProps {
  airport: Airport;
}

export function FoodTab({ airport }: FoodTabProps) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t('allCategories'), icon: null },
    { id: 'dining', label: t('dining'), icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'cafe', label: t('cafe'), icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'duty_free', label: t('dutyFree'), icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'pharmacy', label: t('pharmacy'), icon: <Pill className="w-3.5 h-3.5" /> }
  ];

  const filteredVenues = airport.venues.filter((venue) => {
    if (selectedCategory === 'all') return true;
    return venue.category === selectedCategory;
  });

  return (
    <div className="space-y-4">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                {venue.name}
              </h4>
              {venue.isUnverified && <UnverifiedBadge />}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">
                {venue.terminal}
              </span>
              <span>•</span>
              <span className="truncate font-sans">{venue.location}</span>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                <span>{venue.hours}</span>
              </div>
              {venue.is24Hours && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  24H
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
