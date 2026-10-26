'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, Plane, Info, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10 px-4 sm:px-6 text-zinc-500 dark:text-zinc-400 text-xs transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Info & Sync Notice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-900 dark:text-white text-xs mb-1">
                {lang === 'it' ? 'Sincronizzazione Giornaliera Automatica (24h)' : 'Daily Automated Sync (24h)'}
              </h5>
              <p className="leading-relaxed text-[11px] text-zinc-600 dark:text-zinc-400">
                {t('weeklyUpdateNotice')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="font-bold text-zinc-900 dark:text-white text-xs mb-1 flex items-center gap-1.5">
                <span>{lang === 'it' ? 'Legenda Badge' : 'Badge Legend'}</span>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-300 font-bold text-[9px]">
                  i
                </span>
              </h5>
              <p className="leading-relaxed text-[11px] text-zinc-600 dark:text-zinc-400">
                {t('footerDisclaimer')}
              </p>
            </div>
          </div>
        </div>

        {/* Elegant Traveler Advisory Card (Friendly, non-alarmist disclaimer) */}
        <div className="p-4 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1">
            <h6 className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
              {t('travelerAdvisoryTitle')}
            </h6>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              {t('travelerAdvisoryNotice')}
            </p>
          </div>
        </div>

        {/* Bottom copyright and metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 pt-2 text-[11px]">
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 -rotate-45" />
            <span className="font-mono text-[10px] tracking-wide">AeroInfo • Global Airport Intelligence</span>
          </div>
          <div className="font-mono text-[10px] flex flex-wrap items-center gap-2">
            <span>{lang === 'it' ? '© 2026 AeroInfo • Tutti i diritti riservati' : '© 2026 AeroInfo • All rights reserved'}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
                }
              }}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors underline cursor-pointer"
            >
              {t('cookieSettingsLink')}
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link
              href="/privacy"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors underline cursor-pointer"
            >
              {lang === 'it' ? 'Privacy & Cookie Policy' : 'Privacy & Cookie Policy'}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link
              href="/unsubscribe"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors underline cursor-pointer"
            >
              {t('footerUnsubscribe')}
            </Link>
          </div>
        </div>

        {/* Creator Contacts & Feedback Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400 text-[11px] pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5 font-mono text-[10.5px]">
            <Link
              href="/feedback"
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <MessageSquare className="w-3 h-3" />
              <span>{lang === 'it' ? 'Invia commenti & feedback' : 'Send feedback & comments'}</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="mailto:vireontech@gmail.com"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              vireontech@gmail.com
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="https://www.linkedin.com/in/luigigallo12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Luigi Gallo"
              className="text-zinc-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors p-0.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
