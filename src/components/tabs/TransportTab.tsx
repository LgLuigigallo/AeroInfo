'use client';

import React from 'react';
import { Train, Bus, Car, Navigation, Clock, Coins, MapPin } from 'lucide-react';
import { Airport, TransportType } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface TransportTabProps {
  airport: Airport;
}

export function TransportTab({ airport }: TransportTabProps) {
  const { lang, t } = useLanguage();

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case 'train':
        return <Train className="w-4 h-4 text-indigo-500" />;
      case 'metro':
        return <Navigation className="w-4 h-4 text-rose-500" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-blue-500" />;
      case 'taxi':
      case 'rideshare':
        return <Car className="w-4 h-4 text-amber-500" />;
      default:
        return <Train className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {(airport.transports || []).map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/80 dark:border-zinc-700/80">
                  {getTransportIcon(item.type)}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                    {lang === 'it' ? item.name_it : item.name_en}
                  </h4>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {item.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white">
                      <Coins className="w-3 h-3 text-zinc-400" />
                      {item.estimatedCost}
                    </span>
                  </div>
                </div>
              </div>

              {item.isUnverified && <UnverifiedBadge />}
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-zinc-400 font-mono font-bold block uppercase tracking-wider text-[10px]">
                    {t('pickupPoint')}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium text-[11px]">
                    {lang === 'it' ? item.pickupLocation_it : item.pickupLocation_en}
                  </span>
                </div>
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
