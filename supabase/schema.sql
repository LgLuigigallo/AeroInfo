-- ==============================================================================
-- AeroInfo PostgreSQL Schema for Supabase (Free Tier Compatible)
-- Includes Tables, Row Level Security (RLS), Full-Text Search, and Seed Data
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Airports Table
CREATE TABLE IF NOT EXISTS public.airports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iata_code VARCHAR(3) UNIQUE NOT NULL,
    icao_code VARCHAR(4),
    name_it TEXT NOT NULL,
    name_en TEXT NOT NULL,
    city_it TEXT NOT NULL,
    city_en TEXT NOT NULL,
    country_it TEXT NOT NULL,
    country_en TEXT NOT NULL,
    country_code VARCHAR(2) NOT NULL,
    official_website TEXT NOT NULL,
    seo_status TEXT NOT NULL DEFAULT 'pending_quality' CHECK (seo_status IN ('pending_quality', 'indexable', 'blocked')),
    seo_slug_it TEXT NOT NULL UNIQUE,
    seo_slug_en TEXT NOT NULL UNIQUE,
    seo_last_evaluated_at TIMESTAMPTZ,
    seo_block_reasons TEXT[] NOT NULL DEFAULT '{}',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    difficulty_rating INT CHECK (difficulty_rating BETWEEN 1 AND 5) DEFAULT 2,
    difficulty_label_it TEXT,
    difficulty_label_en TEXT,
    avg_security_wait_min INT DEFAULT 15,
    recommended_arrival_domestic NUMERIC(3,1) DEFAULT 2.0,
    recommended_arrival_intl NUMERIC(3,1) DEFAULT 3.0,
    navigation_advice_it TEXT,
    navigation_advice_en TEXT,
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Security Policies Table
CREATE TABLE IF NOT EXISTS public.security_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    has_3d_scanners BOOLEAN DEFAULT FALSE,
    scanners_note_it TEXT,
    scanners_note_en TEXT,
    liquids_allowance_it TEXT NOT NULL,
    liquids_allowance_en TEXT NOT NULL,
    liquids_must_be_removed BOOLEAN DEFAULT TRUE,
    liquids_unverified BOOLEAN DEFAULT FALSE,
    liquids_note_it TEXT,
    liquids_note_en TEXT,
    electronics_in_bag BOOLEAN DEFAULT FALSE,
    electronics_note_it TEXT,
    electronics_note_en TEXT,
    electronics_unverified BOOLEAN DEFAULT FALSE,
    drone_allowed_in_cabin BOOLEAN DEFAULT TRUE,
    drone_allowed_in_hold BOOLEAN DEFAULT FALSE,
    drone_policy_it TEXT,
    drone_policy_en TEXT,
    drone_unverified BOOLEAN DEFAULT FALSE,
    drone_note_it TEXT,
    drone_note_en TEXT,
    max_powerbank_wh INT DEFAULT 100,
    powerbank_policy_it TEXT,
    powerbank_policy_en TEXT,
    powerbank_unverified BOOLEAN DEFAULT FALSE,
    official_source_url TEXT NOT NULL,
    last_verified_at TIMESTAMPTZ,
    source_verified_at TIMESTAMPTZ
);

-- 3. Terminals Table
CREATE TABLE IF NOT EXISTS public.terminals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    transfer_info_it TEXT,
    transfer_info_en TEXT,
    is_unverified BOOLEAN DEFAULT FALSE
);

-- 4. Airlines Mapping Table
CREATE TABLE IF NOT EXISTS public.airlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    airline_name TEXT NOT NULL,
    iata_code VARCHAR(10),
    terminal TEXT NOT NULL,
    check_in_zone TEXT,
    is_unverified BOOLEAN DEFAULT FALSE
);

-- 5. Amenities Table (Power charging, Wi-Fi, Water refill, etc.)
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    title_it TEXT NOT NULL,
    title_en TEXT NOT NULL,
    terminal TEXT,
    location_it TEXT,
    location_en TEXT,
    details_it TEXT,
    details_en TEXT,
    is_unverified BOOLEAN DEFAULT FALSE,
    unverified_note_it TEXT,
    unverified_note_en TEXT
);

-- 6. Venues Table (Dining, Shopping, Duty-Free)
CREATE TABLE IF NOT EXISTS public.venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    terminal TEXT NOT NULL,
    location TEXT,
    hours TEXT,
    is_24_hours BOOLEAN DEFAULT FALSE,
    is_unverified BOOLEAN DEFAULT FALSE
);

-- 7. Ground Transport Table
CREATE TABLE IF NOT EXISTS public.ground_transports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_id UUID REFERENCES public.airports(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    name_it TEXT NOT NULL,
    name_en TEXT NOT NULL,
    duration TEXT,
    frequency TEXT,
    estimated_cost TEXT,
    pickup_location_it TEXT,
    pickup_location_en TEXT,
    details_it TEXT,
    details_en TEXT,
    is_unverified BOOLEAN DEFAULT FALSE
);

-- 8. Scraping & Sync Logs
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_iata VARCHAR(3) NOT NULL,
    official_url TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    changes_detected BOOLEAN DEFAULT FALSE,
    log_details JSONB,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. User Requested Airport Indexing
CREATE TABLE IF NOT EXISTS public.airport_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query TEXT NOT NULL,
    iata_code VARCHAR(10),
    requester_email TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'scraping', 'indexed', 'queued_weekly'
    scheduled_for TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    scraped_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Full-Text Search Indexes for Ultra-Fast Lookups
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_airports_iata ON public.airports (iata_code);
CREATE INDEX IF NOT EXISTS idx_airports_search ON public.airports USING gin(
    to_tsvector('simple', iata_code || ' ' || COALESCE(icao_code, '') || ' ' || name_it || ' ' || name_en || ' ' || city_it || ' ' || city_en)
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Public can READ all verified airport intelligence.
-- Only Service Role / API Secret can INSERT / UPDATE.
-- ==============================================================================
ALTER TABLE public.airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terminals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ground_transports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read-only access on airports" ON public.airports FOR SELECT USING (true);
CREATE POLICY "Public read-only access on security_policies" ON public.security_policies FOR SELECT USING (true);
CREATE POLICY "Public read-only access on terminals" ON public.terminals FOR SELECT USING (true);
CREATE POLICY "Public read-only access on airlines" ON public.airlines FOR SELECT USING (true);
CREATE POLICY "Public read-only access on amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Public read-only access on venues" ON public.venues FOR SELECT USING (true);
CREATE POLICY "Public read-only access on ground_transports" ON public.ground_transports FOR SELECT USING (true);

ALTER TABLE public.airport_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit indexing requests" ON public.airport_requests FOR INSERT WITH CHECK (true);
-- In accordance with OWASP and GDPR personal data protection, public SELECT is forbidden on airport_requests.
-- Only service role has SELECT / ALL permissions on airport_requests.
CREATE POLICY "Service role full access on airport_requests" ON public.airport_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

