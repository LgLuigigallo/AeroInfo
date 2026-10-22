'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit3, Send, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';

interface SuggestAirportEditModalProps {
  airport: Airport;
  isOpen: boolean;
  onClose: () => void;
  onSuggestionSubmitted?: () => void;
}

export function SuggestAirportEditModal({
  airport,
  isOpen,
  onClose,
  onSuggestionSubmitted
}: SuggestAirportEditModalProps) {
  const { lang } = useLanguage();

  const [category, setCategory] = useState<'3d_scanners' | 'liquids' | 'drones' | 'power_outlets' | 'terminals' | 'dining' | 'other'>('3d_scanners');
  const [details, setDetails] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: '3d_scanners', label_it: 'Scanner 3D (liquidi in borsa)', label_en: '3D Scanners (liquids in bag)' },
    { id: 'liquids', label_it: 'Regolamento Liquidi (100ml / bottiglie)', label_en: 'Liquids Allowance' },
    { id: 'drones', label_it: 'Regole Droni (cabina / stiva)', label_en: 'Drone Rules' },
    { id: 'power_outlets', label_it: 'Prese di ricarica & USB', label_en: 'Power Outlets & USB' },
    { id: 'terminals', label_it: 'Terminal & Porte di imbarco', label_en: 'Terminals & Gates' },
    { id: 'dining', label_it: 'Ristoranti / Negozi / Prezzi', label_en: 'Dining & Shops' },
    { id: 'other', label_it: 'Altro / Suggerimento generico', label_en: 'Other / General Note' },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (details.trim().length < 5) {
      setErrorMsg(lang === 'it' ? 'Inserisci almeno 5 caratteri di descrizione.' : 'Please enter at least 5 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/airports/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          iata: airport.iata,
          category,
          details: details.trim(),
          sourceUrl: sourceUrl.trim() || undefined,
          email: email.trim() || undefined
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message_it || data.error || (lang === 'it' ? 'Errore durante l\'invio.' : 'Error sending suggestion.'));
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      if (onSuggestionSubmitted) {
        onSuggestionSubmitted();
      }
    } catch {
      setErrorMsg(lang === 'it' ? 'Errore di connessione. Riprova più tardi.' : 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setDetails('');
    setSourceUrl('');
    setEmail('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-left transform transition-all animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Chiudi"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {lang === 'it' ? 'Suggerimento Ricevuto!' : 'Suggestion Received!'}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto leading-relaxed">
                {lang === 'it'
                  ? `Grazie! La tua proposta per ${airport.name_it} (${airport.iata}) è stata registrata in background. Verrà verificata con le fonti ufficiali durante il prossimo aggiornamento automatico.`
                  : `Thank you! Your proposed edit for ${airport.name_en} (${airport.iata}) has been queued in the background and will be verified against official sources during the next sync cycle.`}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs"
              >
                {lang === 'it' ? 'Chiudi' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {lang === 'it' ? 'Suggerisci una Modifica' : 'Suggest an Update'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  {airport.iata} • {lang === 'it' ? airport.name_it : airport.name_en}
                </p>
              </div>
            </div>

            {/* Explanatory Info Card */}
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                {lang === 'it'
                  ? 'I suggerimenti non vengono applicati direttamente per garantire l\'accuratezza delle informazioni: vengono inseriti in background e verificati automaticamente sui portali ufficiali dell\'aeroporto.'
                  : 'Suggestions are not directly published to ensure data accuracy: they are queued in the background and verified against official airport portals during scheduled updates.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {lang === 'it' ? 'Ambito della modifica:' : 'Area to update:'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {lang === 'it' ? cat.label_it : cat.label_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {lang === 'it' ? 'Cosa è cambiato / Dettagli:' : 'What changed / Details:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={lang === 'it' ? 'Es. Al Terminal 2 sono attivi i nuovi scanner TC, non serve più estrarre i liquidi...' : 'E.g. New CT scanners are operating in Terminal 2, liquids can stay inside bag...'}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans resize-none"
                />
              </div>

              {/* Source URL (optional) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {lang === 'it' ? 'Fonte o link ufficiale (opzionale):' : 'Official source or link (optional):'}
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {lang === 'it' ? 'La tua email (opzionale per ricevere aggiornamenti):' : 'Your email (optional to receive updates):'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@email.com"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
                />
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 pt-1 leading-tight">
                  {lang === 'it' ? '🔒 Utilizzata esclusivamente per notificare la verifica della modifica (GDPR • zero spam).' : '🔒 Strictly used to notify you once the suggestion is verified (GDPR • no spam).'}
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {lang === 'it' ? 'Annulla' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === 'it' ? 'Invio in corso...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'it' ? 'Invia Suggerimento' : 'Send Suggestion'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
