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
  Info,
  Clock,
  Sparkles,
  Pill,
  Coffee,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  ChevronRight,
  Flame,
  ArrowDown
} from 'lucide-react';
import { Airport, TerminalMapPOI, MapPoiCategory, VenueItem } from '@/types/airport';
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

  // Directory Search & Accordion State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    cafe: true,
    quick: true,
    dining: false,
    pharmacy: true,
    duty_free: false,
    boutique: false
  });
  const [selectedBoutique, setSelectedBoutique] = useState<VenueItem | null>(null);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const expandAllSections = () => {
    setOpenSections({
      cafe: true,
      quick: true,
      dining: true,
      pharmacy: true,
      duty_free: true,
      boutique: true
    });
  };

  const collapseAllSections = () => {
    setOpenSections({
      cafe: false,
      quick: false,
      dining: false,
      pharmacy: false,
      duty_free: false,
      boutique: false
    });
  };

  // 2. Categorize Airport Commercial Venues
  const venues = airport.venues || [];

  const cafeVenues = useMemo(() => {
    return venues.filter((v) => 
      v.category === 'cafe' || 
      v.serviceType === 'coffee_snack' ||
      ((v.hours?.startsWith('05:') || v.hours?.startsWith('04:') || v.hours?.toLowerCase().includes('24') || v.is24Hours || v.isEarlyMorning) && v.category !== 'shopping' && v.category !== 'pharmacy')
    );
  }, [venues]);

  const quickVenues = useMemo(() => {
    return venues.filter((v) => 
      v.serviceType === 'quick_bite' || 
      v.category === 'grab_and_go'
    );
  }, [venues]);

  const diningVenues = useMemo(() => {
    return venues.filter((v) => 
      v.serviceType === 'table_service' || 
      (v.category === 'dining' && v.serviceType !== 'quick_bite')
    );
  }, [venues]);

  const pharmacyVenues = useMemo(() => {
    return venues.filter((v) => 
      v.category === 'pharmacy' || 
      v.serviceType === 'pharmacy'
    );
  }, [venues]);

  const dutyFreeVenues = useMemo(() => {
    return venues.filter((v) => 
      v.category === 'duty_free' || 
      v.serviceType === 'duty_free'
    );
  }, [venues]);

  const boutiqueVenues = useMemo(() => {
    return venues.filter((v) => 
      v.category === 'shopping' || 
      v.serviceType === 'retail'
    );
  }, [venues]);

  // Filtered by Search Query
  const searchFilter = (items: VenueItem[]) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.terminal.toLowerCase().includes(q) ||
      (item.highlightNote_it && item.highlightNote_it.toLowerCase().includes(q)) ||
      (item.highlightNote_en && item.highlightNote_en.toLowerCase().includes(q))
    );
  };

  const filteredCafes = useMemo(() => searchFilter(cafeVenues), [cafeVenues, searchQuery]);
  const filteredQuick = useMemo(() => searchFilter(quickVenues), [quickVenues, searchQuery]);
  const filteredDining = useMemo(() => searchFilter(diningVenues), [diningVenues, searchQuery]);
  const filteredPharmacies = useMemo(() => searchFilter(pharmacyVenues), [pharmacyVenues, searchQuery]);
  const filteredDutyFree = useMemo(() => searchFilter(dutyFreeVenues), [dutyFreeVenues, searchQuery]);
  const filteredBoutiques = useMemo(() => searchFilter(boutiqueVenues), [boutiqueVenues, searchQuery]);

  const hasSearch = searchQuery.trim().length > 0;

  // 3. Resolve POIs for Current Terminal (Responsive Clustering on SVG Map)
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

    const generated: TerminalMapPOI[] = [];
    const termObj = terminals.find((t) => t.id === selectedTerminalId) || terminals[0];
    const termLabel = lang === 'it' ? termObj.name_it : termObj.name_en;

    // A. Security Checkpoint POI
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
        ? 'Scanner tomografici 3D: liquidi e laptop restano nel bagaglio a mano senza limiti da 100ml.'
        : 'Scanner convenzionali: estrarre obbligatoriamente liquidi (max 100ml per flacone in sacchetto trasparente) e portatili.',
      details_en: has3D
        ? '3D CT scanners: liquids and laptops stay inside your carry-on luggage without 100ml limits.'
        : 'Conventional screening: unpack liquids (max 100ml) and laptops into separate trays.',
      isVerified: true
    });

    // B. Key Passenger Amenities (Water, Power, Lounge)
    airport.amenities.forEach((am, idx) => {
      let cat: MapPoiCategory = 'info';
      let x = 45;
      let y = 30;

      if (am.category === 'power_charging') {
        cat = 'power';
        x = 65 + (idx * 6) % 15;
        y = 35 + (idx * 8) % 15;
      } else if (am.category === 'water_refill') {
        cat = 'water';
        x = 55 + (idx * 6) % 12;
        y = 65 + (idx * 6) % 15;
      } else if (am.category === 'quiet_area') {
        cat = 'lounge';
        x = 86;
        y = 25;
      } else {
        return; // Only place essential amenity pins on the canvas to prevent clutter
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

    // C. Commercial Activities (RESPONSIVE CLUSTERING - NO OVERLAPPING BLOBS)
    const allDining = [...cafeVenues, ...quickVenues, ...diningVenues];
    const allShopping = [...dutyFreeVenues, ...boutiqueVenues];

    if (allDining.length > 3) {
      // Primary Central Plaza Food Court Hub
      generated.push({
        id: 'hub-dining-central',
        category: 'dining',
        name_it: lang === 'it' 
          ? `Piazza del Gusto (${allDining.length} Ristoranti & Bar)` 
          : `Food Court & Dining Concourse (${allDining.length} Venues)`,
        name_en: `Food Court & Dining Concourse (${allDining.length} Venues)`,
        location_it: 'Piazza Commerciale post-sicurezza (Tutti i Terminal)',
        location_en: 'Central post-security concourse plaza',
        terminal: termLabel,
        zone: 'Piazza Commerciale',
        x: 42,
        y: 60,
        count: allDining.length,
        availability: 'abundant',
        details_it: `Polo principale della ristorazione: riunisce ristoranti con servizio al tavolo, pizzerie al taglio, bar colazioni all'alba e grab-and-go. Consulta le sezioni tematiche sottostanti per visualizzare tutti i locali.`,
        details_en: `Main concourse dining hub: features sit-down dining, pizza by the cut, early breakfast bars, and grab-and-go spots. See categorized directory below.`,
        isVerified: true
      });

      // Satellite Pier Dining Hub at Pier North
      if (allDining.length > 8) {
        generated.push({
          id: 'hub-dining-pier-north',
          category: 'dining',
          name_it: lang === 'it' ? 'Punti Ristoro Molo Nord (Gate C/A)' : 'North Pier Dining (Gate C/A)',
          name_en: 'North Pier Dining (Gate C/A)',
          location_it: 'Lungo il molo imbarchi verso i gate',
          location_en: 'Along boarding gate piers',
          terminal: termLabel,
          zone: 'Molo Nord',
          x: 76,
          y: 28,
          count: Math.round(allDining.length * 0.35),
          availability: 'abundant',
          details_it: 'Bar e punti ristoro rapidi per caffè espresso, acqua e snack al volo prima del gate di imbarco.',
          details_en: 'Grab-and-go snack bars and coffee stations located conveniently near boarding gates.',
          isVerified: true
        });
      }
    } else {
      // Few dining spots: place each individually without overlaps
      allDining.forEach((d, idx) => {
        generated.push({
          id: d.id,
          category: 'dining',
          name_it: d.name,
          name_en: d.name,
          location_it: d.location,
          location_en: d.location,
          terminal: d.terminal,
          zone: 'Piazza Commerciale',
          x: 40 + idx * 8,
          y: 60,
          availability: 'abundant',
          details_it: `Orari: ${d.hours}. Ubicazione: ${d.location}.`,
          details_en: `Hours: ${d.hours}. Location: ${d.location}.`,
          isVerified: !d.isUnverified
        });
      });
    }

    if (allShopping.length > 3) {
      // Primary Central Plaza Shopping & Duty-Free Hub
      generated.push({
        id: 'hub-shopping-central',
        category: 'shop',
        name_it: lang === 'it'
          ? `Galleria Shopping & Duty-Free (${allShopping.length} Brand)`
          : `Shopping & Duty-Free Gallery (${allShopping.length} Brands)`,
        name_en: `Shopping & Duty-Free Gallery (${allShopping.length} Brands)`,
        location_it: 'Piazza Commerciale post-sicurezza',
        location_en: 'Central departure shopping concourse',
        terminal: termLabel,
        zone: 'Piazza Commerciale',
        x: 44,
        y: 28,
        count: allShopping.length,
        availability: 'abundant',
        details_it: `Galleria commerciale con Duty-Free, brand di moda, valigeria e souvenir. Consulta l'indice interattivo dei brand nella sezione Moda sottostante.`,
        details_en: `Commercial gallery with Duty-Free stores, luxury fashion boutiques, travel accessories, and souvenirs. See brand directory below.`,
        isVerified: true
      });
    } else {
      allShopping.forEach((s, idx) => {
        generated.push({
          id: s.id,
          category: 'shop',
          name_it: s.name,
          name_en: s.name,
          location_it: s.location,
          location_en: s.location,
          terminal: s.terminal,
          zone: 'Piazza Commerciale',
          x: 42 + idx * 8,
          y: 28,
          availability: 'abundant',
          details_it: `Orari: ${s.hours}. Ubicazione: ${s.location}.`,
          details_en: `Hours: ${s.hours}. Location: ${s.location}.`,
          isVerified: !s.isUnverified
        });
      });
    }

    // Pharmacy POI (if present)
    if (pharmacyVenues.length > 0) {
      const ph = pharmacyVenues[0];
      generated.push({
        id: 'hub-pharmacy',
        category: 'shop',
        name_it: lang === 'it' ? `Farmacia Aeroportuale (${ph.name})` : `Airport Pharmacy (${ph.name})`,
        name_en: `Airport Pharmacy (${ph.name})`,
        location_it: ph.location,
        location_en: ph.location,
        terminal: ph.terminal,
        zone: 'Piazza Commerciale',
        x: 34,
        y: 72,
        availability: 'moderate',
        details_it: `Presidio farmaceutico post-sicurezza per medicinali da banco, prodotti per il viaggio e primo soccorso. Orari: ${ph.hours}.`,
        details_en: `Airside pharmacy for OTC medications, first aid, and travel healthcare essentials. Hours: ${ph.hours}.`,
        isVerified: !ph.isUnverified
      });
    }

    return generated;
  }, [currentTerminalMap, airport, terminals, selectedTerminalId, lang, cafeVenues, quickVenues, diningVenues, pharmacyVenues, dutyFreeVenues, boutiqueVenues]);

  // Filtered POIs by Category Filter Buttons
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

  const officialMapLink = airport.officialMapUrl || currentTerminalMap?.officialInteractiveMapUrl || airport.officialWebsite;

  const scrollToDirectory = (categoryKey?: string) => {
    if (categoryKey) {
      setOpenSections((prev) => ({ ...prev, [categoryKey]: true }));
    }
    const el = document.getElementById('terminal-directory-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* =========================================================================
          PARTE 1: MAPPA ARCHITETTONICA DEL TERMINAL (RESPONSIVE AI VOLUMI DEI LOCALI)
          ========================================================================= */}
      <section className="space-y-4">
        {/* Banner Introduttivo Unificato */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Compass className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base tracking-tight">
                {t('tabMap')}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {lang === 'it' 
                ? 'Visualizzazione integrata del concourse: varchi controlli, fontanelle, prese e poli commerciali con elenco completo sottostante.'
                : 'Integrated concourse layout: security checkpoints, water refill, power sockets, and dining hubs with detailed directory below.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToDirectory()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-xs tracking-tight transition-colors cursor-pointer font-mono"
            >
              <Utensils className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'it' ? 'Vai ai Ristoranti' : 'View Venues'}</span>
              <ArrowDown className="w-3 h-3 opacity-60" />
            </button>

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
        </div>

        {/* Terminal Switcher Bar (se multi-terminal) */}
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

        {/* Filtri Categoria Mappa */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
        </div>

        {/* Canvas Mappa Interattiva */}
        <div className="relative w-full rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-md text-white select-none">
          <div className="relative w-full aspect-21/9 min-h-[320px] sm:min-h-[400px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 flex flex-col justify-between">
            {/* Pattern Griglia */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Layout Architettonico SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 450">
              {/* Check-in & Sicurezza */}
              <rect x="30" y="50" width="220" height="350" rx="20" fill="#1e293b" fillOpacity="0.4" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
              <text x="140" y="85" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                CHECK-IN & SICUREZZA
              </text>

              {/* Varco Controlli */}
              <line x1="250" y1="90" x2="250" y2="360" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
              <rect x="238" y="195" width="24" height="60" rx="6" fill="#10b981" fillOpacity="0.8" />
              <text x="250" y="275" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="600">
                VARCHI 3D / X-RAY
              </text>

              {/* Piazza Commerciale & Duty Free */}
              <rect x="290" y="50" width="250" height="350" rx="24" fill="#172554" fillOpacity="0.3" stroke="#1e3a8a" strokeWidth="2" />
              <text x="415" y="85" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                PIAZZA COMMERCIALE & FOOD
              </text>

              {/* Corridoio di Collegamento */}
              <path d="M 540 200 L 610 200 M 540 250 L 610 250" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

              {/* Molo Nord (Gates C01-C10) */}
              <rect x="610" y="50" width="350" height="150" rx="20" fill="#1e1b4b" fillOpacity="0.4" stroke="#3730a3" strokeWidth="2" />
              <text x="785" y="85" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                MOLO NORD (GATES C01 - C10)
              </text>
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

              {/* Molo Sud (Gates D01-D10) */}
              <rect x="610" y="250" width="350" height="150" rx="20" fill="#1e1b4b" fillOpacity="0.4" stroke="#3730a3" strokeWidth="2" />
              <text x="785" y="285" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                MOLO SUD (GATES D01 - D10)
              </text>
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

            {/* POI Pins (Responsive Clusters - Spacing Perfetto Senza Sovrapposizioni) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {filteredPois.map((poi) => {
                const isSelected = activePoi?.id === poi.id;
                const colorClasses = getCategoryColor(poi.category);

                return (
                  <div
                    key={poi.id}
                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform pointer-events-auto"
                    onClick={() => {
                      setSelectedPoiId(poi.id);
                    }}
                  >
                    {isSelected && (
                      <span className="absolute -inset-2.5 rounded-full bg-white/30 animate-ping pointer-events-none" />
                    )}

                    {/* Pin Circle con eventuale badge del conteggio hub */}
                    <div
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center border-2 shadow-lg transition-all ${colorClasses} ${
                        isSelected
                          ? 'scale-125 ring-4 ring-white/50 z-20 shadow-xl'
                          : 'group-hover:scale-115'
                      }`}
                    >
                      {getCategoryIcon(poi.category)}

                      {/* Badge Numerico Cluster (es. 48 locali o 71 brand) */}
                      {Boolean(poi.count && poi.count > 1) && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1 rounded-full bg-zinc-950 text-white text-[9.5px] font-mono font-bold flex items-center justify-center border border-white/60 shadow-xs">
                          {poi.count}
                        </span>
                      )}
                    </div>

                    {/* Tooltip on Hover */}
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

            {/* Footer Stato Mappa */}
            <div className="relative z-20 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('mapClickInstruction')}</span>
              </span>

              <span className="hidden sm:inline bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800 font-mono text-[10px]">
                {lang === 'it' ? `Punti strategici: ${filteredPois.length}` : `Strategic Hubs: ${filteredPois.length}`}
              </span>
            </div>
          </div>
        </div>

        {/* Drawer Dettaglio Hub/POI Selezionato */}
        {activePoi && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-blue-500/40 dark:border-blue-500/30 shadow-xs space-y-3 animate-in fade-in-50 duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl shrink-0 ${getCategoryColor(activePoi.category)}`}>
                  {getCategoryIcon(activePoi.category)}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                    <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                      {activePoi.terminal} {activePoi.zone ? `• ${activePoi.zone}` : ''}
                    </span>
                    {activePoi.count && (
                      <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-800 dark:text-orange-300 border border-orange-500/20 font-bold">
                        {activePoi.count} {lang === 'it' ? 'punti censiti' : 'indexed spots'}
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

              {/* Azione di scroll al dettaglio sottostante se si tratta di cibo o shopping */}
              {(activePoi.category === 'dining' || activePoi.category === 'shop') && (
                <button
                  type="button"
                  onClick={() => scrollToDirectory(activePoi.category === 'dining' ? 'cafe' : 'boutique')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-transform hover:scale-102 cursor-pointer font-mono shrink-0 shadow-xs"
                >
                  <span>{t('viewVenuesBelow')}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="font-mono text-[10px] text-zinc-400 uppercase">{lang === 'it' ? 'Ubicazione:' : 'Location:'}</span>
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
      </section>

      {/* =========================================================================
          PARTE 2: AGGREGATORE RISTORAZIONE & COMMERCIO IN TAB APRIBILI (ACCORDION)
          ========================================================================= */}
      <section id="terminal-directory-section" className="space-y-4 pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
        {/* Intestazione Directory & Ricerca Globale */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-500" />
                <span>{lang === 'it' ? 'Guida a Ristoranti, Bar & Negozi' : 'Dining & Commercial Directory'}</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                {lang === 'it' 
                  ? 'Locali aggregati in sezioni apribili per urgenza e tipologia di servizio.'
                  : 'Venues grouped into expandable tabs tailored to your travel timing and needs.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAllSections}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{t('expandAllCategories')}</span>
              </button>
              <button
                type="button"
                onClick={collapseAllSections}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <Minimize2 className="w-3 h-3" />
                <span>{t('collapseAllCategories')}</span>
              </button>
            </div>
          </div>

          {/* Search Box Diretta */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchDirectoryPlaceholder')}
              className="w-full pl-9.5 pr-8 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all font-mono shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            LE SEZIONI / TAB APRIBILI (ACCORDION PER CATEGORIA)
            ========================================================================= */}
        <div className="space-y-3">
          {/* 1. BAR & CAFFETTERIE (ALBA & H24) */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
            <button
              type="button"
              onClick={() => toggleSection('cafe')}
              className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {t('categoryCafeTitle')}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                      {cafeVenues.filter(v => v.is24Hours || v.isEarlyMorning || v.hours?.startsWith('05:')).length} {lang === 'it' ? 'all\'alba' : 'dawn & 24h'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                    {t('categoryCafeDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {filteredCafes.length} {lang === 'it' ? 'locali' : 'venues'}
                </span>
                <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.cafe || hasSearch ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </button>

            {(openSections.cafe || hasSearch) && (
              <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20">
                {filteredCafes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredCafes.map((venue) => (
                      <div
                        key={venue.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                              {venue.name}
                            </h5>
                            <span className="text-[10.5px] font-mono text-zinc-500 block mt-0.5">
                              {venue.terminal} • {venue.location}
                            </span>
                          </div>
                          {venue.isUnverified && <UnverifiedBadge />}
                        </div>

                        {(venue.isEarlyMorning || venue.is24Hours || venue.hours?.startsWith('05:')) && (
                          <div className="flex items-center gap-1 pt-0.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                              {venue.is24Hours ? 'Aperto 24H' : 'Aperto dalle 05:00 (Alba)'}
                            </span>
                          </div>
                        )}

                        {(venue.highlightNote_it || venue.highlightNote_en) && (
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-sans bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            {lang === 'it' ? venue.highlightNote_it : venue.highlightNote_en}
                          </p>
                        )}

                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {venue.hours}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-zinc-400 py-4 text-center">{t('noVenuesFound')}</p>
                )}
              </div>
            )}
          </div>

          {/* 2. AL VOLO, PIZZERIE & GRAB-AND-GO */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
            <button
              type="button"
              onClick={() => toggleSection('quick')}
              className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {t('categoryQuickTitle')}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20">
                      {lang === 'it' ? 'Pronti in <10 min' : '<10 min to-go'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                    {t('categoryQuickDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {filteredQuick.length} {lang === 'it' ? 'locali' : 'venues'}
                </span>
                <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.quick || hasSearch ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </button>

            {(openSections.quick || hasSearch) && (
              <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20">
                {filteredQuick.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredQuick.map((venue) => (
                      <div
                        key={venue.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                              {venue.name}
                            </h5>
                            <span className="text-[10.5px] font-mono text-zinc-500 block mt-0.5">
                              {venue.terminal} • {venue.location}
                            </span>
                          </div>
                          {venue.isUnverified && <UnverifiedBadge />}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20">
                            {t('quickBiteBadge')}
                          </span>
                        </div>

                        {(venue.highlightNote_it || venue.highlightNote_en) && (
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-sans bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            {lang === 'it' ? venue.highlightNote_it : venue.highlightNote_en}
                          </p>
                        )}

                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {venue.hours}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-zinc-400 py-4 text-center">{t('noVenuesFound')}</p>
                )}
              </div>
            )}
          </div>

          {/* 3. RISTORANTI CON SERVIZIO AL TAVOLO */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
            <button
              type="button"
              onClick={() => toggleSection('dining')}
              className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {t('categoryDiningTitle')}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                      {lang === 'it' ? 'Posti a sedere' : 'Full seating'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                    {t('categoryDiningDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {filteredDining.length} {lang === 'it' ? 'ristoranti' : 'dining'}
                </span>
                <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.dining || hasSearch ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </button>

            {(openSections.dining || hasSearch) && (
              <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20">
                {filteredDining.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredDining.map((venue) => (
                      <div
                        key={venue.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                              {venue.name}
                            </h5>
                            <span className="text-[10.5px] font-mono text-zinc-500 block mt-0.5">
                              {venue.terminal} • {venue.location}
                            </span>
                          </div>
                          {venue.isUnverified && <UnverifiedBadge />}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                            {t('tableServiceBadge')}
                          </span>
                        </div>

                        {(venue.highlightNote_it || venue.highlightNote_en) && (
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-sans bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            {lang === 'it' ? venue.highlightNote_it : venue.highlightNote_en}
                          </p>
                        )}

                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {venue.hours}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-zinc-400 py-4 text-center">{t('noVenuesFound')}</p>
                )}
              </div>
            )}
          </div>

          {/* 4. FARMACIE & SERVIZI SANITARI */}
          {pharmacyVenues.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('pharmacy')}
                className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {t('categoryPharmacyTitle')}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
                        {lang === 'it' ? 'Post-Sicurezza' : 'Airside'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                      {t('categoryPharmacyDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {filteredPharmacies.length} {lang === 'it' ? 'presidi' : 'pharmacies'}
                  </span>
                  <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.pharmacy || hasSearch ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {(openSections.pharmacy || hasSearch) && (
                <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20">
                  {filteredPharmacies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredPharmacies.map((venue) => (
                        <div
                          key={venue.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-purple-500/30 shadow-2xs space-y-2 hover:border-purple-500/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                                {venue.name}
                              </h5>
                              <span className="text-[10.5px] font-mono text-zinc-500 block mt-0.5">
                                {venue.terminal} • {venue.location}
                              </span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
                              {t('pharmacy')}
                            </span>
                          </div>

                          {(venue.highlightNote_it || venue.highlightNote_en) && (
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-sans bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                              {lang === 'it' ? venue.highlightNote_it : venue.highlightNote_en}
                            </p>
                          )}

                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              {venue.hours}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-zinc-400 py-4 text-center">{t('noVenuesFound')}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 5. DUTY-FREE & NEGOZI DI VIAGGIO */}
          {dutyFreeVenues.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('duty_free')}
                className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {t('categoryDutyFreeTitle')}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20">
                        Tax Free
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                      {t('categoryDutyFreeDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {filteredDutyFree.length} {lang === 'it' ? 'negozi' : 'shops'}
                  </span>
                  <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.duty_free || hasSearch ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {(openSections.duty_free || hasSearch) && (
                <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20">
                  {filteredDutyFree.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredDutyFree.map((venue) => (
                        <div
                          key={venue.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                                {venue.name}
                              </h5>
                              <span className="text-[10.5px] font-mono text-zinc-500 block mt-0.5">
                                {venue.terminal} • {venue.location}
                              </span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20">
                              {t('dutyFree')}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              {venue.hours}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-zinc-400 py-4 text-center">{t('noVenuesFound')}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 6. GALLERIA BOUTIQUE & MODA (INDICE INTERATTIVO COMPATTO) */}
          {boutiqueVenues.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('boutique')}
                className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {t('categoryBoutiquesTitle')}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {lang === 'it' ? 'Indice Brand' : 'Brand Index'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                      {t('categoryBoutiquesDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {filteredBoutiques.length} {lang === 'it' ? 'brand' : 'brands'}
                  </span>
                  <span className={`p-1 rounded-md text-zinc-400 transition-transform ${openSections.boutique || hasSearch ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {(openSections.boutique || hasSearch) && (
                <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-500">
                    <span>{lang === 'it' ? 'Clicca su un brand per visualizzare subito Terminal e Molo:' : 'Click any brand chip to inspect location & concourse:'}</span>
                    <span className="font-mono text-[11px] text-zinc-400">{filteredBoutiques.length} boutique censite</span>
                  </div>

                  {/* Popover Dettaglio Boutique Cliccata */}
                  {selectedBoutique && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 flex items-center justify-between gap-3 shadow-xs animate-in fade-in-50">
                      <div className="space-y-0.5">
                        <span className="font-bold text-zinc-900 dark:text-white text-sm block">
                          {selectedBoutique.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300">
                          <span className="font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px]">
                            {selectedBoutique.terminal}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-sans text-xs">
                            <MapPin className="w-3 h-3 text-blue-500" />
                            {selectedBoutique.location}
                          </span>
                          <span>•</span>
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {selectedBoutique.hours}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedBoutique(null)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Nuvola Compatta di Brand */}
                  <div className="flex flex-wrap gap-1.5 pt-1 max-h-72 overflow-y-auto">
                    {filteredBoutiques.map((b) => {
                      const isSelected = selectedBoutique?.id === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBoutique(isSelected ? null : b)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold border-zinc-900 dark:border-white shadow-xs'
                              : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                          }`}
                        >
                          <span>{b.name}</span>
                          <span className="text-[10px] text-zinc-400 ml-1 opacity-70">
                            {b.terminal.replace('Terminal ', 'T')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
