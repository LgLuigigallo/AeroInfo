'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Airport } from '@/types/airport';
import { airportsData, searchAirports } from '@/data/airports';

interface SearchBarProps {
  selectedAirport: Airport;
  onSelectAirport: (airport: Airport) => void;
}

export function SearchBar({ selectedAirport, onSelectAirport }: SearchBarProps) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Airport[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aeroinfo_recent');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Keyboard shortcut: '/' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update search results
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchAirports(query);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (airport: Airport) => {
    onSelectAirport(airport);
    setIsOpen(false);
    setQuery('');

    // Update recent searches
    try {
      const updated = [airport.iata, ...recentSearches.filter((code) => code !== airport.iata)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('aeroinfo_recent', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('aeroinfo_recent');
  };

  const topHubs = ['FCO', 'MXP', 'LIN', 'FRA', 'MUC', 'CDG', 'AMS', 'MAD', 'BCN', 'DUB', 'VIE', 'CPH', 'LHR', 'JFK', 'HND'];

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-11 pr-24 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent shadow-xs transition-all"
        />

        {/* Clear or Keyboard Hint */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Query Results */}
          {query.trim().length > 0 ? (
            <div className="p-2 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                results.map((airport) => {
                  const isSelected = selectedAirport.id === airport.id;
                  return (
                    <button
                      key={airport.id}
                      type="button"
                      onClick={() => handleSelect(airport)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        isSelected
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                          : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs tracking-wider text-neutral-900 dark:text-white border border-neutral-200/60 dark:border-neutral-700/60">
                          {airport.iata}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-neutral-900 dark:text-white">
                            {lang === 'it' ? airport.name_it : airport.name_en}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {lang === 'it' ? airport.city_it : airport.city_en}, {lang === 'it' ? airport.country_it : airport.country_en}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {airport.securityPolicy.has3DScanners && (
                          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Scanner 3D
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {t('noResults')} <span className="font-semibold">&quot;{query}&quot;</span>
                </div>
              )}
            </div>
          ) : (
            /* Recent Searches & Suggestions when query is empty */
            <div className="p-3">
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {t('recentSearches')}
                    </span>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                      {t('clearRecent')}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((code) => {
                      const ap = airportsData.find((a) => a.iata === code);
                      if (!ap) return null;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleSelect(ap)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors"
                        >
                          <span className="font-bold">{ap.iata}</span>
                          <span className="text-neutral-500 dark:text-neutral-400">
                            {lang === 'it' ? ap.city_it : ap.city_en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Top Hubs in dropdown */}
              <div>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 block mb-2">
                  {t('popularHubs')}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {topHubs.map((code) => {
                    const ap = airportsData.find((a) => a.iata === code);
                    if (!ap) return null;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleSelect(ap)}
                        className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors border border-neutral-100 dark:border-neutral-800"
                      >
                        <div className="font-bold text-xs text-neutral-900 dark:text-white">
                          {ap.iata}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {lang === 'it' ? ap.city_it : ap.city_en}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Access Top Hub Pills (below input) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none text-xs">
        <span className="text-neutral-400 font-medium shrink-0 mr-1 hidden sm:inline">
          {t('popularHubs')}:
        </span>
        {topHubs.map((code) => {
          const ap = airportsData.find((a) => a.iata === code);
          if (!ap) return null;
          const isSelected = selectedAirport.iata === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => handleSelect(ap)}
              className={`shrink-0 px-3 py-1 rounded-full font-medium transition-all ${
                isSelected
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
              }`}
            >
              {ap.iata} • {lang === 'it' ? ap.city_it : ap.city_en}
            </button>
          );
        })}
      </div>
    </div>
  );
}
