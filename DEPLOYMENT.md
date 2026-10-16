# Orbion Technologies — Multi-Platform Production Deployment Guide

This guide details the complete deployment architecture, environment configurations, and authentication setup for Orbion Technologies across **Vercel** (Primary), **Render** (Alternative), and **Netlify** (Alternative).

---

## 1. Supabase Backend Setup (`OrbionTechnologies.com`)

The application uses **Supabase** for PostgreSQL data persistence, user profiles, authentication sessions, and contact inquiries.

### Step 1: Create or Connect Supabase Project
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project** and configure:
   - **Name**: `OrbionTechnologies.com`
   - **Database Password**: Generate and store securely in a password manager.
   - **Region**: Choose the region closest to your primary user base or hosting servers (e.g. `US East (North Virginia)` or `South Asia (Mumbai)`).
   - **Pricing Plan**: Free or Pro.
3. Wait for database provisioning to finish.

### Step 2: Apply Database Schema Migration
1. In your Supabase Dashboard, open **SQL Editor**.
2. Click **New query** and paste the contents of [`supabase/migrations/20261017000000_init_orbion_supabase.sql`](supabase/migrations/20261017000000_init_orbion_supabase.sql).
3. Click **Run**.
4. Confirm in **Table Editor** that two tables are created with Row Level Security (RLS) active:
   - `public.profiles` (linked to `auth.users` with automated profile trigger `handle_new_user()`)
   - `public.inquiries` (contact inquiry intake with constraints and RLS policies)

### Step 3: Retrieve Production API Keys
Navigate to **Project Settings > API**:
- **Project URL**: `https://hmhcmwvbkgdfkfzcpfgo.supabase.co`
- **Project API Keys > anon / public**: Your public publishable key.

---

## 2. Authentication & OAuth Configuration

### A. Allowed Redirect URLs
In **Supabase Dashboard > Authentication > URL Configuration**:
- **Site URL**: `https://orbion.in`
- **Redirect URLs (Allow list)**:
  ```
  https://orbion.in/**
  https://orbion.in/auth/callback
  https://orbion-in.vercel.app/**
  https://orbion-in.vercel.app/auth/callback
  https://*.vercel.app/**
  https://*.vercel.app/auth/callback
  https://orbion-website.onrender.com/**
  https://orbion-website.onrender.com/auth/callback
  https://orbion.netlify.app/**
  https://orbion.netlify.app/auth/callback
  http://localhost:3000/**
  http://localhost:3000/auth/callback
  ```

### B. Mandatory Email Verification Setup
In **Supabase Dashboard > Authentication > Providers > Email**:
- Check **Enable Email provider**.
- Check **Confirm email** (ensures unverified users cannot authenticate).
- Check **Secure email change**.

### C. Google OAuth Setup
1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Create an OAuth 2.0 Client ID (Web application).
   - Set **Authorized redirect URIs** to:
     `https://hmhcmwvbkgdfkfzcpfgo.supabase.co/auth/v1/callback`
2. In **Supabase Dashboard > Authentication > Providers > Google**:
   - Enable Google provider.
   - Enter **Client ID** and **Client Secret**.

### D. GitHub OAuth Setup
1. In [GitHub Developer Settings](https://github.com/settings/developers):
   - Register a new OAuth Application.
   - Set **Authorization callback URL** to:
     `https://hmhcmwvbkgdfkfzcpfgo.supabase.co/auth/v1/callback`
2. In **Supabase Dashboard > Authentication > Providers > GitHub**:
   - Enable GitHub provider.
   - Enter **Client ID** and **Client Secret**.

---

## 3. Platform 1: Vercel Deployment (Primary Target)

1. Connect repository `orbiontechnologiesin/OrbionTechnologies-Official-Website` in Vercel.
2. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. In **Project Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://orbion.in`
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://hmhcmwvbkgdfkfzcpfgo.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `<your-supabase-publishable-key>`
4. Deploy the project.
5. In **Domains**, configure `orbion.in` and `www.orbion.in`.

---

## 4. Platform 2: Render Deployment (Alternative Target)

1. In Render Dashboard, click **New > Web Service** (or use the Blueprint from `render.yaml`).
2. Connect this repository and set:
   - **Runtime**: `Node` (v20+)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: Starter ($7/month recommended for zero cold-starts)
3. In **Environment**, configure:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_SITE_URL`: `https://<your-app>.onrender.com`
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://hmhcmwvbkgdfkfzcpfgo.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `<your-supabase-publishable-key>`
4. Deploy. Next.js binds to `0.0.0.0:$PORT` automatically.

---

## 5. Platform 3: Netlify Deployment (Alternative Target)

1. In Netlify Dashboard, click **Add new site > Import an existing project**.
2. Select GitHub and choose this repository.
3. Netlify automatically reads `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs`
4. In **Site configuration > Environment variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://<your-site>.netlify.app`
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://hmhcmwvbkgdfkfzcpfgo.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `<your-supabase-publishable-key>`
5. Deploy the site.

---

## 6. Troubleshooting Guide

### `DNS_PROBE_FINISHED_NXDOMAIN` on Google Sign-In
* **Root Cause**: The client fell back to `placeholder.supabase.co` because `NEXT_PUBLIC_SUPABASE_URL` was unset.
* **Resolution**: Define `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` for local development or in your hosting provider's dashboard for production. The codebase now displays an active diagnostic banner and prevents broken redirects.

### Session Desynchronization in Middleware
* The Supabase server client synchronizes cookies via `getAll()` and `setAll()`. Ensure your production domain matches `NEXT_PUBLIC_SITE_URL` so cookie domain scopes remain valid.
