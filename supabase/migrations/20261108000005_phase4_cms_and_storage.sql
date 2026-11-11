-- ==============================================================================
-- ORBION TECHNOLOGIES — DATABASE MIGRATION: PHASE 4 SECURE CMS & STORAGE
-- Migration ID: 20261108000005_phase4_cms_and_storage.sql
-- Description: Content management system schema covering blogs, categories,
--              products catalog, case studies, media assets, and storage RLS.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BLOG CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 80),
    slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(slug) <= 80),
    description TEXT CHECK (description IS NULL OR char_length(description) <= 500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);

DROP TRIGGER IF EXISTS set_blog_categories_updated_at ON public.blog_categories;
CREATE TRIGGER set_blog_categories_updated_at
    BEFORE UPDATE ON public.blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.blog_categories IS 'Editorial categorization taxonomies for Orbion blog articles.';

-- ------------------------------------------------------------------------------
-- 2. BLOG POSTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(trim(title)) >= 3 AND char_length(title) <= 255),
    slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(slug) <= 120),
    excerpt TEXT CHECK (excerpt IS NULL OR char_length(excerpt) <= 500),
    content TEXT NOT NULL CHECK (char_length(trim(content)) >= 10),
    featured_image TEXT CHECK (featured_image IS NULL OR char_length(featured_image) <= 1000),
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE RESTRICT,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    meta_title TEXT CHECK (meta_title IS NULL OR char_length(meta_title) <= 120),
    meta_description TEXT CHECK (meta_description IS NULL OR char_length(meta_description) <= 300),
    canonical_url TEXT CHECK (canonical_url IS NULL OR char_length(canonical_url) <= 500),
    og_image TEXT CHECK (og_image IS NULL OR char_length(og_image) <= 1000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.blog_posts IS 'Editorial articles, thought leadership, and corporate insights.';

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS CATALOG TABLE
-- ------------------------------------------------------------------------------
-- Governs the 7 planned software products of Orbion Technologies.
-- Default status is STRICTLY 'coming_soon'.
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number TEXT NOT NULL CHECK (char_length(number) <= 10),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 100),
    slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(slug) <= 80),
    category TEXT NOT NULL CHECK (char_length(category) <= 80),
    category_group TEXT NOT NULL CHECK (char_length(category_group) <= 80),
    headline TEXT NOT NULL CHECK (char_length(headline) <= 255),
    short_description TEXT NOT NULL CHECK (char_length(short_description) <= 1000),
    detailed_description TEXT,
    status TEXT NOT NULL DEFAULT 'coming_soon' CHECK (status IN ('coming_soon', 'in_development', 'available')),
    status_notice TEXT,
    logo_url TEXT CHECK (logo_url IS NULL OR char_length(logo_url) <= 1000),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    problems JSONB NOT NULL DEFAULT '[]'::jsonb,
    audiences JSONB NOT NULL DEFAULT '[]'::jsonb,
    workflow JSONB NOT NULL DEFAULT '{}'::jsonb,
    meta_title TEXT CHECK (meta_title IS NULL OR char_length(meta_title) <= 120),
    meta_description TEXT CHECK (meta_description IS NULL OR char_length(meta_description) <= 300),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON public.products(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.products IS 'Orbion software product catalog with strict development status tracking.';

-- ------------------------------------------------------------------------------
-- 4. CASE STUDIES TABLE
-- ------------------------------------------------------------------------------
-- Governs verified case studies. Strictly unpopulated by default to prevent fake testimonials.
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(trim(title)) >= 3 AND char_length(title) <= 255),
    slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(slug) <= 120),
    summary TEXT NOT NULL CHECK (char_length(summary) <= 1000),
    client_name TEXT CHECK (client_name IS NULL OR char_length(client_name) <= 120),
    industry TEXT CHECK (industry IS NULL OR char_length(industry) <= 80),
    challenge TEXT,
    approach TEXT,
    solution TEXT,
    outcome TEXT,
    featured_image TEXT CHECK (featured_image IS NULL OR char_length(featured_image) <= 1000),
    technologies TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    meta_title TEXT CHECK (meta_title IS NULL OR char_length(meta_title) <= 120),
    meta_description TEXT CHECK (meta_description IS NULL OR char_length(meta_description) <= 300),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON public.case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_published_at ON public.case_studies(published_at DESC);

DROP TRIGGER IF EXISTS set_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER set_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.case_studies IS 'Commercial case studies and engineering project results.';

