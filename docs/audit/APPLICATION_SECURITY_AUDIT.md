# ORBION TECHNOLOGIES — APPLICATION SECURITY AUDIT
**Audit Topic:** Complete Security Architecture, Vulnerability Assessment & Threat Model  
**Audit Date:** November 9, 2026  
**Auditor:** Independent Senior Engineering Audit Team (Lead: Application Security Engineer)  
**Scope:** Authentication, Authorization, RBAC, Data Protection, OWASP Top 10, CWE Mapping, and Secrets Management  
**Security Rating:** PASS WITH CONDITIONS (2 P2-Medium Findings, 0 Critical / P0, 0 High / P1)  

---

## 1. Executive Summary & Threat Profile

The Orbion Technologies digital platform handles customer leads, prospective enterprise demo requests, newsletter subscriptions, administrative communications, team identity, and digital brand collateral. The system operates in a threat environment exposed to automated scraping, credential stuffing, injection attacks, cross-tenant data leakage, and Denial-of-Service attempts.

Our exhaustive security evaluation encompassed:
- Source code vulnerability analysis.
- Database policy inspection (PostgreSQL Row Level Security).
- Edge session verification and cookie security posture.
- Anti-automation and spam mitigation mechanisms.
- Software dependency supply chain analysis (`npm audit`).

### Vulnerability Summary Table

| Severity Level | Priority | Open Findings | Description / Status |
| :--- | :---: | :---: | :--- |
| **Critical** | P0 | 0 | No remote code execution, SQLi, or unauthorized full-database bypass found. |
| **High** | P1 | 0 | No authentication bypass or hardcoded production secrets in codebase. |
| **Medium** | P2 | 2 | PostgreSQL `search_path` mutable; Outbox worker conditional auth. |
| **Low** | P3 | 1 | Development dependency advisory (`minimatch` in dev linter). |
| **Informational** | P4 | 2 | Strict Turnstile mandatory enforcement; cookie domain scoping. |

---

## 2. OWASP Top 10 (2021) Systematic Evaluation

### 2.1 A01:2021 — Broken Access Control
- **Perimeter Edge Guard:** Next.js Edge Middleware (`src/middleware.ts`) enforces session token checks on `/admin/*` and `/api/admin/*`.
- **RBAC Matrix:** Centralized permission matrix in `src/lib/auth/permissions.ts` governs 31 discrete permissions across 6 roles (`super_admin`, `admin`, `editor`, `sales`, `hr`, `viewer`).
- **Database Row Level Security (RLS):**
  - **Enforcement:** `FORCE ROW LEVEL SECURITY` declared across all 12 platform tables.
  - **Privilege Revocation:** Explicit `REVOKE ALL` applied to `anon` and `authenticated` roles in migrations `20261108000002_row_level_security.sql`, `20261108000003_phase2_core_features.sql`, and `20261108000004_phase3_rbac_and_admin.sql`.
  - **Verdict:** **PASS**.

### 2.2 A02:2021 — Cryptographic Failures
- **Transport Security:** All communication enforced over HTTPS / TLS 1.3 in production.
- **Session Tokens:** Supabase Auth JWTs signed using HMAC SHA-256 / Ed25519; never accessible to client scripts (`HttpOnly` cookie flags).
- **Unsubscribe Tokens:** Unsubscribe links use cryptographic HMAC SHA-256 hashes with server-side signing secrets to prevent tampering.
- **Visitor Privacy:** First-party analytics hash IP addresses with a daily rotating salt (`sha256(ip + date_salt)`).
- **Verdict:** **PASS**.

### 2.3 A03:2021 — Injection
- **SQL Injection:** Zero raw SQL concatenation in application code. All operations utilize Supabase PostgREST parameter binding or parameterized PL/pgSQL stored procedures.
- **Cross-Site Scripting (XSS):** React 19 JSX auto-escapes all dynamic content. Markdown rendering in the CMS utilizes sanitized parsers.
- **CSV Formula Injection (CWE-1236):** All report exports utilize `sanitizeCsvCell()` which prefixes cells starting with `=`, `+`, `-`, `@`, `\t`, or `\r` with a single quote (`'`), neutralizing DDE execution in Microsoft Excel and LibreOffice.
- **Verdict:** **PASS**.

### 2.4 A04:2021 — Insecure Design
- **Rate Limiting:** Sliding-window rate limiting on all public intake forms (`/api/contact`, `/api/demo-request`, `/api/newsletter`) restricting requests to 5 per 60 seconds per IP.
- **Spam Traps:** Honeypot fields silently discard bot traffic while returning deceptive HTTP 200 responses to disincentivize bot retry loops.
- **Payload Limits:** Strict 64KB ceiling on raw inbound JSON payloads prevents memory exhaustion attacks.
- **Verdict:** **PASS**.

### 2.5 A05:2021 — Security Misconfiguration
- **Vulnerabilities Identified:**
  - `SEC-P1-01 / SEC-P3-01`: PostgreSQL `SECURITY DEFINER` functions omit `SET search_path = public`.
  - `SEC-P2-01`: Email outbox background route handler (`/api/jobs/process-email-outbox`) permits unauthenticated calls if `EMAIL_JOB_SECRET` is unset.
- **Verdict:** **PARTIAL (Conditions documented in Section 3).**

### 2.6 A06:2021 — Vulnerable and Outdated Components
- **Runtime Dependencies:** All production runtime dependencies (`next: 16.4.5`, `react: 19.3.0`, `@supabase/supabase-js: ^2.119.0`, `@supabase/ssr: ^0.12.7`, `resend: ^6.37.0`, `zod: ^4.6.7`) are on current, supported releases.
- **Supply Chain Scan (`npm audit`):**
  - Production runtime: 0 vulnerabilities.
  - Development tooling: 8 moderate advisories in `@typescript-eslint` -> `minimatch` (ReDoS in dev linter; does not affect production artifacts).
