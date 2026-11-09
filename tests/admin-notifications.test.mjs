import assert from 'node:assert';
import { readFileSync } from 'node:fs';

console.log('🧪 VERIFYING ADMIN CLASSIFIED NOTIFICATIONS & NIGHTLY REPORT...');

// 1. Check email.ts exports
const emailFile = readFileSync('src/lib/email.ts', 'utf8');

assert(
  emailFile.includes('export function getAdminNotificationEmail'),
  'email.ts must export getAdminNotificationEmail'
);
assert(
  emailFile.includes('export async function sendAdminAirportRequestNotification'),
  'email.ts must export sendAdminAirportRequestNotification'
);
assert(
  emailFile.includes('export async function sendAdminAirportAddedNotification'),
  'email.ts must export sendAdminAirportAddedNotification'
);
assert(
  emailFile.includes('export async function sendAdminFeedbackNotification'),
  'email.ts must export sendAdminFeedbackNotification'
);
assert(
  emailFile.includes('export async function sendAdminNightlyReportNotification'),
  'email.ts must export sendAdminNightlyReportNotification'
);

// Verify Subject classifications and tagging
assert(
  emailFile.includes('[AeroInfo • Nuova Richiesta]'),
  'email.ts must tag airport request subject with [AeroInfo • Nuova Richiesta]'
);
assert(
  emailFile.includes('[AeroInfo • Nuovo Aeroporto]'),
  'email.ts must tag new airport added subject with [AeroInfo • Nuovo Aeroporto]'
);
assert(
  emailFile.includes('[AeroInfo • Segnalazione:'),
  'email.ts must tag user feedback/report subject with category prefix'
);
assert(
  emailFile.includes('[AeroInfo • Report Notturno]'),
  'email.ts must tag nightly report subject with [AeroInfo • Report Notturno]'
);

// Verify Nightly Report Content details (Green flag, defect, discrepancy)
assert(
  emailFile.includes('Green Flag') &&
  emailFile.includes('Discrepanze') &&
  emailFile.includes('Defetti'),
  'Nightly report must display Green Flag, Discrepancies, and Defects breakdown'
);

// 2. Check /api/airports/request integration
const requestRoute = readFileSync('src/app/api/airports/request/route.ts', 'utf8');
assert(
  requestRoute.includes('sendAdminAirportRequestNotification'),
  'request route must call sendAdminAirportRequestNotification'
);

// 3. Check /api/compiler/engine integration
const engineFile = readFileSync('src/lib/compiler/engine.ts', 'utf8');
assert(
  engineFile.includes('sendAdminAirportAddedNotification'),
  'engine.ts must call sendAdminAirportAddedNotification when an airport is compiled or auto-expanded'
);

// 4. Check feedback & suggest routes
const feedbackRoute = readFileSync('src/app/api/feedback/route.ts', 'utf8');
assert(
  feedbackRoute.includes('sendAdminFeedbackNotification'),
  'feedback route must call sendAdminFeedbackNotification'
);

const suggestRoute = readFileSync('src/app/api/airports/suggest/route.ts', 'utf8');
assert(
  suggestRoute.includes('sendAdminFeedbackNotification'),
  'suggest route must call sendAdminFeedbackNotification'
);

// 5. Check /api/cron/sync integration
const cronSyncRoute = readFileSync('src/app/api/cron/sync/route.ts', 'utf8');
assert(
  cronSyncRoute.includes('sendAdminNightlyReportNotification'),
  'cron sync route must call sendAdminNightlyReportNotification'
);
assert(
  cronSyncRoute.includes('nightlyAirportEntries'),
  'cron sync route must gather nightlyAirportEntries for itemized digest'
);
assert(
  cronSyncRoute.includes('nightlyEmailSent'),
  'cron sync route must return nightlyEmailSent status in JSON response'
);

console.log('✅ ALL ADMIN NOTIFICATION & NIGHTLY REPORT TESTS PASSED SUCCESSFULLY!');
