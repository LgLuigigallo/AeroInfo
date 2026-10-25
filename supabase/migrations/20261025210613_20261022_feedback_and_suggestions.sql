-- ==============================================================================
-- AeroInfo Migration: User Feedback and Airport Edit Suggestions
-- Date: 2026-10-22
-- ==============================================================================

-- 1. General Site Feedback & Comments Table
CREATE TABLE IF NOT EXISTS public.site_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL, -- 'suggestion', 'bug_report', 'inquiry', 'general'
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    sender_name TEXT,
    sender_email TEXT,
    status VARCHAR(20) DEFAULT 'new', -- 'new', 'reviewed', 'resolved'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on site_feedback" ON public.site_feedback;
DROP POLICY IF EXISTS "Service role full access on site_feedback" ON public.site_feedback;

CREATE POLICY "Allow public insert on site_feedback" 
ON public.site_feedback 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Service role full access on site_feedback" 
ON public.site_feedback 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);


-- 2. Airport Edit Suggestions Table
CREATE TABLE IF NOT EXISTS public.airport_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_iata VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL, -- '3d_scanners', 'liquids', 'drones', 'power_outlets', 'terminals', 'dining', 'other'
    details TEXT NOT NULL,
    source_url TEXT,
    requester_email TEXT,
    status VARCHAR(30) DEFAULT 'pending_verification', -- 'pending_verification', 'verified', 'unconfirmed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_airport_suggestions_iata ON public.airport_suggestions (airport_iata);
CREATE INDEX IF NOT EXISTS idx_airport_suggestions_status ON public.airport_suggestions (status);

ALTER TABLE public.airport_suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on airport_suggestions" ON public.airport_suggestions;
DROP POLICY IF EXISTS "Service role full access on airport_suggestions" ON public.airport_suggestions;

CREATE POLICY "Allow public insert on airport_suggestions" 
ON public.airport_suggestions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Service role full access on airport_suggestions" 
ON public.airport_suggestions 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
