# ORBION TECHNOLOGIES — MASTER PROJECT INVENTORY
**Project:** Orbion Technologies Official Website & Production Backend Platform  
**Audit Date:** November 9, 2026  
**Auditor:** Independent Senior Engineering Audit Team  
**Scope:** Phase 1 (Foundation), Phase 2 (Inbound APIs & Email), Phase 3 (Auth, RBAC & Admin), Phase 4 (CMS & Storage), Phase 5 (BI & Intelligence)  
**Status:** PASS  

---

## 1. Executive Summary & System Overview

Orbion Technologies operates an enterprise-grade digital platform combining a Next.js 16.4.5 App Router web front with a comprehensive Supabase PostgreSQL backend. The platform serves dual purposes:
1. **Public Brand & Product Portal:** Showcases Orbion Technologies' corporate vision, services, industries, case studies, and an interactive product showcase featuring seven enterprise SaaS products (all intentionally designated `COMING SOON`).
2. **Internal Enterprise Administration Platform:** A secure, role-based administrative portal (`/admin`) powering CRM lead triage, demo scheduling, newsletter management, multi-user access control, CMS publishing, media asset storage, first-party web analytics, business intelligence metrics, lead scoring, and system observability.

---

## 2. Core Runtime & Technology Stack Inventory

| Component / Layer | Specification / Technology | Exact Version | Package / Source |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Webpack build mode) | `16.4.5` | `next` |
| **UI Library** | React (Concurrent Features, Server Components) | `19.3.0` | `react`, `react-dom` |
| **Language & Typing** | TypeScript (Strict mode enabled, `noEmit`) | `^5.0.0` | `typescript` |
| **Styling & Design** | Tailwind CSS v4 (PostCSS engine) | `^4.0.0` | `tailwindcss`, `@tailwindcss/postcss` |
| **Icons & Assets** | Lucide React | `^1.70.0` | `lucide-react` |
| **Motion & Animation** | Framer Motion | `^14.10.1` | `framer-motion` |
| **Database Provider** | PostgreSQL via Supabase Hosted Platform | PostgreSQL 15+ | AWS `ap-south-1` (`mkpwfgrkkhxdjkoiowom`) |
| **Database Access Client** | Supabase JS & SSR SDKs | `^2.119.0` / `^0.12.7` | `@supabase/supabase-js`, `@supabase/ssr` |
| **Authentication Engine** | Supabase Auth (GoTrue) + HTTP-only Cookie SSR | v2 | `@supabase/ssr` |
| **Schema Validation** | Zod (Runtime validation & type inference) | `^4.6.7` | `zod` |
| **Email Infrastructure** | Resend API + Database Outbox Pattern | `^6.37.0` | `resend` |
| **Server Isolation** | Server-Only Boundary Enforcement | `^0.0.1` | `server-only` |
| **Runtime Environment** | Node.js LTS | `>=20.0.0` | Node.js V8 |
| **Deployment Target** | Vercel Serverless Platform | Edge / Node.js Serverless | Vercel Build Pipeline |

---

## 3. Complete Application Route Inventory

### 3.1 Public Marketing & Showcase Routes (12 routes)

| Route Path | File Location | Rendering Strategy | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | SSG / ISR | Corporate Homepage, Hero, Value Proposition, Feature Matrix |
| `/about` | `src/app/about/page.tsx` | Static | Company story, mission, engineering values, leadership |
| `/contact` | `src/app/contact/page.tsx` | Client Interactive | Contact lead generation form with rate limiting & Turnstile |
| `/demo` | `src/app/demo/page.tsx` | Client Interactive | Enterprise product demo request form with product selector |
| `/products` | `src/app/products/page.tsx` | Dynamic / ISR | Product Library with Case Study Flip Stack interactive UX |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | Dynamic SSR | Product detail for 7 products (Strict `COMING SOON` state) |
| `/services` | `src/app/services/page.tsx` | Static | Orbion engineering, AI automation & cloud service offerings |
| `/solutions` | `src/app/solutions/page.tsx` | Static | Enterprise vertical solutions (Retail, Health, Fintech, SaaS) |
| `/industries` | `src/app/industries/page.tsx` | Static | Industry-tailored architecture blueprints |
| `/pricing` | `src/app/pricing/page.tsx` | Static | Tiered engagement & platform pricing matrix |
| `/blog` | `src/app/blog/page.tsx` | Dynamic / SSR | Public blog article index with category filtering |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Dynamic SSR | Published blog article detail with SEO and structured data |
| `/case-studies` | `src/app/case-studies/page.tsx` | Dynamic / SSR | Public case study index with client metrics |
| `/case-studies/[slug]` | `src/app/case-studies/[slug]/page.tsx` | Dynamic SSR | Published case study deep dive |

