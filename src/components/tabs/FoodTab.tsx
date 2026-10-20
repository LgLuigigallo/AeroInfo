'use client';

import React, { useState } from 'react';
import { Utensils, Coffee, ShoppingBag, Pill, Clock, Sparkles, Search, X } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface FoodTabProps {
  airport: Airport;
}

export function FoodTab({ airport }: FoodTabProps) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t('allCategories'), icon: null },
    { id: 'dining', label: t('dining'), icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'cafe', label: t('cafe'), icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'duty_free', label: t('dutyFree'), icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'shopping', label: t('shopping'), icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'pharmacy', label: t('pharmacy'), icon: <Pill className="w-3.5 h-3.5" /> }
  ];

  const filteredVenues = airport.venues.filter((venue) => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || venue.category === selectedCategory;
    if (!categoryMatch) return false;

    // Search query match
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      venue.name.toLowerCase().includes(q) ||
      venue.terminal.toLowerCase().includes(q) ||
      venue.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        {/* Search Input Box */}
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchVenuesPlaceholder')}
            className="w-full pl-8.5 pr-8 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all font-mono"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? airport.venues.length 
                : airport.venues.filter(v => v.category === cat.id).length;

              if (cat.id !== 'all' && count === 0) return null;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                      : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-zinc-400 shrink-0">
            {filteredVenues.length} {lang === 'it' ? 'locali' : 'venues'}
          </span>
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length > 0 ? (
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
      ) : (
        <div className="p-8 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs font-mono">
          {t('noVenuesFound')}
        </div>
      )}
    </div>
  );
}
