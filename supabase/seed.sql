-- ==============================================================================
-- ORBION TECHNOLOGIES — LOCAL SEED DATA
-- Seed File: supabase/seed.sql
-- Description: Non-secret initial configurations for development environments.
-- ==============================================================================

-- 1. INITIAL SITE SETTINGS
-- Non-secret baseline configuration parameters for the application.
INSERT INTO public.site_settings (key, value)
VALUES
    ('maintenance_mode', '{"enabled": false, "notice": null}'::jsonb),
    ('contact_intake', '{"auto_reply_enabled": false, "rate_limit_per_hour": 5}'::jsonb),
    ('public_enquiry_categories', '["Enterprise AI Systems", "Custom Software Development", "Autonomous Agents & Workflow Automation", "Partnership & Joint Ventures", "Other Inquiries"]'::jsonb)
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value;

