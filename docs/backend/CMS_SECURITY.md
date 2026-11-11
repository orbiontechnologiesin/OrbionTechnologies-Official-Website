# Orbion Technologies — CMS Security Architecture

## 1. Security Principles

The CMS enforces enterprise-grade security standards to protect company assets, prevent unauthorized content modification, and eliminate injection vulnerabilities.

---

## 2. Threat Vector Mitigations

### 1. Cross-Site Scripting (XSS)
- **Threat**: Malicious actors or compromised editor accounts inject script tags, inline event handlers (`onload`, `onerror`), or malicious `javascript:` URIs into blog content or markdown.
- **Mitigation**:
  - All rendered content uses a strict sanitization pipeline.
  - Public reader pages parse markdown into structured elements with no raw HTML evaluation (`dangerouslySetInnerHTML` is prohibited for unescaped user input).
  - External link rendering enforces `rel="noopener noreferrer"` and rejects `javascript:` protocol URLs.

### 2. URL Traversal & Slug Manipulation
- **Threat**: Directory traversal attacks (`../../etc/passwd`) or route collision via custom slugs.
- **Mitigation**:
  - Slugs are validated against strict alphanumeric regex (`^[a-z0-9]+(?:-[a-z0-9]+)*$`).
  - Reserved administrative and system prefixes (`admin`, `api`, `auth`, `login`, `static`) are rejected.
  - Slugs are forced to lowercase, trimmed, and guaranteed unique via database constraints (`UNIQUE(slug)`).

### 3. File Upload Exploitation & Web Shells
- **Threat**: Attackers upload executable binaries (.php, .exe, .sh, .html) disguised as images to achieve remote code execution (RCE) or execute stored XSS.
- **Mitigation**:
  - Files are uploaded directly to Supabase Storage isolated object stores; they are never written to the Next.js runtime filesystem.
  - Multi-layer MIME inspection checks incoming file headers.
  - Executable, scripting, and HTML MIME types are rejected before storage writes.
  - Storage buckets do not execute server-side code; objects are served statically with appropriate `Content-Type` and security headers.

### 4. Privilege Escalation & Unauthorized Publishing
- **Threat**: An editor or unauthorized user tampers with HTTP request payloads to set `status = 'published'` or modify products without authorization.
- **Mitigation**:
  - Capability-based authorization (`requireCapability("cms:publish")`) is validated on every mutation request inside Next.js Route Handlers.
  - Database Row Level Security (RLS) policies independently verify the user's role in the `profiles` table before permitting row updates.
  - Client-side role claims are never trusted.

### 5. Data Privacy & Draft Leakage
- **Threat**: Unpublished drafts, confidential case studies, or pre-launch product disclosures exposed to public visitors or search engine bots.
- **Mitigation**:
  - Public SQL queries explicitly enforce `WHERE status = 'published'`.
  - Non-published slugs accessed on public routes return HTTP 404 `notFound()`, never exposing draft content or confirming the existence of unpublished slugs.
  - The dynamic sitemap (`src/app/sitemap.ts`) queries exclusively `status = 'published'`.
  - Search crawlers are barred from `/admin/` and `/api/` routes via `robots.ts`.

---

## 3. Immutable Audit Logging

All administrative CMS mutations trigger structured entries in the `audit_logs` table:
- Post creation, modification, status change, deletion.
- Category creation, renaming, and removal.
- Product catalog headline and status updates.
- Case study workflow events.
- Media upload and asset deletion.

Audit logs record the exact actor ID, action type, IP address, timestamp, and metadata payload for forensic compliance.

