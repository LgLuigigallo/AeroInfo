'use client';

import React from 'react';
import { Plane, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Language } from '@/types/airport';

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 shadow-xs">
            <Plane className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white block leading-none">
              Aero<span className="text-neutral-400 font-light">Info</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 block mt-0.5">
              Airport Intelligence
            </span>
          </div>
        </div>

        {/* Right Actions: Official Source Tag & Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('verifiedOfficial')}</span>
          </div>

          {/* Minimal Language Switcher */}
          <div className="flex items-center rounded-xl bg-neutral-100 dark:bg-neutral-900 p-0.5 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('it')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'it'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
