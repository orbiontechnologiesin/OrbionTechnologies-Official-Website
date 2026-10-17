<p align="center">
  <a href="https://orbion.in">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/brand/svg/orbion-logo-horizontal.svg">
      <source media="(prefers-color-scheme: light)" srcset="public/brand/svg/orbion-logo-technologies-purple.svg">
      <img src="public/brand/svg/orbion-logo-horizontal.svg" alt="Orbion Technologies Logo" height="44">
    </picture>
  </a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/brand/png/orbion-banner.png">
    <source media="(prefers-color-scheme: light)" srcset="public/brand/png/orbion-banner.png">
    <img src="public/brand/png/orbion-banner.png" alt="Orbion Technologies — AI Operating System for Modern Businesses" width="100%">
  </picture>
</p>

<h3 align="center">The Artificial Intelligence Operating System for Modern Businesses</h3>

<p align="center">
  <em>Autonomous Agentic Workflows • Real-Time Systems Orchestration • Deep-Tech Reliability</em>
</p>

<p align="center">
  <a href="https://orbion-in.vercel.app/"><img src="public/brand/svg/orbion-symbol.svg" alt="Orbion Technologies" height="28"></a>
  <a href="https://orbion-in.vercel.app/"><img src="https://img.shields.io/badge/Production-orbion.in-5B4FFF?style=for-the-badge" alt="Live Site"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Framework-Next.js%2015-050508?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript%205.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.8"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://supabase.com"><img src="https://img.shields.io/badge/Backend-Supabase%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"></a>
  <a href="https://supabase.com/auth"><img src="https://img.shields.io/badge/Auth-Supabase%20Auth%20SSR-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Auth"></a>
</p>

<p align="center">
  <a href="https://orbion.in">🌐 <b>Live Platform</b></a> &nbsp;•&nbsp;
  <a href="#1-project-philosophy--design-direction">📐 <b>Design System</b></a> &nbsp;•&nbsp;
  <a href="#3-authentication-architecture">🔐 <b>Authentication</b></a> &nbsp;•&nbsp;
  <a href="#4-local-development--scripts">⚡ <b>Quickstart</b></a> &nbsp;•&nbsp;
  <a href="#5-deployment-guide">🚀 <b>Deployment</b></a> &nbsp;•&nbsp;
  <a href="#7-brand-identity--assets">🎨 <b>Brand Assets</b></a>
</p>

---

## 1. Project Philosophy & Design Direction
Orbion Technologies is an early-stage deep-tech startup building an **AI Operating System** designed to help businesses automate and operate their everyday workflows through autonomous, intelligent agentic systems.

### Core Design Rules
* **No Generic AI Tropes**: Avoided robot illustrations, AI brain graphics, neon glows, particle fields, floating glass cards, and fake statistics.
* **Black & White Dominance**: High-contrast architectural minimalism inspired by Apple, Tesla, Stripe, Linear, Vercel, and Anthropic.
* **Sovereign Accent**: Single focused brand accent (`#5B4FFF` Electric Indigo with subtle `#00E0D6` cyan indicators) restricted to < 7% of surface area.
* **Typographic Hierarchy**: `Geist Sans` for display and editorial hierarchy; `Geist Mono` for telemetry, status badges, and technical specs.

---

