# Orbion Technologies — Environment Setup & Supabase Configuration Guide
**Document Version:** 1.0.0  
**Phase:** Phase 1 (Backend Foundation & Database Architecture)  
**Status:** Approved  

---

## 1. Overview

This document guides engineers through setting up the local development environment and linking it with a hosted Supabase PostgreSQL project.

---

## 2. Step 1: Provisioning the Supabase Project

If an official Orbion Technologies Supabase project has not yet been created:

1. **Sign in to Supabase:**  
   Navigate to [https://supabase.com](https://supabase.com) and log in with the authorized Orbion organization account (e.g., GitHub organization `orbiontechnologiesin` or founder email).
2. **Create New Project:**  
   - Click **New Project**.
   - **Organization:** Select or create `Orbion Technologies`.
   - **Name:** `orbion-technologies-production` (or `orbion-technologies-dev` for testing).
   - **Database Password:** Generate a high-entropy password (minimum 20 characters). Store it securely in the company password vault.
   - **Region:** Select the closest region to Indian/global users (e.g., `ap-south-1` Mumbai or `ap-southeast-1` Singapore).
   - **Pricing Plan:** Free tier for early development, Pro tier for production (enables Point-in-Time Recovery and daily automated backups).
3. **Wait for Provisioning:**  
   Supabase will configure the PostgreSQL database, Auth service, and Storage within ~2 minutes.

---

## 3. Step 2: Locating Your API Credentials

In the Supabase Project Dashboard:
1. Navigate to **Project Settings** (gear icon in left sidebar) → **API**.
2. Locate the following three values:
   - **Project URL:**  
     Format: `https://[project-ref].supabase.co`  
     Copy to: `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys — anon / public:**  
     (Or new "publishable" key format)  
     Copy to: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **Project API Keys — service_role / secret:**  
     (Click "Reveal secret key")  
     Copy to: `SUPABASE_SECRET_KEY`

> [!CAUTION]
> The `service_role` / `SUPABASE_SECRET_KEY` has full superuser privileges and bypasses all Row Level Security. Never commit it to GitHub, share it publicly, or prefix it with `NEXT_PUBLIC_`.

---

## 4. Step 3: Local Environment File Configuration

1. In the repository root, duplicate the template file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and populate your credentials:
   ```env
   # Public (Client & Server)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key-here

   # Private (Strictly Server-Only)
   SUPABASE_SECRET_KEY=your-supabase-service-role-secret-key-here

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
3. Verify `.gitignore` contains `.env*` to ensure `.env.local` is never staged for commit.

---

## 5. Step 4: Applying Database Migrations

Orbion Technologies enforces **Migration-as-Code**. All schema modifications are tracked in `supabase/migrations/`.

### 5.1 Remote Migration (Recommended for Hosted Supabase)

1. **Authenticate the Supabase CLI:**
   ```bash
   supabase login
   ```
   *Follow the browser authentication prompt to link your developer account.*

2. **Link Your Local Repository to the Remote Project:**
   ```bash
   supabase link --project-ref your-project-ref
   ```
   *(Your `project-ref` is the 20-character identifier found in your project URL: `https://[project-ref].supabase.co`).*

3. **Deploy Migration Files:**
   ```bash
   supabase db push
   ```
   This sequentially applies:
   - `supabase/migrations/20261108000001_core_schema.sql` (Tables, triggers, constraints, indexes)
   - `supabase/migrations/20261108000002_row_level_security.sql` (RLS policies, PostgreSQL grants)

4. **(Optional) Seed Development Data:**
   ```bash
   supabase db reset
   ```
   *(Only on local Docker or dedicated development instances — NEVER run reset on production).*

---

### 5.2 Manual Migration via Supabase SQL Editor (Alternative)

If CLI access is restricted or unavailable during initial onboarding:
1. Open the Supabase Project Dashboard → **SQL Editor**.
2. Click **New Query**.
3. Paste the contents of `supabase/migrations/20261108000001_core_schema.sql` and click **Run**.
4. Open a second query tab, paste the contents of `supabase/migrations/20261108000002_row_level_security.sql`, and click **Run**.
5. Check **Table Editor** to confirm `contact_leads`, `profiles`, `audit_logs`, and `site_settings` display the **RLS Enabled** badge.

---

## 6. Step 5: Verification & Quality Assurance

Once `.env.local` is configured:

1. **Check TypeScript Compilation:**
   ```bash
   npm run typecheck
   ```
2. **Run Linter:**
   ```bash
   npm run lint
   ```
3. **Verify Production Build:**
   ```bash
   npm run build
   ```
4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to confirm all 18 existing routes function without errors.

---

## 7. Troubleshooting Common Issues

| Error | Root Cause | Solution |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL` | Environment variable empty or malformed | Ensure `.env.local` includes `https://` prefix without trailing slash. |
| `createServerClient must be initialized with cookies` | Legacy Supabase SSR pattern | Our `src/lib/supabase/server.ts` uses modern `getAll` and `setAll` accessors with async `await cookies()`. |
| `Cannot access SUPABASE_SECRET_KEY in browser` | Security check in `src/lib/env.ts` triggered | Never import `getServerEnv()` or `createAdminClient()` in Client Components (`'use client'`). |
| `permission denied for table contact_leads` | RLS active and unauthenticated query made | Expected behavior. Ingestion and admin queries must go through authenticated staff or server admin clients. |

