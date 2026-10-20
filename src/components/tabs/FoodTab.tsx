'use client';

import React, { useState, useMemo } from 'react';
import { 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  Pill, 
  Clock, 
  Sparkles, 
  Search, 
  X, 
  Moon, 
  Zap, 
  ShieldCheck, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Star
} from 'lucide-react';
import { Airport, VenueItem } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface FoodTabProps {
  airport: Airport;
}

type TravelerIntent = 'top_picks' | 'dawn' | 'quick' | 'dining' | 'essentials' | 'boutiques';

export function FoodTab({ airport }: FoodTabProps) {
  const { lang, t } = useLanguage();
  const [activeIntent, setActiveIntent] = useState<TravelerIntent>('top_picks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBoutique, setSelectedBoutique] = useState<VenueItem | null>(null);

  const venues = airport.venues || [];

  // Grouped Aggregator Counts
  const dawnVenues = useMemo(() => {
    return venues.filter((v) => v.is24Hours || v.isEarlyMorning || v.hours?.startsWith('05:') || v.hours?.startsWith('04:') || v.hours?.toLowerCase().includes('24'));
  }, [venues]);

  const quickVenues = useMemo(() => {
    return venues.filter((v) => v.serviceType === 'quick_bite' || v.category === 'grab_and_go' || v.category === 'cafe');
  }, [venues]);

  const tableDiningVenues = useMemo(() => {
    return venues.filter((v) => v.serviceType === 'table_service' || (v.category === 'dining' && !v.serviceType));
  }, [venues]);

  const essentialsVenues = useMemo(() => {
    return venues.filter((v) => v.category === 'pharmacy' || v.category === 'duty_free' || v.serviceType === 'pharmacy' || v.serviceType === 'duty_free');
  }, [venues]);

  const boutiqueVenues = useMemo(() => {
    return venues.filter((v) => v.category === 'shopping' || v.serviceType === 'retail');
  }, [venues]);

  // Curated Top Traveler Picks (Max 15 highly useful spots: best table dining, iconic grab & go, top cafes, pharmacies)
  const topPicksVenues = useMemo(() => {
    // If venue list is small, show all non-retail
    if (venues.length <= 15) {
      return venues;
    }
    // Prioritize table dining, grab & go spots, pharmacies, duty free, iconic bakeries
    const selected: VenueItem[] = [];
    const seenNames = new Set<string>();

    const candidates = [
      ...venues.filter(v => v.category === 'pharmacy'),
      ...venues.filter(v => v.category === 'duty_free'),
      ...venues.filter(v => v.serviceType === 'table_service'),
      ...venues.filter(v => v.serviceType === 'quick_bite'),
      ...venues.filter(v => v.category === 'cafe' && (v.is24Hours || v.isEarlyMorning))
    ];

    for (const c of candidates) {
      if (!seenNames.has(c.name.toLowerCase()) && selected.length < 18) {
        seenNames.add(c.name.toLowerCase());
        selected.push(c);
      }
    }

    return selected.length > 0 ? selected : venues.slice(0, 15);
  }, [venues]);

  // Filtered by active intent and search query
  const displayedVenues = useMemo(() => {
    let baseList: VenueItem[] = [];
    if (activeIntent === 'top_picks') baseList = topPicksVenues;
    else if (activeIntent === 'dawn') baseList = dawnVenues;
    else if (activeIntent === 'quick') baseList = quickVenues;
    else if (activeIntent === 'dining') baseList = tableDiningVenues;
    else if (activeIntent === 'essentials') baseList = essentialsVenues;
    else if (activeIntent === 'boutiques') baseList = boutiqueVenues;

    if (!searchQuery.trim()) return baseList;

    const q = searchQuery.toLowerCase().trim();
    return venues.filter((v) =>
      v.name.toLowerCase().includes(q) ||
      v.terminal.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q) ||
      (v.highlightNote_it && v.highlightNote_it.toLowerCase().includes(q)) ||
      (v.highlightNote_en && v.highlightNote_en.toLowerCase().includes(q))
    );
  }, [activeIntent, searchQuery, venues, topPicksVenues, dawnVenues, quickVenues, tableDiningVenues, essentialsVenues, boutiqueVenues]);

  return (
    <div className="space-y-5">
      {/* 1. TRAVELER AGGREGATOR DASHBOARD (Top 4 Operational Pills) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => {
            setActiveIntent('dawn');
            setSearchQuery('');
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeIntent === 'dawn'
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-200 shadow-2xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-1 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Moon className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
              {dawnVenues.length}
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
            {t('aggregatorMetricsDawn')}
          </span>
          <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">
            {lang === 'it' ? 'Bar e colazioni per voli all\'alba' : 'Breakfast bars for early flights'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveIntent('quick');
            setSearchQuery('');
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeIntent === 'quick'
              ? 'bg-blue-500/10 border-blue-500/40 text-blue-950 dark:text-blue-200 shadow-2xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-1 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
              {quickVenues.length}
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
            {t('aggregatorMetricsQuick')}
          </span>
          <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">
            {lang === 'it' ? 'Pizza al taglio & pasti rapidi' : 'Pizza slices & quick snacks to gate'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveIntent('dining');
            setSearchQuery('');
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeIntent === 'dining'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200 shadow-2xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
              {tableDiningVenues.length}
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
            {t('aggregatorMetricsSitDown')}
          </span>
          <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">
            {lang === 'it' ? 'Ristoranti con tavolo per soste' : 'Sit-down dining for layovers'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveIntent('essentials');
            setSearchQuery('');
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeIntent === 'essentials'
              ? 'bg-purple-500/10 border-purple-500/40 text-purple-950 dark:text-purple-200 shadow-2xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-1 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <Pill className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
              {essentialsVenues.length}
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase font-bold text-zinc-700 dark:text-zinc-300 block">
            {t('aggregatorMetricsHealth')}
          </span>
          <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">
            {lang === 'it' ? 'Farmacie attive e Duty-Free' : 'Pharmacies & Duty-Free stores'}
          </span>
        </button>
      </div>

      {/* 2. TRAVELER INTENT NAVIGATION & SEARCH */}
      <div className="space-y-3">
        {/* Instant Search Box */}
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

        {/* Intent Tabs Segmented Control */}
        {!searchQuery && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveIntent('top_picks')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeIntent === 'top_picks'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{t('intentTopPicks')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIntent('dawn')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeIntent === 'dawn'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <Moon className="w-3 h-3 text-amber-500" />
              <span>{t('intentDawn')}</span>
              <span className="text-[10px] opacity-60">({dawnVenues.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIntent('quick')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeIntent === 'quick'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <Zap className="w-3 h-3 text-blue-500" />
              <span>{t('intentQuick')}</span>
              <span className="text-[10px] opacity-60">({quickVenues.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIntent('dining')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeIntent === 'dining'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <Utensils className="w-3 h-3 text-emerald-500" />
              <span>{t('intentDining')}</span>
              <span className="text-[10px] opacity-60">({tableDiningVenues.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIntent('essentials')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeIntent === 'essentials'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <Pill className="w-3 h-3 text-purple-500" />
              <span>{t('intentEssentials')}</span>
              <span className="text-[10px] opacity-60">({essentialsVenues.length})</span>
            </button>

            {boutiqueVenues.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveIntent('boutiques')}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeIntent === 'boutiques'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <ShoppingBag className="w-3 h-3 text-zinc-500" />
                <span>{t('intentBoutiques')}</span>
                <span className="text-[10px] opacity-60">({boutiqueVenues.length})</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. BOUTIQUE / RETAIL AGGREGATOR VIEW (Compacted & Filterable Brand Cloud) */}
      {activeIntent === 'boutiques' && !searchQuery ? (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                    {t('retailBoutiquesIntro')}
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {boutiqueVenues.length} {t('retailBoutiquesCount')}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-zinc-500 font-sans">
                {lang === 'it' ? 'Clicca un brand per visualizzare subito Terminal e Molo' : 'Click any brand to inspect terminal & gate location'}
              </span>
            </div>

            {/* Selected Boutique Inspection Popover Card */}
            {selectedBoutique && (
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 flex items-center justify-between gap-3 animate-in fade-in-50">
                <div className="space-y-0.5">
                  <span className="font-bold text-zinc-900 dark:text-white text-sm block">
                    {selectedBoutique.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-700 text-[10px]">
                      {selectedBoutique.terminal}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-sans text-xs">
                      <MapPin className="w-3 h-3 text-blue-500" />
                      {selectedBoutique.location}
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {selectedBoutique.hours}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBoutique(null)}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Interactive Brand Cloud */}
            <div className="flex flex-wrap gap-1.5 pt-1 max-h-96 overflow-y-auto">
              {boutiqueVenues.map((b) => {
                const isSelected = selectedBoutique?.id === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBoutique(isSelected ? null : b)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold border-zinc-900 dark:border-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200/70 dark:border-zinc-800'
                    }`}
                  >
                    <span>{b.name}</span>
                    <span className="text-[10px] text-zinc-400 ml-1 opacity-70">
                      {b.terminal.replace('Terminal ', 'T')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* 4. PRIMARY TRAVELER FOOD & ESSENTIALS GRID */
        <div>
          {displayedVenues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedVenues.map((venue) => {
                const isTableService = venue.serviceType === 'table_service';
                const isQuick = venue.serviceType === 'quick_bite';
                const isDawn = venue.is24Hours || venue.isEarlyMorning;

                return (
                  <div
                    key={venue.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm leading-snug">
                          {venue.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">
                            {venue.terminal}
                          </span>
                          <span>•</span>
                          <span className="truncate font-sans">{venue.location}</span>
                        </div>
                      </div>

                      {venue.isUnverified && <UnverifiedBadge />}
                    </div>

                    {/* Operational Badges for Travelers */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {isTableService && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                          {t('tableServiceBadge')}
                        </span>
                      )}
                      {isQuick && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20">
                          {t('quickBiteBadge')}
                        </span>
                      )}
                      {isDawn && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                          {t('earlyDawnBadge')}
                        </span>
                      )}
                      {venue.category === 'pharmacy' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
                          {t('pharmacy')}
                        </span>
                      )}
                      {venue.category === 'duty_free' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20">
                          {t('dutyFree')}
                        </span>
                      )}
                    </div>

                    {/* Practical Traveler Tip / Highlight Note */}
                    {(venue.highlightNote_it || venue.highlightNote_en) && (
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                        {lang === 'it' ? venue.highlightNote_it : venue.highlightNote_en}
                      </p>
                    )}

                    {/* Operational Hours Footer */}
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
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs font-mono">
              {t('noVenuesFound')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
