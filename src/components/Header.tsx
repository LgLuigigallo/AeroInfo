'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, ShieldCheck, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface HeaderProps {
  onResetHome?: () => void;
}

// Crisp, lightweight SVG flag icons for consistent rendering across all platforms
function ItalyFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-2xs overflow-hidden shrink-0 inline-block`} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </svg>
  );
}

function UKFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-2xs overflow-hidden shrink-0 inline-block`} viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <clipPath id="ukClip">
        <rect width="60" height="30" rx="2" />
      </clipPath>
      <g clipPath="url(#ukClip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="3" />
        <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function Header({ onResetHome }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  const handleBrandClick = () => {
    if (onResetHome) {
      onResetHome();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 transition-colors">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-3">
        {/* Brand with Aeronautical Styling */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-3 text-left cursor-pointer group shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05668D] focus-visible:ring-offset-2"
          title={lang === 'it' ? 'Torna alla pagina iniziale' : 'Return to home page'}
        >
          <div className="w-8.5 h-8.5 rounded-xl bg-[#05668D] dark:bg-zinc-100 flex items-center justify-center text-white dark:text-[#05668D] shadow-xs group-hover:scale-105 transition-all">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white leading-none group-hover:underline">
                Aero<span className="text-[#5EAAA8] font-semibold">Info</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
            </div>
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-400 block mt-0.5">
              Airport Intelligence
            </span>
          </div>
        </button>

        {/* Right Actions: Official Source Tag, Feedback & Flag Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Official Verification Tag */}
          <div className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#05668D] dark:text-[#5EAAA8] font-medium px-2.5 py-1.5 rounded-full bg-[#E8F1F2] dark:bg-zinc-900 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
            <span className="font-mono text-[11px] tracking-tight">{t('verifiedOfficial')}</span>
          </div>

          {/* Feedback Link */}
          <Link
            href="/feedback"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:text-[#05668D] dark:hover:text-white font-medium px-2.5 py-1.5 rounded-full bg-[#E8F1F2]/60 hover:bg-[#E8F1F2] dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05668D]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
            <span className="font-mono text-[11px] tracking-tight">Feedback</span>
          </Link>

          {/* Minimalist Flag-based Language Switcher */}
          <div 
            className="flex items-center rounded-full bg-[#E8F1F2] dark:bg-zinc-900 p-0.5 shadow-2xs text-xs font-mono"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => setLang('it')}
              aria-pressed={lang === 'it'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05668D] ${
                lang === 'it'
                  ? 'bg-[#05668D] text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
              title="Italiano"
            >
              <ItalyFlagIcon />
              <span className="text-[11px]">IT</span>
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05668D] ${
                lang === 'en'
                  ? 'bg-[#05668D] text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
              title="English"
            >
              <UKFlagIcon />
              <span className="text-[11px]">ENG</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
