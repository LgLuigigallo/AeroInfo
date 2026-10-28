'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled admin console error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between p-6 sm:p-10 font-sans">
      <main className="max-w-md mx-auto w-full text-center py-20 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">
            CONSOLE AMMINISTRAZIONE • ERRORE TEMPORANEO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white pt-2">
            Sessione interrotta
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Si è verificato un errore durante l&apos;esecuzione dell&apos;operazione di amministrazione.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#05668D] text-white hover:bg-[#5EAAA8] font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Riprova operazione</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Torna al sito</span>
          </Link>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-zinc-600 font-mono">
        AeroInfo Control Room
      </footer>
    </div>
  );
}
