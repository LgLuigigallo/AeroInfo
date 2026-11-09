import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { escapeHtml } from '@/lib/security/sanitize';
import { Airport } from '@/types/airport';
import { airportPath } from '@/lib/airport-slug';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aero-info.eu';

export function getAdminNotificationEmail(): string {
  return (
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.FEEDBACK_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    'vireontech@gmail.com'
  );
}

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
  
  const unsubscribeUrl = `https://www.aero-info.eu/unsubscribe?email=${encodeURIComponent(to)}`;

  const text = `Ciao,\n\nti confermiamo la ricezione della tua richiesta per l'aeroporto di ${cleanName}.\n\nIl nostro team verificherà le disposizioni ufficiali dell'ente aeroportuale relative a bagaglio a mano, controlli di sicurezza, terminal e servizi per i passeggeri.\n\nTi invieremo un aggiornamento non appena la scheda sarà pubblicata e consultabile online.\n\nNon desideri più ricevere aggiornamenti per questa richiesta? Puoi disiscriverti in qualsiasi momento cliccando qui: ${unsubscribeUrl}\n\nA presto,\nTeam AeroInfo\nhttps://www.aero-info.eu`;

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
          <p style="font-size: 12px; color: #777777; margin: 0 0 12px 0;">
            A presto,<br>
            <strong>Team AeroInfo</strong><br>
            <a href="https://www.aero-info.eu" style="color: #0066cc; text-decoration: none;">aero-info.eu</a>
          </p>
          <p style="font-size: 11px; color: #999999; margin: 16px 0 0 0; line-height: 1.4;">
            Ricevi questa email perché hai richiesto la scheda di questo aeroporto su AeroInfo. Se non desideri più ricevere notifiche o aggiornamenti, puoi <a href="${unsubscribeUrl}" style="color: #666666; text-decoration: underline;">annullare la tua iscrizione qui</a>.
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
  
  const unsubscribeUrl = `https://www.aero-info.eu/unsubscribe?email=${encodeURIComponent(to)}`;

  const text = `Ciao,\n\nti informiamo che la scheda ufficiale dell'aeroporto ${airportName} (${airportIata}) è ora consultabile online su AeroInfo.\n\nAccedi alla scheda completa:\n${airportUrl}\n\nSe non desideri più ricevere comunicazioni: ${unsubscribeUrl}\n\nA presto,\nTeam AeroInfo`;

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
          <p style="font-size: 12px; color: #777777; margin: 0 0 12px 0;">
            A presto,<br>
            <strong>Team AeroInfo</strong><br>
            <a href="https://www.aero-info.eu" style="color: #0066cc; text-decoration: none;">aero-info.eu</a>
          </p>
          <p style="font-size: 11px; color: #999999; margin: 16px 0 0 0; line-height: 1.4;">
            Ricevi questa email perché avevi richiesto aggiornamenti per questo aeroporto su AeroInfo. Se non desideri più ricevere email, puoi <a href="${unsubscribeUrl}" style="color: #666666; text-decoration: underline;">cancellare la tua iscrizione qui</a>.
          </p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * 3. Admin Notification: New airport requested by a user
 */
export interface AdminAirportRequestParams {
  query: string;
  candidateIata?: string | null;
  requesterEmail?: string | null;
  isExistingSubscriber?: boolean;
  clientIp?: string;
}

