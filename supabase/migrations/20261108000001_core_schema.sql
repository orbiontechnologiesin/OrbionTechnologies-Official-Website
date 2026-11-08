-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: CORE SCHEMA
-- Migration ID: 20261108000001_core_schema.sql
-- Description: Core tables, constraints, indexes, and automated triggers.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TRIGGER FUNCTION: Automated updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 3. PROFILES TABLE (Administrator & Staff Accounts)
-- ------------------------------------------------------------------------------
-- Tied 1-to-1 with Supabase Auth users (auth.users).
-- Passwords and credentials are NEVER stored here; managed exclusively by Supabase Auth.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 255),
    role TEXT NOT NULL DEFAULT 'operator' CHECK (role IN ('super_admin', 'admin', 'operator', 'viewer')),
    avatar_url TEXT CHECK (avatar_url IS NULL OR avatar_url ~* '^https?://'),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON public.profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.profiles IS 'Internal team and administrator profile registry associated with Supabase Auth users.';

-- ------------------------------------------------------------------------------
-- 4. CONTACT LEADS TABLE (Enquiry Intake)
-- ------------------------------------------------------------------------------
-- Stores enquiries submitted via the official Orbion website.
-- Ingestion will be processed through a server-controlled Next.js Route Handler.
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 255),
    phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 30),
    company TEXT CHECK (company IS NULL OR char_length(company) <= 120),
    subject TEXT NOT NULL CHECK (char_length(trim(subject)) >= 2 AND char_length(subject) <= 120),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 10 AND char_length(message) <= 5000),
    source TEXT NOT NULL DEFAULT 'website_contact' CHECK (char_length(source) <= 80),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON public.contact_leads(email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON public.contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON public.contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_assigned_to ON public.contact_leads(assigned_to) WHERE assigned_to IS NOT NULL;

DROP TRIGGER IF EXISTS set_contact_leads_updated_at ON public.contact_leads;
CREATE TRIGGER set_contact_leads_updated_at
    BEFORE UPDATE ON public.contact_leads
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.contact_leads IS 'Customer and partnership enquiries received through Orbion Technologies contact channels.';

-- ------------------------------------------------------------------------------
-- 5. AUDIT LOGS TABLE (Administrative Ledger)
-- ------------------------------------------------------------------------------
-- Immutable record of sensitive actions performed by internal operators.
-- Strictly append-only: updates and deletes are prohibited by design.
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL CHECK (char_length(trim(action)) >= 2 AND char_length(action) <= 100),
    entity_type TEXT NOT NULL CHECK (char_length(trim(entity_type)) >= 2 AND char_length(entity_type) <= 80),
    entity_id UUID,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

COMMENT ON TABLE public.audit_logs IS 'Append-only audit trail recording administrative actions, role updates, and system events.';

-- ------------------------------------------------------------------------------
-- 6. SITE SETTINGS TABLE (System Configuration)
-- ------------------------------------------------------------------------------
-- Stores operational metadata, feature flags, and non-secret website configuration.
-- Private keys, service secrets, and API credentials must NEVER be stored here.
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE CHECK (char_length(trim(key)) >= 2 AND char_length(key) <= 80 AND key ~ '^[a-z0-9_.-]+$'),
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.site_settings IS 'Non-secret application configuration values, feature toggles, and metadata.';

