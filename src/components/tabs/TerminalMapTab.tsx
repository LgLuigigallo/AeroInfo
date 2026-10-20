'use client';

import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Droplets, 
  ShieldCheck, 
  Utensils, 
  ShoppingBag, 
  Navigation, 
  Moon, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Compass,
  Layers,
  Info
} from 'lucide-react';
import { Airport, TerminalMapPOI, MapPoiCategory } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { UnverifiedBadge } from '@/components/UnverifiedBadge';

interface TerminalMapTabProps {
  airport: Airport;
}

export function TerminalMapTab({ airport }: TerminalMapTabProps) {
  const { lang, t } = useLanguage();

  // 1. Resolve Available Terminals
  const terminals = useMemo(() => {
    if (airport.terminalMaps && airport.terminalMaps.length > 0) {
      return airport.terminalMaps.map((m) => ({
        id: m.terminalId,
        name_it: m.terminalName_it,
        name_en: m.terminalName_en
      }));
    }
    if (airport.terminals && airport.terminals.length > 0) {
      return airport.terminals.map((t) => ({
        id: t.id,
        name_it: t.name,
        name_en: t.name
      }));
    }
    return [{ id: 'main', name_it: 'Terminal Passeggeri', name_en: 'Passenger Terminal' }];
  }, [airport]);

  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(terminals[0]?.id || 'main');
  const [selectedCategory, setSelectedCategory] = useState<MapPoiCategory | 'all'>('all');
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);

  // 2. Resolve POIs for Current Terminal (Custom or Auto-Derived)
  const currentTerminalMap = useMemo(() => {
    if (airport.terminalMaps) {
      return airport.terminalMaps.find((m) => m.terminalId === selectedTerminalId) || airport.terminalMaps[0];
    }
    return null;
  }, [airport, selectedTerminalId]);

  const terminalPois = useMemo<TerminalMapPOI[]>(() => {
    if (currentTerminalMap && currentTerminalMap.pois && currentTerminalMap.pois.length > 0) {
      return currentTerminalMap.pois;
    }

    // Auto-generate realistic concourse POIs from airport amenities, security & venues
    const generated: TerminalMapPOI[] = [];
    const termObj = terminals.find((t) => t.id === selectedTerminalId) || terminals[0];
    const termLabel = lang === 'it' ? termObj.name_it : termObj.name_en;

    // Security Checkpoint POI
    const sec = airport.securityPolicy;
    const rule = sec.terminalRules?.find((r) => 
      r.terminalName.toLowerCase().includes(termObj.name_it.toLowerCase()) ||
      r.terminalName.toLowerCase().includes(termObj.id.toLowerCase())
    );
    const has3D = rule ? rule.has3DScanners : sec.has3DScanners;

    generated.push({
      id: `${selectedTerminalId}-sec`,
      category: 'security',
      name_it: has3D ? 'Varchi Sicurezza Scanner 3D CTiX' : 'Varchi Sicurezza Standard X-Ray',
      name_en: has3D ? '3D CTiX Security Checkpoint' : 'Standard X-Ray Security Checkpoint',
      location_it: 'Ingresso centrale area partenze',
      location_en: 'Central departure security concourse',
      terminal: termLabel,
      zone: 'Varco Controlli',
      x: 20,
      y: 50,
      availability: has3D ? 'abundant' : 'moderate',
      details_it: has3D 
        ? 'Scanner tomografici 3D: liquidi e laptop restano nel bagaglio a mano.'
        : 'Scanner convenzionali: estrarre obbligatoriamente liquidi (max 100ml) e portatili.',
      details_en: has3D
        ? '3D CT scanners: liquids and laptops stay inside your carry-on luggage.'
        : 'Conventional screening: unpack liquids (max 100ml) and laptops into bins.',
      isVerified: true
    });

    // Amenities (Power, Water, Wi-Fi, Relax)
    airport.amenities.forEach((am, idx) => {
      let cat: MapPoiCategory = 'info';
      let x = 45;
      let y = 30 + (idx * 16) % 50;

      if (am.category === 'power_charging') {
        cat = 'power';
        x = 65 + (idx * 8) % 25;
        y = 35 + (idx * 12) % 40;
      } else if (am.category === 'water_refill') {
        cat = 'water';
        x = 55 + (idx * 10) % 30;
        y = 65 + (idx * 7) % 20;
      } else if (am.category === 'quiet_area') {
        cat = 'lounge';
        x = 85;
        y = 25;
      }

      generated.push({
        id: am.id,
        category: cat,
        name_it: am.title_it,
        name_en: am.title_en,
        location_it: am.location_it,
        location_en: am.location_en,
        terminal: am.terminal || termLabel,
        zone: am.terminal || 'Airside',
        x,
        y,
        availability: am.availability,
        details_it: am.scarcityNote_it || am.details_it,
        details_en: am.scarcityNote_en || am.details_en,
        isVerified: !am.isUnverified
      });
    });

    // Venues (Dining & Duty Free)
    airport.venues.forEach((v, idx) => {
      const isShop = v.category === 'duty_free' || v.category === 'shopping';
      generated.push({
        id: v.id,
        category: isShop ? 'shop' : 'dining',
        name_it: v.name,
        name_en: v.name,
        location_it: v.location,
        location_en: v.location,
        terminal: v.terminal,
        zone: 'Piazza Commerciale',
        x: 38 + (idx * 10) % 24,
        y: isShop ? 32 + (idx * 8) % 20 : 68 - (idx * 8) % 20,
        availability: 'abundant',
        details_it: `Orari: ${v.hours}. Ubicazione: ${v.location}.`,
        details_en: `Hours: ${v.hours}. Location: ${v.location}.`,
        isVerified: !v.isUnverified
      });
    });

    return generated;
  }, [currentTerminalMap, airport, terminals, selectedTerminalId, lang]);

  // Filtered POIs
  const filteredPois = useMemo(() => {
    if (selectedCategory === 'all') return terminalPois;
    return terminalPois.filter((p) => p.category === selectedCategory);
  }, [terminalPois, selectedCategory]);

  // Active selected POI
  const activePoi = useMemo(() => {
    if (selectedPoiId) {
      const found = terminalPois.find((p) => p.id === selectedPoiId);
      if (found) return found;
    }
    return filteredPois[0] || terminalPois[0] || null;
  }, [selectedPoiId, terminalPois, filteredPois]);

  // Category Icon Resolver
  const getCategoryIcon = (category: MapPoiCategory) => {
    switch (category) {
      case 'power':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'dining':
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'shop':
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case 'gate':
        return <Navigation className="w-4 h-4 text-indigo-500" />;
      case 'lounge':
        return <Moon className="w-4 h-4 text-rose-500" />;
      default:
        return <MapPin className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: MapPoiCategory) => {
    switch (category) {
      case 'power':
        return 'bg-amber-500 text-white border-amber-600 ring-amber-400';
      case 'water':
        return 'bg-cyan-500 text-white border-cyan-600 ring-cyan-400';
      case 'security':
        return 'bg-emerald-600 text-white border-emerald-700 ring-emerald-400';
      case 'dining':
        return 'bg-orange-500 text-white border-orange-600 ring-orange-400';
      case 'shop':
        return 'bg-purple-500 text-white border-purple-600 ring-purple-400';
      case 'gate':
        return 'bg-indigo-600 text-white border-indigo-700 ring-indigo-400';
      case 'lounge':
        return 'bg-rose-500 text-white border-rose-600 ring-rose-400';
      default:
        return 'bg-blue-600 text-white border-blue-700 ring-blue-400';
    }
  };

  // Official Interactive Map URL
  const officialMapLink = airport.officialMapUrl || currentTerminalMap?.officialInteractiveMapUrl || airport.officialWebsite;

  return (
    <div className="space-y-5">
      {/* Top Banner & Header */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base tracking-tight">
              {t('mapTitle')}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {t('mapSubtitle')}
          </p>
        </div>

        {officialMapLink && (
          <a
            href={officialMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-semibold text-xs tracking-tight shadow-xs transition-all shrink-0 cursor-pointer font-mono"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>{t('openOfficialMap')}</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        )}
      </div>

      {/* Terminal Switcher Bar */}
      {terminals.length > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-100/70 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 ml-1">
            {t('selectTerminal')}
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {terminals.map((term) => {
              const isSelected = selectedTerminalId === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => {
                    setSelectedTerminalId(term.id);
                    setSelectedPoiId(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {lang === 'it' ? term.name_it : term.name_en}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800'
          }`}
        >
          {t('filterAll')} ({terminalPois.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('power')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'power'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{t('filterPower')}</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('water')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'water'
              ? 'bg-cyan-500 text-white shadow-xs'
              : 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/20'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>{t('filterWater')}</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('security')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'security'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('filterSecurity')}</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('dining')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'dining'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'bg-orange-500/10 text-orange-800 dark:text-orange-300 hover:bg-orange-500/20 border border-orange-500/20'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>{t('filterDining')}</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('shop')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'shop'
              ? 'bg-purple-500 text-white shadow-xs'
              : 'bg-purple-500/10 text-purple-800 dark:text-purple-300 hover:bg-purple-500/20 border border-purple-500/20'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t('filterShops')}</span>
        </button>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-md text-white select-none">
        {/* Concourse Architectural SVG Layout */}
        <div className="relative w-full aspect-21/9 min-h-[340px] sm:min-h-[420px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 flex flex-col justify-between">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Terminal Concourse Architectural Zones */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 450">
            {/* Zone 1: Landside Check-in & Security Screen */}
            <rect x="30" y="50" width="220" height="350" rx="20" fill="#1e293b" fillOpacity="0.4" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
            <text x="140" y="85" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
              CHECK-IN & SICUREZZA
            </text>

            {/* Checkpoint Security Sluice Line */}
            <line x1="250" y1="90" x2="250" y2="360" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
            <rect x="238" y="195" width="24" height="60" rx="6" fill="#10b981" fillOpacity="0.8" />
            <text x="250" y="275" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="600">
              VARCHI 3D / X-RAY
            </text>

            {/* Zone 2: Central Duty-Free & Commercial Concourse Plaza */}
            <rect x="290" y="50" width="250" height="350" rx="24" fill="#172554" fillOpacity="0.3" stroke="#1e3a8a" strokeWidth="2" />
            <text x="415" y="85" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="700" letterSpacing="0.08em">
              PIAZZA COMMERCIALE & DUTY FREE
            </text>

            {/* Connection Corridor Bridge */}
            <path d="M 540 200 L 610 200 M 540 250 L 610 250" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

            {/* Zone 3: Departure Piers & Boarding Gate Wings */}
            {/* Pier North (e.g. Gates C01-C10) */}
            <rect x="610" y="50" width="350" height="150" rx="20" fill="#1e1b4b" fillOpacity="0.4" stroke="#3730a3" strokeWidth="2" />
            <text x="785" y="85" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
              MOLO NORD (GATES C01 - C10)
            </text>
            {/* North Gate Stubs */}
            <g fill="#4338ca" fontSize="10" fontWeight="700">
              <rect x="640" y="35" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="660" y="47" textAnchor="middle" fill="#e0e7ff">C01</text>
              <rect x="710" y="35" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="730" y="47" textAnchor="middle" fill="#e0e7ff">C03</text>
              <rect x="780" y="35" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="800" y="47" textAnchor="middle" fill="#e0e7ff">C05</text>
              <rect x="850" y="35" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="870" y="47" textAnchor="middle" fill="#e0e7ff">C07</text>
            </g>

            {/* Pier South (e.g. Gates D01-D10) */}
            <rect x="610" y="250" width="350" height="150" rx="20" fill="#1e1b4b" fillOpacity="0.4" stroke="#3730a3" strokeWidth="2" />
            <text x="785" y="285" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
              MOLO SUD (GATES D01 - D10)
            </text>
            {/* South Gate Stubs */}
            <g fill="#4338ca" fontSize="10" fontWeight="700">
              <rect x="640" y="400" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="660" y="412" textAnchor="middle" fill="#e0e7ff">D02</text>
              <rect x="710" y="400" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="730" y="412" textAnchor="middle" fill="#e0e7ff">D04</text>
              <rect x="780" y="400" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="800" y="412" textAnchor="middle" fill="#e0e7ff">D06</text>
              <rect x="850" y="400" width="40" height="15" rx="3" fill="#312e81" stroke="#6366f1" />
              <text x="870" y="412" textAnchor="middle" fill="#e0e7ff">D08</text>
            </g>
          </svg>

          {/* Interactive POI Pins Overlaid on the Coordinates */}
          <div className="absolute inset-0 z-10">
            {filteredPois.map((poi) => {
              const isSelected = activePoi?.id === poi.id;
              const colorClasses = getCategoryColor(poi.category);

              return (
                <div
                  key={poi.id}
                  style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform"
                  onClick={() => setSelectedPoiId(poi.id)}
                >
                  {/* Radar pulse wave when selected */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-white/30 animate-ping pointer-events-none" />
                  )}

                  {/* Pin Circle Icon */}
                  <div
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center border-2 shadow-lg transition-all ${colorClasses} ${
                      isSelected
                        ? 'scale-125 ring-4 ring-white/50 z-20 shadow-xl'
                        : 'group-hover:scale-115'
                    }`}
                  >
                    {getCategoryIcon(poi.category)}
                  </div>

                  {/* Quick Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-900 text-white text-[11px] font-bold whitespace-nowrap border border-neutral-700 shadow-md">
                      {lang === 'it' ? poi.name_it : poi.name_en}
                    </div>
                    <div className="w-2 h-2 bg-neutral-900 rotate-45 -mt-1 border-r border-b border-neutral-700" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Status Overlay Footer */}
          <div className="relative z-20 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('mapClickInstruction')}</span>
            </span>

            <span className="hidden sm:inline bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
              {lang === 'it' ? `Punti visibili: ${filteredPois.length}` : `Visible POIs: ${filteredPois.length}`}
            </span>
          </div>
        </div>
      </div>

      {/* Selected Location Details Card (Active Drawer) */}
      {activePoi && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-blue-500/40 dark:border-blue-500/30 shadow-xs space-y-3 animate-in fade-in-50 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-lg shrink-0 ${getCategoryColor(activePoi.category)}`}>
                {getCategoryIcon(activePoi.category)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                    {activePoi.terminal} {activePoi.zone ? `• ${activePoi.zone}` : ''}
                  </span>
                  {activePoi.availability && (
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      activePoi.availability === 'abundant'
                        ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                        : activePoi.availability === 'moderate'
                        ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20'
                    }`}>
                      {activePoi.availability === 'abundant' 
                        ? (lang === 'it' ? 'Disponibilità Abbondante' : 'Abundant') 
                        : activePoi.availability === 'moderate' 
                        ? (lang === 'it' ? 'Disponibilità Moderata' : 'Moderate') 
                        : (lang === 'it' ? 'Disponibilità Scarsa / Rara' : 'Scarce')}
                    </span>
                  )}
                  {activePoi.isVerified && (
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('verifiedOfficialLocation')}</span>
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  {lang === 'it' ? activePoi.name_it : activePoi.name_en}
                </h4>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase">{lang === 'it' ? 'Posizione esatta:' : 'Exact location:'}</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">
                {lang === 'it' ? activePoi.location_it : activePoi.location_en}
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              {lang === 'it' ? activePoi.details_it : activePoi.details_en}
            </p>
          </div>
        </div>
      )}

      {/* Full Points of Interest Grid for This Terminal */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-mono font-bold tracking-wider text-zinc-400 uppercase text-[10px]">
            {t('poiListTitle')} ({filteredPois.length})
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredPois.map((poi) => {
            const isSelected = activePoi?.id === poi.id;
            return (
              <div
                key={poi.id}
                onClick={() => setSelectedPoiId(poi.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
                  isSelected
                    ? 'bg-blue-500/5 border-blue-500/50 dark:bg-blue-950/30 dark:border-blue-500/50 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/80 dark:border-zinc-700/80">
                      {getCategoryIcon(poi.category)}
                    </div>
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-white text-xs leading-snug">
                        {lang === 'it' ? poi.name_it : poi.name_en}
                      </h5>
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        {poi.zone || poi.terminal}
                      </span>
                    </div>
                  </div>

                  {poi.availability && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      poi.availability === 'abundant'
                        ? 'bg-emerald-500'
                        : poi.availability === 'moderate'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`} />
                  )}
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {lang === 'it' ? poi.location_it : poi.location_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}