### 3.2 Authentication Routes (3 routes)

| Route Path | File Location | Rendering Strategy | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `/admin/login` | `src/app/admin/(auth)/login/page.tsx` | Client Interactive | Secure portal sign-in via Supabase Auth + cookie exchange |
| `/admin/forgot-password`| `src/app/admin/(auth)/forgot-password/page.tsx`| Client Interactive | Password recovery initiation |
| `/admin/reset-password` | `src/app/admin/(auth)/reset-password/page.tsx` | Client Interactive | Secure token password reset form |
| `/admin/unauthorized` | `src/app/admin/unauthorized/page.tsx` | Static Client | 403 Forbidden state for insufficient RBAC privileges |

### 3.3 Protected Administrative Portal Routes (16 routes)

All authenticated admin routes reside under `src/app/admin/(authenticated)/` and require an active session and valid RBAC role validated by `middleware.ts`.

| Admin Route Path | Page Component File | Minimum RBAC Role | Functional Purpose |
| :--- | :--- | :--- | :--- |
| `/admin/dashboard` | `dashboard/page.tsx` | `viewer` | Executive overview, KPI scorecards, recent inbound activity |
| `/admin/leads` | `leads/page.tsx` | `sales` | Inbound CRM leads table, status filtering, search |
| `/admin/leads/[id]` | `leads/[id]/page.tsx` | `sales` | Lead detail, timeline, status updates, team audit notes |
| `/admin/newsletter` | `newsletter/page.tsx` | `editor` | Newsletter subscriber database, unsubscriber tracking, CSV export |
| `/admin/users` | `users/page.tsx` | `super_admin` | Team user management, role assignments, account deactivation |
| `/admin/audit-logs` | `audit-logs/page.tsx` | `admin` | Immutable compliance log of all administrative actions |
| `/admin/blog` | `blog/page.tsx` | `editor` | CMS article table, status pills (draft, published, archived) |
| `/admin/blog/new` | `blog/new/page.tsx` | `editor` | Markdown/rich article composer with category & tag selector |
| `/admin/blog/[id]/edit`| `blog/[id]/edit/page.tsx` | `editor` | Article editor with publishing state toggle & revalidation |
| `/admin/blog/categories`| `blog/categories/page.tsx`| `editor` | Taxonomy & category management |
| `/admin/products` | `products/page.tsx` | `editor` | Product catalog manager (maintains 7 products COMING SOON) |
| `/admin/products/[id]/edit` | `products/[id]/edit/page.tsx` | `editor` | Product detail editor with status guards |
| `/admin/case-studies` | `case-studies/page.tsx` | `editor` | Customer success story management |
| `/admin/case-studies/new` | `case-studies/new/page.tsx` | `editor` | Case study authoring tool |
| `/admin/case-studies/[id]/edit` | `case-studies/[id]/edit/page.tsx` | `editor` | Case study update editor |
| `/admin/media` | `media/page.tsx` | `editor` | Supabase storage asset gallery, upload, MIME inspector |
| `/admin/business-intelligence` | `business-intelligence/page.tsx`| `admin` | Revenue pipeline, conversion funnels, monthly trends |
| `/admin/analytics` | `analytics/page.tsx` | `viewer` | First-party privacy analytics, path counts, referrers |
| `/admin/lead-intelligence` | `lead-intelligence/page.tsx` | `sales` | Algorithmic lead prioritization & qualification scoring |
| `/admin/notifications`| `notifications/page.tsx` | `viewer` | In-app operational alert center with unread badge counter |
| `/admin/system-health` | `system-health/page.tsx` | `admin` | DB latency, storage volume, email outbox health probes |
| `/admin/reports` | `reports/page.tsx` | `admin` | Secure CSV export engine with CWE-1236 sanitization |

