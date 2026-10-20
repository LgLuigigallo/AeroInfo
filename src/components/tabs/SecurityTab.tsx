'use client';

import React from 'react';
import { 
  Droplet, 
  Laptop, 
  BatteryCharging, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  X, 
  Split 
} from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface SecurityTabProps {
  airport: Airport;
}

export function SecurityTab({ airport }: SecurityTabProps) {
  const { lang, t } = useLanguage();
  const { securityPolicy: sec } = airport;

  return (
    <div className="space-y-5">
      {/* Top Banner: 3D Scanner Regulation Directive */}
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

      {/* Terminal-by-Terminal Breakdown (When different rules apply per terminal) */}
      {sec.terminalRules && sec.terminalRules.length > 0 && (
        <div className="space-y-3 p-4 sm:p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Split className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
              {t('terminalRulesTitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sec.terminalRules.map((rule, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-lg bg-white dark:bg-zinc-900 border transition-all ${
                  rule.has3DScanners
                    ? 'border-emerald-500/30'
                    : 'border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                    {rule.terminalName}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
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
