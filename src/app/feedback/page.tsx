'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plane, ArrowLeft, Send, CheckCircle2, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { Footer } from '@/components/Footer';

function FeedbackContent() {
  const { lang } = useLanguage();

  const [category, setCategory] = useState<'suggestion' | 'bug_report' | 'inquiry' | 'general'>('suggestion');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { id: 'suggestion', label_it: '💡 Suggerimento o nuova funzionalità', label_en: '💡 Suggestion or new feature' },
    { id: 'bug_report', label_it: '🐞 Segnalazione di un errore / bug', label_en: '🐞 Bug report' },
    { id: 'inquiry', label_it: '❓ Richiesta di informazioni', label_en: '❓ General inquiry' },
    { id: 'general', label_it: '💬 Commento o recensione generale', label_en: '💬 General feedback / review' },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (subject.trim().length < 2) {
      setErrorMsg(lang === 'it' ? 'Inserisci un oggetto valido.' : 'Please enter a subject.');
      return;
    }

    if (message.trim().length < 5) {
      setErrorMsg(lang === 'it' ? 'Il messaggio deve contenere almeno 5 caratteri.' : 'Message must be at least 5 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          subject: subject.trim(),
          message: message.trim(),
          name: name.trim() || undefined,
          email: email.trim() || undefined
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message_it || data.error || (lang === 'it' ? 'Errore durante l\'invio.' : 'Error submitting feedback.'));
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrorMsg(lang === 'it' ? 'Errore di connessione. Riprova più tardi.' : 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubject('');
    setMessage('');
    setName('');
    setEmail('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-zinc-900 dark:text-white group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <Plane className="w-4 h-4 -rotate-45" />
            </div>
            <span>Aero<span className="text-blue-600 dark:text-blue-400">Info</span></span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'it' ? 'Torna agli aeroporti' : 'Back to airports'}</span>
          </Link>
        </header>

        {/* Content Card */}
        <main className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                  {lang === 'it' ? 'Messaggio inviato con successo!' : 'Feedback submitted successfully!'}
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {lang === 'it'
                    ? 'Grazie per il tuo contributo. Ogni commento e suggerimento aiuta a rendere AeroInfo sempre più utile e accurato per tutti i viaggiatori.'
                    : 'Thank you for your feedback. Every note helps make AeroInfo more accurate and useful for all travelers.'}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {lang === 'it' ? 'Invia un altro messaggio' : 'Send another note'}
                </button>
                <Link
                  href="/"
                  className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
                >
                  {lang === 'it' ? 'Torna alla Home' : 'Back to Home'}
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header section */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {lang === 'it' ? 'Invia Info e Commenti' : 'Feedback & General Inquiries'}
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {lang === 'it'
                      ? 'Hai trovato un problema, desideri proporre una nuova funzione o richiedere informazioni su AeroInfo? Scrivici direttamente.'
                      : 'Noticed a bug, have a feature suggestion, or want to ask general information? Reach out to us.'}
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Category selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {lang === 'it' ? 'Tipo di messaggio:' : 'Feedback Category:'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'it' ? c.label_it : c.label_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {lang === 'it' ? 'Oggetto:' : 'Subject:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={lang === 'it' ? 'Es. Proposta aggiunta aeroporti asiatici' : 'E.g. Suggestion for Asian airports'}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {lang === 'it' ? 'Messaggio:' : 'Message:'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'it' ? 'Scrivi qui il tuo messaggio o commento...' : 'Write your comments or thoughts here...'}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans resize-none"
                  />
                  <div className="flex justify-end text-[10px] text-zinc-400 font-mono mt-1">
                    {message.length}/3000
                  </div>
                </div>

                {/* Grid for Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      {lang === 'it' ? 'Nome o Nickname (opzionale):' : 'Name or Nickname (optional):'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'it' ? 'Mario' : 'John'}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      {lang === 'it' ? 'La tua email (opzionale):' : 'Your email (optional):'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mario@email.com"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* GDPR transparency note */}
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight pt-1">
                  {lang === 'it'
                    ? '🔒 Trasparenza GDPR: l\'email non verrà mai condivisa né utilizzata per scopi pubblicitari. Serve unicamente a ricontattarti in caso di risposta al messaggio.'
                    : '🔒 GDPR transparency: your email is strictly used to reply to your inquiry. No marketing or spam.'}
                </p>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{lang === 'it' ? 'Invio in corso...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === 'it' ? 'Invia Messaggio' : 'Submit Feedback'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <LanguageProvider>
      <FeedbackContent />
    </LanguageProvider>
  );
}
