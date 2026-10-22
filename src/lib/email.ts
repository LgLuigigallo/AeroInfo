import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { escapeHtml } from '@/lib/security/sanitize';

export interface SendEmailResult {
  success: boolean;
  provider?: 'resend' | 'smtp' | 'none';
  messageId?: string;
  error?: string;
}

/**
 * Dispatches an email using Nodemailer (Gmail official SMTP) or Resend.
 * Uses clean, high-deliverability human formatting to avoid spam filters.
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
        from: `AeroInfo <${smtpUser}>`,
        to,
        replyTo,
        subject,
        text,
        html,
        headers: {
          'X-Entity-Ref-ID': `aeroinfo-${Date.now()}`
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
      const fromEmail = process.env.EMAIL_FROM || 'AeroInfo <onboarding@resend.dev>';
      const resend = new Resend(resendApiKey);
      const res = await resend.emails.send({
        from: fromEmail,
        to,
        replyTo,
        subject,
        html,
        text
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

  // 3. Fallback when credentials are missing
  console.warn(`⚠️ [EMAIL_DISPATCH_SKIPPED] No email provider configured. Simulated dispatch to: ${to} | Subject: "${subject}"`);
  return {
    success: false,
    provider: 'none',
    error: 'Missing email service credentials.'
  };
}

/**
 * Capitalizes string nicely for clean subject lines (avoids spammy ALL-CAPS)
 */
function toTitleCase(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
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
  const cleanName = toTitleCase(airportQuery);
  const safeHtmlName = escapeHtml(cleanName);
  const subject = `Conferma richiesta aeroporto ${cleanName} - AeroInfo`;
  
  const text = `Ciao,\n\nti confermiamo la ricezione della tua richiesta per l'aeroporto di ${cleanName}.\n\nIl nostro team verificherà le disposizioni ufficiali dell'ente aeroportuale relative a bagaglio a mano, controlli di sicurezza, terminal e servizi per i passeggeri.\n\nTi invieremo un aggiornamento non appena la scheda sarà pubblicata e consultabile online.\n\nA presto,\nTeam AeroInfo\nhttps://aero-info.vercel.app`;

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; margin: 0; padding: 24px; color: #222222; line-height: 1.6;">
        <div style="max-width: 560px; margin: 0 auto; padding: 10px;">
          <h2 style="font-size: 18px; color: #111111; margin-top: 0; margin-bottom: 16px;">
            Richiesta registrata con successo
          </h2>
          <p style="font-size: 14px; margin-bottom: 14px;">Ciao,</p>
          <p style="font-size: 14px; margin-bottom: 14px;">
            ti confermiamo la corretta ricezione della tua richiesta per l'aeroporto di <strong>${safeHtmlName}</strong>.
          </p>
          <p style="font-size: 14px; margin-bottom: 14px;">
            Verificheremo le informazioni e le normative ufficiali dell'ente aeroportuale:
          </p>
          <ul style="font-size: 14px; padding-left: 20px; margin-bottom: 20px; color: #444444;">
            <li style="margin-bottom: 6px;">Disposizioni sui liquidi e tipologia di controlli di sicurezza</li>
            <li style="margin-bottom: 6px;">Suddivisione delle compagnie per terminal</li>
            <li style="margin-bottom: 6px;">Punti di ricarica per dispositivi e fontanelle per l'acqua</li>
            <li style="margin-bottom: 6px;">Aree ristoro, negozi e collegamenti con la città</li>
          </ul>
          <p style="font-size: 14px; margin-bottom: 24px;">
            Non appena la scheda sarà disponibile sul portale, ti invieremo un'email di aggiornamento con il link diretto.
          </p>
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #777777; margin: 0;">
            A presto,<br>
            <strong>Team AeroInfo</strong><br>
            <a href="https://aero-info.vercel.app" style="color: #0066cc; text-decoration: none;">aero-info.vercel.app</a>
          </p>
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
  const safeName = escapeHtml(airportName);
  const safeIata = escapeHtml(airportIata);
  const safeUrl = escapeHtml(airportUrl);
  const subject = `L'aeroporto ${airportName} (${airportIata}) è ora disponibile su AeroInfo`;
  
  const text = `Ciao,\n\nti informiamo che la scheda ufficiale dell'aeroporto ${airportName} (${airportIata}) è ora consultabile online su AeroInfo.\n\nAccedi alla scheda completa:\n${airportUrl}\n\nA presto,\nTeam AeroInfo`;

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; margin: 0; padding: 24px; color: #222222; line-height: 1.6;">
        <div style="max-width: 560px; margin: 0 auto; padding: 10px;">
          <h2 style="font-size: 18px; color: #111111; margin-top: 0; margin-bottom: 16px;">
            Scheda aeroporto disponibile
          </h2>
          <p style="font-size: 14px; margin-bottom: 14px;">Ciao,</p>
          <p style="font-size: 14px; margin-bottom: 14px;">
            ti informiamo che la scheda dell'aeroporto <strong>${safeName} (${safeIata})</strong> è ora consultabile su AeroInfo con tutte le disposizioni ufficiali aggiornate.
          </p>
          <p style="margin: 24px 0;">
            <a href="${safeUrl}" style="display: inline-block; padding: 10px 22px; background-color: #111111; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold;">
              Visualizza scheda aeroporto &rarr;
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #777777; margin: 0;">
            A presto,<br>
            <strong>Team AeroInfo</strong><br>
            <a href="https://aero-info.vercel.app" style="color: #0066cc; text-decoration: none;">aero-info.vercel.app</a>
          </p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html, text });
}
