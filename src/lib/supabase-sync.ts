import { supabase } from './supabase';
import { Airport } from '@/types/airport';

export interface SeedResult {
  success: boolean;
  message: string;
  count: number;
  errors: string[];
}

/**
 * Seeds all certified airports and related tables to Supabase.
 * Safe to run multiple times (uses upsert on IATA code).
 */
export async function seedAllAirportsToSupabase(airports: Airport[]): Promise<SeedResult> {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase is not configured. Provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local',
      count: 0,
      errors: ['Client is null']
    };
  }

  const errors: string[] = [];
  let inserted = 0;

  for (const ap of airports) {
    try {
      // 1. Upsert Airport
      const { data: airportRow, error: airportError } = await supabase
        .from('airports')
        .upsert(
          {
            iata_code: ap.iata,
            icao_code: ap.icao,
            name_it: ap.name_it,
            name_en: ap.name_en,
            city_it: ap.city_it,
            city_en: ap.city_en,
            country_it: ap.country_it,
            country_en: ap.country_en,
            country_code: ap.countryCode,
            official_website: ap.officialWebsite,
            latitude: ap.coordinates.lat,
            longitude: ap.coordinates.lng,
            difficulty_rating: ap.difficultyRating,
            difficulty_label_it: ap.difficultyLabel_it,
            difficulty_label_en: ap.difficultyLabel_en,
            avg_security_wait_min: Math.round(ap.averageSecurityWaitMin),
            recommended_arrival_domestic: Math.round(ap.recommendedArrivalHours.domestic),
            recommended_arrival_intl: Math.round(ap.recommendedArrivalHours.international),
            navigation_advice_it: ap.navigationAdvice_it,
            navigation_advice_en: ap.navigationAdvice_en,
            last_verified_at: new Date().toISOString()
          },
          { onConflict: 'iata_code' }
        )
        .select('id')
        .single();

      if (airportError || !airportRow) {
        errors.push(`Failed to upsert airport ${ap.iata}: ${airportError?.message}`);
        continue;
      }

      const airportId = airportRow.id;

      // 2. Upsert Security Policy
      const sec = ap.securityPolicy;
      await supabase.from('security_policies').delete().eq('airport_id', airportId);
      const { error: secError } = await supabase.from('security_policies').insert({
        airport_id: airportId,
        has_3d_scanners: sec.has3DScanners,
        scanners_note_it: sec.scannersNote_it,
        scanners_note_en: sec.scannersNote_en,
        liquids_allowance_it: sec.liquidsAllowance_it,
        liquids_allowance_en: sec.liquidsAllowance_en,
        liquids_must_be_removed: sec.liquidsMustBeRemoved,
        liquids_unverified: Boolean(sec.liquidsUnverified),
        liquids_note_it: sec.liquidsNote_it,
        liquids_note_en: sec.liquidsNote_en,
        electronics_in_bag: sec.electronicsInBag,
        electronics_note_it: sec.electronicsNote_it,
        electronics_note_en: sec.electronicsNote_en,
        electronics_unverified: Boolean(sec.electronicsUnverified),
        drone_allowed_in_cabin: sec.droneAllowedInCabin,
        drone_allowed_in_hold: sec.droneAllowedInHold,
        drone_policy_it: sec.dronePolicy_it,
        drone_policy_en: sec.dronePolicy_en,
        drone_unverified: Boolean(sec.droneUnverified),
        drone_note_it: sec.droneNote_it,
        drone_note_en: sec.droneNote_en,
        max_powerbank_wh: sec.maxPowerbankWh,
        powerbank_policy_it: sec.powerbankPolicy_it,
        powerbank_policy_en: sec.powerbankPolicy_en,
        powerbank_unverified: Boolean(sec.powerbankUnverified),
        official_source_url: sec.officialSourceUrl,
        last_verified_at: new Date().toISOString()
      });

      if (secError) {
        errors.push(`Failed to insert security policy for ${ap.iata}: ${secError.message}`);
      }

      // 3. Terminals
      await supabase.from('terminals').delete().eq('airport_id', airportId);
      if (ap.terminals.length > 0) {
        const terminalsPayload = ap.terminals.map((t) => ({
          airport_id: airportId,
          name: t.name,
          transfer_info_it: t.transferInfo_it,
          transfer_info_en: t.transferInfo_en,
          is_unverified: Boolean(t.isUnverified)
        }));
        await supabase.from('terminals').insert(terminalsPayload);
      }

      // 4. Airlines
      await supabase.from('airlines').delete().eq('airport_id', airportId);
      if (ap.airlines.length > 0) {
        const airlinesPayload = ap.airlines.map((a) => ({
          airport_id: airportId,
          airline_name: a.airlineName,
          iata_code: (a.iataCode || '').slice(0, 3),
          terminal: a.terminal,
          check_in_zone: a.checkInZone,
          is_unverified: Boolean(a.isUnverified)
        }));
        await supabase.from('airlines').insert(airlinesPayload);
      }

      // 5. Amenities
      await supabase.from('amenities').delete().eq('airport_id', airportId);
      if (ap.amenities.length > 0) {
        const amenitiesPayload = ap.amenities.map((am) => ({
          airport_id: airportId,
          category: am.category,
          title_it: am.title_it,
          title_en: am.title_en,
          terminal: am.terminal,
          location_it: am.location_it,
          location_en: am.location_en,
          details_it: am.details_it,
          details_en: am.details_en,
          is_unverified: Boolean(am.isUnverified)
        }));
        await supabase.from('amenities').insert(amenitiesPayload);
      }

      // 6. Venues
      await supabase.from('venues').delete().eq('airport_id', airportId);
      if (ap.venues.length > 0) {
        const venuesPayload = ap.venues.map((v) => ({
          airport_id: airportId,
          name: v.name,
          category: v.category,
          terminal: v.terminal,
          location: v.location,
          hours: v.hours,
          is_24_hours: Boolean(v.is24Hours),
          is_unverified: Boolean(v.isUnverified)
        }));
        await supabase.from('venues').insert(venuesPayload);
      }

      // 7. Ground Transport
      await supabase.from('ground_transports').delete().eq('airport_id', airportId);
      if (ap.transports.length > 0) {
        const transportsPayload = ap.transports.map((tr) => ({
          airport_id: airportId,
          type: tr.type,
          name_it: tr.name_it,
          name_en: tr.name_en,
          duration: tr.duration,
          frequency: tr.frequency,
          estimated_cost: tr.estimatedCost,
          pickup_location_it: tr.pickupLocation_it,
          pickup_location_en: tr.pickupLocation_en,
          details_it: tr.details_it,
          details_en: tr.details_en,
          is_unverified: Boolean(tr.isUnverified)
        }));
        await supabase.from('ground_transports').insert(transportsPayload);
      }

      inserted++;
    } catch (err: any) {
      errors.push(`Error seeding airport ${ap.iata}: ${err.message}`);
    }
  }

  return {
    success: errors.length === 0,
    message: `Seeded ${inserted} airports to Supabase.`,
    count: inserted,
    errors
  };
}
