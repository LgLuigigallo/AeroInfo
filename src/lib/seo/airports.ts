import 'server-only';

import { getLiveAirports, supabase } from '@/lib/supabase';
import { makeAirportSlug } from '@/lib/airport-slug';
import type { Airport, AirportSeoStatus, Language } from '@/types/airport';

export const SITE_URL = 'https://www.aero-info.eu';
// Explicitly audited curated fallback set. New static records stay pending
// until quality criteria and source dates are reviewed and added here.
const STATIC_SEO_APPROVED_IATAS = new Set([
  'PRG', 'FCO', 'CIA', 'MXP', 'LIN', 'BGY', 'WAW', 'KRK', 'BUD', 'ATH',
  'ZRH', 'FRA', 'MUC', 'MAD', 'BCN', 'AMS', 'CDG', 'ORY', 'DUB', 'LIS',
  'VIE', 'CPH', 'ARN', 'HEL', 'LHR', 'LGW', 'HND', 'JFK', 'FUE', 'PMO', 'CTA',
  'LPA', 'TFS',
]);

function isMeaningful(value: string | undefined, minimum = 20): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized.length >= minimum && !/^(unknown|n\/a|not available|tbd|airport|aeroporto)$/i.test(normalized);
}

function isPlaceholderAirport(airport: Airport): boolean {
  const generatedName = airport.name_it.trim().toLowerCase() === `aeroporto internazionale di ${airport.city_it} (${airport.iata})`.toLowerCase()
    || airport.name_en.trim().toLowerCase() === `${airport.city_en} international airport (${airport.iata})`.toLowerCase();
  const genericAdvice = /terminal passeggeri operativo|follow overhead directional signs/i.test(`${airport.navigationAdvice_it} ${airport.navigationAdvice_en}`);
  const genericVenue = airport.venues.some((venue) => /airport coffee|city shuttle|taxi service/i.test(venue.name));
  const defaultCoordinates = Math.abs(airport.coordinates.lat - 45) < 0.0001 && Math.abs(airport.coordinates.lng - 12) < 0.0001;
  return generatedName || genericAdvice || genericVenue || defaultCoordinates;
}

