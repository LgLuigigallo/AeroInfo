export const STAGING_SUPABASE_REF = 'rkigkmmtlqwmbwtyijpp';

export function validateStagingTarget(baseUrl, environment) {
  if (environment !== 'staging') throw new Error('ADMIN_TEST_ENV must be set to staging.');

  let url;
  try {
    url = new URL(baseUrl);
  } catch {
    throw new Error('ADMIN_TEST_BASE_URL must be an absolute URL.');
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === 'aero-info.eu' || hostname.endsWith('.aero-info.eu')) {
    throw new Error('Production target refused.');
  }
  const local = hostname === 'localhost' || hostname === '127.0.0.1';
  if (!local && (url.protocol !== 'https:' || !hostname.includes('staging'))) {
    throw new Error('Target must be HTTPS and its hostname must identify staging.');
  }
  if (local && !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Local target must use HTTP or HTTPS.');
  }
  return url;
}

export function validateStagingSupabaseUrl(supabaseUrl, projectRef) {
  let url;
  try {
    url = new URL(supabaseUrl);
  } catch {
    throw new Error('ADMIN_TEST_SUPABASE_URL must be an absolute URL.');
  }
  if (projectRef !== STAGING_SUPABASE_REF || url.hostname !== `${STAGING_SUPABASE_REF}.supabase.co` || url.protocol !== 'https:') {
    throw new Error('Supabase target does not match the verified staging project.');
  }
  return url;
}

export const protectedAdminRoutes = [
  ['GET', '/api/admin/session'],
  ['POST', '/api/admin/session'],
  ['GET', '/api/admin/overview'],
  ['GET', '/api/admin/requests'],
  ['POST', '/api/admin/requests'],
  ['GET', '/api/admin/requests/00000000-0000-4000-8000-000000000001'],
  ['GET', '/api/admin/moderation?kind=feedback'],
  ['PATCH', '/api/admin/moderation'],
  ['GET', '/api/admin/moderation/feedback/00000000-0000-4000-8000-000000000001'],
  ['GET', '/api/admin/airports'],
  ['PUT', '/api/admin/airports'],
  ['POST', '/api/admin/seo'],
  ['GET', '/api/admin/syncs'],
  ['POST', '/api/admin/syncs'],
  ['GET', '/api/admin/audit'],
  ['POST', '/api/admin/seed'],
];

export const privateTables = [
  'airport_requests',
  'airport_suggestions',
  'site_feedback',
  'sync_logs',
  'admin_audit_log',
];

export async function loadNextConfig() {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const url = await import('node:url');
  const moduleApi = await import('node:module');
  const ts = await import('typescript');
  const root = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
  const source = await fs.readFile(path.join(root, 'next.config.ts'), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', 'require', compiled)(module, module.exports, moduleApi.createRequire(import.meta.url));
  return module.exports.default;
}

export async function loadSource(relativePath) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const url = await import('node:url');
  const root = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
  return fs.readFile(path.join(root, relativePath), 'utf8');
}

const noStore = /(?:^|,)\s*no-store\s*(?:,|$)/i;
const privateFields = /^(?:requester_email|sender_email|sender_name|email)$/i;

async function fetchJson(url, init) {
  const response = await fetch(url, { redirect: 'manual', ...init });
  const text = await response.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { /* Error text is deliberately not retained in reports. */ }
  return { response, body };
}

function assertUnauthorized(status, label) {
  if (status !== 401 && status !== 403) throw new Error(`${label}: expected 401/403, received ${status}.`);
}

