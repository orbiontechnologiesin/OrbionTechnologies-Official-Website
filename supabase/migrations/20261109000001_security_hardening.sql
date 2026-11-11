-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE SECURITY REMEDIATION MIGRATION
-- Migration ID: 20261109000001_security_hardening.sql
-- Description: Hardens all PostgreSQL SECURITY DEFINER functions against untrusted
--              search path exploitation (CWE-426). Explicitly pins search_path to
--              'public', qualifies internal dependencies, and tightens EXECUTE grants.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TRIGGER FUNCTION: Automated updated_at timestamps
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Revoke execute from untrusted roles; triggers run internally as function owner
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;

COMMENT ON FUNCTION public.handle_updated_at() IS 
    'Automated updated_at trigger function hardened with search_path = public.';

-- ------------------------------------------------------------------------------
-- 2. RBAC HELPER: is_active_staff()
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_active_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.is_active_staff() SET search_path = public;

REVOKE ALL ON FUNCTION public.is_active_staff() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_active_staff() TO authenticated, service_role;

COMMENT ON FUNCTION public.is_active_staff() IS 
    'Evaluates whether the calling auth.uid() is an active staff profile with search_path = public.';

-- ------------------------------------------------------------------------------
-- 3. RBAC HELPER: is_admin_or_super()
-- ------------------------------------------------------------------------------
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.is_admin_or_super() SET search_path = public;

REVOKE ALL ON FUNCTION public.is_admin_or_super() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin_or_super() TO authenticated, service_role;

COMMENT ON FUNCTION public.is_admin_or_super() IS 
    'Evaluates whether caller is super_admin or admin with search_path = public.';

-- ------------------------------------------------------------------------------
-- 4. RBAC HELPER: current_user_role()
-- ------------------------------------------------------------------------------
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.current_user_role() SET search_path = public;

REVOKE ALL ON FUNCTION public.current_user_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated, service_role;

COMMENT ON FUNCTION public.current_user_role() IS 
    'Returns active role identifier of the current caller with search_path = public.';

-- ------------------------------------------------------------------------------
-- 5. RBAC HELPER: has_role() (Variadic check)
-- ------------------------------------------------------------------------------
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.has_role(VARIADIC TEXT[]) SET search_path = public;

REVOKE ALL ON FUNCTION public.has_role(VARIADIC TEXT[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(VARIADIC TEXT[]) TO authenticated, service_role;

COMMENT ON FUNCTION public.has_role(VARIADIC TEXT[]) IS 
    'Checks if current user possesses any of the provided role names with search_path = public.';

-- ------------------------------------------------------------------------------
-- 6. CAPABILITY CHECK: can_manage_leads()
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.can_manage_leads()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin', 'admin', 'sales');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.can_manage_leads() SET search_path = public;

REVOKE ALL ON FUNCTION public.can_manage_leads() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_leads() TO authenticated, service_role;

COMMENT ON FUNCTION public.can_manage_leads() IS 
    'Evaluates lead management capabilities (super_admin, admin, sales) with search_path = public.';

-- ------------------------------------------------------------------------------
-- 7. CAPABILITY CHECK: can_manage_users()
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.can_manage_users()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.can_manage_users() SET search_path = public;

REVOKE ALL ON FUNCTION public.can_manage_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_users() TO authenticated, service_role;

COMMENT ON FUNCTION public.can_manage_users() IS 
    'Evaluates user governance capabilities (super_admin only) with search_path = public.';

-- ------------------------------------------------------------------------------
-- 8. CAPABILITY CHECK: can_view_audit_logs()
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.can_view_audit_logs()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_role('super_admin', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

ALTER FUNCTION public.can_view_audit_logs() SET search_path = public;

REVOKE ALL ON FUNCTION public.can_view_audit_logs() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_audit_logs() TO authenticated, service_role;

COMMENT ON FUNCTION public.can_view_audit_logs() IS 
    'Evaluates audit log read capabilities (super_admin, admin) with search_path = public.';

-- ------------------------------------------------------------------------------
-- 9. ATOMIC STORED PROCEDURE: update_lead_status_with_audit()
-- ------------------------------------------------------------------------------
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

ALTER FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) SET search_path = public;

REVOKE ALL ON FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) TO authenticated, service_role;

COMMENT ON FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) IS 
    'Atomic lead status update, note attachment, and audit ledger generation with search_path = public.';

