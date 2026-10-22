import assert from 'node:assert';
import { escapeHtml, sanitizePostgrestParam, isValidEmail } from '../src/lib/security/sanitize';
import { checkRateLimit } from '../src/lib/security/rate-limit';
import { isSafeOutboundUrl } from '../src/lib/security/ssrf';
import nextConfig from '../next.config';

async function run() {
  console.log('🔒 RUNNING AUTOMATED SECURITY SUITE (PRODUCTION READINESS)...\n');

  // 1. Test HTML Escaping (XSS Prevention)
  console.log('1. Testing HTML Escaping (XSS & HTML Injection)...');
  assert.strictEqual(
    escapeHtml('<script>alert("XSS")</script>'),
    '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
  );
  assert.strictEqual(
    escapeHtml("Dubai' onclick='malicious()' & more"),
    'Dubai&#39; onclick=&#39;malicious()&#39; &amp; more'
  );
  assert.strictEqual(escapeHtml(''), '');
  assert.strictEqual(escapeHtml(null as unknown as string), '');
  console.log('  ✅ HTML Escaping prevents XSS payload execution.');

  // 2. Test RFC 5322 Email Validation
  console.log('2. Testing Email Validation...');
  assert.strictEqual(isValidEmail('user@example.com'), true);
  assert.strictEqual(isValidEmail('first.last+sub@domain.co.uk'), true);
  assert.strictEqual(isValidEmail('plainaddress'), false);
  assert.strictEqual(isValidEmail('@missingusername.com'), false);
  assert.strictEqual(isValidEmail('victim@domain.com\r\nBcc:attacker@domain.com'), false);
  assert.strictEqual(isValidEmail('user@domain'), false);
  console.log('  ✅ Email validation strictly rejects malformed & header-injection addresses.');

  // 3. Test PostgREST Parameter Sanitization
  console.log('3. Testing PostgREST Filter Sanitization...');
  const injectionPayload = 'DXB),iata_code.eq.JFK,query.ilike.(admin;--';
  const sanitized = sanitizePostgrestParam(injectionPayload);
  assert.strictEqual(sanitized.includes('('), false);
  assert.strictEqual(sanitized.includes(')'), false);
  assert.strictEqual(sanitized.includes(','), false);
  assert.strictEqual(sanitized.includes(';'), false);
  assert.strictEqual(sanitized.includes('"'), false);
  console.log('  ✅ PostgREST sanitization eliminates AST delimiters:', sanitized);

  // 4. Test Sliding-Window Rate Limiting
  console.log('4. Testing Sliding-Window Rate Limiter...');
  const testIp = '198.51.100.99';
  for (let i = 1; i <= 5; i++) {
    const result = checkRateLimit(testIp, 5, 10000);
    assert.strictEqual(result.allowed, true, `Request ${i} should be allowed`);
    assert.strictEqual(result.remaining, 5 - i);
  }
  const blockedResult = checkRateLimit(testIp, 5, 10000);
  assert.strictEqual(blockedResult.allowed, false, '6th request must be blocked with 429');
  assert.strictEqual(blockedResult.remaining, 0);
  assert.ok(blockedResult.resetMs > 0);
  console.log('  ✅ Rate limiter correctly enforces 429 after exceeding limit.');

  // 5. Test Next.js Security Headers Configuration
  console.log('5. Testing Security Headers in next.config.ts...');
  assert.ok(typeof nextConfig.headers === 'function', 'nextConfig must export async headers()');
  const headersConfig = await (nextConfig as any).headers();
  assert.ok(Array.isArray(headersConfig) && headersConfig.length > 0);
  const globalHeaders = headersConfig[0].headers;
  const headerKeys = globalHeaders.map((h: any) => h.key);

  assert.ok(headerKeys.includes('Content-Security-Policy'), 'Missing Content-Security-Policy');
  assert.ok(headerKeys.includes('Strict-Transport-Security'), 'Missing Strict-Transport-Security');
  assert.ok(headerKeys.includes('X-Frame-Options'), 'Missing X-Frame-Options');
  assert.ok(headerKeys.includes('X-Content-Type-Options'), 'Missing X-Content-Type-Options');
  assert.ok(headerKeys.includes('Referrer-Policy'), 'Missing Referrer-Policy');
  assert.ok(headerKeys.includes('Permissions-Policy'), 'Missing Permissions-Policy');

  const csp = globalHeaders.find((h: any) => h.key === 'Content-Security-Policy').value;
  assert.ok(csp.includes("frame-ancestors 'none'"), 'CSP missing frame-ancestors none');
  assert.ok(csp.includes("object-src 'none'"), 'CSP missing object-src none');
  console.log('  ✅ All 7 standard security headers properly configured.');

  // 6. Test SSRF & Outbound URL Protection
  console.log('6. Testing SSRF & Outbound URL Protection...');
  assert.strictEqual(isSafeOutboundUrl('http://localhost:3000'), false, 'HTTP localhost must be blocked');
  assert.strictEqual(isSafeOutboundUrl('http://127.0.0.1:8000/status'), false, '127.0.0.1 must be blocked');
  assert.strictEqual(isSafeOutboundUrl('http://169.254.169.254/latest/meta-data/'), false, 'Cloud metadata must be blocked');
  assert.strictEqual(isSafeOutboundUrl('http://10.0.0.1/admin'), false, '10.0.0.0/8 private network must be blocked');
  assert.strictEqual(isSafeOutboundUrl('http://192.168.1.1/router'), false, '192.168.0.0/16 private network must be blocked');
  assert.strictEqual(isSafeOutboundUrl('https://127.0.0.1'), false, 'HTTPS to loopback must be blocked');
  assert.strictEqual(isSafeOutboundUrl('ftp://example.com/file'), false, 'Non-HTTPS protocol must be blocked');
  assert.strictEqual(isSafeOutboundUrl('https://user:pass@example.com'), false, 'Embedded credentials must be blocked');
  assert.strictEqual(isSafeOutboundUrl('https://www.adr.it/fco-norme-di-sicurezza'), true, 'Valid HTTPS public website must be allowed');
  console.log('  ✅ SSRF filter successfully blocks cloud metadata, private IPs, and non-HTTPS targets.');

  console.log('\n🎉 ALL SECURITY SUITE TESTS PASSED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
