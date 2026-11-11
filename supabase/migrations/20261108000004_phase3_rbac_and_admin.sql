-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: PHASE 3 RBAC & ADMIN SYSTEM
-- Migration ID: 20261108000004_phase3_rbac_and_admin.sql
-- Description: Six-tier RBAC role definitions, lead notes table, granular RLS,
--              security definer helper functions, and atomic audit transactions.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. UPDATE PROFILES ROLE CONSTRAINT
-- ------------------------------------------------------------------------------
-- Phase 3 explicit roles: super_admin, admin, editor, sales, hr, viewer.
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Migrate any legacy 'operator' entries to 'admin'
UPDATE public.profiles SET role = 'admin' WHERE role = 'operator';

ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_role_check 
    CHECK (role IN ('super_admin', 'admin', 'editor', 'sales', 'hr', 'viewer'));

ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'viewer';

-- ------------------------------------------------------------------------------
-- 2. SEPARATE INTERNAL LEAD NOTES TABLE
-- ------------------------------------------------------------------------------
-- Stores staff commentary on customer enquiries without altering the immutable customer message.
CREATE TABLE IF NOT EXISTS public.lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.contact_leads(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    note TEXT NOT NULL CHECK (char_length(trim(note)) >= 1 AND char_length(note) <= 4000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON public.lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_author_id ON public.lead_notes(author_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON public.lead_notes(created_at DESC);

COMMENT ON TABLE public.lead_notes IS 'Internal administrative notes attached to contact enquiries.';

-- ------------------------------------------------------------------------------
-- 3. RBAC SECURITY DEFINER FUNCTIONS
-- ------------------------------------------------------------------------------
-- Helper function to retrieve the active role of the current caller.
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
DECLARE
    v_role TEXT;
BEGIN
    SELECT role INTO v_role
    FROM public.profiles
    WHERE id = auth.uid() AND is_active = true;

    RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if current user has any of the given roles
CREATE OR REPLACE FUNCTION public.has_role(VARIADIC allowed_roles TEXT[])
RETURNS BOOLEAN AS $$
DECLARE
    v_role TEXT;
BEGIN
    v_role := public.current_user_role();
    IF v_role IS NULL THEN
        RETURN false;
    END IF;
    RETURN v_role = ANY(allowed_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Specific capability checks
CREATE OR REPLACE FUNCTION public.can_manage_leads()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin', 'admin', 'sales');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.can_manage_users()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.can_view_audit_logs()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ------------------------------------------------------------------------------
-- 4. RLS POLICIES: LEAD NOTES
-- ------------------------------------------------------------------------------
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.lead_notes FROM anon, authenticated;
GRANT ALL ON TABLE public.lead_notes TO service_role;
GRANT SELECT, INSERT ON TABLE public.lead_notes TO authenticated;

DROP POLICY IF EXISTS "Authorized roles can view lead notes" ON public.lead_notes;
CREATE POLICY "Authorized roles can view lead notes"
    ON public.lead_notes
    FOR SELECT
    TO authenticated
    USING (public.has_role('super_admin', 'admin', 'sales', 'viewer'));

DROP POLICY IF EXISTS "Authorized roles can add lead notes" ON public.lead_notes;
CREATE POLICY "Authorized roles can add lead notes"
    ON public.lead_notes
    FOR INSERT
    TO authenticated
    WITH CHECK (public.can_manage_leads() AND author_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 5. REVISE RLS POLICIES: CONTACT LEADS
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Staff can view contact leads" ON public.contact_leads;
CREATE POLICY "Authorized roles can view contact leads"
    ON public.contact_leads
    FOR SELECT
    TO authenticated
    USING (public.has_role('super_admin', 'admin', 'sales', 'viewer'));

DROP POLICY IF EXISTS "Staff can update contact lead status or assignment" ON public.contact_leads;
CREATE POLICY "Authorized roles can update contact leads"
    ON public.contact_leads
    FOR UPDATE
    TO authenticated
    USING (public.can_manage_leads())
    WITH CHECK (public.can_manage_leads());

DROP POLICY IF EXISTS "Super admins can delete contact leads" ON public.contact_leads;
CREATE POLICY "Super admins can delete contact leads"
    ON public.contact_leads
    FOR DELETE
    TO authenticated
    USING (public.can_manage_users());

-- ------------------------------------------------------------------------------
-- 6. REVISE RLS POLICIES: PROFILES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Staff can view profiles" ON public.profiles;
CREATE POLICY "Staff can view profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.current_user_role() IS NOT NULL);

DROP POLICY IF EXISTS "Super admins can insert profiles" ON public.profiles;
CREATE POLICY "Super admins can insert profiles"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (public.can_manage_users());

DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
CREATE POLICY "Super admins can update profiles"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (public.can_manage_users());

-- Prevent privilege escalation: users can only update their own non-role fields
DROP POLICY IF EXISTS "Users can update own avatar and name" ON public.profiles;
CREATE POLICY "Users can update own avatar and name"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid() 
        AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
        AND is_active = (SELECT p.is_active FROM public.profiles p WHERE p.id = auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 7. REVISE RLS POLICIES: AUDIT LOGS
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Staff can view audit logs" ON public.audit_logs;
CREATE POLICY "Authorized roles can view audit logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (public.can_view_audit_logs());

-- Strictly disallow UPDATE or DELETE on audit logs for authenticated users
REVOKE UPDATE, DELETE ON TABLE public.audit_logs FROM authenticated;

-- ------------------------------------------------------------------------------
-- 8. ATOMIC STORED PROCEDURE: LEAD STATUS UPDATE WITH AUDIT
-- ------------------------------------------------------------------------------
-- Ensures lead update, optional assignment, optional note, and audit record
-- are committed together in a single atomic transaction.
CREATE OR REPLACE FUNCTION public.update_lead_status_with_audit(
    p_lead_id UUID,
    p_new_status TEXT,
    p_assigned_to UUID DEFAULT NULL,
    p_internal_note TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_actor_id UUID;
    v_actor_role TEXT;
    v_old_status TEXT;
    v_old_assigned_to UUID;
    v_updated_lead public.contact_leads;
    v_note_id UUID := NULL;
BEGIN
    v_actor_id := auth.uid();
    v_actor_role := public.current_user_role();

    -- 1. Authorization check
    IF v_actor_role IS NULL OR v_actor_role NOT IN ('super_admin', 'admin', 'sales') THEN
        RAISE EXCEPTION 'Access denied. Actor does not have lead management permissions.'
            USING ERRCODE = '42501';
    END IF;

    -- 2. Validate status value
    IF p_new_status NOT IN ('new', 'contacted', 'qualified', 'closed') THEN
        RAISE EXCEPTION 'Invalid lead status: %', p_new_status
            USING ERRCODE = '22023';
    END IF;

    -- 3. Retrieve current lead
    SELECT status, assigned_to INTO v_old_status, v_old_assigned_to
    FROM public.contact_leads
    WHERE id = p_lead_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Lead with ID % not found.', p_lead_id
            USING ERRCODE = 'P0002';
    END IF;

    -- 4. Update lead
    UPDATE public.contact_leads
    SET status = p_new_status,
        assigned_to = COALESCE(p_assigned_to, assigned_to),
        updated_at = timezone('utc'::text, now())
    WHERE id = p_lead_id
    RETURNING * INTO v_updated_lead;

    -- 5. Optional internal note
    IF p_internal_note IS NOT NULL AND trim(p_internal_note) <> '' THEN
        INSERT INTO public.lead_notes (lead_id, author_id, note)
        VALUES (p_lead_id, v_actor_id, trim(p_internal_note))
        RETURNING id INTO v_note_id;
    END IF;

    -- 6. Insert audit log record
    INSERT INTO public.audit_logs (
        actor_id,
        action,
        entity_type,
        entity_id,
        metadata
    ) VALUES (
        v_actor_id,
        'update_lead_status',
        'contact_lead',
        p_lead_id,
        jsonb_build_object(
            'previous_status', v_old_status,
            'new_status', p_new_status,
            'previous_assigned_to', v_old_assigned_to,
            'new_assigned_to', v_updated_lead.assigned_to,
            'note_id', v_note_id,
            'actor_role', v_actor_role
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'lead_id', p_lead_id,
        'status', p_new_status,
        'assigned_to', v_updated_lead.assigned_to,
        'note_id', v_note_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

