'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plane, ArrowLeft, CheckCircle2, Loader2, BellOff, AlertCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { Footer } from '@/components/Footer';

function UnsubscribeContent() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [iata, setIata] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  useEffect(() => {
    const paramEmail = searchParams.get('email');
    const paramIata = searchParams.get('iata');
    if (paramEmail) {
      setEmail(paramEmail);
    }
    if (paramIata) {
      setIata(paramIata.toUpperCase());
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || email.length < 5) {
      setErrorMsg(
        lang === 'it'
          ? 'Inserisci un indirizzo email valido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/airports/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          iata: iata || undefined
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(
          lang === 'it'
            ? data.message_it || data.error || 'Si è verificato un errore durante la disiscrizione.'
            : data.message_en || data.error || 'An error occurred while unsubscribing.'
        );
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setResultMsg(
        lang === 'it'
          ? data.message_it || t('unsubscribeSuccessDesc')
          : data.message_en || t('unsubscribeSuccessDesc')
      );
    } catch {
      setErrorMsg(
        lang === 'it'
          ? 'Errore di connessione. Riprova più tardi.'
          : 'Network error. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-blue-500/20">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-base hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Plane className="w-4 h-4 -rotate-45" />
            </div>
            <span>AeroInfo</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'it' ? 'Torna alla ricerca' : 'Back to search'}</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Title & Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <BellOff className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                {t('unsubscribeTitle')}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {lang === 'it'
                  ? 'Gestisci o revoca in qualsiasi momento le tue notifiche via email'
                  : 'Manage or revoke your email notification preferences at any time'}
              </p>
            </div>
          </div>

          {isSuccess ? (
            /* Success Feedback View */
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  {t('unsubscribeSuccessTitle')}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {resultMsg || t('unsubscribeSuccessDesc')}
                </p>
                <div className="pt-2 font-mono text-[11px] text-zinc-400">
                  {email}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {t('unsubscribeBackHome')}
                </Link>
              </div>
            </div>
          ) : (
            /* Unsubscribe Form */
            <form onSubmit={handleUnsubscribe} className="pt-6 space-y-5">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t('unsubscribeSubtitle')}
              </p>

              {iata && (
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300">
                  {lang === 'it'
                    ? `Richiesta specifica per aeroporto: ${iata}`
                    : `Specific request for airport: ${iata}`}
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                  {lang === 'it' ? 'Indirizzo Email Registrato' : 'Registered Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('unsubscribeInputPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {lang === 'it'
                  ? 'In conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR), puoi revocare il consenso in qualsiasi momento. La cancellazione rimuove definitivamente il tuo indirizzo email dai trigger di notifica.'
                  : 'In compliance with GDPR, you can revoke consent at any time. Unsubscribing permanently removes your email from notification dispatch triggers.'}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{t('unsubscribeSubmitting')}</span>
                    </>
                  ) : (
                    <>
                      <BellOff className="w-3.5 h-3.5" />
                      <span>{t('unsubscribeBtn')}</span>
                    </>
                  )}
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors"
                >
                  {lang === 'it' ? 'Annulla e torna alla Home' : 'Cancel and return Home'}
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <LanguageProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-500">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
          </div>
        }
      >
        <UnsubscribeContent />
      </Suspense>
    </LanguageProvider>
  );
}
