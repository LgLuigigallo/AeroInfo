-- ==============================================================================
-- AeroInfo Security Migration: Row Level Security (RLS) Hardening
-- Date: 2026-10-22
-- Protects user personal data (emails in airport_requests), secures sync_logs,
-- and locks down catalog tables from unauthorized anonymous write operations.
-- ==============================================================================

-- 1. SECURE airport_requests (Protect user emails from public harvesting)
ALTER TABLE public.airport_requests ENABLE ROW LEVEL SECURITY;

-- Drop insecure public select policy
DROP POLICY IF EXISTS "Public can view indexing requests" ON public.airport_requests;
DROP POLICY IF EXISTS "Public can submit indexing requests" ON public.airport_requests;

-- Allow anyone to INSERT a request (sanitized via backend API)
CREATE POLICY "Allow public insert on airport_requests" 
ON public.airport_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Deny public/anon SELECT on airport_requests completely.
-- Only service_role can view or query requests.
CREATE POLICY "Service role full access on airport_requests"
ON public.airport_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


-- 2. SECURE sync_logs (Internal scraping and operational logs)
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view sync logs" ON public.sync_logs;
DROP POLICY IF EXISTS "Public can insert sync logs" ON public.sync_logs;

-- sync_logs are strictly for internal administrative auditing
CREATE POLICY "Service role full access on sync_logs"
ON public.sync_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


-- 3. SECURE AIRPORT CATALOG TABLES (Read-only for public, write-only for service_role)

-- Helper macro to secure catalog tables
DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY[
        'airports',
        'security_policies',
        'terminals',
        'airlines',
        'amenities',
        'venues',
        'ground_transports'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);

        -- Drop any potential permissive write policies
        EXECUTE format('DROP POLICY IF EXISTS %L ON public.%I;', 'Public full access on ' || tbl, tbl);
        EXECUTE format('DROP POLICY IF EXISTS %L ON public.%I;', 'Public write access on ' || tbl, tbl);
        EXECUTE format('DROP POLICY IF EXISTS %L ON public.%I;', 'Public read-only access on ' || tbl, tbl);

        -- Allow Public READ-ONLY
        EXECUTE format(
            'CREATE POLICY %L ON public.%I FOR SELECT TO anon, authenticated USING (true);',
            'Public read-only access on ' || tbl,
            tbl
        );

        -- Allow Service Role FULL ACCESS (Insert, Update, Delete)
        EXECUTE format(
            'CREATE POLICY %L ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true);',
            'Service role full access on ' || tbl,
            tbl
        );
    END LOOP;
END $$;
