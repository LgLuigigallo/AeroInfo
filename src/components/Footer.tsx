'use client';

import React from 'react';
import { ShieldAlert, RefreshCw, Plane } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 px-4 sm:px-6 text-neutral-500 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Info & Sync Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 dark:text-white text-xs mb-1">
                {lang === 'it' ? 'Sincronizzazione Giornaliera Automatica (24h)' : 'Daily Automated Sync (24h)'}
              </h5>
              <p className="leading-relaxed">
                {t('weeklyUpdateNotice')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 dark:text-white text-xs mb-1 flex items-center gap-1.5">
                <span>{lang === 'it' ? 'Legenda Badge' : 'Badge Legend'}</span>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-300 font-bold text-[9px]">
                  i
                </span>
              </h5>
              <p className="leading-relaxed">
                {t('footerDisclaimer')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 pt-4 text-[11px]">
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 -rotate-45" />
            <span>AeroInfo • Global Airport Traveler Intelligence</span>
          </div>
          <div>
            <span>Next.js • Tailwind CSS • Vercel • Supabase</span>
          </div>
        </div>

        {/* Creator Contacts */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400 text-[11px] pt-1">
          <div className="flex items-center gap-2.5">
            <a
              href="mailto:lg.luigigallo@gmail.com"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              lg.luigigallo@gmail.com
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <a
              href="https://www.linkedin.com/in/luigigallo12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Luigi Gallo"
              className="text-neutral-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors p-0.5"
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
