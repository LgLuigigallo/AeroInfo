'use client';

import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { getAirportFaqStructuredData } from '@/lib/seo/structured-data';
import type { Airport, Language } from '@/types/airport';

interface AirportFaqSectionProps {
  airport: Airport;
  lang: Language;
}

/**
 * Ultra-clean, minimalist FAQ accordion section for airport pages.
 * Rendered using native semantic <details> and <summary> tags for
 * maximum accessibility, zero JS blocking time, and 100% alignment with
 * Schema.org FAQPage structured data for Google Search.
 */
export function AirportFaqSection({ airport, lang }: AirportFaqSectionProps) {
  const isItalian = lang === 'it';
  const displayName = (isItalian ? airport.name_it : airport.name_en) || airport.iata;
  const faqData = getAirportFaqStructuredData(airport, lang);
  const faqs = faqData.mainEntity;

  if (!faqs || faqs.length === 0) return null;

  return (
    <section aria-label={isItalian ? 'Domande frequenti' : 'Frequently asked questions'} className="w-full pt-4 space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#05668D] dark:text-[#5EAAA8]" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {isItalian ? `Domande frequenti su ${displayName}` : `FAQs — ${displayName}`}
          </h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline">
          {isItalian ? 'Fonti ufficiali verificate' : 'Verified official sources'}
        </span>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq) => (
          <details
            key={faq.name}
            className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/70 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all duration-200"
          >
            <summary className="flex items-center justify-between gap-3 text-left font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none select-none">
              <span className="group-hover:text-[#05668D] dark:group-hover:text-[#5EAAA8] transition-colors leading-snug">
                {faq.name}
              </span>
              <span className="w-6 h-6 rounded-full bg-[#E8F1F2]/70 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0 group-hover:bg-[#05668D] group-hover:text-white transition-colors">
                <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform duration-200" />
              </span>
            </summary>
            <div className="pt-3.5 mt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed animate-in fade-in duration-200">
              <p>{faq.acceptedAnswer.text}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
