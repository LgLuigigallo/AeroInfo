import { NextResponse } from 'next/server';
import { getLiveAirports } from '@/lib/supabase';
import { airportsData } from '@/data/airports';
import { Airport } from '@/types/airport';

export async function GET() {
  try {
    const liveAirports = await getLiveAirports();

    // Merge: ensure any airport from airportsData not yet in liveAirports is included
    const airportMap = new Map<string, Airport>();
    
    // Add fallback static data first
    for (const a of airportsData) {
      airportMap.set(a.iata.toUpperCase(), a);
    }

    // Overwrite / append with live database data while preserving rich client fields
    for (const a of liveAirports) {
      const existing = airportMap.get(a.iata.toUpperCase());
      if (existing) {
        airportMap.set(a.iata.toUpperCase(), {
          ...existing,
          ...a,
          otherCityAirports: a.otherCityAirports || existing.otherCityAirports,
          terminalMaps: a.terminalMaps || existing.terminalMaps,
          securityPolicy: {
            ...existing.securityPolicy,
            ...a.securityPolicy,
            terminalRules: a.securityPolicy.terminalRules || existing.securityPolicy.terminalRules
          }
        });
      } else {
        airportMap.set(a.iata.toUpperCase(), a);
      }
    }

    const mergedList = Array.from(airportMap.values());

    return NextResponse.json(
      {
        success: true,
        count: mergedList.length,
        airports: mergedList
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  } catch (error: any) {
    console.error('Failed to get live airports:', error);
    return NextResponse.json(
      {
        success: true,
        count: airportsData.length,
        airports: airportsData,
        fallback: true
      },
      { status: 200 }
    );
  }
}
