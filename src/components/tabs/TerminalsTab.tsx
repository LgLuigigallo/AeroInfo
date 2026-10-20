'use client';

import React, { useState } from 'react';
import { Layers, Plane, Search, ArrowRightLeft } from 'lucide-react';
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
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          {t('interTerminalTransfers')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {airport.terminals.map((term) => (
            <div
              key={term.id}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-900 dark:text-white">
                    {term.name.replace(/[^0-9A-Za-z]/g, '').slice(0, 3)}
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                    {term.name}
                  </h4>
                </div>
                {term.isUnverified && <UnverifiedBadge />}
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'it' ? term.transferInfo_it : term.transferInfo_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable Airline Directory */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            {lang === 'it' ? 'Elenco Compagnie & Terminal' : 'Airlines & Terminals Directory'}
          </h3>

          {/* Filter Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={airlineFilter}
              onChange={(e) => setAirlineFilter(e.target.value)}
              placeholder={t('searchAirlinePlaceholder')}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Airline Table */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-850/60 border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-400 uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">{t('airlineTableColName')}</th>
                  <th className="py-3 px-4">{t('airlineTableColCode')}</th>
                  <th className="py-3 px-4">{t('airlineTableColTerminal')}</th>
                  <th className="py-3 px-4">{t('airlineTableColCheckin')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
                {filteredAirlines.length > 0 ? (
                  filteredAirlines.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                      <td className="py-3 px-4 font-medium flex items-center gap-2">
                        <span>{item.airlineName}</span>
                        {item.isUnverified && <UnverifiedBadge />}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        {item.iataCode}
                      </td>
                      <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
                          {item.terminal}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">
                        {item.checkInZone || '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-neutral-400">
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