export async function sendAdminAirportRequestNotification({
  query,
  candidateIata,
  requesterEmail,
  isExistingSubscriber,
  clientIp
}: AdminAirportRequestParams): Promise<SendEmailResult> {
  const adminEmail = getAdminNotificationEmail();
  const cleanQuery = query.trim();
  const iataTag = candidateIata ? ` [${candidateIata.toUpperCase()}]` : '';
  const subject = `[AeroInfo • Nuova Richiesta]${iataTag} ${cleanQuery.toUpperCase()}`;

  const requestTypeLabel = isExistingSubscriber
    ? 'Nuovo iscritto registrato su richiesta esistente'
    : 'Nuovo aeroporto richiesto (in coda per cron notturno)';

  const nowFormatted = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  const text = `Nuova richiesta registrata su AeroInfo:

Tipo: ${requestTypeLabel}
Query ricercata: ${cleanQuery}
Codice IATA stimato: ${candidateIata || 'Da verificare'}
Email utente: ${requesterEmail || 'Nessuna (richiesta anonima)'}
Data / Ora: ${nowFormatted} CET
IP Richiedente: ${clientIp || 'N/A'}

---
AeroInfo Admin Notification System`;

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 20px; background-color: #e0f2fe; color: #0369a1;">
              Richiesta Aeroporto
            </span>
            <span style="font-size: 12px; color: #64748b;">${escapeHtml(nowFormatted)} CET</span>
          </div>

          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">
            ${escapeHtml(cleanQuery.toUpperCase())} ${candidateIata ? `<span style="color: #0284c7;">(${escapeHtml(candidateIata.toUpperCase())})</span>` : ''}
          </h2>

          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px;">Stato Richiesta:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${escapeHtml(requestTypeLabel)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">IATA Stimato:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0284c7;">${escapeHtml(candidateIata || 'Da verificare')}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Email Richiedente:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${requesterEmail ? `<a href="mailto:${escapeHtml(requesterEmail)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(requesterEmail)}</a>` : '<span style="color: #94a3b8; font-weight: normal;">Anonimo (nessuna email)</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Indirizzo IP:</td>
                <td style="padding: 6px 0; font-family: monospace; color: #475569;">${escapeHtml(clientIp || 'N/A')}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #475569; margin: 0; line-height: 1.5;">
            Lo scalo è stato registrato nel database. Verrà compilato ed esaminato automaticamente durante il ciclo di sync notturno (03:00 UTC).
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>AeroInfo Operations Monitor</span>
            <span>https://www.aero-info.eu</span>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: adminEmail, subject, html, text });
}

/**
 * 4. Admin Notification: New airport published/added to catalog
 */
export interface AdminAirportAddedParams {
  airport: Airport;
  origin: 'auto_expansion' | 'user_requests' | 'admin_manual';
  notifiedSubscribersCount?: number;
}

export async function sendAdminAirportAddedNotification({
  airport,
  origin,
  notifiedSubscribersCount
}: AdminAirportAddedParams): Promise<SendEmailResult> {
  const adminEmail = getAdminNotificationEmail();
  const originTag = origin === 'auto_expansion'
    ? 'Espansione Notturna'
    : origin === 'user_requests'
      ? 'Richiesta Evasa'
      : 'Admin Manuale';

  const subject = `[AeroInfo • Nuovo Aeroporto] ${airport.name_it} (${airport.iata}) • 🟢 ${originTag}`;

  const originDesc = origin === 'auto_expansion'
    ? '🤖 Aggiunto automaticamente dal catalogo durante il cron notturno'
    : origin === 'user_requests'
      ? `👥 Compilato ed evaso su richiesta utenti (${notifiedSubscribersCount || 0} iscritti notificati)`
      : '👤 Aggiunto manualmente dal pannello di amministrazione';

  const itPath = airportPath(airport, 'it');
  const enPath = airportPath(airport, 'en');
  const nowFormatted = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  const text = `Nuovo aeroporto aggiunto e pubblicato su AeroInfo:

Scalo: ${airport.name_it} (${airport.iata})
Città & Nazione: ${airport.city_it}, ${airport.country_it}
Origine: ${originDesc}
Stato SEO: ${airport.seoStatus || 'indexable'} (0 difetti, broadcast IndexNow attivo)
Scanner 3D: ${airport.securityPolicy.has3DScanners ? 'Sì (liquidi e laptop nel bagaglio)' : 'No (scanner convenzionali)'}
Fonte ufficiale: ${airport.securityPolicy.officialSourceUrl}

Scheda IT: ${SITE_URL}${itPath}
Scheda EN: ${SITE_URL}${enPath}

Data / Ora: ${nowFormatted} CET
---
AeroInfo Admin Notification System`;

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 20px; background-color: #dcfce7; color: #15803d;">
              🟢 Nuovo Aeroporto Aggiunto
            </span>
            <span style="font-size: 12px; color: #64748b;">${escapeHtml(nowFormatted)} CET</span>
          </div>

          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0;">
            ${escapeHtml(airport.name_it)} <span style="color: #16a34a;">(${escapeHtml(airport.iata)})</span>
          </h2>
          <p style="font-size: 13px; color: #64748b; margin: 0 0 16px 0;">
            ${escapeHtml(airport.city_it)}, ${escapeHtml(airport.country_it)} • ICAO: ${escapeHtml(airport.icao || 'N/A')}
          </p>

          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px;">Origine:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${escapeHtml(originDesc)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Stato SEO & GEO:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #16a34a;">🟢 ${escapeHtml(airport.seoStatus || 'indexable')} (0 difetti, sitemap + IndexNow)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Scanner 3D CT:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${airport.securityPolicy.has3DScanners ? 'Attivi (liquidi e laptop restano nel bagaglio)' : 'Standard (liquidi ed elettronica da estrarre)'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Policy Liquidi:</td>
                <td style="padding: 6px 0; color: #334155;">${escapeHtml(airport.securityPolicy.liquidsAllowance_it)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Fonte Ufficiale:</td>
                <td style="padding: 6px 0;"><a href="${escapeHtml(airport.securityPolicy.officialSourceUrl)}" style="color: #0284c7; text-decoration: none; word-break: break-all;">${escapeHtml(airport.securityPolicy.officialSourceUrl)}</a></td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0; text-align: center;">
            <a href="${SITE_URL}${itPath}" style="display: inline-block; padding: 10px 20px; background-color: #0f172a; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; margin-right: 8px;">
              Visualizza Scheda IT &rarr;
            </a>
            <a href="${SITE_URL}${enPath}" style="display: inline-block; padding: 10px 20px; background-color: #f1f5f9; color: #0f172a; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">
              English Dossier &rarr;
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>AeroInfo Operations Monitor</span>
            <span>https://www.aero-info.eu</span>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: adminEmail, subject, html, text });
}

/**
 * 5. Admin Notification: User Feedback or Airport Suggestion reported
 */
export interface AdminFeedbackParams {
  type: 'feedback' | 'suggestion';
  category: string;
  subject?: string;
  message: string;
  senderName?: string | null;
  senderEmail?: string | null;
  airportIata?: string;
  sourceUrl?: string;
  clientIp?: string;
}

export async function sendAdminFeedbackNotification({
  type,
  category,
  subject: userSubject,
  message,
  senderName,
  senderEmail,
  airportIata,
  sourceUrl,
  clientIp
}: AdminFeedbackParams): Promise<SendEmailResult> {
  const adminEmail = getAdminNotificationEmail();
  const cleanCategory = category.trim().toUpperCase();
  const titleCategory = category.trim();
  const displaySubject = userSubject?.trim() || (airportIata ? `Modifica per ${airportIata.toUpperCase()}` : 'Nuovo messaggio');
  const subject = `[AeroInfo • Segnalazione: ${cleanCategory}] ${displaySubject}`;

  const nowFormatted = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  const text = `Nuova segnalazione ricevuta su AeroInfo:

Tipo: ${type === 'suggestion' ? 'Proposta di Modifica Aeroporto' : 'Feedback Utente'}
Categoria: [${cleanCategory}] ${titleCategory}
${airportIata ? `Aeroporto: ${airportIata.toUpperCase()}\n` : ''}Oggetto: ${displaySubject}
Da: ${senderName || 'Anonimo'} <${senderEmail || 'nessuna email'}>
${sourceUrl ? `Fonte indicata: ${sourceUrl}\n` : ''}
Messaggio:
${message}

Data / Ora: ${nowFormatted} CET
IP: ${clientIp || 'N/A'}
---
AeroInfo Admin Notification System`;

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 20px; background-color: #fef3c7; color: #b45309;">
              Segnalazione: ${escapeHtml(cleanCategory)}
            </span>
            <span style="font-size: 12px; color: #64748b;">${escapeHtml(nowFormatted)} CET</span>
          </div>

          <h2 style="font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 14px 0;">
            ${escapeHtml(displaySubject)}
          </h2>

          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px; font-size: 13px;">
            <div style="margin-bottom: 6px;">
              <span style="color: #64748b;">Da:</span> <strong>${escapeHtml(senderName || 'Anonimo')}</strong> ${senderEmail ? `&lt;<a href="mailto:${escapeHtml(senderEmail)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(senderEmail)}</a>&gt;` : '<span style="color: #94a3b8;">(nessuna email)</span>'}
            </div>
            ${airportIata ? `<div style="margin-bottom: 6px;"><span style="color: #64748b;">Aeroporto:</span> <strong style="color: #0284c7;">${escapeHtml(airportIata.toUpperCase())}</strong></div>` : ''}
            ${sourceUrl ? `<div style="margin-bottom: 6px;"><span style="color: #64748b;">Fonte indicata:</span> <a href="${escapeHtml(sourceUrl)}" style="color: #0284c7; text-decoration: underline; word-break: break-all;">${escapeHtml(sourceUrl)}</a></div>` : ''}
            <div><span style="color: #64748b;">IP Client:</span> <span style="font-family: monospace; color: #475569;">${escapeHtml(clientIp || 'N/A')}</span></div>
          </div>

          <div style="background-color: #fefce8; border-left: 3px solid #eab308; padding: 14px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #713f12; white-space: pre-wrap; margin-bottom: 20px;">
${escapeHtml(message)}
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>AeroInfo Feedback & Moderation</span>
            <span>https://www.aero-info.eu</span>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: adminEmail, subject, html, text });
}

