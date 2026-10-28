'use client';

import React from 'react';
import { Zap, Wifi, Droplets, Moon, PackageCheck, Cigarette, MapPin, AlertCircle } from 'lucide-react';
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
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'wifi':
        return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'water_refill':
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'quiet_area':
        return <Moon className="w-4 h-4 text-purple-500" />;
      case 'luggage_storage':
        return <PackageCheck className="w-4 h-4 text-emerald-500" />;
      case 'smoking_area':
        return <Cigarette className="w-4 h-4 text-zinc-400" />;
      default:
        return <Zap className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getAvailabilityBadge = (avail?: 'abundant' | 'moderate' | 'scarce') => {
    if (!avail) return null;
    if (avail === 'abundant') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{t('availabilityAbundant')}</span>
        </span>
      );
    }
    if (avail === 'moderate') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>{t('availabilityModerate')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        <span>{t('availabilityScarce')}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {(airport.amenities || []).map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/80 dark:border-zinc-700/80">
                  {getAmenityIcon(item.category)}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                    {lang === 'it' ? item.title_it : item.title_en}
                  </h4>
                  {item.terminal && (
                    <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
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
              <div className={`p-2.5 rounded-lg text-xs leading-relaxed border ${
                item.availability === 'scarce'
                  ? 'bg-rose-500/5 text-rose-900 border-rose-500/20 dark:text-rose-200'
                  : item.availability === 'abundant'
                  ? 'bg-emerald-500/5 text-emerald-900 border-emerald-500/20 dark:text-emerald-200'
                  : 'bg-amber-500/5 text-amber-900 border-amber-500/20 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-0.5 text-[11px] font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t('scarcityWarning')}</span>
                </div>
                <p className="text-[11px]">
                  {lang === 'it' ? item.scarcityNote_it : item.scarcityNote_en}
                </p>
              </div>
            )}

            {/* Exact Location Card */}
            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono font-bold mb-0.5 uppercase tracking-wider text-[10px]">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{lang === 'it' ? 'Posizione esatta verificata' : 'Exact Verified Location'}</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed block text-[11px]">
                  {lang === 'it' ? item.location_it : item.location_en}
                </span>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px] pt-0.5">
                {lang === 'it' ? item.details_it : item.details_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