-- ------------------------------------------------------------------------------
-- 5. MEDIA ASSETS TABLE
-- ------------------------------------------------------------------------------
-- Tracks metadata for binary assets uploaded to Supabase Storage.
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL CHECK (char_length(filename) <= 255),
    original_name TEXT NOT NULL CHECK (char_length(original_name) <= 255),
    mime_type TEXT NOT NULL CHECK (mime_type IN (
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
        'application/pdf'
    )),
    size_bytes BIGINT NOT NULL CHECK (size_bytes > 0 AND size_bytes <= 15728640), -- Max 15MB
    bucket TEXT NOT NULL DEFAULT 'media' CHECK (bucket IN ('media', 'documents')),
    storage_path TEXT UNIQUE NOT NULL CHECK (char_length(storage_path) <= 500),
    public_url TEXT CHECK (public_url IS NULL OR char_length(public_url) <= 1000),
    alt_text TEXT CHECK (alt_text IS NULL OR char_length(alt_text) <= 255),
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_media_assets_bucket ON public.media_assets(bucket);
CREATE INDEX IF NOT EXISTS idx_media_assets_mime_type ON public.media_assets(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON public.media_assets(created_at DESC);

DROP TRIGGER IF EXISTS set_media_assets_updated_at ON public.media_assets;
CREATE TRIGGER set_media_assets_updated_at
    BEFORE UPDATE ON public.media_assets
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.media_assets IS 'Registry of uploaded brand, blog, and product binary media assets.';

-- ------------------------------------------------------------------------------
-- 6. SEED INITIAL PRODUCTS CATALOG (7 Official Products)
-- ------------------------------------------------------------------------------
INSERT INTO public.products (number, name, slug, category, category_group, headline, short_description, status, status_notice, display_order)
VALUES
    (
        '01',
        'Orbion CRM',
        'orbion-crm',
        'Customer Relationship Intelligence',
        'Business Operations',
        'Intelligent lead tracking, pipeline visibility, and automated customer journeys.',
        'An enterprise-grade CRM engineered to eliminate friction from contact ingestion to deal close, unifying communications, deal forecasting, and operational task delegation.',
        'coming_soon',
        'Currently in active systems architecture and database design. Not yet commercially available.',
        1
    ),
    (
        '02',
        'Orbion AI Chatbot',
        'orbion-ai-chatbot',
        'Autonomous Conversational Agent',
        'Artificial Intelligence',
        'Context-aware, retrieval-augmented intelligence for multi-channel customer engagement.',
        'Enterprise conversational AI combining fine-tuned language models with secure company knowledge bases for zero-hallucination customer support and automated qualification.',
        'coming_soon',
        'Currently in prompt orchestration and safety boundary evaluation. Not yet commercially available.',
        2
    ),
    (
        '03',
        'Orbion Bookings',
        'orbion-bookings',
        'Unified Scheduling & Resource Orchestration',
        'Business Operations',
        'Frictionless meeting coordination, staff allocation, and automated calendar synchronization.',
        'Eliminates appointment back-and-forth across distributed teams with timezone-aware calendar routing, automated SMS/email reminders, and resource contention prevention.',
        'coming_soon',
        'Currently in calendar integration and timezone reconciliation development. Not yet commercially available.',
        3
    ),
    (
        '04',
        'Orbion Fit',
        'orbion-fit',
        'Comprehensive Fitness Facility Management',
        'Business Operations',
        'End-to-end gym memberships, class scheduling, access control, and recurring billing.',
        'Tailored management platform for fitness clubs and studios, orchestrating member access, turnstile integrations, trainer rosters, and automated retention alerts.',
        'coming_soon',
        'Currently in access control hardware protocol evaluation. Not yet commercially available.',
        4
    ),
    (
        '05',
        'Orbion Dine',
        'orbion-dine',
        'Next-Generation Restaurant Operations Engine',
        'Business Operations',
        'Digital tableside ordering, dynamic kitchen display routing, and inventory forecasting.',
        'Streamlines high-volume dining environments with QR menu sequencing, low-latency Kitchen Display Systems (KDS), table turn optimization, and POS synchronization.',
        'coming_soon',
        'Currently in real-time order queue and kitchen display testing. Not yet commercially available.',
        5
    ),
    (
        '06',
        'Orbion Docs',
        'orbion-docs',
        'Cognitive Document Extraction & Processing',
        'Data Intelligence',
        'OCR-powered document parsing, schema mapping, and compliance-grade archiving.',
        'Automates document ingestion, turning invoices, contracts, and legal declarations into validated, structured database records with human-in-the-loop review.',
        'coming_soon',
        'Currently in OCR pipeline tuning and layout parsing evaluation. Not yet commercially available.',
        6
    ),
    (
        '07',
        'Orbion Insights',
        'orbion-insights',
        'Predictive Analytics & Real-Time Intelligence',
        'Data Intelligence',
        'Executive dashboards, anomaly detection, and unified cross-platform metrics.',
        'Transforms disparate operational data into real-time business telemetry with automated anomaly detection, cohort tracking, and automated leadership briefings.',
        'coming_soon',
        'Currently in streaming ingestion architecture design. Not yet commercially available.',
        7
    )
ON CONFLICT (slug) DO UPDATE SET
    number = EXCLUDED.number,
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    category_group = EXCLUDED.category_group,
    headline = EXCLUDED.headline,
    short_description = EXCLUDED.short_description,
    status_notice = EXCLUDED.status_notice,
    display_order = EXCLUDED.display_order;

-- ------------------------------------------------------------------------------
-- 7. SEED INITIAL BLOG CATEGORIES
-- ------------------------------------------------------------------------------
INSERT INTO public.blog_categories (name, slug, description)
VALUES
    ('Artificial Intelligence', 'artificial-intelligence', 'Advances in machine learning, LLMs, and autonomous software systems.'),
    ('Enterprise Architecture', 'enterprise-architecture', 'Scalable software engineering, distributed systems, and backend security.'),
    ('Product Engineering', 'product-engineering', 'Design philosophies, performance optimization, and developer workflows.'),
    ('Company Announcements', 'announcements', 'Official corporate updates, product milestones, and leadership perspectives.')
ON CONFLICT (slug) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 8. SUPABASE STORAGE BUCKETS PROVISIONING
-- ------------------------------------------------------------------------------
-- Creates the public media bucket and private documents bucket if storage extension is active.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    (
        'media',
        'media',
        true,
        10485760, -- 10MB
        ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
    ),
    (
        'documents',
        'documents',
        false,
        15728640, -- 15MB
        ARRAY['application/pdf', 'image/jpeg', 'image/png']
    )
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ------------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable & force RLS on all tables
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories FORCE ROW LEVEL SECURITY;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts FORCE ROW LEVEL SECURITY;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products FORCE ROW LEVEL SECURITY;

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies FORCE ROW LEVEL SECURITY;

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets FORCE ROW LEVEL SECURITY;

-- Revoke default public access
REVOKE ALL ON TABLE public.blog_categories FROM anon, authenticated;
REVOKE ALL ON TABLE public.blog_posts FROM anon, authenticated;
REVOKE ALL ON TABLE public.products FROM anon, authenticated;
REVOKE ALL ON TABLE public.case_studies FROM anon, authenticated;
REVOKE ALL ON TABLE public.media_assets FROM anon, authenticated;

-- Grants
GRANT SELECT ON TABLE public.blog_categories TO anon, authenticated;
GRANT SELECT ON TABLE public.blog_posts TO anon, authenticated;
GRANT SELECT ON TABLE public.products TO anon, authenticated;
GRANT SELECT ON TABLE public.case_studies TO anon, authenticated;
GRANT SELECT ON TABLE public.media_assets TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON TABLE public.blog_categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.blog_posts TO authenticated;
GRANT UPDATE ON TABLE public.products TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.case_studies TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.media_assets TO authenticated;

-- RLS: BLOG CATEGORIES
-- Everyone can read categories
CREATE POLICY rls_blog_categories_public_read ON public.blog_categories
    FOR SELECT TO public
    USING (true);

-- Only super_admin and admin can manage categories
CREATE POLICY rls_blog_categories_admin_all ON public.blog_categories
    FOR ALL TO authenticated
    USING (public.has_role('super_admin', 'admin'))
    WITH CHECK (public.has_role('super_admin', 'admin'));

-- RLS: BLOG POSTS
-- Public/anon can only read published posts
CREATE POLICY rls_blog_posts_public_read ON public.blog_posts
    FOR SELECT TO public
    USING (status = 'published');

-- Authorized staff (super_admin, admin, editor, viewer) can view all posts
CREATE POLICY rls_blog_posts_staff_read ON public.blog_posts
    FOR SELECT TO authenticated
    USING (public.has_role('super_admin', 'admin', 'editor', 'viewer'));

-- Authors (super_admin, admin, editor) can create posts
CREATE POLICY rls_blog_posts_staff_insert ON public.blog_posts
    FOR INSERT TO authenticated
    WITH CHECK (
        public.has_role('super_admin', 'admin', 'editor') AND
        author_id = auth.uid()
    );

-- Authors (editor) can update their own drafts; super_admin & admin can update any post
CREATE POLICY rls_blog_posts_staff_update ON public.blog_posts
    FOR UPDATE TO authenticated
    USING (
        public.has_role('super_admin', 'admin') OR
        (public.has_role('editor') AND author_id = auth.uid())
    )
    WITH CHECK (
        public.has_role('super_admin', 'admin') OR
        (public.has_role('editor') AND author_id = auth.uid())
    );

-- Only super_admin and admin can delete/archive posts
CREATE POLICY rls_blog_posts_admin_delete ON public.blog_posts
    FOR DELETE TO authenticated
    USING (public.has_role('super_admin', 'admin'));

-- RLS: PRODUCTS
-- Everyone can read products catalog
CREATE POLICY rls_products_public_read ON public.products
    FOR SELECT TO public
    USING (true);

-- Only super_admin and admin can update product information
CREATE POLICY rls_products_admin_update ON public.products
    FOR UPDATE TO authenticated
    USING (public.has_role('super_admin', 'admin'))
    WITH CHECK (public.has_role('super_admin', 'admin'));

-- RLS: CASE STUDIES
-- Public/anon can only read published case studies
CREATE POLICY rls_case_studies_public_read ON public.case_studies
    FOR SELECT TO public
    USING (status = 'published');

-- Authorized staff can read all case studies
CREATE POLICY rls_case_studies_staff_read ON public.case_studies
    FOR SELECT TO authenticated
    USING (public.has_role('super_admin', 'admin', 'editor', 'viewer'));

-- Authors can create case studies
CREATE POLICY rls_case_studies_staff_insert ON public.case_studies
    FOR INSERT TO authenticated
    WITH CHECK (public.has_role('super_admin', 'admin', 'editor'));

-- Staff update
CREATE POLICY rls_case_studies_staff_update ON public.case_studies
    FOR UPDATE TO authenticated
    USING (public.has_role('super_admin', 'admin', 'editor'))
    WITH CHECK (public.has_role('super_admin', 'admin', 'editor'));

-- Admin delete
CREATE POLICY rls_case_studies_admin_delete ON public.case_studies
    FOR DELETE TO authenticated
    USING (public.has_role('super_admin', 'admin'));

-- RLS: MEDIA ASSETS
-- Public can view media assets in the public 'media' bucket
CREATE POLICY rls_media_assets_public_read ON public.media_assets
    FOR SELECT TO public
    USING (bucket = 'media');

-- Staff can view all media assets including documents
CREATE POLICY rls_media_assets_staff_read ON public.media_assets
    FOR SELECT TO authenticated
    USING (public.has_role('super_admin', 'admin', 'editor', 'viewer'));

-- Staff can upload media
CREATE POLICY rls_media_assets_staff_insert ON public.media_assets
    FOR INSERT TO authenticated
    WITH CHECK (
        public.has_role('super_admin', 'admin', 'editor') AND
        uploaded_by = auth.uid()
    );

-- Only super_admin and admin can delete media assets
CREATE POLICY rls_media_assets_admin_delete ON public.media_assets
    FOR DELETE TO authenticated
    USING (public.has_role('super_admin', 'admin'));

-- ------------------------------------------------------------------------------
-- 10. STORAGE RLS POLICIES (storage.objects)
-- ------------------------------------------------------------------------------
-- Allows public access to the 'media' bucket
DROP POLICY IF EXISTS rls_storage_media_public_read ON storage.objects;
CREATE POLICY rls_storage_media_public_read ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = 'media');

-- Authenticated staff can upload to 'media' and 'documents'
DROP POLICY IF EXISTS rls_storage_staff_upload ON storage.objects;
CREATE POLICY rls_storage_staff_upload ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id IN ('media', 'documents') AND
        public.has_role('super_admin', 'admin', 'editor')
    );

-- Only super_admin and admin can delete storage objects
DROP POLICY IF EXISTS rls_storage_admin_delete ON storage.objects;
CREATE POLICY rls_storage_admin_delete ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id IN ('media', 'documents') AND
        public.has_role('super_admin', 'admin')
    );

