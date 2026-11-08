# Orbion Technologies — Backend Architecture Specification
**Document Version:** 1.0.0  
**Phase:** Phase 1 (Backend Foundation & Database Architecture)  
**Status:** Approved  
**Author:** Backend Architecture & Engineering Team  

---

## 1. Architectural Philosophy

Orbion Technologies adopts a **Backend-For-Frontend (BFF)** architecture leveraging **Next.js 16 App Router** and **Supabase (Managed PostgreSQL)**. 

The primary architectural principle is:  
**The browser is an untrusted runtime.** 

No client application running on an external device or browser may directly perform privileged database operations, alter critical system parameters, or bypass validation rules. All mutations and sensitive queries must traverse an authenticated, server-governed boundary.

```text
┌────────────────────────────────────────────────────────┐
│               Website Frontend (Browser)               │
│      React 19 Client Components ('use client')         │
└───────────────────────────┬────────────────────────────┘
                            │ Public Key / Cookies Only
                            ▼
┌────────────────────────────────────────────────────────┐
│           Next.js 16 Server Layer (Server)             │
│   • Server Components (RSC)                            │
│   • API Route Handlers (e.g., /api/contact)            │
│   • Server Actions (where workflows benefit)           │
│   • Runtime Zod Validation (src/lib/env.ts, schemas)   │
└─────────────┬────────────────────────────┬─────────────┘
              │ Caller Credentials         │ Privileged Service Key
              ▼ (RLS Enforced)             ▼ (server-only)
┌───────────────────────────┐ ┌──────────────────────────┐
│   Supabase Server Client  │ │  Supabase Admin Client   │
│     (@supabase/ssr)       │ │ (@supabase/supabase-js)  │
└─────────────┬─────────────┘ └────────────┬─────────────┘
              │                            │
              └─────────────┬──────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│             Supabase Hosted PostgreSQL                 │
│   • Strict Row Level Security (RLS) on all tables      │
│   • Least-Privilege PostgreSQL Role Grants             │
│   • Foreign Key Integrity & Automated Audit Logging    │
│   • Deterministic Schema Migrations                    │
└────────────────────────────────────────────────────────┘
```

---

## 2. Layered Responsibilities

### 2.1 Layer 1: Client Layer (Browser)
- Built with React 19 Client Components (`'use client'`).
- Handles UI state, form interactions, validation feedback, and animations.
- When querying Supabase directly, it uses `src/lib/supabase/client.ts`.
- **Security Boundary:** Uses exclusively `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Any attempt to access tables without explicit RLS policies for `anon` will fail automatically.

### 2.2 Layer 2: Next.js Server Layer (Application Gateway)
- **Server Components (RSC):** Fetch read-only data server-side during rendering, passing clean props to client components without exposing APIs.
- **Route Handlers (`src/app/api/...`):** REST-compliant endpoints for external or form submissions (e.g., contact form ingestion). Enforces rate limiting, telemetry sanitization, and structured responses.
- **Server Actions:** Used when direct form mutations simplify component design.
- **Zod Validation:** All incoming payloads and environment variables are parsed through strict schemas before hitting database or downstream services.

### 2.3 Layer 3: Database Client Layer (`src/lib/supabase/`)
The database access layer is decomposed into three strictly separated clients:

1. **Browser Client (`src/lib/supabase/client.ts`):**
   - Instantiated via `createBrowserClient` from `@supabase/ssr`.
   - Reusable singleton pattern across client components.
   - Strictly restricted to public credentials.

2. **Server Client (`src/lib/supabase/server.ts`):**
   - Instantiated via `createServerClient` from `@supabase/ssr`.
   - Interacts with Next.js 15+ asynchronous `cookies()` store.
   - Evaluates queries under the security context of the requesting user.
   - Enforces all active Row Level Security (RLS) rules.

3. **Admin Client (`src/lib/supabase/admin.ts`):**
   - Instantiated via `createClient` from `@supabase/supabase-js`.
   - Protected by Next.js `import "server-only"`; builds fail if imported in client components.
   - Utilizes `SUPABASE_SECRET_KEY` (service role).
   - Disables session persistence and cookie storage.
   - Bypasses RLS; strictly reserved for background worker tasks, administrative seed scripts, and secure server-controlled intake where public insert is blocked.

### 2.4 Layer 4: Storage & Persistence (PostgreSQL)
- Hosted Supabase PostgreSQL instance.
- Schema defined purely via version-controlled SQL migrations in `supabase/migrations/`.
- Strict check constraints on field lengths and regex patterns.
- Automated `handle_updated_at` triggers for reliable timestamp tracking.

---

## 3. Client vs. Server Isolation & Leakage Prevention

To guarantee zero credential leakage:
1. **Naming Discipline:** Only variables beginning with `NEXT_PUBLIC_` are available to client code. `SUPABASE_SECRET_KEY` is completely inaccessible to browser runtimes.
2. **Compile-Time Safeguards:** `admin.ts` imports `"server-only"`. Any inadvertent import of the administrative module inside a `'use client'` component causes Next.js Webpack/Turbopack to immediately halt compilation.
3. **Runtime Guards:** `getServerEnv()` and `createAdminClient()` explicitly assert `typeof window === 'undefined'`.
4. **Credential Masking:** `env.ts` validation errors report missing key names and instructions, but never dump existing values or partial strings to logs.

---

## 4. Error Handling & Operational Logging

1. **Client Responses:** API endpoints must return generic, user-friendly error messages (e.g., *"An unexpected error occurred while processing your enquiry. Please try again or email enquiry@orbiontechnologies.in"*).
2. **Internal Telemetry:** Server logs capture error stacks, execution context, and sanitised metadata, strictly omitting passwords, access tokens, and sensitive visitor message content.
3. **Audit Ledger:** Sensitive internal operations (status changes, administrative updates) are persisted directly to the `public.audit_logs` table for verifiable traceability.

---

## 5. Phase-by-Phase Roadmap

- **Phase 1 (Current):** Backend Foundation, Database Architecture, Migration Framework, RLS, Client Suite, Documentation.
- **Phase 2 (Upcoming):** Server-side Contact Intake API, Rate Limiting, Email Dispatcher (Resend/SMTP), Autoresponder.
- **Phase 3 (Future):** Administrator Authentication (Supabase Auth), Protected Admin Dashboard, Lead Management, Audit Log Viewer.
- **Phase 4 (Future):** Supabase Storage Integration (Media Assets, Brand Guidelines, Whitepapers), Dynamic CMS for Products & Services.