export async function runAdminSecurityChecks({ baseUrl, environment, supabaseUrl, projectRef, anonKey, serviceRoleKey, nonAdminToken, adminToken, fixtureIds }) {
  const target = validateStagingTarget(baseUrl, environment);
  const dbUrl = validateStagingSupabaseUrl(supabaseUrl, projectRef);
  if (!anonKey || !serviceRoleKey || !nonAdminToken || !adminToken) {
    throw new Error('Set the staging anon key, service-role key, non-admin access token and admin access token before running the full integration suite.');
  }
  let fixtures;
  try { fixtures = typeof fixtureIds === 'string' ? JSON.parse(fixtureIds) : fixtureIds; }
  catch { throw new Error('ADMIN_TEST_FIXTURE_IDS must be a JSON object of synthetic staging row UUIDs.'); }
  if (!fixtures || privateTables.some((table) => !/^[0-9a-f-]{36}$/i.test(fixtures[table] || ''))) {
    throw new Error('ADMIN_TEST_FIXTURE_IDS must contain one synthetic UUID for each private table.');
  }

  const results = [];
  const record = (id, status) => results.push({ id, status, timestamp: new Date().toISOString() });
  const origin = target.origin;

  for (const [label, token] of [['non-admin', nonAdminToken], ['admin', adminToken]]) {
    const { response, body } = await fetchJson(new URL('/auth/v1/user', dbUrl), {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
    });
    if (!response.ok || typeof body?.id !== 'string') throw new Error(`The configured ${label} token is not a valid staging session.`);
    record(`auth-token-valid-${label}`, 'passed');
  }

  const { response: adminSessionResponse, body: adminSession } = await fetchJson(new URL('/api/admin/session', origin), {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (!adminSessionResponse.ok || adminSession?.role !== 'admin' || typeof adminSession.email !== 'string') {
    throw new Error('The configured admin token is not authorized for this staging console.');
  }
  if (!noStore.test(adminSessionResponse.headers.get('cache-control') || '')) throw new Error('Admin session response is missing no-store cache control.');
  record('auth-admin-allowlist', 'passed');

  const { response: nonAdminSessionResponse } = await fetchJson(new URL('/api/admin/session', origin), {
    headers: { Authorization: `Bearer ${nonAdminToken}` },
  });
  assertUnauthorized(nonAdminSessionResponse.status, 'authenticated non-admin session');
  record('auth-nonadmin-denied', 'passed');

  for (const [method, path] of protectedAdminRoutes) {
    const init = { method, headers: {} };
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      init.headers['Content-Type'] = 'application/json';
      init.body = '{}';
    }
    const { response } = await fetchJson(new URL(path, origin), init);
    assertUnauthorized(response.status, `anonymous ${method} ${path}`);
    record(`api-anonymous-${method.toLowerCase()}`, 'passed');

    if (nonAdminToken) {
      const { response: authenticatedResponse } = await fetchJson(new URL(path, origin), {
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${nonAdminToken}` },
      });
      assertUnauthorized(authenticatedResponse.status, `non-admin ${method} ${path}`);
      record(`api-nonadmin-${method.toLowerCase()}`, 'passed');
    }
  }

  for (const [method, path] of [
    ['GET', '/api/admin/session'],
    ['GET', '/api/admin/requests'],
    ['POST', '/api/admin/syncs'],
  ]) {
    const { response } = await fetchJson(new URL(path, origin), {
      method,
      headers: { Authorization: 'Bearer malformed.expired.token', 'Content-Type': 'application/json' },
      ...(method === 'POST' ? { body: '{"iata":"FCO"}' } : {}),
    });
    assertUnauthorized(response.status, `invalid-token ${method} ${path}`);
    record(`api-invalid-token-${method.toLowerCase()}`, 'passed');
  }

  const { response: statusResponse, body: statusBody } = await fetchJson(new URL('/api/admin/status', origin));
  if (!statusResponse.ok || !statusBody || typeof statusBody.ready !== 'boolean' || Object.keys(statusBody).some((key) => key !== 'ready')) {
    throw new Error('Public admin readiness endpoint returned an unexpected response shape.');
  }
  if (!noStore.test(statusResponse.headers.get('cache-control') || '')) throw new Error('Admin readiness response is missing no-store cache control.');
  record('admin-status-minimal-no-store', 'passed');

  for (const table of privateTables) {
    const rowQuery = `select=id&id=eq.${fixtures[table]}`;
    const { response, body } = await fetchJson(new URL(`/rest/v1/${table}?${rowQuery}`, dbUrl), {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    if (![200, 401, 403].includes(response.status)) throw new Error(`RLS anon ${table}: unexpected status ${response.status}.`);
    if (response.status === 200 && (!Array.isArray(body) || body.length !== 0)) throw new Error(`RLS anon ${table}: synthetic fixture is readable by anon.`);
    record(`rls-anon-${table}`, 'passed');

    const { response: authResponse, body: authBody } = await fetchJson(new URL(`/rest/v1/${table}?${rowQuery}`, dbUrl), {
      headers: { apikey: anonKey, Authorization: `Bearer ${nonAdminToken}` },
    });
    if (authResponse.status !== 200 || !Array.isArray(authBody) || authBody.length !== 0) throw new Error(`RLS authenticated ${table}: synthetic fixture is readable or the authenticated check failed.`);
    record(`rls-authenticated-${table}`, 'passed');

    const { response: serviceResponse, body: serviceBody } = await fetchJson(new URL(`/rest/v1/${table}?${rowQuery}`, dbUrl), {
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
    });
    if (serviceResponse.status !== 200 || !Array.isArray(serviceBody) || serviceBody.length !== 1 || serviceBody[0]?.id !== fixtures[table]) {
      throw new Error(`RLS service_role ${table}: expected the synthetic staging fixture, got ${serviceResponse.status}.`);
    }
    record(`rls-service-role-${table}`, 'passed');
  }

  if (adminToken) {
    const sensitiveReads = [
      ['/api/admin/overview', false],
      ['/api/admin/requests?page=1&pageSize=10', true],
      ['/api/admin/requests/00000000-0000-4000-8000-000000000001', false],
      ['/api/admin/moderation?kind=feedback&page=1&pageSize=10', true],
      ['/api/admin/moderation?kind=suggestions&page=1&pageSize=10', true],
      ['/api/admin/moderation/feedback/00000000-0000-4000-8000-000000000001', false],
      ['/api/admin/airports?page=1', true],
      ['/api/admin/syncs?page=1', true],
      ['/api/admin/audit?page=1', true],
    ];
    for (const [path, isList] of sensitiveReads) {
      const { response, body } = await fetchJson(new URL(path, origin), {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (!response.ok && response.status !== 404) throw new Error(`Authorized read ${path} failed with ${response.status}.`);
      if (!noStore.test(response.headers.get('cache-control') || '')) throw new Error(`Sensitive list ${path} is missing no-store cache control.`);
      if (isList) {
        if (!Array.isArray(body?.items)) throw new Error(`Authorized list ${path} returned an unexpected response.`);
        const leakedField = body.items.some((row) => Object.keys(row).some((key) => privateFields.test(key)));
        if (leakedField) throw new Error(`Sensitive list ${path} includes a personal-data field.`);
      }
      record(`admin-private-read-${path.split('?')[0].replaceAll('/', '-')}`, 'passed');
    }

    const invalidRequests = [
      ['POST', '/api/admin/requests', '{}', 400],
      ['PATCH', '/api/admin/moderation', '{}', 400],
      ['PUT', '/api/admin/airports', '{}', 400],
      ['POST', '/api/admin/seo', '{}', 400],
      ['POST', '/api/admin/syncs', '{}', 400],
      ['POST', '/api/admin/seed', '{"confirm":false}', 400],
    ];
    for (const [method, path, body, expectedStatus] of invalidRequests) {
      const { response } = await fetchJson(new URL(path, origin), {
        method,
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
        body,
      });
      if (response.status !== expectedStatus) throw new Error(`Invalid admin payload ${method} ${path}: expected ${expectedStatus}, got ${response.status}.`);
      record(`admin-invalid-payload-${method.toLowerCase()}`, 'passed');
    }

    const oversizedAirport = await fetchJson(new URL('/api/admin/airports', origin), {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ padding: 'x'.repeat(251_000) }),
    });
    if (oversizedAirport.response.status !== 413) throw new Error(`Oversized airport payload: expected 413, got ${oversizedAirport.response.status}.`);
    record('admin-oversized-payload', 'passed');
  }

  return { environment: 'staging', target: origin, results };
}
