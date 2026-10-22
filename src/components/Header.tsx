'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, ShieldCheck, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface HeaderProps {
  onResetHome?: () => void;
}

export function Header({ onResetHome }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  const handleBrandClick = () => {
    if (onResetHome) {
      onResetHome();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        {/* Brand with Aeronautical Styling */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-3 text-left cursor-pointer group"
          title={lang === 'it' ? 'Torna alla pagina iniziale' : 'Return to home page'}
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-xs ring-1 ring-zinc-900/10 dark:ring-white/20 group-hover:scale-105 transition-transform">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white leading-none group-hover:underline">
                Aero<span className="text-zinc-400 dark:text-zinc-500 font-light">Info</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
            </div>
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-400 block mt-0.5">
              Airport Intelligence
            </span>
          </div>
        </button>

        {/* Right Actions: Official Source Tag & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Official Verification Tag */}
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono text-[11px] tracking-tight">{t('verifiedOfficial')}</span>
          </div>

          {/* Feedback Link */}
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-mono text-[11px] tracking-tight">{lang === 'it' ? 'Feedback' : 'Feedback'}</span>
          </Link>

          {/* Minimalist Segmented Language Switcher */}
          <div className="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLang('it')}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                lang === 'it'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/50 dark:border-zinc-700/50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/50 dark:border-zinc-700/50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
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
