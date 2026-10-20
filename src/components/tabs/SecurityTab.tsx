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
  X
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
    <div className="space-y-6">
      {/* Top Banner: 3D Scanner Hero Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        sec.has3DScanners
          ? 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-950/20 dark:border-emerald-800/40'
          : 'bg-amber-500/5 border-amber-500/20 dark:bg-amber-950/20 dark:border-amber-800/40'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              sec.has3DScanners
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
            }`}>
              {sec.has3DScanners ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <AlertTriangle className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                  sec.has3DScanners
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
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
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {lang === 'it' ? sec.scannersNote_it : sec.scannersNote_en}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Liquids & Electronics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Liquids Policy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Droplet className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
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

          <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            !sec.liquidsMustBeRemoved
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
          }`}>
            {!sec.liquidsMustBeRemoved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('liquidsKeepInBag')}</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{t('liquidsMustRemove')}</span>
              </>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {lang === 'it' ? sec.liquidsAllowance_it : sec.liquidsAllowance_en}
          </p>
        </div>

        {/* Electronics Policy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                {t('electronicsTitle')}
              </h4>
            </div>
            {sec.electronicsUnverified && (
              <UnverifiedBadge />
            )}
          </div>

          <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            sec.electronicsInBag
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
          }`}>
            {sec.electronicsInBag ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('electronicsInBagText')}</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{t('electronicsOutText')}</span>
              </>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {lang === 'it' ? sec.electronicsNote_it : sec.electronicsNote_en}
          </p>
        </div>
      </div>

      {/* Grid: Drones & Powerbanks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Drone Policy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
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

          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-md font-semibold ${
              sec.droneAllowedInCabin
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {lang === 'it' ? 'Bagaglio a Mano: CONSENTITO' : 'Cabin Luggage: ALLOWED'}
            </span>
            <span className={`px-2.5 py-1 rounded-md font-semibold ${
              sec.droneAllowedInHold
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {lang === 'it' ? 'Stiva: VIETATO' : 'Hold: FORBIDDEN'}
            </span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {lang === 'it' ? sec.dronePolicy_it : sec.dronePolicy_en}
          </p>
        </div>

        {/* Powerbank Policy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                {t('powerbanksTitle')}
              </h4>
            </div>
            {sec.powerbankUnverified && (
              <UnverifiedBadge />
            )}
          </div>

          <div className="inline-block px-2.5 py-1 rounded-md font-semibold text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            {lang === 'it' ? `Limite max standard: ${sec.maxPowerbankWh}Wh` : `Standard max limit: ${sec.maxPowerbankWh}Wh`}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {lang === 'it' ? sec.powerbankPolicy_it : sec.powerbankPolicy_en}
          </p>
        </div>
      </div>

      {/* Verification footer with official link */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-2 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span>{t('verifiedDate')}:</span>
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            {sec.lastVerifiedDate}
          </span>
        </div>

        <a
          href={sec.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-neutral-900 dark:text-white hover:underline"
        >
          <span>{t('officialSourceLink')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
