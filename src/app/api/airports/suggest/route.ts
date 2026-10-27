import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getClientIp, checkRateLimit } from '@/lib/security/rate-limit';
import { sanitizePostgrestParam, isValidEmail, escapeHtml } from '@/lib/security/sanitize';
import { isSafeOutboundUrl } from '@/lib/security/ssrf';
import { sendEmail } from '@/lib/email';

export const maxDuration = 30;

// In-memory fallback cache of pending suggestions per airport
const memoryPendingSuggestions = new Map<string, { category: string; count: number; lastReportedAt: string; note_it: string; note_en: string }>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iata = searchParams.get('iata')?.toUpperCase().trim();

    if (!iata || !/^[A-Z]{3}$/.test(iata)) {
      return NextResponse.json({ hasPending: false });
    }

    // 1. Check in memory
    const memoryRecord = memoryPendingSuggestions.get(iata);

    // 2. Check in Supabase if configured
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('airport_suggestions')
          .select('id, category, details, created_at')
          .eq('airport_iata', iata)
          .eq('status', 'pending_verification')
          .order('created_at', { ascending: false })
          .limit(5);

        if (!error && data && data.length > 0) {
          const latest = data[0];
          return NextResponse.json({
            hasPending: true,
            pendingNotice: {
              category: latest.category,
              count: data.length,
              note_it: `Segnalazione recente passeggeri: ${latest.details.slice(0, 120)}... (in attesa di riscontro ufficiale sul portale)`,
              note_en: `Recent traveler report: ${latest.details.slice(0, 120)}... (pending official airport verification)`,
              lastReportedAt: latest.created_at
            }
          });
        }
      } catch {
        console.warn('Database note on checking suggestions.');
      }
    }

    if (memoryRecord) {
      return NextResponse.json({
        hasPending: true,
        pendingNotice: memoryRecord
      });
    }

    return NextResponse.json({ hasPending: false });
  } catch (error: any) {
    return NextResponse.json({ hasPending: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // 1. Sliding Window Rate Limiting (max 5 requests per 10 minutes)
    const rateCheck = checkRateLimit(`suggest-${clientIp}`, 5, 600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a few minutes before submitting another suggestion.',
          message_it: 'Troppe segnalazioni inviate di recente. Riprova tra qualche minuto.',
          message_en: 'Too many submissions. Please wait a few minutes before trying again.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000))
          }
        }
      );
    }

    // 2. Payload size check
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return NextResponse.json(
        { success: false, error: 'Payload too large (max 10KB)' },
        { status: 413 }
      );
    }

    // 3. Safe JSON parsing
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }

    const { iata, category, details, sourceUrl, email } = body || {};

    if (!iata || typeof iata !== 'string' || !/^[A-Za-z]{3}$/.test(iata.trim())) {
      return NextResponse.json(
        { success: false, error: 'Valid 3-letter IATA code is required' },
        { status: 400 }
      );
    }

    if (!details || typeof details !== 'string' || details.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Suggestion details must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (email && (typeof email !== 'string' || !isValidEmail(email))) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    if (sourceUrl && (typeof sourceUrl !== 'string' || !isSafeOutboundUrl(sourceUrl))) {
      return NextResponse.json(
        { success: false, error: 'Source URL must be a valid, public HTTPS link' },
        { status: 400 }
      );
    }

    const cleanIata = iata.trim().toUpperCase();
    const cleanCategory = sanitizePostgrestParam(category || 'other').slice(0, 50);
    const cleanDetails = details.trim().slice(0, 2000);
    const cleanSourceUrl = sourceUrl ? sourceUrl.trim().slice(0, 300) : null;
    const cleanEmail = email ? email.trim().slice(0, 254) : null;

    console.info('📝 [AIRPORT_SUGGESTION]', {
      iata: cleanIata,
      category: cleanCategory,
      hasContact: Boolean(cleanEmail),
      timestamp: new Date().toISOString()
    });

    // 4. Save to Memory store
    memoryPendingSuggestions.set(cleanIata, {
      category: cleanCategory,
      count: (memoryPendingSuggestions.get(cleanIata)?.count || 0) + 1,
      note_it: `Segnalazione recente: ${cleanDetails.slice(0, 100)}... (in verifica)`,
      note_en: `Recent passenger report: ${cleanDetails.slice(0, 100)}... (verifying)`,
      lastReportedAt: new Date().toISOString()
    });

    // 5. Save to Supabase if configured
    let suggestionId = 'sug-' + Date.now();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('airport_suggestions')
          .insert({
            airport_iata: cleanIata,
            category: cleanCategory,
            details: cleanDetails,
            source_url: cleanSourceUrl,
            requester_email: cleanEmail,
            status: 'pending_verification',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (data?.id) suggestionId = data.id;
        if (error) console.warn('Supabase airport_suggestions insert warning.');
      } catch (dbErr) {
        console.warn('Database note on airport_suggestions.');
      }
    }

    // 6. Notify admin by email
    const adminEmail = process.env.FEEDBACK_NOTIFICATION_EMAIL || 'vireontech@gmail.com';
    try {
      await sendEmail({
        to: adminEmail,
        subject: `[AeroInfo Segnalazione] Modifica per ${cleanIata} (${cleanCategory})`,
        text: `Nuova proposta di modifica aeroportuale per ${cleanIata}:\n\nCategoria: ${cleanCategory}\nDettagli:\n${cleanDetails}\nFonte: ${cleanSourceUrl || 'Nessuna fornita'}\nEmail utente: ${cleanEmail || 'Anonimo'}\nIP: ${clientIp}\nData: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; color: #222;">
            <h2 style="margin-top: 0; color: #d97706;">Proposta di Modifica Aeroporto: ${escapeHtml(cleanIata)}</h2>
            <p><strong>Categoria:</strong> ${escapeHtml(cleanCategory)}</p>
            <p><strong>Dettagli segnalazione:</strong></p>
            <div style="background-color: #fef3c7; color: #78350f; padding: 15px; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(cleanDetails)}</div>
            ${cleanSourceUrl ? `<p><strong>Fonte indicata:</strong> <a href="${escapeHtml(cleanSourceUrl)}">${escapeHtml(cleanSourceUrl)}</a></p>` : ''}
            <p><strong>Segnalatore:</strong> ${escapeHtml(cleanEmail || 'Anonimo')}</p>
            <p style="font-size: 12px; color: #71717a;">La modifica è salvata in background e verrà verificata durante il prossimo sync con le fonti ufficiali.</p>
          </div>
        `
      });
    } catch {
      console.warn('Admin notification email warning.');
    }

    return NextResponse.json({
      success: true,
      id: suggestionId,
      message_it: 'Suggerimento registrato! Verrà verificato in background con le fonti ufficiali durante il prossimo ciclo automatico di sincronizzazione.',
      message_en: 'Suggestion registered! It will be verified in the background against official airport sources during the next automated sync cycle.'
    });
  } catch {
    console.error('Airport suggestion submission failed.');
    return NextResponse.json(
      { success: false, error: 'Internal server error processing airport suggestion' },
      { status: 500 }
    );
  }
}
