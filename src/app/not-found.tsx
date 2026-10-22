import Link from 'next/link';
import { Compass, ArrowLeft, Plane } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Header Brand */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-zinc-900 dark:text-white group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <span>Aero<span className="text-blue-600 dark:text-blue-400">Info</span></span>
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-md mx-auto w-full text-center py-16 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            ERRORE 404 • ROTTA NON TROVATA
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white pt-2">
            Destinazione non disponibile
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            La pagina o l&apos;aeroporto che stai cercando non sembra esistere oppure è stato spostato verso un altro terminal.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla ricerca aeroporti
          </Link>
        </div>
      </main>

      {/* Footer info */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        AeroInfo • Global Airport Intelligence & traveler security guide
      </footer>
    </div>
  );
}
