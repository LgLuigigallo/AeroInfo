import { NextRequest, NextResponse } from 'next/server';
import { airportsData } from '@/data/airports';
import { seedAllAirportsToSupabase } from '@/lib/supabase-sync';

export async function GET(request: NextRequest) {
  const result = await seedAllAirportsToSupabase(airportsData);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const result = await seedAllAirportsToSupabase(airportsData);
  return NextResponse.json(result);
}
