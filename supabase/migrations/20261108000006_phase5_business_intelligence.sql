-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: PHASE 5 BUSINESS INTELLIGENCE
-- Migration ID: 20261108000006_phase5_business_intelligence.sql
-- Description: First-party privacy-conscious analytics events, in-app administrative
--              notifications, granular RLS, performance indexes, and helper functions.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ANALYTICS EVENTS TABLE (First-Party Privacy-Conscious Tracking)
-- ------------------------------------------------------------------------------
-- Captures meaningful interactions without tracking PII, cookies, or fingerprinting.
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL CHECK (char_length(trim(event_name)) >= 2 AND char_length(event_name) <= 80),
    page_path TEXT NOT NULL CHECK (char_length(page_path) <= 500),
    referrer_domain TEXT CHECK (referrer_domain IS NULL OR char_length(referrer_domain) <= 255),
    visitor_id TEXT NOT NULL CHECK (char_length(visitor_id) <= 128),
    session_id TEXT NOT NULL CHECK (char_length(session_id) <= 128),
    device_category TEXT NOT NULL DEFAULT 'unknown' CHECK (device_category IN ('desktop', 'mobile', 'tablet', 'unknown')),
    browser_category TEXT CHECK (browser_category IS NULL OR char_length(browser_category) <= 50),
    utm_source TEXT CHECK (utm_source IS NULL OR char_length(utm_source) <= 100),
    utm_medium TEXT CHECK (utm_medium IS NULL OR char_length(utm_medium) <= 100),
    utm_campaign TEXT CHECK (utm_campaign IS NULL OR char_length(utm_campaign) <= 100),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes for BI Aggregations & Filtering
CREATE INDEX IF NOT EXISTS idx_analytics_events_name_created ON public.analytics_events(event_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON public.analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor ON public.analytics_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_source ON public.analytics_events(utm_source) WHERE utm_source IS NOT NULL;

COMMENT ON TABLE public.analytics_events IS 'First-party privacy-conscious event tracking for website traffic and conversion metrics.';

-- ------------------------------------------------------------------------------
-- 2. ADMIN NOTIFICATIONS TABLE (Administrative Alert Center)
-- ------------------------------------------------------------------------------
-- Tracks actionable operational and business alerts for staff members.
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(trim(title)) >= 2 AND char_length(title) <= 200),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 2 AND char_length(message) <= 2000),
    category TEXT NOT NULL CHECK (category IN (
        'lead',
        'demo',
        'newsletter',
        'email_failure',
        'cms',
        'system',
        'security'
    )),
    related_entity_type TEXT CHECK (related_entity_type IS NULL OR char_length(related_entity_type) <= 80),
    related_entity_id UUID,
    link_url TEXT CHECK (link_url IS NULL OR char_length(link_url) <= 500),
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_read ON public.admin_notifications(recipient_user_id, read_at);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.admin_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_category ON public.admin_notifications(category);

COMMENT ON TABLE public.admin_notifications IS 'Internal administrative alert and notification messages.';

-- ------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events FORCE ROW LEVEL SECURITY;

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications FORCE ROW LEVEL SECURITY;

-- PostgREST role revocations
REVOKE ALL ON TABLE public.analytics_events FROM anon, authenticated;
REVOKE ALL ON TABLE public.admin_notifications FROM anon, authenticated;

-- Service Role (Server Backend) maintains full execution privileges
GRANT ALL ON TABLE public.analytics_events TO service_role;
GRANT ALL ON TABLE public.admin_notifications TO service_role;

-- Authenticated Staff grants
GRANT SELECT ON TABLE public.analytics_events TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.admin_notifications TO authenticated;

-- Analytics Policy: Authorized administrators can view analytics
DROP POLICY IF EXISTS "Authorized admins can view analytics" ON public.analytics_events;
CREATE POLICY "Authorized admins can view analytics"
    ON public.analytics_events
    FOR SELECT
    TO authenticated
    USING (public.has_role('super_admin', 'admin'));

-- Notification Policies:
-- 1. Users can view their personal notifications or system-wide broadcasts (if admin)
DROP POLICY IF EXISTS "Users can view their notifications" ON public.admin_notifications;
CREATE POLICY "Users can view their notifications"
    ON public.admin_notifications
    FOR SELECT
    TO authenticated
    USING (
        recipient_user_id = auth.uid()
        OR (recipient_user_id IS NULL AND public.has_role('super_admin', 'admin'))
    );

-- 2. Users can mark their notifications as read
DROP POLICY IF EXISTS "Users can mark own notifications as read" ON public.admin_notifications;
CREATE POLICY "Users can mark own notifications as read"
    ON public.admin_notifications
    FOR UPDATE
    TO authenticated
    USING (
        recipient_user_id = auth.uid()
        OR (recipient_user_id IS NULL AND public.has_role('super_admin', 'admin'))
    )
    WITH CHECK (
        recipient_user_id = auth.uid()
        OR (recipient_user_id IS NULL AND public.has_role('super_admin', 'admin'))
    );

