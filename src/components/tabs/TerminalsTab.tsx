'use client';

import React, { useState } from 'react';
import { Layers, Search } from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface TerminalsTabProps {
  airport: Airport;
}

export function TerminalsTab({ airport }: TerminalsTabProps) {
  const { lang, t } = useLanguage();
  const [airlineFilter, setAirlineFilter] = useState('');

  const filteredAirlines = airport.airlines.filter((item) => {
    if (!airlineFilter.trim()) return true;
    const q = airlineFilter.toLowerCase().trim();
    return (
      item.airlineName.toLowerCase().includes(q) ||
      item.iataCode.toLowerCase().includes(q) ||
      item.terminal.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Terminals Overview & Transfers */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
          {t('interTerminalTransfers')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {airport.terminals.map((term) => (
            <div
              key={term.id}
              className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-white border border-zinc-700">
                    {term.name.replace(/[^0-9A-Za-z]/g, '').slice(0, 3)}
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
                    {term.name}
                  </h4>
                </div>
                {term.isUnverified && <UnverifiedBadge />}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {lang === 'it' ? term.transferInfo_it : term.transferInfo_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable Airline Directory */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            {lang === 'it' ? 'Elenco Compagnie & Terminal' : 'Airlines & Terminals Directory'}
          </h3>

          {/* Filter Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={airlineFilter}
              onChange={(e) => setAirlineFilter(e.target.value)}
              placeholder={t('searchAirlinePlaceholder')}
              className="w-full pl-8.5 pr-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all font-mono"
            />
          </div>
        </div>

        {/* Airline Flight Board Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">{t('airlineTableColName')}</th>
                  <th className="py-2.5 px-4">{t('airlineTableColCode')}</th>
                  <th className="py-2.5 px-4">{t('airlineTableColTerminal')}</th>
                  <th className="py-2.5 px-4">{t('airlineTableColCheckin')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80 text-zinc-800 dark:text-zinc-200">
                {filteredAirlines.length > 0 ? (
                  filteredAirlines.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold flex items-center gap-2">
                        <span>{item.airlineName}</span>
                        {item.isUnverified && <UnverifiedBadge />}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.iataCode}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-zinc-900 dark:text-white">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-[11px] font-mono">
                          {item.terminal}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                        {item.checkInZone || '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-zinc-400 font-mono">
                      {t('noAirlinesFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
