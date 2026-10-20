'use client';

import React, { useState } from 'react';
import { Utensils, Coffee, ShoppingBag, ShoppingCart, Pill, Clock } from 'lucide-react';
import { Airport, VenueCategory } from '@/types/airport';
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
    <div className="space-y-5">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'
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
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                {venue.name}
              </h4>
              {venue.isUnverified && <UnverifiedBadge />}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {venue.terminal}
              </span>
              <span>•</span>
              <span className="truncate">{venue.location}</span>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{venue.hours}</span>
              </div>
              {venue.is24Hours && (
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-bold">
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
