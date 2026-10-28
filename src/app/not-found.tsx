import Link from 'next/link';
import { Compass, ArrowLeft, Plane } from 'lucide-react';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-6 sm:p-10 font-sans">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-zinc-900 dark:text-white group">
          <div className="w-8 h-8 rounded-lg bg-[#05668D] text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
          <span>Aero<span className="text-[#05668D] dark:text-[#5EAAA8]">Info</span></span>
        </Link>
      </header>

      <main className="max-w-md mx-auto w-full text-center py-20 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] mx-auto flex items-center justify-center shadow-xs">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            404 • PAGINA NON TROVATA
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white pt-2">
            Rotta non disponibile
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            La pagina o l&apos;aeroporto che stai cercando non sembra esistere oppure è stato trasferito a un nuovo indirizzo.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#05668D] text-white hover:bg-[#5EAAA8] font-bold text-xs transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cerca aeroporto (Italiano)</span>
          </Link>

          <Link
            href="/en"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 font-semibold text-xs transition-all"
          >
            <span>Search Airport (English)</span>
          </Link>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        AeroInfo • Global Airport Intelligence & traveler security guide
      </footer>
    </div>
  );
}
