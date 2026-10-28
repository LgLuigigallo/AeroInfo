import { NextRequest, NextResponse } from 'next/server';
import { isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { submitToIndexNow } from '@/lib/seo/indexnow';
import { getSeoAirports } from '@/lib/seo/airports';
import { airportPath } from '@/lib/airport-slug';

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;

  let body: { urls?: string[]; submitAll?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    // empty body default to submitAll: true
  }

  let urlsToSubmit: string[] = [];

  if (body.urls && Array.isArray(body.urls) && body.urls.length > 0) {
    urlsToSubmit = body.urls;
  } else {
    // Collect all public indexable URLs: Home, Guides, Airport pages
    const baseUrl = 'https://www.aero-info.eu';
    urlsToSubmit = [
      `${baseUrl}/`,
      `${baseUrl}/en`,
      `${baseUrl}/guide/liquidi-bagaglio-a-mano`,
      `${baseUrl}/en/guides/liquids-in-carry-on-baggage`,
    ];

    try {
      const airports = await getSeoAirports();
      for (const airport of airports) {
        urlsToSubmit.push(`${baseUrl}${airportPath(airport, 'it')}`);
        urlsToSubmit.push(`${baseUrl}${airportPath(airport, 'en')}`);
      }
    } catch (err) {
      console.error('Error fetching airports for IndexNow:', err);
    }
  }

  const result = await submitToIndexNow(urlsToSubmit);

  try {
    await writeAdminAudit(
      identity,
      'indexnow.submit',
      'seo',
      'urls',
      {
        submittedCount: result.submittedCount,
        statusCode: result.statusCode,
        success: result.success,
      },
      result.success ? 'success' : 'failure'
    );
  } catch {
    // Audit failure shouldn't block response
  }

  return NextResponse.json(result, { status: result.success ? 200 : result.statusCode });
}
