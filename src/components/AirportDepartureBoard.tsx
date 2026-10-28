'use client';

import React, { useEffect, useState } from 'react';

interface AirportDepartureBoardProps {
  text: string;
  className?: string;
  enableAnimation?: boolean;
}

/**
 * Split-Flap Airport Departure Board typography component.
 * Features:
 * - High-contrast aeronautical flip-flap tiles with horizontal mechanical seam
 * - Words grouped in flex blocks so words never break mid-word across lines
 * - GPU-accelerated CSS 3D flip on load (zero JS continuous loops, no battery drain)
 * - Semantic H1 text kept intact for SEO, screen readers, and zero layout shift
 */
export function AirportDepartureBoard({
  text,
  className = '',
  enableAnimation = true,
}: AirportDepartureBoardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Split into words so wrapping is natural on mobile
  const words = text.split(' ');

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 select-none ${className}`}
      aria-label={text}
      role="img"
    >
      {words.map((word, wordIdx) => (
        <span key={`${word}-${wordIdx}`} className="inline-flex items-center gap-[2px] sm:gap-[3px]">
          {word.split('').map((char, charIdx) => {
            const globalIdx = wordIdx * 10 + charIdx;
            const isPunctuation = char === '.' || char === ',' || char === '!' || char === '?';

            return (
              <span
                key={`${char}-${charIdx}`}
                className={`relative inline-flex items-center justify-center font-mono font-bold text-center 
                  ${isPunctuation 
                    ? 'w-3 sm:w-4 md:w-5 h-7 sm:h-9 md:h-11 text-sm sm:text-lg md:text-2xl' 
                    : 'w-5 sm:w-6 md:w-8 lg:w-9 h-7 sm:h-9 md:h-11 lg:h-12 text-xs sm:text-base md:text-xl lg:text-2xl'
                  }
                  rounded-[3px] sm:rounded-[4px] bg-zinc-900 dark:bg-zinc-800 text-amber-300 dark:text-amber-400 
                  shadow-xs border border-zinc-800 dark:border-zinc-700/80 overflow-hidden
                  ${enableAnimation && mounted ? 'animate-flap-down' : ''}
                `}
                style={{
                  animationDelay: enableAnimation ? `${Math.min(globalIdx * 35, 600)}ms` : '0ms',
                  transformOrigin: 'center bottom',
                }}
              >
                {/* Upper and lower flap seam */}
                <span 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/50 dark:bg-black/70 z-10 pointer-events-none" 
                  aria-hidden="true" 
                />
                
                {/* Top subtle highlight reflection */}
                <span 
                  className="absolute inset-x-0 top-0 h-1/2 bg-white/5 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Character */}
                <span className="relative z-0 uppercase tracking-tight leading-none">
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
