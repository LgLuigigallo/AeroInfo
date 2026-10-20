'use client';

import React from 'react';
import { Zap, Wifi, Droplets, Moon, PackageCheck, Cigarette } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {airport.amenities.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3"
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

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-400 font-semibold block mb-0.5 uppercase tracking-wider text-[10px]">
                  {lang === 'it' ? 'Posizione esatta' : 'Exact Location'}
                </span>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium">
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
