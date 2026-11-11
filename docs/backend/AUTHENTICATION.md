# ORBION TECHNOLOGIES — ADMINISTRATOR AUTHENTICATION SPECIFICATION

This document details the administrator authentication architecture, session management, provisioning workflows, and password recovery infrastructure for **Orbion Technologies** (`https://orbiontechnologies.in`).

---

## 1. Authentication Architecture Overview

Orbion Technologies utilizes **Supabase Auth** combined with `@supabase/ssr` to deliver enterprise-grade, cryptographically verified session management within Next.js 15+ App Router.

### Architectural Principles
1. **Zero Public Registration**: There is no public administrator signup endpoint. Visitor accounts cannot access or create administration identities.
2. **Cryptographic Validation**: Server components and route handlers verify identities using `supabase.auth.getUser()`, which validates the cryptographic JWT against the Supabase Auth server, rather than relying on unverified local cookies.
3. **Session Transport**: Authentication tokens are transmitted in secure, SameSite HTTP-only cookies managed via `@supabase/ssr`. Tokens are never placed in browser `localStorage` or `sessionStorage`.
4. **Active State Verification**: Even with a valid cryptographic JWT, the administrator's profile record in `public.profiles` must have `is_active = true`. Deactivated accounts are immediately rejected and their sessions revoked.

---

## 2. Authentication Routes & User Flows

| Route | Access Level | Description |
| :--- | :--- | :--- |
| `/admin/login` | Public (Unauthenticated) | Administrator login form with work email and password. |
| `/admin/forgot-password` | Public (Unauthenticated) | Password recovery request form with enumeration protection. |
| `/admin/reset-password` | Token-Gated | Client-side password update form when accessed via password reset email. |
| `/admin/unauthorized` | Authenticated Staff | 403 Forbidden screen when staff lacks specific RBAC capability. |
| `/api/admin/auth/login` | Public POST | Route Handler verifying credentials, checking account activation, setting cookies, and writing `admin_login_success` audit logs. |
| `/api/admin/auth/logout` | Authenticated POST | Route Handler invalidating session on Supabase Auth and purging cookies. |
| `/api/admin/auth/forgot-password` | Public POST | Dispatches password reset email with secure redirect link to `/admin/reset-password`. |

---

## 3. Initial Super Admin Provisioning

The first Super Administrator account must be provisioned through a controlled, server-side process using the private `SUPABASE_SECRET_KEY`.

### Security Constraints
- No hardcoded passwords in repository files or documentation.
- No public bootstrap or self-promotion HTTP endpoints.
- Super Admin privilege is enforced in PostgreSQL via `profiles.role = 'super_admin'`.

### CLI Provisioning Command
To provision or promote the Super Administrator account:

```bash
# Run the interactive provisioning tool
node scripts/provision-super-admin.mjs

# Or pass parameters directly via CLI:
node scripts/provision-super-admin.mjs \
  --email "admin@orbiontechnologies.in" \
  --password "YourComplexPassword123!" \
  --name "Orbion Lead Administrator"
```

### Provisioning Steps Performed by Script:
1. Validates email format and password complexity (minimum 8 characters).
2. Connects using `SUPABASE_SECRET_KEY` (never accessible to browser runtimes).
3. Verifies if the identity exists in Supabase Auth (`auth.users`). If existing, updates password; if new, creates the confirmed user.
4. Upserts the `public.profiles` record with `role: 'super_admin'` and `is_active: true`.
5. Appends an immutable audit entry to `public.audit_logs` with action `provision_super_admin`.

---

## 4. Session Management & Edge Middleware

### Middleware Session Interception (`src/middleware.ts`)
Next.js middleware intercepts all requests matching `/admin/:path*`:
1. Refreshes expired Supabase session tokens on the fly using `@supabase/ssr` `createServerClient`.
2. Evaluates `user` state:
   - If unauthenticated and accessing a protected admin page, redirects to `/admin/login?next=${encodedPath}`.
   - If authenticated and visiting `/admin/login` or `/admin/forgot-password`, automatically redirects to `/admin/dashboard`.
3. Protects against Open Redirect vulnerabilities:
   - `sanitizeRedirectUrl()` strictly enforces that `?next=` parameters start with `/admin` and rejects external URLs (`https://`, `//evil.com`).

---

## 5. Security Safeguards

1. **Anti-Enumeration Responses**:
   - `POST /api/admin/auth/login` returns a generic `"Invalid email address or password"` error regardless of whether the email or password was wrong.
   - `POST /api/admin/auth/forgot-password` returns `"If an authorized administrator account exists for that email, a secure password reset link has been dispatched."` for all input to defeat username harvest attempts.
2. **Deactivation Defense**:
   - When an administrator is deactivated (`is_active: false`), any active sessions or new login attempts are rejected with HTTP 403.
3. **Self-Modification Prevention**:
   - Administrators cannot deactivate their own accounts or alter their own roles.

