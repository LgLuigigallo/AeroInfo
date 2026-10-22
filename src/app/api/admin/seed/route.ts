import { NextRequest, NextResponse } from 'next/server';
import { airportsData } from '@/data/airports';
import { seedAllAirportsToSupabase } from '@/lib/supabase-sync';

export const maxDuration = 60;

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.CRON_SECRET;

  if (process.env.NODE_ENV === 'production') {
    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return false;
    }
  } else if (adminSecret) {
    // In development, if secret is set, verify it
    if (authHeader !== `Bearer ${adminSecret}`) {
      return false;
    }
  }

  return true;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: valid Admin Bearer token required' },
      { status: 401 }
    );
  }

  const result = await seedAllAirportsToSupabase(airportsData);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: valid Admin Bearer token required' },
      { status: 401 }
    );
  }

  const result = await seedAllAirportsToSupabase(airportsData);
  return NextResponse.json(result);
}
