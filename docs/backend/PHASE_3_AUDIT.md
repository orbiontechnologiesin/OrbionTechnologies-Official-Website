# ORBION TECHNOLOGIES — BACKEND ARCHITECTURE & SECURITY AUDIT
## PHASE 3: ADMIN AUTHENTICATION, ROLE-BASED ACCESS CONTROL & DASHBOARD

**Audit Date:** November 8, 2026  
**Auditor:** Senior Full-Stack Architect & Application Security Engineer  
**Target Environment:** Next.js 15+ (App Router), React 19, TypeScript, Supabase PostgreSQL, Vercel / Render  

---

## 1. Executive Summary

Phase 1 (Database Foundation & RLS) and Phase 2 (Core Contact APIs, Demo Requests, Newsletter Subscriptions & Email Outbox) have been successfully implemented and verified against the live Supabase production project (`https://mkpwfgrkkhxdjkoiowom.supabase.co`).

All 7 required database tables (`profiles`, `contact_leads`, `audit_logs`, `site_settings`, `demo_requests`, `newsletter_subscribers`, and `email_outbox`) exist with Row Level Security (RLS) forced, automated `updated_at` triggers, and foreign key integrity.

Phase 3 introduces the enterprise **Administrator Authentication**, **Role-Based Access Control (RBAC)**, **Initial Super Admin Provisioning**, **Protected Admin Area** (`/admin`), **Lead Management**, and **Audit Logging** system. This audit inspects all relevant artifacts and establishes the safe implementation strategy.

---

## 2. Comprehensive System Inventory & Audit Findings

### 2.1 Existing Authentication Implementation
* **Browser Client (`src/lib/supabase/client.ts`)**: Built on `@supabase/ssr` `createBrowserClient`, configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
* **Server Client (`src/lib/supabase/server.ts`)**: Built on `@supabase/ssr` `createServerClient`, properly handling Next.js 15+ asynchronous `cookies()` API via `getAll()` and `setAll()` methods.
* **Admin Client (`src/lib/supabase/admin.ts`)**: Privileged server-only Supabase client leveraging `SUPABASE_SECRET_KEY` with `import "server-only"` safeguard and session persistence disabled.
* **Pricing Auth Stub (`src/lib/auth.ts`)**: A client/mock session reader originally developed for the preview pricing gate. Needs to be replaced with full-fledged, cryptographic Supabase Auth session validation for the administrative suite.

### 2.2 Database Schema Audit
* **`profiles` table**:
  - Primary Key: `id UUID REFERENCES auth.users(id) ON DELETE CASCADE`.
  - Fields: `full_name`, `email`, `role`, `avatar_url`, `is_active`, `created_at`, `updated_at`.
  - *Finding*: Role check constraint was initially `CHECK (role IN ('super_admin', 'admin', 'operator', 'viewer'))`. Phase 3 specifies six explicit roles: `super_admin`, `admin`, `editor`, `sales`, `hr`, `viewer`.
  - *Action*: Create migration `20261108000004_phase3_rbac_and_admin.sql` to expand the `profiles.role` enum constraint, add helper functions, and create an atomic lead update/audit function.
* **`contact_leads` table**:
  - Primary Key: `id UUID DEFAULT gen_random_uuid()`.
  - Fields: `reference`, `full_name`, `email`, `phone`, `company`, `website`, `ip_hash`, `subject`, `message`, `source`, `status`, `assigned_to`, `created_at`, `updated_at`.
  - Status check: `CHECK (status IN ('new', 'contacted', 'qualified', 'closed'))`.
  - Foreign key: `assigned_to REFERENCES public.profiles(id)`.
* **`audit_logs` table**:
  - Primary Key: `id UUID DEFAULT gen_random_uuid()`.
  - Fields: `actor_id UUID REFERENCES public.profiles(id)`, `action TEXT`, `entity_type TEXT`, `entity_id UUID`, `metadata JSONB`, `created_at TIMESTAMPTZ`.
  - Read-only table for staff; insertions server-controlled.
* **`demo_requests` & `newsletter_subscribers` tables**:
  - Both tables are live with references, status tracking, and foreign key relations.

### 2.3 RLS Policies & Grants Audit
* Current RLS state: RLS is enabled and forced on all tables.
* `contact_leads`:
  - `Staff can view contact leads` (`SELECT` to `authenticated` using `is_active_staff()`).
  - `Staff can update contact lead status or assignment` (`UPDATE` to `authenticated`).
  - `Super admins can delete contact leads` (`DELETE` to `authenticated`).
* *Gap identified*: Currently, `is_active_staff()` allows any profile in `profiles` to view all leads. In Phase 3 RBAC:
  - `super_admin`, `admin`, and `sales` roles must have lead access.
  - `editor` and `hr` roles must not have access to customer sales leads unless explicitly granted.
  - `viewer` has read-only access.
  - *Action*: Update RLS policies in Phase 3 migration to strictly check role-based permissions via security definer helper functions (`public.has_permission(required_perm)` or `public.can_manage_leads()`).

### 2.4 Existing Middleware & Session Interception
* Currently no `middleware.ts` exists in the project.
* In Next.js 15+ App Router, session refresh must occur in Next.js middleware using `@supabase/ssr` to ensure tokens are kept fresh across requests and stale sessions are rejected before protected routes render.
* *Action*: Create `src/middleware.ts` with route matchers for `/admin/:path*`, enforcing session refresh and redirecting unauthenticated traffic to `/admin/login?next=...` with safe open-redirect protections.

