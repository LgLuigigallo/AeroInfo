'use client';

import React, { useState, useEffect } from 'react';
import { Info, AlertCircle, X, ShieldAlert } from 'lucide-react';
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
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 border border-rose-300 dark:border-rose-900/60 hover:bg-rose-500 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 text-[11px] font-bold leading-none align-middle cursor-pointer shadow-xs ${className}`}
      >
        <span className="font-serif italic text-[10px]">i</span>
      </button>

      {/* Accessible Dialog Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="unverified-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-2xl text-left transform transition-all animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 id="unverified-modal-title" className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {t('unverifiedModalHeading')}
                </h3>
                <span className="inline-block text-xs font-medium text-rose-600 dark:text-rose-400">
                  {lang === 'it' ? 'Segnalazione della community' : 'Community traveler report'}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <p className="leading-relaxed font-medium text-neutral-800 dark:text-neutral-200">
                {t('unverifiedModalBody')}
              </p>

              {specificNote && (
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-xl text-xs text-neutral-700 dark:text-neutral-300">
                  <span className="font-semibold block mb-0.5 text-neutral-900 dark:text-neutral-100">
                    {lang === 'it' ? 'Dettaglio segnalato:' : 'Reported detail:'}
                  </span>
                  {specificNote}
                </div>
              )}

              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('unverifiedModalAdvice')}
              </p>
            </div>

            {/* Footer Action */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
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