---

## 4. API Endpoints & Route Handlers Inventory (35 Handlers)

### 4.1 Public & Inbound Ingestion APIs (6 endpoints)

| Route Endpoint | HTTP Methods | Handler File Location | Primary Function & Security Measures |
| :--- | :--- | :--- | :--- |
| `/api/contact` | `POST` | `src/app/api/contact/route.ts` | Inbound CRM lead capture. Zod validation, IP rate limiting, honeypot, Turnstile validation, email outbox queueing. |
| `/api/demo-request` | `POST` | `src/app/api/demo-request/route.ts` | Enterprise demo request. Zod validation, product choice verification, outbox dispatch. |
| `/api/newsletter` | `POST` | `src/app/api/newsletter/route.ts` | Newsletter subscription. Token generation, deduplication, confirmation email dispatch. |
| `/api/newsletter/unsubscribe` | `POST` | `src/app/api/newsletter/unsubscribe/route.ts` | One-click HMAC-verified unsubscription handler. |
| `/api/analytics/event`| `POST` | `src/app/api/analytics/event/route.ts` | First-party telemetry beacon. Anonymized IP hash, no third-party cookies. |
| `/api/health` | `GET` | `src/app/api/health/route.ts` | Public liveness probe. Returns JSON uptime & service timestamp. |

### 4.2 Background & Maintenance Endpoints (1 endpoint)

| Route Endpoint | HTTP Methods | Handler File Location | Primary Function & Security Measures |
| :--- | :--- | :--- | :--- |
| `/api/jobs/process-email-outbox` | `POST` | `src/app/api/jobs/process-email-outbox/route.ts` | Scheduled email dispatcher. Requires `Bearer ${CRON_SECRET}` authorization header. Exponential backoff retry logic. |

### 4.3 Administrative & RBAC Protected APIs (28 endpoints)

