'use client';

import React from 'react';
import { Zap, Wifi, Droplets, Moon, PackageCheck, Cigarette, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Airport, AmenityCategory } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface AmenitiesTabProps {
  airport: Airport;
}

export function AmenitiesTab({ airport }: AmenitiesTabProps) {
  const { lang, t } = useLanguage();

  const getAmenityIcon = (cat: AmenityCategory) => {
    switch (cat) {
      case 'power_charging':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'wifi':
        return <Wifi className="w-5 h-5 text-blue-500" />;
      case 'water_refill':
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      case 'quiet_area':
        return <Moon className="w-5 h-5 text-purple-500" />;
      case 'luggage_storage':
        return <PackageCheck className="w-5 h-5 text-emerald-500" />;
      case 'smoking_area':
        return <Cigarette className="w-5 h-5 text-neutral-500" />;
      default:
        return <Zap className="w-5 h-5 text-neutral-500" />;
    }
  };

  const getAvailabilityBadge = (avail?: 'abundant' | 'moderate' | 'scarce') => {
    if (!avail) return null;
    if (avail === 'abundant') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{t('availabilityAbundant')}</span>
        </span>
      );
    }
    if (avail === 'moderate') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>{t('availabilityModerate')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        <span>{t('availabilityScarce')}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {airport.amenities.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  {getAmenityIcon(item.category)}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    {lang === 'it' ? item.title_it : item.title_en}
                  </h4>
                  {item.terminal && (
                    <span className="text-[11px] font-medium text-neutral-400 block mt-0.5">
                      {item.terminal}
                    </span>
                  )}
                </div>
              </div>

              {item.isUnverified && (
                <UnverifiedBadge 
                  note_it={(item as any).details_it_unverified}
                  note_en={(item as any).details_en_unverified}
                />
              )}
            </div>

            {/* Density Availability Badge */}
            {item.availability && (
              <div className="pt-0.5">
                {getAvailabilityBadge(item.availability)}
              </div>
            )}

            {/* Scarcity / Availability Critical Notice */}
            {(item.scarcityNote_it || item.scarcityNote_en) && (
              <div className={`p-3 rounded-xl text-xs leading-relaxed border ${
                item.availability === 'scarce'
                  ? 'bg-rose-50/80 text-rose-950 border-rose-200/80 dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-900/60'
                  : item.availability === 'abundant'
                  ? 'bg-emerald-50/80 text-emerald-950 border-emerald-200/80 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900/60'
                  : 'bg-amber-50/80 text-amber-950 border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900/60'
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t('scarcityWarning')}</span>
                </div>
                <p>
                  {lang === 'it' ? item.scarcityNote_it : item.scarcityNote_en}
                </p>
              </div>
            )}

            {/* Exact Location Card */}
            <div className="space-y-1.5 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'it' ? 'Posizione esatta verificata' : 'Exact Verified Location'}</span>
                </div>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed block">
                  {lang === 'it' ? item.location_it : item.location_en}
                </span>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                {lang === 'it' ? item.details_it : item.details_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
