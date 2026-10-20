import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export interface SendEmailResult {
  success: boolean;
  provider?: 'resend' | 'smtp' | 'none';
  messageId?: string;
  error?: string;
}

/**
 * Dispatches an email using either Resend or Nodemailer (SMTP).
 * Gracefully falls back to detailed logging if credentials are not configured yet.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  const fromEmail = process.env.EMAIL_FROM || 'AeroInfo <onboarding@resend.dev>';
  const replyTo = process.env.EMAIL_REPLY_TO || 'vireontech@gmail.com';

  // 1. Prioritize Nodemailer SMTP (e.g. Gmail official SMTP) for guaranteed inbox delivery
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass.replace(/\s+/g, '')
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `AeroInfo <${smtpUser}>`,
        to,
        replyTo,
        subject,
        text,
        html,
        headers: {
          'X-Entity-Ref-ID': `aeroinfo-${Date.now()}`,
          'List-Unsubscribe': `<mailto:${replyTo}?subject=Unsubscribe>`
        }
      });

      console.info(`✉️ [EMAIL_SENT] Email successfully delivered via Gmail SMTP to ${to} (ID: ${info.messageId})`);
      return { success: true, provider: 'smtp', messageId: info.messageId };
    } catch (err: any) {
      console.error('❌ Failed to send email via SMTP:', err);
      return { success: false, provider: 'smtp', error: err.message };
    }
  }

  // 2. Fallback to Resend if API key is provided
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const res = await resend.emails.send({
        from: fromEmail,
        to,
        replyTo,
        subject,
        html,
        text,
        headers: {
          'X-Entity-Ref-ID': `aeroinfo-${Date.now()}`,
          'List-Unsubscribe': `<mailto:${replyTo}?subject=Unsubscribe>`
        }
      });

      if (res.error) {
        console.error('❌ Resend API returned error:', res.error);
        return { success: false, provider: 'resend', error: res.error.message };
      }

      console.info(`✉️ [EMAIL_SENT] Email successfully delivered via Resend to ${to} (ID: ${res.data?.id})`);
      return { success: true, provider: 'resend', messageId: res.data?.id };
    } catch (err: any) {
      console.error('❌ Failed to send email via Resend:', err);
      return { success: false, provider: 'resend', error: err.message };
    }
  }

  // 3. Fallback when credentials are missing: log to terminal & alert admin
  console.warn(`⚠️ [EMAIL_DISPATCH_SKIPPED] No email provider configured (missing RESEND_API_KEY or SMTP_USER/PASS). Simulated dispatch to: ${to} | Subject: "${subject}"`);
  return {
    success: false,
    provider: 'none',
    error: 'Missing email service credentials. Set RESEND_API_KEY or SMTP_USER/SMTP_PASS in environment variables.'
  };
}

/**
 * 1. Confirmation Email sent when user requests an uncatalogued airport
 */