| Route Endpoint | HTTP Methods | Handler File Location | RBAC Role Required | Operation |
| :--- | :--- | :--- | :--- | :--- |
| `/api/admin/auth/login` | `POST` | `src/app/api/admin/auth/login/route.ts` | Public (Admin auth) | Authenticates credentials, validates active staff profile, sets secure HTTP-only cookies. |
| `/api/admin/auth/logout` | `POST` | `src/app/api/admin/auth/logout/route.ts` | Authenticated | Clears Supabase auth cookies and invalidates session token. |
| `/api/admin/auth/forgot-password` | `POST` | `src/app/api/admin/auth/forgot-password/route.ts` | Public | Initiates password recovery email via Supabase Auth GoTrue. |
| `/api/admin/leads/[id]` | `PATCH`, `POST` | `src/app/api/admin/leads/[id]/route.ts` | `sales` | Updates lead status (calls atomic stored proc) or appends staff lead notes. |
| `/api/admin/newsletter` | `GET` | `src/app/api/admin/newsletter/route.ts` | `editor` | Retrieves paginated newsletter subscribers. |
| `/api/admin/newsletter/export` | `GET` | `src/app/api/admin/newsletter/export/route.ts` | `admin` | Generates RFC 4180 CSV export of active subscribers with formula neutralization. |
| `/api/admin/users/invite` | `POST` | `src/app/api/admin/users/invite/route.ts` | `super_admin` | Invites new team member via service role admin API, assigns RBAC role. |
| `/api/admin/users/[id]/role` | `PATCH` | `src/app/api/admin/users/[id]/role/route.ts` | `super_admin` | Modifies user RBAC role with immutable audit trail. |
| `/api/admin/users/[id]/status` | `PATCH` | `src/app/api/admin/users/[id]/status/route.ts` | `super_admin` | Activates or suspends staff account. |
| `/api/admin/cms/blog` | `GET`, `POST` | `src/app/api/admin/cms/blog/route.ts` | `editor` | Lists blog posts or creates a new blog post. |
| `/api/admin/cms/blog/[id]` | `GET`, `PATCH`, `DELETE` | `src/app/api/admin/cms/blog/[id]/route.ts` | `editor` (Del: `admin`) | Manages individual blog post lifecycle. Triggers ISR revalidation. |
| `/api/admin/cms/blog/categories` | `GET`, `POST` | `src/app/api/admin/cms/blog/categories/route.ts` | `editor` | Manages blog categories taxonomy. |
| `/api/admin/cms/blog/categories/[id]`| `PATCH`, `DELETE` | `src/app/api/admin/cms/blog/categories/[id]/route.ts` | `editor` (Del: `admin`) | Updates or deletes blog category. |
| `/api/admin/cms/products` | `GET`, `POST` | `src/app/api/admin/cms/products/route.ts` | `editor` | Lists products catalog or creates new product entry. |
| `/api/admin/cms/products/[id]` | `GET`, `PATCH`, `DELETE` | `src/app/api/admin/cms/products/[id]/route.ts` | `editor` (Del: `admin`) | Updates product details. Enforces COMING SOON status integrity. |
| `/api/admin/cms/case-studies` | `GET`, `POST` | `src/app/api/admin/cms/case-studies/route.ts` | `editor` | Lists or creates customer case studies. |
| `/api/admin/cms/case-studies/[id]` | `GET`, `PATCH`, `DELETE` | `src/app/api/admin/cms/case-studies/[id]/route.ts` | `editor` (Del: `admin`) | Updates or deletes case studies. |
| `/api/admin/cms/media` | `GET`, `POST` | `src/app/api/admin/cms/media/route.ts` | `editor` | Queries media metadata or uploads files to Supabase Storage. |
| `/api/admin/cms/media/[id]` | `DELETE` | `src/app/api/admin/cms/media/[id]/route.ts` | `admin` | Deletes media file from storage and database metadata. |
| `/api/admin/bi` | `GET` | `src/app/api/admin/bi/route.ts` | `admin` | Aggregates platform business intelligence & executive metrics. |
| `/api/admin/analytics` | `GET` | `src/app/api/admin/analytics/route.ts` | `viewer` | Returns page views, unique sessions, top referrers, device mix. |
| `/api/admin/lead-intelligence` | `GET` | `src/app/api/admin/lead-intelligence/route.ts` | `sales` | Computes lead engagement & intent scores. |
| `/api/admin/lead-intelligence/export`| `GET` | `src/app/api/admin/lead-intelligence/export/route.ts` | `admin` | Exports scored leads to CSV. |
| `/api/admin/notifications` | `GET` | `src/app/api/admin/notifications/route.ts` | `viewer` | Retrieves unread and recent administrative notifications. |
| `/api/admin/notifications/[id]/read`| `PATCH` | `src/app/api/admin/notifications/[id]/read/route.ts`| `viewer` | Marks single notification as read. |
| `/api/admin/notifications/read-all` | `POST` | `src/app/api/admin/notifications/read-all/route.ts` | `viewer` | Marks all user notifications as read. |
| `/api/admin/system-health` | `GET` | `src/app/api/admin/system-health/route.ts` | `admin` | Performs live diagnostic probes across DB, storage, and mail queue. |
| `/api/admin/reports/export` | `GET` | `src/app/api/admin/reports/export/route.ts` | `admin` | Generates parameterized operational reports in sanitized CSV. |

---

## 5. PostgreSQL Database Architecture & Table Inventory

The Orbion platform database comprises 12 primary application tables, 2 Supabase storage buckets, 1 custom stored procedure, and 6 versioned migrations.

