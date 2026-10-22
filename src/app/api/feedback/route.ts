import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getClientIp, checkRateLimit } from '@/lib/security/rate-limit';
import { sanitizePostgrestParam, isValidEmail, escapeHtml } from '@/lib/security/sanitize';
import { sendEmail } from '@/lib/email';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // 1. Sliding Window Rate Limiting (max 5 requests per 10 minutes)
    const rateCheck = checkRateLimit(`feedback-${clientIp}`, 5, 600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a few minutes before submitting more feedback.',
          message_it: 'Troppi messaggi inviati di recente. Riprova tra qualche minuto.',
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

    // 2. Payload size validation (max 10KB)
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

    const { category, subject, message, name, email } = body || {};

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (email && (typeof email !== 'string' || !isValidEmail(email))) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    const cleanCategory = sanitizePostgrestParam(category || 'general').slice(0, 50);
    const cleanSubject = subject.trim().slice(0, 150);
    const cleanMessage = message.trim().slice(0, 3000);
    const cleanName = name ? String(name).trim().slice(0, 100) : null;
    const cleanEmail = email ? email.trim().slice(0, 254) : null;

    console.info('💬 [FEEDBACK_RECEIVED]', {
      category: cleanCategory,
      subject: cleanSubject,
      sender: cleanEmail || cleanName || 'anonymous',
      clientIp,
      timestamp: new Date().toISOString()
    });

    // 4. Save to Supabase if available
    let savedId: string | null = null;
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('site_feedback')
          .insert({
            category: cleanCategory,
            subject: cleanSubject,
            message: cleanMessage,
            sender_name: cleanName,
            sender_email: cleanEmail,
            created_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (data?.id) savedId = data.id;
        if (error) console.warn('Supabase site_feedback insert warning:', error.message);
      } catch (dbErr) {
        console.warn('Database note on site_feedback:', dbErr);
      }
    }

    // 5. Send notification email to maintainer
    const adminEmail = process.env.FEEDBACK_NOTIFICATION_EMAIL || 'vireontech@gmail.com';
    try {
      await sendEmail({
        to: adminEmail,
        subject: `[AeroInfo Feedback] [${cleanCategory.toUpperCase()}] ${cleanSubject}`,
        text: `Nuovo feedback ricevuto su AeroInfo:\n\nCategoria: ${cleanCategory}\nDa: ${cleanName || 'Anonimo'} (${cleanEmail || 'nessuna email'})\nOggetto: ${cleanSubject}\n\nMessaggio:\n${cleanMessage}\n\nIP: ${clientIp}\nData: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; color: #222;">
            <h2 style="margin-top: 0; color: #0284c7;">Nuovo Feedback Ricevuto su AeroInfo</h2>
            <p><strong>Categoria:</strong> ${escapeHtml(cleanCategory)}</p>
            <p><strong>Da:</strong> ${escapeHtml(cleanName || 'Anonimo')} &lt;${escapeHtml(cleanEmail || 'nessuna email')}&gt;</p>
            <p><strong>Oggetto:</strong> ${escapeHtml(cleanSubject)}</p>
            <div style="background-color: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; font-size: 14px;">${escapeHtml(cleanMessage)}</div>
            <p style="font-size: 12px; color: #71717a;">Inviato da IP: ${escapeHtml(clientIp)} • ${new Date().toISOString()}</p>
          </div>
        `
      });
    } catch (emailErr) {
      console.warn('Email notification warning:', emailErr);
    }

    return NextResponse.json({
      success: true,
      id: savedId,
      message_it: 'Grazie! Il tuo messaggio è stato inviato con successo al team di AeroInfo.',
      message_en: 'Thank you! Your feedback has been sent to the AeroInfo team.'
    });
  } catch (error: any) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing feedback' },
      { status: 500 }
    );
  }
}