/**
 * 6. Admin Notification: Nightly sync and expansion report
 */
export interface NightlyReportAirportEntry {
  iata: string;
  name: string;
  status: 'GREEN' | 'DISCREPANCY' | 'DEFECT' | 'NEWLY_ADDED';
  seoStatus: string;
  discrepancies?: string[];
  defects?: string[];
}

export interface AdminNightlyReportParams {
  executionDate: string;
  airports: NightlyReportAirportEntry[];
  autoExpandedAirport?: {
    iata: string;
    name: string;
  } | null;
  compiledRequestsCount: number;
  publishedIatas: string[];
  indexNowCount: number;
  persistenceErrors: string[];
}

export async function sendAdminNightlyReportNotification({
  executionDate,
  airports,
  autoExpandedAirport,
  compiledRequestsCount,
  publishedIatas,
  indexNowCount,
  persistenceErrors
}: AdminNightlyReportParams): Promise<SendEmailResult> {
  const adminEmail = getAdminNotificationEmail();

  const greenCount = airports.filter(a => a.status === 'GREEN' || a.status === 'NEWLY_ADDED').length;
  const discrepancyCount = airports.filter(a => a.status === 'DISCREPANCY').length;
  const defectCount = airports.filter(a => a.status === 'DEFECT').length + persistenceErrors.length;
  const totalCount = airports.length;

  const flagSummary = defectCount === 0
    ? '🟢 0 Difetti (Tutto Regolare)'
    : `🔴 ${defectCount} Difetti Rilevati`;

  const newAirportTag = autoExpandedAirport ? ` • ✈️ +1 Aggiunto (${autoExpandedAirport.iata})` : '';
  const subject = `[AeroInfo • Report Notturno] ${totalCount} scali • ${flagSummary}${newAirportTag}`;

  const dateFormatted = new Date(executionDate).toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  // Plain-text lines for airports
  const airportTextLines = airports.map(a => {
    if (a.status === 'NEWLY_ADDED') {
      return `✈️ [NUOVO] ${a.iata} - ${a.name} -> AGGIUNTO & INDICIZZATO`;
    }
    if (a.status === 'DEFECT') {
      return `🔴 [DEFECT] ${a.iata} - ${a.name} -> DIFETTO: ${(a.defects || []).join('; ')}`;
    }
    if (a.status === 'DISCREPANCY') {
      return `🟡 [DISCREPANZA] ${a.iata} - ${a.name} -> AGGIORNATO: ${(a.discrepancies || []).join(', ')}`;
    }
    return `🟢 [GREEN FLAG] ${a.iata} - ${a.name} -> 100% OK (${a.seoStatus})`;
  }).join('\n');

  const text = `AeroInfo - Riepilogo Aggiornamento Notturno (Sync & Espansione)
Data Esecuzione: ${dateFormatted} CET

Sintesi:
- Scali Verificati: ${totalCount}
- 🟢 Green Flag (100% Conformi): ${greenCount}
- 🟡 Discrepanze Aggiornate: ${discrepancyCount}
- 🔴 Difetti / Warning: ${defectCount}
- ✈️ Scalo Aggiunto dal Catalogo: ${autoExpandedAirport ? `${autoExpandedAirport.name} (${autoExpandedAirport.iata})` : 'Nessuno'}
- 👥 Richieste Utenti Evase: ${compiledRequestsCount} (${publishedIatas.join(', ') || 'Nessuna'})
- 📡 URL Trasmessi a IndexNow: ${indexNowCount}

LISTA SCALI E STATO:
${airportTextLines}
${persistenceErrors.length ? `\nERRORI DI PERSISTENZA:\n${persistenceErrors.join('\n')}` : ''}

---
AeroInfo Automated Operations
https://www.aero-info.eu`;

  // Build clean HTML rows for each airport
  const airportHtmlRows = airports.map(a => {
    if (a.status === 'NEWLY_ADDED') {
      return `
        <div style="padding: 10px 14px; margin-bottom: 6px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; color: #1e3a8a; font-size: 14px;">✈️ ${escapeHtml(a.iata)} - ${escapeHtml(a.name)}</span>
            <span style="font-size: 11px; font-weight: 700; color: #1d4ed8; background-color: #dbeafe; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">Nuovo Aggiunto</span>
          </div>
          <div style="font-size: 12px; color: #3b82f6; margin-top: 3px;">Aggiunto dal catalogo, verificato con 0 difetti, broadcast IndexNow e sitemap attivi.</div>
        </div>
      `;
    }
    if (a.status === 'DEFECT') {
      return `
        <div style="padding: 10px 14px; margin-bottom: 6px; background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; color: #991b1b; font-size: 14px;">🔴 ${escapeHtml(a.iata)} - ${escapeHtml(a.name)}</span>
            <span style="font-size: 11px; font-weight: 700; color: #b91c1c; background-color: #fee2e2; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">Defect Rilevato</span>
          </div>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 3px;"><strong>Motivo:</strong> ${escapeHtml((a.defects || []).join('; ') || 'Anomalia qualità SEO')}</div>
        </div>
      `;
    }
    if (a.status === 'DISCREPANCY') {
      return `
        <div style="padding: 10px 14px; margin-bottom: 6px; background-color: #fefce8; border-left: 4px solid #ca8a04; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; color: #854d0e; font-size: 14px;">🟡 ${escapeHtml(a.iata)} - ${escapeHtml(a.name)}</span>
            <span style="font-size: 11px; font-weight: 700; color: #a16207; background-color: #fef9c3; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">Discrepanza Sincronizzata</span>
          </div>
          <div style="font-size: 12px; color: #854d0e; margin-top: 3px;"><strong>Variazioni:</strong> ${escapeHtml((a.discrepancies || []).join(', ') || 'Modifiche alle policy')}</div>
        </div>
      `;
    }
    return `
      <div style="padding: 9px 14px; margin-bottom: 6px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: #166534; font-size: 13px;">🟢 ${escapeHtml(a.iata)} - ${escapeHtml(a.name)}</span>
          <span style="font-size: 11px; font-weight: 600; color: #15803d; background-color: #dcfce7; padding: 2px 8px; border-radius: 12px;">Green Flag</span>
        </div>
      </div>
    `;
  }).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="it">
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 20px; background-color: #e0e7ff; color: #4338ca;">
              Report Notturno Sync
            </span>
            <span style="font-size: 12px; color: #64748b;">${escapeHtml(dateFormatted)} CET</span>
          </div>

          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">
            Riepilogo Aggiornamento Notturno
          </h2>

          <!-- KPI Summary Cards -->
          <table style="width: 100%; border-collapse: separate; border-spacing: 8px; margin-bottom: 20px;">
            <tr>
              <td style="background-color: #f1f5f9; padding: 12px 8px; border-radius: 8px; text-align: center; width: 25%;">
                <div style="font-size: 18px; font-weight: 800; color: #0f172a;">${totalCount}</div>
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; margin-top: 2px;">Verificati</div>
              </td>
              <td style="background-color: #f0fdf4; padding: 12px 8px; border-radius: 8px; text-align: center; width: 25%;">
                <div style="font-size: 18px; font-weight: 800; color: #16a34a;">${greenCount}</div>
                <div style="font-size: 11px; color: #15803d; text-transform: uppercase; font-weight: 600; margin-top: 2px;">Green Flag</div>
              </td>
              <td style="background-color: #fefce8; padding: 12px 8px; border-radius: 8px; text-align: center; width: 25%;">
                <div style="font-size: 18px; font-weight: 800; color: #ca8a04;">${discrepancyCount}</div>
                <div style="font-size: 11px; color: #a16207; text-transform: uppercase; font-weight: 600; margin-top: 2px;">Discrepanze</div>
              </td>
              <td style="background-color: ${defectCount > 0 ? '#fef2f2' : '#f8fafc'}; padding: 12px 8px; border-radius: 8px; text-align: center; width: 25%;">
                <div style="font-size: 18px; font-weight: 800; color: ${defectCount > 0 ? '#dc2626' : '#64748b'};">${defectCount}</div>
                <div style="font-size: 11px; color: ${defectCount > 0 ? '#b91c1c' : '#64748b'}; text-transform: uppercase; font-weight: 600; margin-top: 2px;">Defetti</div>
              </td>
            </tr>
          </table>

          <!-- Highlight Box for new airport or user requests -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; font-size: 13px;">
            <div style="margin-bottom: 6px;">
              <span style="color: #64748b;">✈️ Nuovo Scalo Aggiunto:</span> 
              <strong>${autoExpandedAirport ? `<span style="color: #2563eb;">${escapeHtml(autoExpandedAirport.name)} (${escapeHtml(autoExpandedAirport.iata)})</span>` : '<span style="color: #64748b; font-weight: normal;">Nessuno (evase richieste utenti)</span>'}</strong>
            </div>
            <div style="margin-bottom: 6px;">
              <span style="color: #64748b;">👥 Richieste Utenti Evase:</span> 
              <strong>${compiledRequestsCount}</strong> ${publishedIatas.length ? `<span style="color: #64748b;">(${escapeHtml(publishedIatas.join(', '))})</span>` : ''}
            </div>
            <div>
              <span style="color: #64748b;">📡 IndexNow URL Notificati:</span> 
              <strong>${indexNowCount} URL</strong> (Bing, Copilot, Seznam, Yandex)
            </div>
          </div>

          <!-- Airport List -->
          <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; margin: 0 0 10px 0;">
            Lista Scali Elaborati & Stato
          </h3>

          <div style="margin-bottom: 20px;">
            ${airportHtmlRows}
          </div>

          ${persistenceErrors.length ? `
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12px; color: #991b1b;">
              <strong>Errori di Persistenza:</strong><br>${escapeHtml(persistenceErrors.join('<br>'))}
            </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>AeroInfo Cron Engine • Esecuzione Notturna 03:00 UTC</span>
            <span>https://www.aero-info.eu</span>
          </div>

        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: adminEmail, subject, html, text });
}
