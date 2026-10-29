'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-auto w-full py-6 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-[#E8F1F2] dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 text-xs transition-colors">
      <div className="w-full flex flex-col gap-2.5">
        
        {/* Linea 1: Brand / Info sincronizzazione & Link Legali/Navigazione */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Plane className="w-3.5 h-3.5 -rotate-45 text-[#05668D] dark:text-[#5EAAA8]" />
            <span className="font-bold text-zinc-800 dark:text-zinc-200">AeroInfo</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {lang === 'it' ? 'Fonti ufficiali verificate ogni 24h' : 'Official sources verified every 24h'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <Link
              href="/privacy"
              className="hover:text-[#05668D] dark:hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              Privacy & Cookie
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
                }
              }}
              className="hover:text-[#05668D] dark:hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              {t('cookieSettingsLink')}
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link
              href="/unsubscribe"
              className="hover:text-[#05668D] dark:hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              {t('footerUnsubscribe')}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#05668D] dark:hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Linea 2: Copyright & Contatti/Feedback */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-mono text-[10.5px] text-zinc-400 dark:text-zinc-500">
          <div>
            <span>{lang === 'it' ? '© 2026 AeroInfo • Tutti i diritti riservati' : '© 2026 AeroInfo • All rights reserved'}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/feedback"
              className="inline-flex items-center gap-1 hover:text-[#05668D] dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#5EAAA8]" />
              <span>Feedback</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="mailto:vireontech@gmail.com"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
            >
              vireontech@gmail.com
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="https://www.linkedin.com/in/luigigallo12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 hover:text-[#05668D] dark:hover:text-[#5EAAA8] transition-colors p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#05668D]"
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