| Table Name | Migration File | RLS Enabled | Force RLS | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | `20261108000001_core_schema.sql` | Yes | Yes | Staff profiles, user roles (`super_admin` down to `viewer`), active flags |
| `contact_leads` | `20261108000001_core_schema.sql` | Yes | Yes | Public contact form submissions, lead tracking, conversion metadata |
| `audit_logs` | `20261108000001_core_schema.sql` | Yes | Yes | Immutable record of security, authentication, and data modifications |
| `site_settings` | `20261108000001_core_schema.sql` | Yes | Yes | Key-value store for global platform configuration and feature flags |
| `demo_requests` | `20261108000003_phase2_core_features.sql` | Yes | Yes | Enterprise demo scheduling, company size, product interest |
| `newsletter_subscribers`| `20261108000003_phase2_core_features.sql` | Yes | Yes | Email subscribers, verification tokens, unsubscribed timestamps |
| `email_outbox` | `20261108000003_phase2_core_features.sql` | Yes | Yes | Resilient email dispatch queue, retry counters, error payloads |
| `lead_notes` | `20261108000004_phase3_rbac_and_admin.sql` | Yes | Yes | Internal sales comments and collaboration notes on leads |
| `blog_categories` | `20261108000005_phase4_cms_and_storage.sql` | Yes | Yes | Hierarchical blog categories, slugs, descriptions |
| `blog_posts` | `20261108000005_phase4_cms_and_storage.sql` | Yes | Yes | Markdown content, SEO metadata, publishing workflow states |
| `products` | `20261108000005_phase4_cms_and_storage.sql` | Yes | Yes | 7 SaaS products catalog, features, COMING SOON status |
| `case_studies` | `20261108000005_phase4_cms_and_storage.sql` | Yes | Yes | Customer transformation narratives, metrics, published states |
| `media_assets` | `20261108000005_phase4_cms_and_storage.sql` | Yes | Yes | Uploaded asset metadata, bucket paths, MIME types, file sizes |
| `analytics_events` | `20261108000006_phase5_business_intelligence.sql` | Yes | Yes | Anonymized first-party telemetry events, paths, device tags |
| `admin_notifications` | `20261108000006_phase5_business_intelligence.sql` | Yes | Yes | In-app alerts triggered by system events or lead conversions |

### 5.1 Storage Buckets
- `media`: Public bucket (max 10MB per object) for images, icons, and diagrams. Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`.
- `documents`: Private bucket (max 25MB per object) for customer briefs, enterprise whitepapers, and attachments. Restricted to authenticated staff.

---

## 6. Service Layer Inventory

The backend business logic is strictly encapsulated in 16 service modules divided between `src/lib/services/` (public ingest) and `src/services/` (administrative & analytics).

```
src/
├── lib/
│   └── services/
│       ├── contact.service.ts          # Public contact form submission & lead creation
│       ├── demo-request.service.ts     # Public demo request validation & intake
│       └── newsletter.service.ts       # Public newsletter subscribe & unsubscribe workflows
└── services/
    ├── admin-audit.service.ts          # Centralized audit logging utility
    ├── admin-dashboard.service.ts      # KPI aggregation for executive dashboard
    ├── admin-leads.service.ts          # Lead status mutations & notes management
    ├── admin-notifications.service.ts  # In-app operational alert engine
    ├── admin-users.service.ts          # User provisioning, invitation, role updates
    ├── analytics.service.ts            # First-party beacon logging & trend aggregation
    ├── business-intelligence.service.ts# High-level pipeline & conversion metrics
    ├── cms-blog.service.ts             # Blog posts CRUD, publishing, categories
    ├── cms-case-studies.service.ts     # Customer success stories lifecycle
    ├── cms-media.service.ts            # Supabase Storage file uploads & deletions
    ├── cms-products.service.ts         # Products catalog service (COMING SOON guard)
    ├── lead-intelligence.service.ts    # Algorithmic scoring (engagement, company size, urgency)
    ├── newsletter-admin.service.ts     # Subscriber management & CSV export service
    ├── reports.service.ts              # Parametric CSV generation with formula escaping
    ├── revalidation.service.ts         # Next.js On-Demand ISR cache invalidation
    └── system-health.service.ts        # Database, storage, and mail outbox diagnostic probes
