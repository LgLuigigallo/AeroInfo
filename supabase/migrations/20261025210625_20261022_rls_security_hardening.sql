-- ==============================================================================
-- AeroInfo Security Migration: Row Level Security (RLS) Hardening
-- Date: 2026-10-22
-- Protects user personal data (emails in airport_requests), secures sync_logs,
-- and locks down catalog tables from unauthorized anonymous write operations.
-- ==============================================================================

-- 1. SECURE airport_requests (Protect user emails from public harvesting)
ALTER TABLE public.airport_requests ENABLE ROW LEVEL SECURITY;

-- Drop insecure public select policy and old policies
DROP POLICY IF EXISTS "Public can view indexing requests" ON public.airport_requests;
DROP POLICY IF EXISTS "Public can submit indexing requests" ON public.airport_requests;
DROP POLICY IF EXISTS "Allow public insert on airport_requests" ON public.airport_requests;
DROP POLICY IF EXISTS "Service role full access on airport_requests" ON public.airport_requests;

-- Allow public to INSERT new airport requests (handled safely via backend)
CREATE POLICY "Allow public insert on airport_requests" 
ON public.airport_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Deny public/anon SELECT on airport_requests completely.
-- Only service_role can view, update or query requests.
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
DROP POLICY IF EXISTS "Service role full access on sync_logs" ON public.sync_logs;

-- sync_logs are strictly for internal administrative auditing
CREATE POLICY "Service role full access on sync_logs"
ON public.sync_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


-- 3. SECURE AIRPORT CATALOG TABLES (Read-only for public, write-only for service_role)

-- airports
ALTER TABLE public.airports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on airports" ON public.airports;
DROP POLICY IF EXISTS "Service role full access on airports" ON public.airports;
CREATE POLICY "Public read-only access on airports" ON public.airports FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on airports" ON public.airports FOR ALL TO service_role USING (true) WITH CHECK (true);

-- security_policies
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on security_policies" ON public.security_policies;
DROP POLICY IF EXISTS "Service role full access on security_policies" ON public.security_policies;
CREATE POLICY "Public read-only access on security_policies" ON public.security_policies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on security_policies" ON public.security_policies FOR ALL TO service_role USING (true) WITH CHECK (true);

-- terminals
ALTER TABLE public.terminals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on terminals" ON public.terminals;
DROP POLICY IF EXISTS "Service role full access on terminals" ON public.terminals;
CREATE POLICY "Public read-only access on terminals" ON public.terminals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on terminals" ON public.terminals FOR ALL TO service_role USING (true) WITH CHECK (true);

-- airlines
ALTER TABLE public.airlines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on airlines" ON public.airlines;
DROP POLICY IF EXISTS "Service role full access on airlines" ON public.airlines;
CREATE POLICY "Public read-only access on airlines" ON public.airlines FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on airlines" ON public.airlines FOR ALL TO service_role USING (true) WITH CHECK (true);

-- amenities
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on amenities" ON public.amenities;
DROP POLICY IF EXISTS "Service role full access on amenities" ON public.amenities;
CREATE POLICY "Public read-only access on amenities" ON public.amenities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on amenities" ON public.amenities FOR ALL TO service_role USING (true) WITH CHECK (true);

-- venues
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on venues" ON public.venues;
DROP POLICY IF EXISTS "Service role full access on venues" ON public.venues;
CREATE POLICY "Public read-only access on venues" ON public.venues FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on venues" ON public.venues FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ground_transports
ALTER TABLE public.ground_transports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read-only access on ground_transports" ON public.ground_transports;
DROP POLICY IF EXISTS "Service role full access on ground_transports" ON public.ground_transports;
CREATE POLICY "Public read-only access on ground_transports" ON public.ground_transports FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role full access on ground_transports" ON public.ground_transports FOR ALL TO service_role USING (true) WITH CHECK (true);