- **Verdict:** **PASS**.

### 2.7 A07:2021 — Identification and Authentication Failures
- **Credential Storage:** Delegated exclusively to Supabase Auth (GoTrue), backed by bcrypt / argon2. Passwords never touch the Orbion application database.
- **Brute Force Defense:** Supabase Auth applies adaptive delay and IP rate limiting on authentication endpoints.
- **Session Termination:** `/api/admin/auth/logout` explicitly invokes `supabase.auth.signOut()` and destroys cookies across all domains.
- **Verdict:** **PASS**.

### 2.8 A08:2021 — Software and Data Integrity Failures
- **MIME Whitelisting:** Supabase Storage bucket `media` enforces strict MIME type whitelist (`image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`) at both the service layer and database RLS.
- **Path Traversal Defense:** Uploaded filenames are sanitized (`/[^a-zA-Z0-9._-]/g`) and assigned unique UUID keys before storage upload.
- **Verdict:** **PASS**.

### 2.9 A09:2021 — Security Logging and Monitoring Failures
- **Immutable Audit Trail:** `public.audit_logs` records actor ID, action type, entity type, target UUID, and JSON metadata. Updating or deleting audit logs is blocked by RLS policies.
- **Real-Time Operational Alerts:** Security events generate alerts in `public.admin_notifications` for administrator attention.
- **Verdict:** **PASS**.

### 2.10 A10:2021 — Server-Side Request Forgery (SSRF)
- **External Network Calls:** Application server only initiates outbound HTTP requests to verified third-party endpoints:
  - Supabase API (`mkpwfgrkkhxdjkoiowom.supabase.co`)
  - Resend API (`api.resend.com`)
  - Cloudflare Turnstile Verification (`challenges.cloudflare.com`)
- **No User-Supplied Webhooks:** The platform does not permit user-supplied URLs for outbound fetch or webhook delivery.
- **Verdict:** **PASS**.

---

## 3. Vulnerability Register & Remediation Specifications

### 3.1 FINDING SEC-01 (Priority: P2 - Medium)
- **Identifier:** `SEC-01-PG-SEARCH-PATH`
- **Title:** Mutable Search Path in PostgreSQL `SECURITY DEFINER` Functions
- **CWE:** CWE-426 (Untrusted Search Path)
- **Affected Objects:**
  - `public.handle_updated_at()` (`20261108000001_core_schema.sql`)
  - `public.is_active_staff()` (`20261108000002_row_level_security.sql`)
  - `public.is_admin_or_super()` (`20261108000002_row_level_security.sql`)
  - `public.current_user_role()` (`20261108000004_phase3_rbac_and_admin.sql`)
  - `public.has_role()` (`20261108000004_phase3_rbac_and_admin.sql`)
  - `public.can_manage_leads()` (`20261108000004_phase3_rbac_and_admin.sql`)
  - `public.can_manage_users()` (`20261108000004_phase3_rbac_and_admin.sql`)
  - `public.can_view_audit_logs()` (`20261108000004_phase3_rbac_and_admin.sql`)
  - `public.update_lead_status_with_audit()` (`20261108000004_phase3_rbac_and_admin.sql`)
- **Risk:** Without an immutable `search_path`, malicious schemas could hijack object resolution during execution of privileged functions.
- **Remediation Script (`supabase/migrations/20261109000001_security_hardening.sql`):**
  ```sql
  ALTER FUNCTION public.handle_updated_at() SET search_path = public;
  ALTER FUNCTION public.is_active_staff() SET search_path = public;
  ALTER FUNCTION public.is_admin_or_super() SET search_path = public;
  ALTER FUNCTION public.current_user_role() SET search_path = public;
  ALTER FUNCTION public.has_role(VARIADIC allowed_roles TEXT[]) SET search_path = public;
  ALTER FUNCTION public.can_manage_leads() SET search_path = public;
  ALTER FUNCTION public.can_manage_users() SET search_path = public;
  ALTER FUNCTION public.can_view_audit_logs() SET search_path = public;
  ALTER FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) SET search_path = public;
  ```

---

### 3.2 FINDING SEC-02 (Priority: P2 - Medium)
- **Identifier:** `SEC-02-OUTBOX-AUTH-FAIL-OPEN`
- **Title:** Background Outbox Processing Endpoint Fails Open When Secret Unset
- **CWE:** CWE-306 (Missing Authentication for Critical Function)
- **Affected File:** `src/app/api/jobs/process-email-outbox/route.ts` (Lines 25–41)
- **Risk:** If `EMAIL_JOB_SECRET` is omitted from the deployment environment, any public actor can invoke batch email processing.
- **Remediation:** Modify route handler to fail closed:
  ```typescript
  if (!expectedSecret || expectedSecret.trim().length === 0) {
    return NextResponse.json(
      { success: false, message: "Server configuration error: Worker secret is not defined." },
      { status: 500 }
    );
  }
  ```

---

## 4. Application Security Verdict

```
+-------------------------------------------------------------------------------+
| APPLICATION SECURITY AUDIT VERDICT: PASS WITH CONDITIONS                      |
| 0 Critical (P0), 0 High (P1) vulnerabilities. Platform exhibits strong        |
| defense-in-depth across RLS, RBAC, input sanitization, and session handling.  |
| Conditions: Apply SEC-01 search_path fix and SEC-02 fail-closed cron check.   |
+-------------------------------------------------------------------------------+
```

