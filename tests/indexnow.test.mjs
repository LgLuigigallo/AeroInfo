import assert from 'node:assert';
import { readFileSync } from 'node:fs';

console.log('🧪 VERIFYING INDEXNOW INTEGRATION IN CRON & ADMIN...');

// 1. Check indexnow.ts
const indexNowFile = readFileSync('src/lib/seo/indexnow.ts', 'utf8');
assert(
  indexNowFile.includes("INDEXNOW_KEY = 'a7f92026ae70info4892c90e1f3a8b21'"),
  'INDEXNOW_KEY must match the verified key file in public/'
);
assert(
  indexNowFile.includes('https://api.indexnow.org/indexnow'),
  'INDEXNOW_ENDPOINT must point to the official API'
);
assert(
  indexNowFile.includes('export async function submitToIndexNow'),
  'submitToIndexNow must be exported'
);

// 2. Check public key verification file
const keyFile = readFileSync('public/a7f92026ae70info4892c90e1f3a8b21.txt', 'utf8').trim();
assert(
  keyFile === 'a7f92026ae70info4892c90e1f3a8b21',
  'public key file content must exactly match key'
);

// 3. Check Cron Sync route integration
const cronFile = readFileSync('src/app/api/cron/sync/route.ts', 'utf8');
assert(
  cronFile.includes("import { submitToIndexNow } from '@/lib/seo/indexnow'"),
  'Cron sync must import submitToIndexNow'
);
assert(
  cronFile.includes('urlsForIndexNow.add'),
  'Cron sync must collect updated indexable URLs'
);
assert(
  cronFile.includes('submitToIndexNow(urlsList)'),
  'Cron sync must submit indexable URLs to IndexNow'
);
assert(
  cronFile.includes('indexNowReport,'),
  'Cron sync response must include indexNowReport'
);

// 4. Check Admin SEO page integration
const adminPageFile = readFileSync('src/app/(admin)/admin/page.tsx', 'utf8');
assert(
  adminPageFile.includes('/api/admin/indexnow'),
  'Admin page must call /api/admin/indexnow'
);
assert(
  adminPageFile.includes('IndexNow (Bing / Copilot / Yandex)'),
  'Admin page must show IndexNow button in SEO view'
);

console.log('✅ ALL INDEXNOW CRON & ADMIN INTEGRATION TESTS PASSED SUCCESSFULLY!');
