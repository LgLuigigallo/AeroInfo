'use client';

import React, { useState } from 'react';

interface CountryFlagProps {
  countryCode?: string;
  countryName?: string;
  className?: string;
}

/**
 * Crisp, ultra-lightweight vector SVG country flag component.
 * Uses globally edge-cached Cloudflare SVGs (flagcdn.com, ~200 bytes per flag)
 * with graceful fallback to country code text if offline.
 */
export function CountryFlag({
  countryCode,
  countryName,
  className = 'w-6 h-4 sm:w-7 sm:h-5'
}: CountryFlagProps) {
  const [hasError, setHasError] = useState(false);

  if (!countryCode) return null;
  const code = countryCode.trim().toLowerCase();

  // Handle EU pseudo-country code if present
  const flagCode = code === 'eu' ? 'eu' : code;

  if (hasError) {
    return (
      <span 
        className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
        title={countryName || countryCode.toUpperCase()}
      >
        {countryCode.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/${flagCode}.svg`}
      alt={countryName ? `Bandiera ${countryName}` : `Bandiera ${countryCode.toUpperCase()}`}
      title={countryName || countryCode.toUpperCase()}
      width={24}
      height={16}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={`${className} inline-block rounded-xs shadow-2xs object-cover border border-black/10 dark:border-white/15 align-middle select-none shrink-0`}
    />
  );
}
