'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Check, X, Settings2, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const COOKIE_STORAGE_KEY = 'aeroinfo_cookie_consent_v1';

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  timestamp: string;
}

export function CookieConsent() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        // Show banner after brief delay for smooth entrance
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsEnabled(Boolean(parsed.analytics));
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: parsed.analytics ? 'granted' : 'denied',
          });
        }
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Listen to open-cookie-settings event from footer or anywhere in the app
  useEffect(() => {
    const handleOpenSettings = () => {
      setIsModalOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const savePreferences = (analytics: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore local storage errors
    }
    setAnalyticsEnabled(analytics);
    setIsOpen(false);
    setIsModalOpen(false);

    // Synchronize with Google Consent Mode v2
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => savePreferences(true);
  const handleAcceptEssential = () => savePreferences(false);
  const handleSaveCustom = () => savePreferences(analyticsEnabled);

  return (
    <>
      {/* Floating Bottom Banner for First-Time Visitors */}
      {isOpen && !isModalOpen && (
        <aside
          aria-label="Informativa Cookie"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-3.5 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                    {t('cookieBannerTitle')}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">
                    GDPR & ePrivacy Compliant
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAcceptEssential}
                aria-label="Chiudi e accetta solo necessari"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t('cookieBannerDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline text-left sm:text-center py-1 cursor-pointer"
              >
                {t('cookieCustomize')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  {t('cookieAcceptEssential')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs cursor-pointer"
                >
                  {t('cookieAcceptAll')}
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal (Opens via Customize button or Footer link) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                    {t('cookieBannerTitle')}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {lang === 'it' ? 'Gestisci le tue preferenze di consenso' : 'Manage your consent preferences'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-3">
              {/* Category 1: Essential (Always active) */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-xs text-zinc-900 dark:text-white">
                      {t('cookieEssentialTitle')}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                    {lang === 'it' ? 'Sempre attivo' : 'Always active'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('cookieEssentialDesc')}
                </p>
              </div>

              {/* Category 2: Anonymous Analytics (Optional) */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-xs text-zinc-900 dark:text-white">
                      {t('cookieAnalyticsTitle')}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('cookieAnalyticsDesc')}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                {t('cookieAcceptEssential')}
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  {t('cookieSavePreferences')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  {t('cookieAcceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
