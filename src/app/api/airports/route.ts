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

    // Overwrite / append with live database data
    for (const a of liveAirports) {
      airportMap.set(a.iata.toUpperCase(), a);
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
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
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
