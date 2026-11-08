-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: PHASE 2 CORE FUNCTIONALITY
-- Migration ID: 20261108000003_phase2_core_features.sql
-- Description: Adds reference tracking to contact_leads, creates demo_requests,
--              newsletter_subscribers, and email_outbox with strict RLS and grants.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENHANCE CONTACT_LEADS TABLE
-- ------------------------------------------------------------------------------
ALTER TABLE public.contact_leads
    ADD COLUMN IF NOT EXISTS reference TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS website TEXT,
    ADD COLUMN IF NOT EXISTS ip_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_contact_leads_reference ON public.contact_leads(reference);

-- ------------------------------------------------------------------------------
-- 2. DEMO REQUESTS TABLE
-- ------------------------------------------------------------------------------
-- Stores inquiries and evaluation requests for Orbion's 7 planned software products.
CREATE TABLE IF NOT EXISTS public.demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 255),
    company TEXT CHECK (company IS NULL OR char_length(company) <= 120),
    phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 30),
    product_id TEXT NOT NULL CHECK (product_id IN (
        'orbion-crm',
        'orbion-ai-chatbot',
        'orbion-bookings',
        'orbion-fit',
        'orbion-dine',
        'orbion-docs',
        'orbion-insights'
    )),
    preferred_date DATE,
    message TEXT CHECK (message IS NULL OR char_length(message) <= 3000),
    source TEXT NOT NULL DEFAULT 'website_demo_request' CHECK (char_length(source) <= 80),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON public.demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_product_id ON public.demo_requests(product_id);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_reference ON public.demo_requests(reference);

DROP TRIGGER IF EXISTS set_demo_requests_updated_at ON public.demo_requests;
CREATE TRIGGER set_demo_requests_updated_at
    BEFORE UPDATE ON public.demo_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.demo_requests IS 'Evaluation and demonstration requests for Orbion software products.';

-- ------------------------------------------------------------------------------
-- 3. NEWSLETTER SUBSCRIBERS TABLE
-- ------------------------------------------------------------------------------
-- Manages explicit opt-in subscribers and supports cryptographic unsubscribe tokens.
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 255),
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    consent BOOLEAN NOT NULL DEFAULT true CHECK (consent = true),
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    unsubscribe_token TEXT UNIQUE NOT NULL,
    source TEXT NOT NULL DEFAULT 'website_footer' CHECK (char_length(source) <= 80),
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_token ON public.newsletter_subscribers(unsubscribe_token);

DROP TRIGGER IF EXISTS set_newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER set_newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.newsletter_subscribers IS 'Explicit opt-in email newsletter subscribers with verifiable unsubscribe tokens.';

-- ------------------------------------------------------------------------------
-- 4. EMAIL OUTBOX TABLE (Reliability & Retry Queue)
-- ------------------------------------------------------------------------------
-- Decouples customer web requests from external email provider latency/failures.
CREATE TABLE IF NOT EXISTS public.email_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    related_entity_type TEXT NOT NULL CHECK (related_entity_type IN ('contact_lead', 'demo_request', 'newsletter', 'system')),
    related_entity_id UUID,
    recipient TEXT NOT NULL CHECK (recipient ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(recipient) <= 255),
    template TEXT NOT NULL CHECK (char_length(template) <= 80),
    subject TEXT NOT NULL CHECK (char_length(subject) <= 255),
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    provider_message_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
    attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
    max_attempts INTEGER NOT NULL DEFAULT 5 CHECK (max_attempts > 0),
    last_error TEXT,
    next_retry_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_email_outbox_queue ON public.email_outbox(status, next_retry_at) WHERE status IN ('pending', 'failed');
CREATE INDEX IF NOT EXISTS idx_email_outbox_related ON public.email_outbox(related_entity_type, related_entity_id);
CREATE INDEX IF NOT EXISTS idx_email_outbox_created_at ON public.email_outbox(created_at DESC);

DROP TRIGGER IF EXISTS set_email_outbox_updated_at ON public.email_outbox;
CREATE TRIGGER set_email_outbox_updated_at
    BEFORE UPDATE ON public.email_outbox
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.email_outbox IS 'Transactional email dispatch queue with exponential backoff and retry tracking.';

-- ------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY & FORCED ISOLATION
-- ------------------------------------------------------------------------------
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests FORCE ROW LEVEL SECURITY;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers FORCE ROW LEVEL SECURITY;

ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_outbox FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 6. REVISE POSTGRESQL ROLE GRANTS
-- ------------------------------------------------------------------------------
REVOKE ALL ON TABLE public.demo_requests FROM anon, authenticated;
REVOKE ALL ON TABLE public.newsletter_subscribers FROM anon, authenticated;
REVOKE ALL ON TABLE public.email_outbox FROM anon, authenticated;

-- Service Role (Server Backend) maintains full execution privileges
GRANT ALL ON TABLE public.demo_requests TO service_role;
GRANT ALL ON TABLE public.newsletter_subscribers TO service_role;
GRANT ALL ON TABLE public.email_outbox TO service_role;

-- Authenticated Staff receive policy-governed access to demo requests
GRANT SELECT, UPDATE ON TABLE public.demo_requests TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. RLS POLICIES FOR NEW TABLES
-- ------------------------------------------------------------------------------
-- Demo Requests: active staff can view and update assignment/status
DROP POLICY IF EXISTS "Staff can view demo requests" ON public.demo_requests;
CREATE POLICY "Staff can view demo requests"
    ON public.demo_requests
    FOR SELECT
    TO authenticated
    USING (public.is_active_staff());

DROP POLICY IF EXISTS "Staff can update demo request status or assignment" ON public.demo_requests;
CREATE POLICY "Staff can update demo request status or assignment"
    ON public.demo_requests
    FOR UPDATE
    TO authenticated
    USING (public.is_active_staff())
    WITH CHECK (public.is_active_staff());

DROP POLICY IF EXISTS "Super admins can delete demo requests" ON public.demo_requests;
CREATE POLICY "Super admins can delete demo requests"
    ON public.demo_requests
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
              AND is_active = true
              AND role = 'super_admin'
        )
    );

-- Newsletter Subscribers: Zero public access (managed strictly via backend APIs with service_role)
DROP POLICY IF EXISTS "Staff can view newsletter subscriber count and status" ON public.newsletter_subscribers;
CREATE POLICY "Staff can view newsletter subscriber count and status"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (public.is_active_staff());

-- Email Outbox: Strictly backend service role. No public or standard authenticated access.

