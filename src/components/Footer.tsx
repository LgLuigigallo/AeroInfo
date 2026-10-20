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
                {lang === 'it' ? 'Sincronizzazione Settimanale Automatica' : 'Weekly Automated Sync'}
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
      </div>
    </footer>
  );
}
