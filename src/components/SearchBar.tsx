'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, Loader2, Globe, Command } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Airport } from '@/types/airport';
import { airportsData, searchAirports } from '@/data/airports';
import { isGeneralAviationAirport } from '@/lib/aviation-authority';

interface SearchBarProps {
  selectedAirport: Airport | null;
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
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [unsubscribeDone, setUnsubscribeDone] = useState(false);
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
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.filter((item): item is string => typeof item === 'string').slice(0, 10));
        }
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
        return Boolean(
          (a.iata && a.iata.toLowerCase().includes(q)) ||
          (a.icao && a.icao.toLowerCase().includes(q)) ||
          (a.name_it && a.name_it.toLowerCase().includes(q)) ||
          (a.name_en && a.name_en.toLowerCase().includes(q)) ||
          (a.city_it && a.city_it.toLowerCase().includes(q)) ||
          (a.city_en && a.city_en.toLowerCase().includes(q)) ||
          (a.country_it && a.country_it.toLowerCase().includes(q)) ||
          (a.country_en && a.country_en.toLowerCase().includes(q))
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
        const thankMsg = lang === 'it'
          ? (data.thankYouLine_it || data.message_it)
          : (data.thankYouLine_en || data.message_en);
        if (thankMsg) {
          setRequestFeedbackMsg(thankMsg);
        }
      }
    } catch (err) {
      console.error('Request indexing failed:', err);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleQuickUnsubscribe = async () => {
    if (!requestEmail) return;
    setIsUnsubscribing(true);
    try {
      const res = await fetch('/api/airports/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: requestEmail.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setUnsubscribeDone(true);
        setRequestFeedbackMsg(t('unsubscribeSearchBarSuccess'));
      }
    } catch {
      // ignore
    } finally {
      setIsUnsubscribing(false);
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
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#05668D] dark:group-focus-within:text-[#5EAAA8] transition-colors">
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
          className="w-full pl-12 pr-24 py-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-[#B3E5E0] hover:border-[#5EAAA8] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm sm:text-base tracking-tight focus:outline-none focus:border-[#05668D] focus:ring-4 focus:ring-[#B3E5E0]/30 shadow-sm hover:shadow-md focus:shadow-lg transition-all"
        />

        {/* Clear or Keyboard Hint */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-medium text-[#05668D] dark:text-[#5EAAA8] bg-[#E8F1F2] dark:bg-zinc-800/80 px-2 py-0.5 rounded-lg">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-[#E8F1F2] dark:divide-zinc-800/80 animate-in fade-in-50 duration-150">
          {/* Query Results */}
          {query.trim().length > 0 ? (
            <div className="p-1.5 max-h-84 overflow-y-auto">
              {results.length > 0 ? (
                results.map((airport) => {
                  const isSelected = selectedAirport?.id === airport.id;
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
                        <div className="w-10 h-8 rounded-lg bg-[#05668D] dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs tracking-wider text-white border border-[#05668D] dark:border-zinc-700 shrink-0">
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
                        {isGeneralAviationAirport(airport) && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                            {lang === 'it' ? 'Voli Privati' : 'Private Flights'}
                          </span>
                        )}
                        {(() => {
                          const rules = airport.securityPolicy.terminalRules;
                          const hasMixed = rules && rules.length > 1 && rules.some(r => r.has3DScanners) && rules.some(r => !r.has3DScanners);
                          if (hasMixed) {
                            return (
                              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300">
                                {lang === 'it' ? '3D / 100ml' : '3D / 100ml'}
                              </span>
                            );
                          }
                          if (airport.securityPolicy.has3DScanners) {
                            return (
                              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                Scanner 3D
                              </span>
                            );
                          }
                          return (
                            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                              100ml Standard
                            </span>
                          );
                        })()}
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
                    <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-center space-y-2.5 max-w-md mx-auto animate-in fade-in-50 zoom-in-95">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                          {lang === 'it' ? 'Grazie per la tua segnalazione!' : 'Thank you for your request!'}
                        </h5>
                        <p className="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed font-normal">
                          {requestFeedbackMsg || (
                            lang === 'it'
                              ? 'La scheda ufficiale verrà presto elaborata e riceverai news alla email indicata (controlla anche lo spam).'
                              : 'The official dossier will soon be processed and you will receive news at the specified email (check your spam folder too).'
                          )}
                        </p>
                      </div>
                      {requestEmail && !unsubscribeDone && (
                        <button
                          type="button"
                          disabled={isUnsubscribing}
                          onClick={handleQuickUnsubscribe}
                          className="text-[11px] text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer block mx-auto disabled:opacity-50"
                        >
                          {isUnsubscribing ? t('unsubscribeSubmitting') : t('unsubscribeSearchBarAction')}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setQuery('');
                          setRequestSuccess(false);
                          setUnsubscribeDone(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors shadow-2xs cursor-pointer mt-1"
                      >
                        {lang === 'it' ? 'Chiudi' : 'Close'}
                      </button>
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
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-left pt-1 leading-tight">
                          {lang === 'it'
                            ? '🔒 Email usata esclusivamente per notificare la pubblicazione (GDPR • zero spam).'
                            : '🔒 Email is strictly used for publication alert (GDPR compliant • no spam).'}
                        </p>
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
                    <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-center space-y-2.5 max-w-md mx-auto animate-in fade-in-50 zoom-in-95">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                          {lang === 'it' ? 'Grazie per la tua segnalazione!' : 'Thank you for your request!'}
                        </h5>
                        <p className="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed font-normal">
                          {requestFeedbackMsg || (
                            lang === 'it'
                              ? 'La scheda ufficiale verrà presto elaborata e riceverai news alla email indicata (controlla anche lo spam).'
                              : 'The official dossier will soon be processed and you will receive news at the specified email (check your spam folder too).'
                          )}
                        </p>
                      </div>
                      {requestEmail && !unsubscribeDone && (
                        <button
                          type="button"
                          disabled={isUnsubscribing}
                          onClick={handleQuickUnsubscribe}
                          className="text-[11px] text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer block mx-auto disabled:opacity-50"
                        >
                          {isUnsubscribing ? t('unsubscribeSubmitting') : t('unsubscribeSearchBarAction')}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setQuery('');
                          setRequestSuccess(false);
                          setUnsubscribeDone(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors shadow-2xs cursor-pointer mt-1"
                      >
                        {lang === 'it' ? 'Chiudi' : 'Close'}
                      </button>
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
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-left pt-0.5 leading-tight">
                        {lang === 'it'
                          ? '🔒 Email usata esclusivamente per notificare la pubblicazione (GDPR • zero spam).'
                          : '🔒 Email is strictly used for publication alert (GDPR compliant • no spam).'}
                      </p>
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
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 hover:bg-[#E8F1F2]/70 dark:hover:bg-zinc-800 text-left transition-colors border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-xs text-zinc-900 dark:text-white group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors">
                            {ap.iata}
                          </span>
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {lang === 'it' ? ap.city_it : ap.city_en}
                          </span>
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
    </div>
  );
}
