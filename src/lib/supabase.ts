import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { Airport } from '@/types/airport';
import { airportsData } from '@/data/airports';
import { AVIATION_REGISTRY } from '@/lib/compiler/aviation-registry';
import { cleanOfficialWebsiteUrl, isGeneralAviationAirport } from '@/lib/aviation-authority';

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

export const isSupabaseAdminConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
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

      const upperIata = (row.iata_code || '').toUpperCase();
      const staticMatch = airportsData.find(
        (a) => a.iata.toUpperCase() === upperIata
      ) || AVIATION_REGISTRY[upperIata];

      const cleanSite = cleanOfficialWebsiteUrl(
        row.official_website || staticMatch?.officialWebsite,
        upperIata,
        row.country_code
      );

      const isGenAv = Boolean(
        staticMatch?.isGeneralAviation ||
        staticMatch?.classification === 'general_aviation' ||
        isGeneralAviationAirport({
          iata: upperIata,
          name_it: row.name_it || staticMatch?.name_it,
          name_en: row.name_en || staticMatch?.name_en
        })
      );

      return {
        id: row.iata_code.toLowerCase(),
        seoStatus: row.seo_status || 'pending_quality',
        seoSlugIt: row.seo_slug_it || undefined,
        seoSlugEn: row.seo_slug_en || undefined,
        seoLastEvaluatedAt: row.seo_last_evaluated_at || undefined,
        seoBlockReasons: Array.isArray(row.seo_block_reasons) ? row.seo_block_reasons : [],
        createdAt: row.created_at || undefined,
        iata: row.iata_code,
        icao: row.icao_code || staticMatch?.icao || '',
        name_it: row.name_it || staticMatch?.name_it || '',
        name_en: row.name_en || staticMatch?.name_en || '',
        city_it: row.city_it,
        city_en: row.city_en,
        country_it: row.country_it,
        country_en: row.country_en,
        countryCode: row.country_code,
        officialWebsite: cleanSite,
        classification: staticMatch?.classification || (isGenAv ? 'general_aviation' : 'commercial_scheduled'),
        isGeneralAviation: isGenAv,
        classificationLabel_it: staticMatch?.classificationLabel_it || (isGenAv ? 'Aviazione Generale & Voli Privati' : undefined),
        classificationLabel_en: staticMatch?.classificationLabel_en || (isGenAv ? 'General Aviation & Private Flights' : undefined),
        classificationNotice_it: staticMatch?.classificationNotice_it,
        classificationNotice_en: staticMatch?.classificationNotice_en,
        coordinates: {
          lat: row.latitude ?? staticMatch?.coordinates.lat ?? 0,
          lng: row.longitude ?? staticMatch?.coordinates.lng ?? 0
        },
        difficultyRating: row.difficulty_rating ?? staticMatch?.difficultyRating ?? 2,
        difficultyLabel_it: row.difficulty_label_it || staticMatch?.difficultyLabel_it || '',
        difficultyLabel_en: row.difficulty_label_en || staticMatch?.difficultyLabel_en || '',
        averageSecurityWaitMin: row.avg_security_wait_min ?? staticMatch?.averageSecurityWaitMin ?? 15,
        recommendedArrivalHours: {
          domestic: row.recommended_arrival_domestic ?? staticMatch?.recommendedArrivalHours.domestic ?? 2,
          international: row.recommended_arrival_intl ?? staticMatch?.recommendedArrivalHours.international ?? 3
        },
        navigationAdvice_it: row.navigation_advice_it || staticMatch?.navigationAdvice_it || '',
        navigationAdvice_en: row.navigation_advice_en || staticMatch?.navigationAdvice_en || '',
        otherCityAirports: staticMatch?.otherCityAirports || row.other_city_airports,
        terminalMaps: staticMatch?.terminalMaps,
        securityPolicy: {
          has3DScanners: Boolean(sec.has_3d_scanners ?? staticMatch?.securityPolicy.has3DScanners),
          scannersNote_it: sec.scanners_note_it || staticMatch?.securityPolicy.scannersNote_it || '',
          scannersNote_en: sec.scanners_note_en || staticMatch?.securityPolicy.scannersNote_en || '',
          terminalRules: sec.terminal_rules || staticMatch?.securityPolicy.terminalRules,
          liquidsAllowance_it: sec.liquids_allowance_it || staticMatch?.securityPolicy.liquidsAllowance_it || '100ml max',
          liquidsAllowance_en: sec.liquids_allowance_en || staticMatch?.securityPolicy.liquidsAllowance_en || '100ml max',
          liquidsMustBeRemoved: sec.liquids_must_be_removed ?? staticMatch?.securityPolicy.liquidsMustBeRemoved ?? true,
          liquidsUnverified: Boolean(sec.liquids_unverified),
          liquidsNote_it: sec.liquids_note_it || staticMatch?.securityPolicy.liquidsNote_it,
          liquidsNote_en: sec.liquids_note_en || staticMatch?.securityPolicy.liquidsNote_en,
          electronicsInBag: Boolean(sec.electronics_in_bag ?? staticMatch?.securityPolicy.electronicsInBag),
          electronicsNote_it: sec.electronics_note_it || staticMatch?.securityPolicy.electronicsNote_it || '',
          electronicsNote_en: sec.electronics_note_en || staticMatch?.securityPolicy.electronicsNote_en || '',
          electronicsUnverified: Boolean(sec.electronics_unverified),
          droneAllowedInCabin: sec.drone_allowed_in_cabin ?? staticMatch?.securityPolicy.droneAllowedInCabin ?? true,
          droneAllowedInHold: sec.drone_allowed_in_hold ?? staticMatch?.securityPolicy.droneAllowedInHold ?? false,
          dronePolicy_it: sec.drone_policy_it || staticMatch?.securityPolicy.dronePolicy_it || '',
          dronePolicy_en: sec.drone_policy_en || staticMatch?.securityPolicy.dronePolicy_en || '',
          droneUnverified: Boolean(sec.drone_unverified),
          droneNote_it: sec.drone_note_it || staticMatch?.securityPolicy.droneNote_it,
          droneNote_en: sec.drone_note_en || staticMatch?.securityPolicy.droneNote_en,
          maxPowerbankWh: sec.max_powerbank_wh || staticMatch?.securityPolicy.maxPowerbankWh || 100,
          powerbankPolicy_it: sec.powerbank_policy_it || staticMatch?.securityPolicy.powerbankPolicy_it || '',
          powerbankPolicy_en: sec.powerbank_policy_en || staticMatch?.securityPolicy.powerbankPolicy_en || '',
          powerbankUnverified: Boolean(sec.powerbank_unverified),
          officialSourceUrl:
            typeof sec.official_source_url === 'string' && sec.official_source_url.startsWith('https://')
              ? sec.official_source_url
              : (staticMatch?.securityPolicy.officialSourceUrl || ''),
          // Legacy last_verified_at and curated fallbacks are not proof that
          // this database record passed a successful source fetch.
          lastVerifiedDate: sec.source_verified_at
            ? sec.source_verified_at.split('T')[0]
            : ''
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
          details_it_unverified: am.unverified_note_it || undefined,
          details_en_unverified: am.unverified_note_en || undefined,
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
        lastUpdated: sec.source_verified_at
          ? sec.source_verified_at.split('T')[0]
          : (staticMatch?.lastUpdated || '')
      };
    });
  } catch (err) {
    console.warn('Failed to fetch from Supabase, falling back to local data:', err);
    return airportsData;
  }
}
