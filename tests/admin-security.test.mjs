import assert from 'node:assert/strict';
import { loadNextConfig, loadSource, validateStagingTarget, validateStagingSupabaseUrl, STAGING_SUPABASE_REF } from './admin-security-harness.mjs';

assert.doesNotThrow(() => validateStagingTarget('https://aero-info-staging.vercel.app', 'staging'));
assert.doesNotThrow(() => validateStagingTarget('http://localhost:3000', 'staging'));
assert.throws(() => validateStagingTarget('https://www.aero-info.eu', 'staging'), /production/i);
assert.throws(() => validateStagingTarget('https://example.com', 'production'), /staging/i);
assert.throws(() => validateStagingTarget('not a URL', 'staging'), /URL/i);
assert.doesNotThrow(() => validateStagingSupabaseUrl(`https://${STAGING_SUPABASE_REF}.supabase.co`, STAGING_SUPABASE_REF));
assert.throws(() => validateStagingSupabaseUrl('https://pvuymdgklqotslzsgtnh.supabase.co', 'pvuymdgklqotslzsgtnh'), /verified staging/i);

const nextConfig = await loadNextConfig();
const headers = await nextConfig.headers();
const adminCacheRule = headers.find((rule) => rule.source === '/api/admin/:path*');
assert.ok(adminCacheRule, 'Admin API responses must have a dedicated cache policy.');
assert.ok(adminCacheRule.headers.some((header) => header.key.toLowerCase() === 'cache-control' && /no-store/i.test(header.value)));

for (const path of ['src/app/api/feedback/route.ts', 'src/app/api/airports/request/route.ts', 'src/app/api/airports/suggest/route.ts']) {
  const source = await loadSource(path);
  const eventLogs = [...source.matchAll(/console\.(?:info|log)\([\s\S]*?\);/g)].map(([call]) => call);
  for (const call of eventLogs) {
    assert.doesNotMatch(call, /\b(?:email|sender|clientIp|message|cleanName|cleanEmail)\s*:/i, `${path} must not log personal data or message content.`);
  }
}

console.log('✅ Admin security harness refuses non-staging targets.');