export function evaluateAirportSeoQuality(airport: Airport, now = new Date()): string[] {
  const reasons: string[] = [];
  const iata = airport.iata.trim().toUpperCase();
  if (!/^[A-Z0-9]{3}$/.test(iata)) reasons.push('Codice IATA assente o non valido.');
  if (!isMeaningful(airport.name_it, 3) || !isMeaningful(airport.name_en, 3)) reasons.push('Nome ufficiale non disponibile in entrambe le lingue.');
  if (!isMeaningful(airport.city_it, 2) || !isMeaningful(airport.city_en, 2) || !isMeaningful(airport.country_it, 2) || !isMeaningful(airport.country_en, 2)) {
    reasons.push('Località incompleta in italiano o inglese.');
  }
  const { lat, lng } = airport.coordinates;
  const invalidCoordinates = !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180;
  const zeroCoordinates = Math.abs(lat) < 0.001 && Math.abs(lng) < 0.001;
  if (invalidCoordinates || zeroCoordinates || isPlaceholderAirport(airport)) {
    reasons.push('Coordinate o contenuti identificati come segnaposto/generici.');
  }

  let source: URL | null = null;
  let airportSite: URL | null = null;
  try {
    source = new URL(airport.securityPolicy.officialSourceUrl);
  } catch {
    // Reported below as an unavailable official source.
  }
  try {
    airportSite = new URL(airport.officialWebsite);
  } catch {
    // Reported below as an unavailable official source.
  }
  const sourceHost = source?.hostname.replace(/^www\./, '');
  const airportHost = airportSite?.hostname.replace(/^www\./, '');
  const sourceMatchesAirport = Boolean(sourceHost && airportHost && (
    sourceHost === airportHost || sourceHost.endsWith(`.${airportHost}`) || airportHost.endsWith(`.${sourceHost}`) ||
    ['tsa.gov', 'caa.co.uk'].includes(sourceHost)
  ));
  if (!source || source.protocol !== 'https:' || !airportSite || airportSite.protocol !== 'https:' || !sourceMatchesAirport) {
    reasons.push('Fonte ufficiale HTTPS non disponibile per la politica di sicurezza.');
  }

  const verifiedDate = airport.securityPolicy.lastVerifiedDate ? new Date(`${airport.securityPolicy.lastVerifiedDate}T00:00:00Z`) : null;
  const ageDays = verifiedDate ? (now.getTime() - verifiedDate.getTime()) / 86_400_000 : Number.POSITIVE_INFINITY;
  if (!verifiedDate || Number.isNaN(verifiedDate.getTime()) || ageDays < 0 || ageDays > 90) {
    reasons.push('Verifica della sicurezza assente, futura o più vecchia di 90 giorni.');
  }
  if (airport.securityPolicy.liquidsUnverified || airport.securityPolicy.electronicsUnverified) {
    reasons.push('Regole sensibili su liquidi o dispositivi non verificate.');
  }
  if (!isMeaningful(airport.securityPolicy.liquidsAllowance_it, 12) || !isMeaningful(airport.securityPolicy.liquidsAllowance_en, 12)) {
    reasons.push('Regole sui liquidi non descritte in entrambe le lingue.');
  }
  if (!isMeaningful(airport.navigationAdvice_it, 45) || !isMeaningful(airport.navigationAdvice_en, 45)) {
    reasons.push('Contenuto specifico dell’aeroporto insufficiente in italiano o inglese.');
  }

  const localizedDetails = [
    airport.terminals.filter((terminal) => !terminal.isUnverified && isMeaningful(terminal.transferInfo_it) && isMeaningful(terminal.transferInfo_en)).length,
    airport.amenities.filter((amenity) => !amenity.isUnverified && isMeaningful(amenity.details_it) && isMeaningful(amenity.details_en)).length,
    airport.transports.filter((transport) => !transport.isUnverified && isMeaningful(transport.details_it) && isMeaningful(transport.details_en)).length,
  ].reduce((count, sectionCount) => count + Math.min(sectionCount, 2), 0);
  if (localizedDetails < 2) reasons.push('Mancano almeno due informazioni locali sostanziali e bilingui.');

  return reasons;
}

export function getAirportSeoStatus(airport: Airport): AirportSeoStatus {
  const reasons = evaluateAirportSeoQuality(airport);
  if (airport.seoStatus === 'blocked') return 'blocked';
  if (airport.seoStatus === 'indexable') return reasons.length === 0 ? 'indexable' : 'blocked';
  if (!airport.seoStatus && STATIC_SEO_APPROVED_IATAS.has(airport.iata.toUpperCase()) && reasons.length === 0) return 'indexable';
  return airport.seoStatus || 'pending_quality';
}

export async function getSeoAirports(): Promise<Airport[]> {
  return getLiveAirports();
}

export async function getIndexableAirports(): Promise<Airport[]> {
  const airports = await getSeoAirports();
  return airports.filter((airport) => getAirportSeoStatus(airport) === 'indexable');
}

export async function getAirportBySlug(slug: string, lang: Language): Promise<Airport | null> {
  const airports = await getSeoAirports();
  return airports.find((airport) => makeAirportSlug(airport, lang) === slug) || null;
}

export async function getAirportByIata(iata: string): Promise<Airport | null> {
  const airports = await getSeoAirports();
  return airports.find((airport) => airport.iata.toUpperCase() === iata.toUpperCase()) || null;
}

export async function saveAirportSeoEvaluation(airport: Airport, status: AirportSeoStatus, reasons: string[]): Promise<void> {
  if (!supabase) return;
  const now = new Date().toISOString();
  const slugIt = makeAirportSlug(airport, 'it');
  const slugEn = makeAirportSlug(airport, 'en');
  const { data, error } = await supabase.from('airports').update({
    seo_status: status,
    seo_slug_it: slugIt,
    seo_slug_en: slugEn,
    seo_last_evaluated_at: now,
    seo_block_reasons: reasons,
  }).eq('iata_code', airport.iata.toUpperCase()).select('iata_code').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`SEO state not saved for ${airport.iata}; check database migration and write permissions.`);
}