```

---

## 7. Authentication, RBAC & Security Infrastructure

### 7.1 Role-Based Access Control (RBAC) Hierarchy

The system defines an explicit 6-tier permission model enforced both at the middleware boundary and within database RLS:

| Role Identifier | Description | Inbound Leads | User Mgmt | Content (CMS) | System Health & BI |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `super_admin` | Unrestricted platform authority | Full Access | Full Access | Full Access | Full Access |
| `admin` | Operations, compliance & analytics | Full Access | View Only | Full Access | Full Access |
| `editor` | Marketing & content creators | No Access | No Access | Full Access | View Only |
| `sales` | Commercial development & CRM | Full Access | No Access | View Only | View Only |
| `hr` | Recruitment & team management | No Access | View Only | No Access | No Access |
| `viewer` | Read-only compliance auditor | Read Only | No Access | Read Only | Read Only |

### 7.2 Security Modules & Defense-in-Depth
- **Middleware Guard (`src/middleware.ts`):** Intercepts all `/admin/*` requests, extracts Supabase JWT from cookies, verifies active staff profile, and enforces route-level role requirements.
- **Rate Limiting (`src/lib/security/rate-limit.ts`):** In-memory sliding window rate limiter protecting `/api/contact`, `/api/demo-request`, and `/api/newsletter` against volumetric abuse.
- **Spam Defense (`src/lib/security/spam-protection.ts`):** Multi-layered anti-bot filter utilizing hidden honeypot fields, minimum submission time thresholds, and optional Cloudflare Turnstile token validation.
- **CSV Injection Neutralization (`src/lib/validation/reporting.schema.ts`):** Explicit defense against formula injection (CWE-1236) by prepending `'` to fields beginning with `=`, `+`, `-`, `@`, `\t`, or `\r`.

---

## 8. Environment Configuration Matrix

The application's runtime configuration is centralized and strictly validated via Zod in `src/lib/env.ts`.

| Environment Variable | Required In Production | Scope / Target | Security Classification | Purpose |
| :--- | :---: | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** | Client + Server | Public (`https://...`) | Supabase project API host |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Yes** | Client + Server | Public JWT Key | Supabase client anon key for RLS queries |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server-Only | **CRITICAL SECRET** | Supabase administrative client bypass key |
| `RESEND_API_KEY` | **Yes** | Server-Only | **HIGH SECRET** | Resend email dispatch API key (`re_***`) |
| `RESEND_FROM_EMAIL` | **Yes** | Server-Only | Configuration | Verified sender domain (e.g. `no-reply@...`) |
| `CONTACT_NOTIFICATION_EMAIL`| **Yes** | Server-Only | Configuration | Internal inbox receiving inbound lead alerts |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Client + Server | Public URL | Canonical URL for emails, SEO, and revalidation |
| `CRON_SECRET` | **Yes** | Server-Only | **HIGH SECRET** | Bearer token protecting background job endpoints |
| `CF_TURNSTILE_SECRET_KEY` | Optional | Server-Only | Secret Key | Cloudflare Turnstile bot verification secret |
| `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY` | Optional | Client-Side | Public Site Key | Cloudflare Turnstile client widget key |

*Security Redaction Note:* All sensitive cryptographic keys and bearer secrets are securely loaded via `.env.local` and Vercel project settings; no raw credential values are stored in Git or exposed in documentation.

---

## 9. Inventory Audit Verdict

```
+-------------------------------------------------------------------------------+
| FINAL INVENTORY AUDIT VERDICT: PASS                                           |
| Complete code and architecture verified across all 5 operational phases.     |
| 35 API routes, 40 web pages, 15 database entities, 16 services fully mapped. |
+-------------------------------------------------------------------------------+
```

