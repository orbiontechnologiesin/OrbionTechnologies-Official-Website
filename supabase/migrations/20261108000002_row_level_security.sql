-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: ROW LEVEL SECURITY & PRIVILEGES
-- Migration ID: 20261108000002_row_level_security.sql
-- Description: Strict RLS enforcement, role grants, and granular security policies.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENABLE & FORCE ROW LEVEL SECURITY ON ALL TABLES
-- ------------------------------------------------------------------------------
-- 'FORCE' guarantees RLS applies even to table owners/creators, ensuring
-- no accidental leakage during ad-hoc sessions.
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_leads FORCE ROW LEVEL SECURITY;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs FORCE ROW LEVEL SECURITY;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. REVISE DEFAULT POSTGRESQL ROLE GRANTS
-- ------------------------------------------------------------------------------
-- By default, Supabase grants public permissions to 'anon' and 'authenticated'.
-- We explicitly strip all access and grant only the exact required primitives.

REVOKE ALL ON TABLE public.contact_leads FROM anon, authenticated;
REVOKE ALL ON TABLE public.profiles FROM anon, authenticated;
REVOKE ALL ON TABLE public.audit_logs FROM anon, authenticated;
REVOKE ALL ON TABLE public.site_settings FROM anon, authenticated;

-- Service Role (Server Backend) maintains full administrative execution
GRANT ALL ON TABLE public.contact_leads TO service_role;
GRANT ALL ON TABLE public.profiles TO service_role;
GRANT ALL ON TABLE public.audit_logs TO service_role;
GRANT ALL ON TABLE public.site_settings TO service_role;

-- Authenticated Users (Admins/Operators) receive limited, policy-governed access
GRANT SELECT, UPDATE ON TABLE public.contact_leads TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT ON TABLE public.audit_logs TO authenticated;
GRANT SELECT, UPDATE, INSERT ON TABLE public.site_settings TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. HELPER SECURITY FUNCTIONS
-- ------------------------------------------------------------------------------
-- Evaluates whether the calling auth.uid() has an active administrator role.
CREATE OR REPLACE FUNCTION public.is_active_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_or_super()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND is_active = true
          AND role IN ('super_admin', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ------------------------------------------------------------------------------
-- 4. POLICIES: CONTACT LEADS
-- ------------------------------------------------------------------------------
-- Anonymous visitors: Zero read, update, or delete access.
-- Ingestion is strictly server-brokered through the Next.js API Route / Server Action.

DROP POLICY IF EXISTS "Deny anonymous access to contact_leads" ON public.contact_leads;
-- Default deny is implicit with RLS, but explicit policies govern authenticated access:

DROP POLICY IF EXISTS "Staff can view contact leads" ON public.contact_leads;
CREATE POLICY "Staff can view contact leads"
    ON public.contact_leads
    FOR SELECT
    TO authenticated
    USING (public.is_active_staff());

DROP POLICY IF EXISTS "Staff can update contact lead status or assignment" ON public.contact_leads;
CREATE POLICY "Staff can update contact lead status or assignment"
    ON public.contact_leads
    FOR UPDATE
    TO authenticated
    USING (public.is_active_staff())
    WITH CHECK (public.is_active_staff());

DROP POLICY IF EXISTS "Super admins can delete contact leads" ON public.contact_leads;
CREATE POLICY "Super admins can delete contact leads"
    ON public.contact_leads
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

-- ------------------------------------------------------------------------------
-- 5. POLICIES: PROFILES
-- ------------------------------------------------------------------------------
-- Users can view their own profile; admins can view all team profiles.

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (
        id = auth.uid() OR public.is_admin_or_super()
    );

DROP POLICY IF EXISTS "Users can update their personal profile info" ON public.profiles;
CREATE POLICY "Users can update their personal profile info"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid() OR public.is_admin_or_super())
    WITH CHECK (
        -- Regular users cannot elevate their own role or toggle their own active status
        (id = auth.uid() AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()) AND is_active = true)
        OR public.is_admin_or_super()
    );

-- ------------------------------------------------------------------------------
-- 6. POLICIES: AUDIT LOGS
-- ------------------------------------------------------------------------------
-- Strictly read-only for administrators. Append-only ledger.

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (public.is_admin_or_super());

-- No INSERT/UPDATE/DELETE policies for authenticated users;
-- entries are created exclusively via the backend service_role client.

-- ------------------------------------------------------------------------------
-- 7. POLICIES: SITE SETTINGS
-- ------------------------------------------------------------------------------
-- Active staff can inspect site settings; only admins can modify or insert settings.

DROP POLICY IF EXISTS "Staff can read site settings" ON public.site_settings;
CREATE POLICY "Staff can read site settings"
    ON public.site_settings
    FOR SELECT
    TO authenticated
    USING (public.is_active_staff());

DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
CREATE POLICY "Admins can insert site settings"
    ON public.site_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings"
    ON public.site_settings
    FOR UPDATE
    TO authenticated
    USING (public.is_admin_or_super())
    WITH CHECK (public.is_admin_or_super());