export async function sendRequestConfirmationEmail({
  to,
  airportQuery
}: {
  to: string;
  airportQuery: string;
}): Promise<SendEmailResult> {
  const subject = `✈️ Richiesta di censimento ricevuta: ${airportQuery.toUpperCase()} | AeroInfo`;
  const text = `Ciao!\n\nAbbiamo ricevuto la tua richiesta di censimento per l'aeroporto "${airportQuery}".\nIl nostro web crawler analizzerà il sito ufficiale dell'aeroporto per verificare le regole su liquidi, controlli 3D, droni e mappa concourse.\n\nRiceverai un'ulteriore email non appena l'aeroporto sarà online ed accessibile su AeroInfo.\n\nA presto,\nIl Team di AeroInfo\nhttps://aero-info.vercel.app`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #111827; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }
          .header { background: #0f172a; padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 13px; color: #94a3b8; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; padding: 6px 14px; background: #eff6ff; color: #1d4ed8; border-radius: 9999px; font-weight: 600; font-size: 13px; margin: 12px 0; border: 1px solid #dbeafe; }
          .steps { background: #f8fafc; border-radius: 12px; padding: 16px; margin: 20px 0; border: 1px solid #f1f5f9; }
          .step-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 13px; color: #334155; }
          .step-item:last-child { margin-bottom: 0; }
          .footer { padding: 20px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #64748b; }
          .footer a { color: #0284c7; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✈️ AeroInfo</h1>
            <p>Intelligence Ufficiale per Viaggiatori Aeroportuali</p>
          </div>
          <div class="content">
            <h2 style="font-size: 17px; margin-top: 0;">Richiesta presa in carico con successo</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
              Abbiamo registrato la tua richiesta di censimento per l'aeroporto:
            </p>
            <div style="text-align: center;">
              <span class="badge">${airportQuery.toUpperCase()}</span>
            </div>
            
            <div class="steps">
              <div class="step-item">
                <span style="font-weight: bold; color: #2563eb;">1.</span>
                <span><strong>Web Scraping Ufficiale:</strong> I nostri crawler analizzeranno esclusivamente il portale ufficiale dell'autorità aeroportuale.</span>
              </div>
              <div class="step-item">
                <span style="font-weight: bold; color: #2563eb;">2.</span>
                <span><strong>Verifica Regole:</strong> Rileveremo la presenza di scanner tomografici 3D, deroghe sui liquidi da 100ml, droni, powerbank e stazioni di ricarica.</span>
              </div>
              <div class="step-item">
                <span style="font-weight: bold; color: #2563eb;">3.</span>
                <span><strong>Pubblicazione & Notifica:</strong> Appena l'aeroporto sarà online nel nostro database, riceverai una seconda email con il link diretto alla scheda completa.</span>
              </div>
            </div>

            <p style="font-size: 13px; color: #6b7280; line-height: 1.5;">
              La sincronizzazione e l'ingestione avvengono automaticamente entro il ciclo settimanale (o non appena lo scraping ufficiale viene validato).
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0 0 6px 0;">AeroInfo • Global Airport Intelligence</p>
            <p style="margin: 0;"><a href="https://aero-info.vercel.app">https://aero-info.vercel.app</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * 2. Notification Email sent when the airport has been indexed and published
 */
export async function sendAirportPublishedEmail({
  to,
  airportName,
  airportIata,
  airportUrl
}: {
  to: string;
  airportName: string;
  airportIata: string;
  airportUrl: string;
}): Promise<SendEmailResult> {
  const subject = `🎉 L'aeroporto ${airportName} (${airportIata}) è ora online su AeroInfo!`;
  const text = `Ottime notizie!\n\nL'aeroporto da te richiesto "${airportName}" (${airportIata}) è stato censito, verificato dal sito ufficiale e pubblicato nel nostro database.\n\nAccedi subito alla scheda completa e alla mappa concourse:\n${airportUrl}\n\nA presto,\nIl Team di AeroInfo`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #111827; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }
          .header { background: #059669; padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .content { padding: 32px 24px; text-align: center; }
          .cta-btn { display: inline-block; padding: 12px 28px; background: #0f172a; color: #ffffff !important; border-radius: 9999px; font-weight: 600; font-size: 14px; text-decoration: none; margin: 24px 0 12px 0; }
          .footer { padding: 20px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Nuovo Aeroporto Disponibile!</h1>
          </div>
          <div class="content">
            <h2 style="font-size: 18px; margin-top: 0; color: #111827;">${airportName} (${airportIata})</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
              L'aeroporto che avevi richiesto è stato censito, analizzato dal sito ufficiale ed è ora ufficialmente consultabile su AeroInfo.
            </p>
            <p style="font-size: 13px; color: #6b7280;">
              Troverai le regole sui liquidi, la presenza di scanner 3D, le politiche sui droni, la mappa concourse con le prese di ricarica e i ristoranti.
            </p>
            <div>
              <a href="${airportUrl}" class="cta-btn">Esplora la Scheda Aeroporto &rarr;</a>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 6px 0;">AeroInfo • Global Airport Intelligence</p>
            <p style="margin: 0;"><a href="https://aero-info.vercel.app" style="color: #059669; text-decoration: none;">https://aero-info.vercel.app</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html, text });
}
