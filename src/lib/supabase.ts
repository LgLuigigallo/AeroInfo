import { createClient } from '@supabase/supabase-js';
import { Airport } from '@/types/airport';
import { airportsData } from '@/data/airports';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Server-side privileged client when service role key or sb_secret_ key is provided;
// Prevent client browser bundles from ever utilizing a sb_secret_ administrator key
const activeKey = (typeof window === 'undefined')
  ? (supabaseServiceRoleKey || supabaseAnonKey)
  : (supabaseAnonKey.startsWith('sb_secret_') ? '' : supabaseAnonKey);

// Client safe for browser and edge runtime
export const supabase = (supabaseUrl && activeKey)
  ? createClient(supabaseUrl, activeKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && activeKey);
};

/**
 * Retrieves all airports from Supabase if configured, otherwise falls back to local certified dataset.
 */
export async function getLiveAirports(): Promise<Airport[]> {
  if (!supabase) {
    return airportsData;
  }

  try {
    const { data: dbAirports, error } = await supabase
      .from('airports')
      .select(`
        *,
        security_policies (*),
        terminals (*),
        airlines (*),
        amenities (*),
        venues (*),
        ground_transports (*)
      `);

    if (error || !dbAirports || dbAirports.length === 0) {
      return airportsData;
    }

    // Map relational rows back to TypeScript Airport model
    return dbAirports.map((row: any) => {
      const sec = Array.isArray(row.security_policies) && row.security_policies.length > 0 
        ? row.security_policies[0] 
        : {};

      return {
        id: row.iata_code.toLowerCase(),
        iata: row.iata_code,
        icao: row.icao_code || '',
        name_it: row.name_it,
        name_en: row.name_en,
        city_it: row.city_it,
        city_en: row.city_en,
        country_it: row.country_it,
        country_en: row.country_en,
        countryCode: row.country_code,
        officialWebsite: row.official_website,
        coordinates: {
          lat: row.latitude || 0,
          lng: row.longitude || 0
        },
        difficultyRating: row.difficulty_rating || 2,
        difficultyLabel_it: row.difficulty_label_it || '',
        difficultyLabel_en: row.difficulty_label_en || '',
        averageSecurityWaitMin: row.avg_security_wait_min || 15,
        recommendedArrivalHours: {
          domestic: row.recommended_arrival_domestic || 2,
          international: row.recommended_arrival_intl || 3
        },
        navigationAdvice_it: row.navigation_advice_it || '',
        navigationAdvice_en: row.navigation_advice_en || '',
        securityPolicy: {
          has3DScanners: Boolean(sec.has_3d_scanners),
          scannersNote_it: sec.scanners_note_it || '',
          scannersNote_en: sec.scanners_note_en || '',
          liquidsAllowance_it: sec.liquids_allowance_it || '100ml max',
          liquidsAllowance_en: sec.liquids_allowance_en || '100ml max',
          liquidsMustBeRemoved: sec.liquids_must_be_removed ?? true,
          liquidsUnverified: Boolean(sec.liquids_unverified),
          liquidsNote_it: sec.liquids_note_it,
          liquidsNote_en: sec.liquids_note_en,
          electronicsInBag: Boolean(sec.electronics_in_bag),
          electronicsNote_it: sec.electronics_note_it || '',
          electronicsNote_en: sec.electronics_note_en || '',
          electronicsUnverified: Boolean(sec.electronics_unverified),
          droneAllowedInCabin: sec.drone_allowed_in_cabin ?? true,
          droneAllowedInHold: sec.drone_allowed_in_hold ?? false,
          dronePolicy_it: sec.drone_policy_it || '',
          dronePolicy_en: sec.drone_policy_en || '',
          droneUnverified: Boolean(sec.drone_unverified),
          droneNote_it: sec.drone_note_it,
          droneNote_en: sec.drone_note_en,
          maxPowerbankWh: sec.max_powerbank_wh || 100,
          powerbankPolicy_it: sec.powerbank_policy_it || '',
          powerbankPolicy_en: sec.powerbank_policy_en || '',
          powerbankUnverified: Boolean(sec.powerbank_unverified),
          officialSourceUrl: sec.official_source_url || row.official_website,
          lastVerifiedDate: sec.last_verified_at ? sec.last_verified_at.split('T')[0] : '2026-10-18'
        },
        terminals: (row.terminals || []).map((t: any) => ({
          id: t.id,
          name: t.name,
          transferInfo_it: t.transfer_info_it || '',
          transferInfo_en: t.transfer_info_en || '',
          isUnverified: Boolean(t.is_unverified)
        })),
        airlines: (row.airlines || []).map((a: any) => ({
          airlineName: a.airline_name,
          iataCode: a.iata_code || '',
          terminal: a.terminal,
          checkInZone: a.check_in_zone,
          isUnverified: Boolean(a.is_unverified)
        })),
        amenities: (row.amenities || []).map((am: any) => ({
          id: am.id,
          category: am.category,
          title_it: am.title_it,
          title_en: am.title_en,
          terminal: am.terminal,
          location_it: am.location_it || '',
          location_en: am.location_en || '',
          details_it: am.details_it || '',
          details_en: am.details_en || '',
          isUnverified: Boolean(am.is_unverified)
        })),
        venues: (row.venues || []).map((v: any) => ({
          id: v.id,
          name: v.name,
          category: v.category,
          terminal: v.terminal,
          location: v.location || '',
          hours: v.hours || '',
          is24Hours: Boolean(v.is_24_hours),
          isUnverified: Boolean(v.is_unverified)
        })),
        transports: (row.ground_transports || []).map((tr: any) => ({
          id: tr.id,
          type: tr.type,
          name_it: tr.name_it,
          name_en: tr.name_en,
          duration: tr.duration || '',
          frequency: tr.frequency || '',
          estimatedCost: tr.estimated_cost || '',
          pickupLocation_it: tr.pickup_location_it || '',
          pickupLocation_en: tr.pickup_location_en || '',
          details_it: tr.details_it || '',
          details_en: tr.details_en || '',
          isUnverified: Boolean(tr.is_unverified)
        })),
        lastUpdated: row.last_verified_at ? row.last_verified_at.split('T')[0] : '2026-10-18'
      };
    });
  } catch (err) {
    console.warn('Failed to fetch from Supabase, falling back to local data:', err);
    return airportsData;
  }
}
