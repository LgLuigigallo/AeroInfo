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
        return <Train className="w-5 h-5 text-indigo-500" />;
      case 'metro':
        return <Navigation className="w-5 h-5 text-rose-500" />;
      case 'bus':
        return <Bus className="w-5 h-5 text-blue-500" />;
      case 'taxi':
      case 'rideshare':
        return <Car className="w-5 h-5 text-amber-500" />;
      default:
        return <Train className="w-5 h-5 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {airport.transports.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  {getTransportIcon(item.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                    {lang === 'it' ? item.name_it : item.name_en}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-neutral-900 dark:text-white">
                      <Coins className="w-3.5 h-3.5 text-neutral-400" />
                      {item.estimatedCost}
                    </span>
                  </div>
                </div>
              </div>

              {item.isUnverified && <UnverifiedBadge />}
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-neutral-400 font-semibold block uppercase tracking-wider text-[10px]">
                    {t('pickupPoint')}
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                    {lang === 'it' ? item.pickupLocation_it : item.pickupLocation_en}
                  </span>
                </div>
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
