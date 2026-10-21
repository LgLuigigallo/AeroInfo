'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, Loader2, Globe, Command } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Airport } from '@/types/airport';
import { airportsData, searchAirports } from '@/data/airports';

interface SearchBarProps {
  selectedAirport: Airport;
  onSelectAirport: (airport: Airport) => void;
  airports?: Airport[];
  onRefreshAirports?: () => Promise<Airport[] | void>;
}

export function SearchBar({ selectedAirport, onSelectAirport, airports, onRefreshAirports }: SearchBarProps) {
  const { lang, t } = useLanguage();
  const sourceList = airports && airports.length > 0 ? airports : airportsData;
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Airport[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestFeedbackMsg, setRequestFeedbackMsg] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [emailValidationError, setEmailValidationError] = useState('');
  const [existingRequest, setExistingRequest] = useState<{
    id: string;
    query: string;
    iata_code?: string;
    status: string;
    scheduled_for?: string;
  } | null>(null);
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

  // Keyboard shortcut: '/' or 'Cmd+K' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement !== inputRef.current) {
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
    setRequestSuccess(false);
    setRequestFeedbackMsg('');
    setEmailValidationError('');
    if (query.trim().length > 0) {
      const q = query.toLowerCase().trim();
      const filtered = sourceList.filter((a) => {
        return (
          a.iata.toLowerCase().includes(q) ||
          a.icao.toLowerCase().includes(q) ||
          a.name_it.toLowerCase().includes(q) ||
          a.name_en.toLowerCase().includes(q) ||
          a.city_it.toLowerCase().includes(q) ||
          a.city_en.toLowerCase().includes(q) ||
          a.country_it.toLowerCase().includes(q) ||
          a.country_en.toLowerCase().includes(q)
        );
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, sourceList]);

  // Check if uncatalogued airport has already been requested
  useEffect(() => {
    setExistingRequest(null);
    setEmailValidationError('');
    if (query.trim().length >= 2 && results.length === 0) {
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(`/api/airports/request?query=${encodeURIComponent(query.trim())}`);
          const data = await res.json();
          if (data.exists && data.request) {
            setExistingRequest(data.request);
          } else {
            setExistingRequest(null);
          }
        } catch {
          setExistingRequest(null);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [query, results.length]);

  const handleRequestIndexing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSubmittingRequest) return;

    // If airport is already requested, email is mandatory to subscribe to alerts
    if (existingRequest && (!requestEmail.trim() || !requestEmail.includes('@'))) {
      setEmailValidationError(t('emailRequiredNotice'));
      return;
    }

    setIsSubmittingRequest(true);
    setEmailValidationError('');
    try {
      const res = await fetch('/api/airports/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: existingRequest ? existingRequest.query : query.trim(),
          email: requestEmail.trim() || undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        setRequestSuccess(true);
        if (data.message_it) {
          setRequestFeedbackMsg(lang === 'it' ? data.message_it : data.message_en);
        }
        if (data.isInstantlyPublished && onRefreshAirports) {
          const freshList = await onRefreshAirports();
          if (Array.isArray(freshList) && data.airportIata) {
            const newlyCreated = freshList.find(
              (a: Airport) => a.iata.toUpperCase() === data.airportIata.toUpperCase()
            );
            if (newlyCreated) {
              setTimeout(() => {
                handleSelect(newlyCreated);
              }, 1200);
            }
          }
        }
      }
    } catch (err) {
      console.error('Request indexing failed:', err);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

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

  const topHubs = ['PRG', 'FCO', 'MXP', 'LIN', 'FRA', 'MUC', 'CDG', 'AMS', 'MAD', 'BCN', 'DUB', 'VIE', 'CPH', 'WAW', 'BUD', 'ATH', 'ZRH'];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Console Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
          <Search className="w-4 h-4" />
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
          className="w-full pl-10 pr-22 py-3 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 focus:border-zinc-400 dark:focus:border-zinc-600 shadow-xs transition-all"
        />

        {/* Clear or Keyboard Hint */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200/80 dark:border-zinc-700/80">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/80 animate-in fade-in-50 duration-150">
          {/* Query Results */}
          {query.trim().length > 0 ? (
            <div className="p-1.5 max-h-84 overflow-y-auto">
              {results.length > 0 ? (
                results.map((airport) => {
                  const isSelected = selectedAirport.id === airport.id;
                  return (
                    <button
                      key={airport.id}
                      type="button"
                      onClick={() => handleSelect(airport)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-8 rounded bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs tracking-wider text-white border border-zinc-900 dark:border-zinc-700 shrink-0">
                          {airport.iata}
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white tracking-tight">
                            {lang === 'it' ? airport.name_it : airport.name_en}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5 font-normal">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            <span>
                              {lang === 'it' ? airport.city_it : airport.city_en}, {lang === 'it' ? airport.country_it : airport.country_en}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {airport.securityPolicy.has3DScanners ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            Scanner 3D
                          </span>
                        ) : (
                          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                            100ml Standard
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                    </button>
                  );
                })
              ) : existingRequest ? (
                /* When airport has ALREADY been requested: only allow email subscription */
                <div className="p-5 text-center space-y-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>

                  <div className="space-y-1 max-w-sm mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{t('alreadyRequestedBadge')}</span>
                    </div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {t('alreadyRequestedTitle')}: &quot;{existingRequest.query}&quot;
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {t('alreadyRequestedDesc')}
                    </p>
                  </div>

                  {requestSuccess ? (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 max-w-sm mx-auto animate-in fade-in-50">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{requestFeedbackMsg || t('subscribeAlertSuccess')}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestIndexing} className="space-y-2 max-w-sm mx-auto pt-1">
                      <div>
                        <input
                          type="email"
                          required
                          value={requestEmail}
                          onChange={(e) => {
                            setRequestEmail(e.target.value);
                            setEmailValidationError('');
                          }}
                          placeholder={t('requestAirportEmailPlaceholder')}
                          className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-mono"
                        />
                        {emailValidationError && (
                          <p className="text-[10px] text-rose-500 mt-1 text-left font-medium">
                            {emailValidationError}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingRequest}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                      >
                        {isSubmittingRequest ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{t('subscribeAlertSubmitting')}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                            <span>{t('subscribeAlertBtn')}</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* When airport is new and not yet requested */
                <div className="p-5 text-center space-y-3.5">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 mx-auto flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                    <Globe className="w-5 h-5 text-zinc-500" />
                  </div>

                  <div className="space-y-1 max-w-sm mx-auto">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {t('requestAirportTitle')}: &quot;{query}&quot;
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {t('requestAirportDesc')}
                    </p>
                  </div>

                  {requestSuccess ? (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 max-w-sm mx-auto animate-in fade-in-50">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{requestFeedbackMsg || t('requestAirportSuccess')}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestIndexing} className="space-y-2 max-w-sm mx-auto pt-1">
                      <input
                        type="email"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        placeholder={t('requestAirportEmailPlaceholder')}
                        className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all font-mono"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingRequest}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                      >
                        {isSubmittingRequest ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{t('requestAirportSubmitting')}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t('requestAirportBtn')}</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Recent Searches & Curated Major Hubs */
            <div className="p-3 space-y-3">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-1 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t('recentSearches')}
                    </span>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-[10px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      {t('clearRecent')}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {recentSearches.map((code) => {
                      const ap = sourceList.find((a) => a.iata === code);
                      if (!ap) return null;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleSelect(ap)}
                          className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold">{ap.iata}</span>
                          <span className="text-zinc-500 dark:text-zinc-400 font-sans text-[11px]">
                            {lang === 'it' ? ap.city_it : ap.city_en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Major Hubs Grid */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1 block mb-1.5">
                  {t('popularHubs')}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {topHubs.map((code) => {
                    const ap = sourceList.find((a) => a.iata === code);
                    if (!ap) return null;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleSelect(ap)}
                        className="px-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left transition-colors border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-xs text-zinc-900 dark:text-white">
                            {ap.iata}
                          </span>
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {lang === 'it' ? ap.city_it : ap.city_en}
                          </span>
                        </div>
                        {ap.securityPolicy.has3DScanners && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Scanner 3D" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
