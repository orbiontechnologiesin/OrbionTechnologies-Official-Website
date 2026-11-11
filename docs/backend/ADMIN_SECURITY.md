# ORBION TECHNOLOGIES — APPLICATION & ADMINISTRATIVE SECURITY SPECIFICATION

This document outlines the security architecture, threat model defenses, and compliance controls protecting the **Orbion Technologies** administration system.

---

## 1. Threat Model & Mitigations

### 1.1 Threat: Unauthorized Administrative Access
* **Defense**: Zero public signup. Only an active Super Administrator can invite staff. Passwords must meet complexity requirements and are hashed and salt-managed exclusively by Supabase Auth (Argon2 / bcrypt). Session tokens reside in secure HTTP-only cookies.

### 1.2 Threat: Privilege Escalation
* **Defense**:
  * Client code never determines permissions.
  * Next.js server components call `requireAdminSession(permission)` on every request.
  * Next.js API routes independently validate permissions before executing logic.
  * PostgreSQL Row Level Security (RLS) is forced across all tables.
  * Self-modification blocks prevent users from modifying their own roles or activating deactivated accounts.

### 1.3 Threat: Account Enumeration
* **Defense**:
  * Login failures return identical generic error messages (`"Invalid email address or password"`).
  * Password reset requests return identical success responses regardless of whether the email exists.

### 1.4 Threat: Open Redirect Attacks
* **Defense**:
  * The `next` parameter is validated via `sanitizeRedirectUrl()`.
  * External schemes (`http:`, `https:`, `//`) and malformed relative paths are stripped, falling back to `/admin/dashboard`.

### 1.5 Threat: Customer Message Tampering
* **Defense**:
  * The `contact_leads.message` column cannot be updated via staff endpoints.
  * Internal staff commentary is isolated in `lead_notes` with author attribution.

### 1.6 Threat: Audit Log Tampering
* **Defense**:
  * The `audit_logs` table has all `UPDATE` and `DELETE` grants revoked from `authenticated` and `anon`.
  * Records are strictly append-only.

---

## 2. Row Level Security Policy Reference

| Table | Policy Name | Command | Role Target | Condition |
| :--- | :--- | :---: | :--- | :--- |
| `profiles` | `Staff can view profiles` | `SELECT` | `authenticated` | `current_user_role() IS NOT NULL` |
| `profiles` | `Super admins can insert profiles` | `INSERT` | `authenticated` | `current_user_role() = 'super_admin'` |
| `profiles` | `Super admins can update profiles` | `UPDATE` | `authenticated` | `current_user_role() = 'super_admin'` |
| `profiles` | `Users can update own avatar and name` | `UPDATE` | `authenticated` | `id = auth.uid()` & cannot change role |
| `contact_leads` | `Authorized roles can view contact leads` | `SELECT` | `authenticated` | `super_admin`, `admin`, `sales`, `viewer` |
| `contact_leads` | `Authorized roles can update contact leads` | `UPDATE` | `authenticated` | `super_admin`, `admin`, `sales` |
| `contact_leads` | `Super admins can delete contact leads` | `DELETE` | `authenticated` | `super_admin` only |
| `lead_notes` | `Authorized roles can view lead notes` | `SELECT` | `authenticated` | `super_admin`, `admin`, `sales`, `viewer` |
| `lead_notes` | `Authorized roles can add lead notes` | `INSERT` | `authenticated` | `super_admin`, `admin`, `sales` & `author_id = auth.uid()` |
| `audit_logs` | `Authorized roles can view audit logs` | `SELECT` | `authenticated` | `super_admin`, `admin` |
| `audit_logs` | *Update / Delete* | `UPDATE`, `DELETE` | All | **REVOKED / DENIED** |

---

## 3. Security Auditing Checklist

- [x] RLS enabled and forced on all tables.
- [x] Public registration completely disabled.
- [x] Initial Super Admin provisioned through secure server CLI.
- [x] No plaintext passwords or private keys stored in repository.
- [x] Server-side permission checks on every API route and server component.
- [x] Deactivated staff accounts immediately lose access.
- [x] Audit logs record all critical actions (logins, status changes, assignments, user modifications).

