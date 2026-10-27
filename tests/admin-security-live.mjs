import { runAdminSecurityChecks } from './admin-security-harness.mjs';

try {
  const result = await runAdminSecurityChecks({
    baseUrl: process.env.ADMIN_TEST_BASE_URL,
    environment: process.env.ADMIN_TEST_ENV,
    supabaseUrl: process.env.ADMIN_TEST_SUPABASE_URL,
    projectRef: process.env.ADMIN_TEST_PROJECT_REF,
    anonKey: process.env.ADMIN_TEST_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.ADMIN_TEST_SERVICE_ROLE_KEY,
    nonAdminToken: process.env.ADMIN_TEST_NONADMIN_ACCESS_TOKEN,
    adminToken: process.env.ADMIN_TEST_ADMIN_ACCESS_TOKEN,
    fixtureIds: process.env.ADMIN_TEST_FIXTURE_IDS,
  });
  // Report contains only synthetic case IDs and statuses; never print response bodies or credentials.
  console.log(JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2));
} catch (error) {
  console.error(JSON.stringify({
    environment: 'staging',
    generatedAt: new Date().toISOString(),
    status: 'failed',
    error: error instanceof Error ? error.message : 'Admin security check failed.',
  }, null, 2));
  process.exitCode = 1;
}
