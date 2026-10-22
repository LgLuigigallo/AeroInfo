import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getClientIp, checkRateLimit } from '@/lib/security/rate-limit';
import { isValidEmail, sanitizePostgrestParam } from '@/lib/security/sanitize';

export const maxDuration = 30;

/**
 * Handles unsubscribe requests from users who previously entered their email.
 * Supports both POST (JSON body) and GET (one-click link with ?email=...&iata=...).
 */
async function handleUnsubscribe(email: string | null | undefined, iata?: string | null) {
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Invalid email address',
        message_it: 'Indirizzo email non valido.',
        message_en: 'Invalid email address.'
      }
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  const sanitizedEmail = sanitizePostgrestParam(cleanEmail);
  const cleanIata = iata && typeof iata === 'string' && /^[a-zA-Z]{3}$/.test(iata.trim())
    ? iata.trim().toUpperCase()
    : null;

  let recordsUpdated = 0;

  if (supabase) {
    try {
      // 1. In airport_requests: clear requester_email so no notification is ever dispatched
      let updateQuery = supabase
        .from('airport_requests')
        .update({
          requester_email: null,
          updated_at: new Date().toISOString()
        })
        .ilike('requester_email', sanitizedEmail);

      if (cleanIata) {
        updateQuery = updateQuery.ilike('iata_code', cleanIata);
      }

      const { data: updatedData, error: updateError } = await updateQuery.select('id');
      if (!updateError && updatedData) {
        recordsUpdated += updatedData.length;
      }

      // 2. Also clear requester_email in suggested_modifications if present
      await supabase
        .from('suggested_modifications')
        .update({ requester_email: null })
        .ilike('requester_email', sanitizedEmail);

    } catch (dbErr: any) {
      console.warn('Supabase unsubscribe update warning:', dbErr.message);
    }
  }

  console.info(`🔕 [UNSUBSCRIBE] User unsubscribed: ${cleanEmail} (affected records: ${recordsUpdated})`);

  return {
    status: 200,
    body: {
      success: true,
      email: cleanEmail,
      recordsUpdated,
      message_it: 'La tua iscrizione è stata cancellata con successo. Non riceverai più notifiche o email di aggiornamento da AeroInfo.',
      message_en: 'You have been successfully unsubscribed. You will no longer receive notification alerts or updates from AeroInfo.'
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(clientIp, 10, 600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a few minutes.',
          message_it: 'Troppe richieste. Riprova tra qualche minuto.',
          message_en: 'Too many requests. Please try again shortly.'
        },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { email, iata } = body || {};
    const result = await handleUnsubscribe(email, iata);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error: any) {
    console.error('Error in POST /api/airports/unsubscribe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(clientIp, 10, 600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const iata = searchParams.get('iata');

    const result = await handleUnsubscribe(email, iata);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error: any) {
    console.error('Error in GET /api/airports/unsubscribe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
