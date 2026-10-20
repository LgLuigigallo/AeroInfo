'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface UnverifiedBadgeProps {
  note_it?: string;
  note_en?: string;
  className?: string;
}

export function UnverifiedBadge({ note_it, note_en, className = '' }: UnverifiedBadgeProps) {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const specificNote = lang === 'it' ? note_it : note_en;

  return (
    <>
      {/* Clickable Red "i" Badge */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        aria-label={t('unverifiedBadgeTitle')}
        title={t('unverifiedBadgeTitle')}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 border border-rose-300 dark:border-rose-900/60 hover:bg-rose-500 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-rose-500 text-[10px] font-bold leading-none align-middle cursor-pointer shadow-2xs ${className}`}
      >
        <span className="font-serif italic">i</span>
      </button>

      {/* Accessible Dialog Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="unverified-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 shadow-2xl text-left transform transition-all animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 border border-rose-500/20">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 id="unverified-modal-title" className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {t('unverifiedModalHeading')}
                </h3>
                <span className="inline-block text-[11px] font-mono text-rose-600 dark:text-rose-400">
                  {lang === 'it' ? 'Segnalazione viaggiatori' : 'Traveler report'}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <p className="leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
                {t('unverifiedModalBody')}
              </p>

              {specificNote && (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                  <span className="font-bold block mb-1 text-zinc-900 dark:text-zinc-100 font-sans">
                    {lang === 'it' ? 'Dettaglio segnalato:' : 'Reported detail:'}
                  </span>
                  {specificNote}
                </div>
              )}

              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                {t('unverifiedModalAdvice')}
              </p>
            </div>

            {/* Footer Action */}
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
              >
                {t('closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