## 2. Technology Stack
* **Framework**: [Next.js](https://nextjs.org/) 15 (App Router, Server Components, Route Handlers, Middleware)
* **Frontend**: [React](https://react.dev/) 19 & [TypeScript](https://www.typescriptlang.org/) 5.8
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4 + CSS Variables + PostCSS
* **Backend & Database**: [Supabase](https://supabase.com/) Cloud PostgreSQL with Row Level Security (RLS)
* **Authentication**: [Supabase Auth SSR](https://supabase.com/docs/guides/auth/server-side-rendering) (`@supabase/ssr` & `@supabase/supabase-js`)
* **Icons & UI**: [Lucide React](https://lucide.dev/) + Custom SVG brand marks
* **Runtime**: Node.js 20+

---

## 3. Authentication & Database Architecture

The Orbion Technologies platform is integrated with **Supabase** for enterprise data and session management:

```
Orbion Technologies Next.js (App Router)
       ↓
Supabase SSR Middleware / Session Sync (src/middleware.ts)
       ↓
Supabase Auth Service (PKCE OAuth & Email Verification)
       ↓
PostgreSQL Cloud Database (Row Level Security Active)
   ├── public.profiles (Auth User Metadata & Roles)
   └── public.inquiries (Intake & Transmission Telemetry)
```

### Key Security & Authentication Features
* **Mandatory Email Verification**: New email/password registrations must complete cryptographic email verification before accessing protected system nodes.
* **Multi-Provider Authentication**: Email/Password, Email OTP/Magic Link, Google OAuth, and GitHub OAuth.
* **Protected Routes**: Server-side dashboard protection (`/dashboard`) that validates sessions before rendering and redirects unauthenticated visitors with sanitized callbacks.
* **Row Level Security (RLS)**: Fine-grained PostgreSQL RLS policies enforcing strict isolation between user profiles and restricting inquiry submissions to authorized workflows.
* **Zero Client Leakage**: Service role keys and secrets remain strictly server-side. Browser bundles only receive public publishable keys.

---

## 4. Local Development & Scripts

### Prerequisites
* Node.js 20 or higher
* npm 10 or higher

### Quickstart Setup
```bash
# 1. Clone repository
git clone https://github.com/orbiontechnologiesin/OrbionTechnologies-Official-Website.git
cd OrbionTechnologies-Official-Website

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Development Commands
```bash
# Start development server
npm run dev

# Validate TypeScript types
npm run typecheck

# Run ESLint validation
npm run lint

# Compile production build
npm run build

# Start production server (respects $PORT)
npm run start
```

---

## 5. Deployment Guide

Orbion Technologies is built with **one unified codebase** ready to deploy across major cloud server platforms.

### A. Vercel (Recommended)
1. Import repository `orbiontechnologiesin/OrbionTechnologies-Official-Website` in Vercel.
2. Vercel automatically detects Next.js 15:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Configure Environment Variables in Project Settings:
   - `NEXT_PUBLIC_SITE_URL`: `https://orbion.in`
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL (`https://<project-ref>.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Publishable / Anon API Key
4. Add Custom Domain `orbion.in` under Domains.

---

## 6. Environment Variables

Reference template from `.env.example`:

| Variable | Description | Local Default | Production Requirement |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site base URL | `https://orbion.in` | Required for SEO & sitemaps |
| `PORT` | Local and production port | `3000` | Injected by hosting provider |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL | `https://your-project-ref.supabase.co` | Required for database & auth |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase public/anon API key | Safe public key | Required for client and server auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role secret (Server-only) | Optional | Kept strictly server-side |

> [!CAUTION]
> Never commit `.env` or `.env.local` to Git. The `.gitignore` file enforces that all `.env` files are strictly ignored.

---

## 7. Brand Identity & Visual Assets

All official vectors, logos, and high-resolution assets are organized under [`public/brand/`](public/brand/):

| Asset | Format | File Path | Usage & Description |
| :--- | :--- | :--- | :--- |
| **Repository Banner** | PNG (2400×920) | [`public/brand/png/orbion-banner.png`](public/brand/png/orbion-banner.png) | High-DPI banner with telemetry & orbital geometry |
| **Vector Banner** | SVG | [`public/brand/svg/orbion-banner.svg`](public/brand/svg/orbion-banner.svg) | Scalable architectural vector banner |
| **Horizontal Logo** | SVG | [`public/brand/svg/orbion-logo-horizontal.svg`](public/brand/svg/orbion-logo-horizontal.svg) | Signature Electric Indigo mark & typography |
| **Stacked Logo** | SVG | [`public/brand/svg/orbion-logo-stacked.svg`](public/brand/svg/orbion-logo-stacked.svg) | Centered vertical lockup for square profiles |
| **Orbital Symbol** | SVG | [`public/brand/svg/orbion-symbol.svg`](public/brand/svg/orbion-symbol.svg) | Sovereign icon (`#5B4FFF` ring with `#00E0D6` node) |
| **Dark Lockup** | PNG | [`public/brand/png/orbion-logo-dark.png`](public/brand/png/orbion-logo-dark.png) | High-contrast white typography on pitch black |
| **Mono White** | PNG | [`public/brand/png/orbion-logo-mono-white.png`](public/brand/png/orbion-logo-mono-white.png) | Monochrome white glyphs for dark overlays |
| **Transparent Logo** | PNG | [`public/brand/png/orbion-logo-transparent.png`](public/brand/png/orbion-logo-transparent.png) | 3600×887 transparent PNG render |
| **App Icons & Favicons**| PNG / SVG | [`public/brand/favicons/`](public/brand/favicons/) | Multi-scale favicons from 16px to 512px |

### Sovereign Brand Palette
* **Electric Indigo** (`#5B4FFF`): Primary focal point & active state trigger (< 7% surface area).
* **Pitch Void** (`#000000` / `#050505`): High-contrast architectural base canvas.
* **Cyan Telemetry** (`#00E0D6`): Real-time status indicators and satellite telemetry dot.
* **Monochrome Scale**: `#FFFFFF` (Pure Headlines), `#EDEDED` (Primary Text), `#A1A1AA` (Secondary), `#1C1C1E` (Hairline Border).