### 2.5 Email Infrastructure Integration
* Phase 2 established Resend transactional emails with an asynchronous `email_outbox` retry queue.
* In Phase 3, password reset notifications and administrator invitation links leverage Supabase Auth's native transactional email delivery and templating, backed by the verified sender configuration.

---

## 3. RBAC Architecture Specification

| Role | Enquiries / Leads | User Management | Audit Logs | Settings | Content / CMS (Future) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Super Admin** | Full (CRUD) | Full (Invite, Role, Deactivate) | Full (Read) | Full (Read/Write) | Full |
| **Admin** | Full (View, Update, Assign) | View only | View only | View only | Full |
| **Editor** | Denied | Denied | Denied | Denied | Full |
| **Sales** | View, Update Status, Assign | Denied | Denied | Denied | Denied |
| **HR** | Denied (Reserved for recruitment) | Denied | Denied | Denied | Denied |
| **Viewer** | Read-Only (Permitted Leads) | Denied | Denied | Denied | Read-Only |

---

## 4. Phase 3 Architecture & Implementation Roadmap

```
                    ┌────────────────────────────┐
                    │      Browser / Client      │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │  src/middleware.ts         │
                    │  (Token Refresh & Guard)   │
                    └─────────────┬──────────────┘
                                  │
           ┌──────────────────────┴──────────────────────┐
           ▼                                             ▼
┌────────────────────────────┐              ┌────────────────────────────┐
│ /admin/login               │              │ /admin/dashboard           │
│ /admin/forgot-password     │              │ /admin/leads               │
│ /admin/reset-password      │              │ /admin/users               │
└──────────┬─────────────────┘              │ /admin/audit-logs          │
           │                                └─────────────┬──────────────┘
           ▼                                              ▼
┌────────────────────────────┐              ┌────────────────────────────┐
│ Supabase Auth Service      │              │ src/lib/auth/permissions.ts│
│ (Secure HTTP-Only Cookies) │              │ (Server-Side RBAC Guard)   │
└────────────────────────────┘              └─────────────┬──────────────┘
                                                          ▼
                                            ┌────────────────────────────┐
                                            │ PostgreSQL RLS & Schema    │
                                            │ - profiles                 │
                                            │ - contact_leads            │
                                            │ - audit_logs               │
                                            └────────────────────────────┘
```

1. **Migration `20261108000004_phase3_rbac_and_admin.sql`**:
   - Update `profiles.role` check constraint to support `('super_admin', 'admin', 'editor', 'sales', 'hr', 'viewer')`.
   - Add PostgreSQL helper functions: `public.current_user_role()`, `public.can_manage_leads()`, `public.can_manage_users()`.
   - Update RLS policies on `profiles`, `contact_leads`, `demo_requests`, and `audit_logs`.
   - Add atomic lead status update + audit logging stored procedure: `public.update_lead_status_with_audit()`.

2. **Server Auth & RBAC Utilities (`src/lib/auth/`)**:
   - `src/lib/auth/session.ts`: `getAdminSession()` verifying active account, returning profile + role.
   - `src/lib/auth/permissions.ts`: `hasPermission()`, `requirePermission()`, permission matrix.
   - `src/lib/auth/audit.ts`: Standardized server audit log recorder.

3. **Next.js Middleware (`src/middleware.ts`)**:
   - Protects `/admin/:path*` (except `/admin/login`, `/admin/forgot-password`, `/admin/reset-password`).
   - Uses `@supabase/ssr` `createServerClient` to refresh tokens on the fly.
   - Safe redirect URL validation preventing open-redirect attacks.

4. **Initial Super Admin Provisioning Script (`scripts/provision-super-admin.mjs`)**:
   - CLI script taking email, password, and full name.
   - Interacts with Supabase Auth admin API (`auth.admin.createUser`) with confirmed email.
   - Upserts matching record in `public.profiles` with `role: 'super_admin'`, `is_active: true`.
   - Emits audit log entry for provisioning.

5. **Admin UI & Dashboard**:
   - Shared Admin Layout (`/admin/layout.tsx`) with collapsible sidebar, authenticated header, role badge, and sign-out.
   - Login page (`/admin/login/page.tsx`) & Password Reset (`/admin/forgot-password/page.tsx`, `/admin/reset-password/page.tsx`).
   - Dashboard Overview (`/admin/dashboard/page.tsx`): Real statistics from DB, enquiry status breakdown, recent activity.
   - Lead Management (`/admin/leads/page.tsx`, `/admin/leads/[id]/page.tsx`): Server-side search, filtering by status, pagination, status change with notes and atomic audit trail.
   - Administrator Management (`/admin/users/page.tsx`): Super Admin restricted, list admins, invite admin with role, toggle active/deactivated.
   - Audit Logs (`/admin/audit-logs/page.tsx`): Immutable audit inspection for Super Admin & Admin.

6. **Automated Testing Suite (`scripts/test-phase3.mjs`)**:
   - Verifies Auth login/logout.
   - Tests RBAC authorization rules (Super Admin vs Sales vs Viewer).
   - Tests Lead management updates and audit log emission.
   - Tests privilege escalation denial.

