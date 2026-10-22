'use client';

import React from 'react';
import { 
  Droplet, 
  Laptop, 
  BatteryCharging, 
  Radio, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  Check, 
  X, 
  Split 
} from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface SecurityTabProps {
  airport: Airport;
  selectedTerminalIdx?: number | null;
  onSelectTerminalIdx?: (idx: number | null) => void;
}

export function SecurityTab({ 
  airport, 
  selectedTerminalIdx: controlledIdx, 
  onSelectTerminalIdx 
}: SecurityTabProps) {
  const { lang, t } = useLanguage();
  const { securityPolicy: sec } = airport;
  const terminalRules = sec.terminalRules;

  const [uncontrolledIdx, setUncontrolledIdx] = React.useState<number | null>(null);
  const selectedIdx = controlledIdx !== undefined ? controlledIdx : uncontrolledIdx;

  const handleSelectIdx = (idx: number | null) => {
    if (onSelectTerminalIdx) {
      onSelectTerminalIdx(idx);
    } else {
      setUncontrolledIdx(idx);
    }
  };

  const hasMultipleTerminals = Boolean(terminalRules && terminalRules.length > 1);
  const hasMixedTerminals = Boolean(
    terminalRules &&
    terminalRules.length > 1 &&
    terminalRules.some((r) => r.has3DScanners) &&
    terminalRules.some((r) => !r.has3DScanners)
  );

  const activeTerminalRule = (selectedIdx !== null && selectedIdx !== undefined && terminalRules && terminalRules[selectedIdx])
    ? terminalRules[selectedIdx]
    : null;

  return (
    <div className="space-y-5">
      {/* Interactive Terminal Filter Bar (When multiple terminals exist) */}
      {hasMultipleTerminals && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/90 dark:border-zinc-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Split className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
                {t('filterByTerminal')}
              </span>
            </div>
            {selectedIdx !== null && (
              <button
                type="button"
                onClick={() => handleSelectIdx(null)}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
              >
                <span>← {t('resetToAllTerminals')}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectIdx(null)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border ${
                selectedIdx === null
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs font-bold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium'
              }`}
            >
              {t('allTerminalsOverview')}
            </button>

            {terminalRules?.map((rule, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectIdx(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs font-bold'
                      : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium'
                  }`}
                >
                  <span>{rule.terminalName.split('(')[0].trim()}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                    rule.has3DScanners
                      ? isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : isSelected ? 'bg-amber-500 text-white' : 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                  }`}>
                    {rule.has3DScanners ? '3D' : '100ml'}
                  </span>
                </button>
              );
            })}
          </div>

          {activeTerminalRule && (
            <div className="pt-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{t('viewingTerminalRules')}</span>
                <strong className="text-zinc-900 dark:text-white font-bold">{activeTerminalRule.terminalName}</strong>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Top Banner: 3D Scanner Regulation Directive */}
      {activeTerminalRule ? (
        /* Filtered terminal view */
        <div className={`p-5 sm:p-6 rounded-xl border transition-all ${
          activeTerminalRule.has3DScanners
            ? 'bg-emerald-500/5 border-emerald-500/25 dark:bg-emerald-950/20 dark:border-emerald-800/40'
            : 'bg-amber-500/5 border-amber-500/25 dark:bg-amber-950/20 dark:border-amber-800/40'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                activeTerminalRule.has3DScanners
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}>
                {activeTerminalRule.has3DScanners ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                    activeTerminalRule.has3DScanners
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                  }`}>
                    {activeTerminalRule.has3DScanners ? t('scanners3DActive') : t('scannersStandard')}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-white">
                    • {activeTerminalRule.terminalName}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {lang === 'it' ? activeTerminalRule.notes_it : activeTerminalRule.notes_en}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : hasMixedTerminals ? (
        /* Mixed terminals overview banner */
        <div className="p-5 sm:p-6 rounded-xl border border-blue-500/30 dark:border-blue-400/30 bg-blue-500/5 dark:bg-blue-950/20 space-y-3 transition-all">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-500/15 text-blue-800 dark:text-blue-200 border border-blue-500/30">
                  {t('rulesVaryByTerminal')}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {t('checkBoardingPassNotice')}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                {lang === 'it' ? sec.scannersNote_it : sec.scannersNote_en}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Standard uniform banner */
        <div className={`p-5 sm:p-6 rounded-xl border transition-all ${
          sec.has3DScanners
            ? 'bg-emerald-500/5 border-emerald-500/25 dark:bg-emerald-950/20 dark:border-emerald-800/40'
            : 'bg-amber-500/5 border-amber-500/25 dark:bg-amber-950/20 dark:border-amber-800/40'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                sec.has3DScanners
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}>
                {sec.has3DScanners ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                    sec.has3DScanners
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                  }`}>
                    {sec.has3DScanners ? t('scanners3DActive') : t('scannersStandard')}
                  </span>
                  {hasMultipleTerminals && (
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      ({lang === 'it' ? 'Valido per tutti i terminal' : 'Valid for all terminals'})
                    </span>
                  )}
                  {sec.liquidsUnverified && (
                    <UnverifiedBadge 
                      note_it={sec.liquidsNote_it} 
                      note_en={sec.liquidsNote_en} 
                    />
                  )}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {lang === 'it' ? sec.scannersNote_it : sec.scannersNote_en}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal-by-Terminal Breakdown (When viewing all terminals) */}
      {selectedIdx === null && terminalRules && terminalRules.length > 0 && (
        <div className="space-y-3 p-4 sm:p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Split className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                {t('terminalRulesTitle')}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              {lang === 'it' ? 'Clicca per isolare le regole del terminal' : 'Click a terminal to filter'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {terminalRules.map((rule, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelectIdx(idx)}
                className={`p-3.5 rounded-lg bg-white dark:bg-zinc-900 border transition-all cursor-pointer hover:shadow-xs group ${
                  rule.has3DScanners
                    ? 'border-emerald-500/30 hover:border-emerald-500/60'
                    : 'border-amber-500/30 hover:border-amber-500/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm group-hover:underline">
                    {rule.terminalName}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    rule.has3DScanners
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                  }`}>
                    {rule.has3DScanners ? t('terminalRule3DActive') : t('terminalRuleTraditional')}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${rule.liquidsAllowedInBag ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {lang === 'it' ? rule.bottleAllowance_it : rule.bottleAllowance_en}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${rule.electronicsInBag ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {rule.electronicsInBag ? t('electronicsInBagBadge') : t('electronicsOutBadge')}
                    </span>
                  </div>
                </div>

                <p className="mt-2.5 pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 leading-relaxed font-sans">
                  {lang === 'it' ? rule.notes_it : rule.notes_en}
                </p>

                <div className="mt-2.5 flex items-center justify-end text-[10px] font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                  <span>{lang === 'it' ? 'Filtra regole di questo terminal →' : 'Filter this terminal rules →'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Liquids & Electronics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Liquids Policy */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Droplet className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                {t('liquidsTitle')}
              </h4>
            </div>
            {sec.liquidsUnverified && (
              <UnverifiedBadge 
                note_it={sec.liquidsNote_it} 
                note_en={sec.liquidsNote_en} 
              />
            )}
          </div>

          {activeTerminalRule ? (
            /* Selected terminal rule view */
            <div className="space-y-2">
              <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                activeTerminalRule.liquidsAllowedInBag
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
              }`}>
                {activeTerminalRule.liquidsAllowedInBag ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('liquidsKeepInBag')}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('liquidsMustRemove')}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {lang === 'it' ? activeTerminalRule.bottleAllowance_it : activeTerminalRule.bottleAllowance_en}
              </p>
            </div>
          ) : hasMixedTerminals ? (
            /* Mixed terminals overview: clear terminal-by-terminal cards (NO false blanket green) */
            <div className="space-y-2.5">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <Split className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{lang === 'it' ? 'La regola dei liquidi varia in base al terminal:' : 'Liquids rule depends on departure terminal:'}</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {terminalRules?.map((rule, idx) => {
                  const inBag = rule.liquidsAllowedInBag ?? rule.has3DScanners;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectIdx(idx)}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all hover:scale-[1.01] ${
                        inBag
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100'
                      }`}
                      title={lang === 'it' ? 'Filtra per questo terminal' : 'Filter by this terminal'}
                    >
                      <span className="font-bold text-xs truncate">
                        {rule.terminalName.split('(')[0].trim()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        inBag ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'bg-amber-600 text-white dark:bg-amber-500 dark:text-zinc-950'
                      }`}>
                        {inBag 
                          ? (lang === 'it' ? '✓ Nel bagaglio' : '✓ In bag')
                          : (lang === 'it' ? '⚠️ Flaconi max 100ml' : '⚠️ Max 100ml')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                {lang === 'it' ? sec.liquidsAllowance_it : sec.liquidsAllowance_en}
              </p>
            </div>
          ) : (
            /* Uniform rule view */
            <>
              <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                !sec.liquidsMustBeRemoved
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
              }`}>
                {!sec.liquidsMustBeRemoved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('liquidsKeepInBag')}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('liquidsMustRemove')}</span>
                  </>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {lang === 'it' ? sec.liquidsAllowance_it : sec.liquidsAllowance_en}
              </p>
            </>
          )}
        </div>

        {/* Electronics Policy */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                {t('electronicsTitle')}
              </h4>
            </div>
            {sec.electronicsUnverified && (
              <UnverifiedBadge />
            )}
          </div>

          {activeTerminalRule ? (
            /* Selected terminal rule view */
            <div className="space-y-2">
              <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                activeTerminalRule.electronicsInBag
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
              }`}>
                {activeTerminalRule.electronicsInBag ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('electronicsInBagText')}</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('electronicsOutText')}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {lang === 'it' ? activeTerminalRule.notes_it : activeTerminalRule.notes_en}
              </p>
            </div>
          ) : hasMixedTerminals ? (
            /* Mixed terminals overview: clear terminal-by-terminal cards (NO false blanket green) */
            <div className="space-y-2.5">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <Split className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{lang === 'it' ? 'I dispositivi elettronici variano in base al terminal:' : 'Electronics policy depends on departure terminal:'}</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {terminalRules?.map((rule, idx) => {
                  const inBag = rule.electronicsInBag ?? rule.has3DScanners;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectIdx(idx)}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all hover:scale-[1.01] ${
                        inBag
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100'
                      }`}
                      title={lang === 'it' ? 'Filtra per questo terminal' : 'Filter by this terminal'}
                    >
                      <span className="font-bold text-xs truncate">
                        {rule.terminalName.split('(')[0].trim()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        inBag ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'bg-amber-600 text-white dark:bg-amber-500 dark:text-zinc-950'
                      }`}>
                        {inBag 
                          ? (lang === 'it' ? '✓ Nel bagaglio' : '✓ In bag')
                          : (lang === 'it' ? '⚠️ Estrarre' : '⚠️ Remove')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                {lang === 'it' ? sec.electronicsNote_it : sec.electronicsNote_en}
              </p>
            </div>
          ) : (
            /* Uniform rule view */
            <>
              <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                sec.electronicsInBag
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
              }`}>
                {sec.electronicsInBag ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('electronicsInBagText')}</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{t('electronicsOutText')}</span>
                  </>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {lang === 'it' ? sec.electronicsNote_it : sec.electronicsNote_en}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Grid: Drones & Powerbanks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Drone Policy */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Radio className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                {t('dronesTitle')}
              </h4>
            </div>
            {sec.droneUnverified && (
              <UnverifiedBadge 
                note_it={sec.droneNote_it} 
                note_en={sec.droneNote_en} 
              />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`px-2 py-0.5 rounded font-semibold ${
              sec.droneAllowedInCabin
                ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20'
            }`}>
              {lang === 'it' ? 'Cabina: AMMESSO' : 'Cabin: ALLOWED'}
            </span>
            <span className={`px-2 py-0.5 rounded font-semibold ${
              sec.droneAllowedInHold
                ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20'
            }`}>
              {lang === 'it' ? 'Stiva: VIETATO' : 'Hold: FORBIDDEN'}
            </span>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {lang === 'it' ? sec.dronePolicy_it : sec.dronePolicy_en}
          </p>
        </div>

        {/* Powerbank Policy */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                {t('powerbanksTitle')}
              </h4>
            </div>
            {sec.powerbankUnverified && (
              <UnverifiedBadge />
            )}
          </div>

          <div className="inline-block px-2 py-0.5 rounded font-mono font-semibold text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60">
            {lang === 'it' ? `Limite max standard: ${sec.maxPowerbankWh}Wh` : `Standard max limit: ${sec.maxPowerbankWh}Wh`}
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {lang === 'it' ? sec.powerbankPolicy_it : sec.powerbankPolicy_en}
          </p>
        </div>
      </div>

      {/* Verification footer with official link */}
      <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2 border-t border-zinc-100 dark:border-zinc-800 font-mono">
        <div className="flex items-center gap-2">
          <span>{t('verifiedDate')}:</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {sec.lastVerifiedDate}
          </span>
        </div>

        <a
          href={sec.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans font-medium text-zinc-900 dark:text-white hover:underline"
        >
          <span>{t('officialSourceLink')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
