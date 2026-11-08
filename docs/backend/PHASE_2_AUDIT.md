# Orbion Technologies — Backend Pre-Implementation Audit (Phase 2)
**Document Version:** 1.0.0  
**Date:** November 2026  
**Status:** Complete & Verified  
**Author:** Backend Architecture & Engineering Team  
**Repository:** `OrbionTechnologies-Official-Website`  

---

## 1. Executive Summary

This audit establishes the pre-implementation baseline for **Phase 2: Core Functionality, Contact APIs & Email Infrastructure**. 

Phase 1 established the backend architecture, environment validation with Zod, Supabase browser/server/admin clients, and initial database migrations. Crucially, live connectivity testing confirmed that the user has successfully provisioned a Supabase project and applied the Phase 1 schema.

The primary objective of Phase 2 is to transform the static marketing website into an active, resilient business communication engine by implementing:
1. Contact enquiry API with database persistence and outbox email dispatch.
2. Demo request API for Orbion's 7 planned software products.
3. Newsletter subscription and secure token-based unsubscribe API.
4. Server-side validation via Zod.
5. Distributed rate limiting and honeypot bot defense.
6. Reliable outbox-style email delivery with retry policies.

---

## 2. Verification of Phase 1 Implementation

| Component | Target Location | Verification Status | Verified State Details |
|---|---|---|---|
| **Supabase Client Suite** | `src/lib/supabase/*` | **Active & Functional** | `client.ts` (browser), `server.ts` (Next.js 15+ async cookies), `admin.ts` (`server-only` protected), `index.ts` re-exports. |
| **Environment System** | `src/lib/env.ts` | **Active & Functional** | Runtime Zod validation; safe public and server-only accessors; credential masking in logs. |
| **Environment Template** | `.env.example` | **Active** | Up to date with Supabase public and secret variables. |
| **Local Environment** | `.env.local` | **Configured by User** | Connected to live Supabase project (`https://mkpwfgrkkhxdjkoiowom.supabase.co`). Verified live connectivity. |
| **TypeScript Types** | `src/types/database.ts` | **Active** | Phase 1 schema types defined (`profiles`, `contact_leads`, `audit_logs`, `site_settings`). |
| **Migration Files** | `supabase/migrations/` | **Deployed to Cloud** | `20261108000001_core_schema.sql` and `20261108000002_row_level_security.sql`. |

---

## 3. Remote Database State Audit (Live Verification)

Direct query testing against the live Supabase PostgreSQL instance revealed:

* `public.profiles`: **EXISTS** (Row count = 0, RLS enforced).
* `public.contact_leads`: **EXISTS** (Row count = 0, RLS enforced).
* `public.audit_logs`: **EXISTS** (Row count = 0, RLS enforced).
* `public.site_settings`: **EXISTS** (Row count = 0, RLS enforced).
* `public.demo_requests`: **DOES NOT EXIST** (Requires Phase 2 migration).
* `public.newsletter_subscribers`: **DOES NOT EXIST** (Requires Phase 2 migration).
* `public.email_outbox`: **DOES NOT EXIST** (Requires Phase 2 migration).

### Schema Enhancement Needed for `contact_leads`
The Phase 1 `contact_leads` table has columns:
`id`, `full_name`, `email`, `phone`, `company`, `subject`, `message`, `source`, `status`, `assigned_to`, `created_at`, `updated_at`.
To support public reference tracking without exposing primary key UUIDs to visitors, a migration will add:
- `reference TEXT UNIQUE` (e.g., `ORB-CNT-XXXXX`)
- `website TEXT` (for optional company URL tracking and honeypot analysis)
- `ip_hash TEXT` (truncated/hashed client fingerprint for abuse tracking)

---

## 4. Frontend Forms & Integration Surface

### 4.1 Contact Us Form (`src/components/contact/ContactForm.tsx`)
- **Status:** Fully functional client component with client-side validation, loading states, and mailto fallback.
- **Fields Present:**
  - `name`: string (Full Name, required)
  - `email`: string (Work Email, required)
  - `subject`: string (Category dropdown, required)
  - `message`: string (Inquiry message, required)
  - `company`: string (Optional)
  - `phone`: string (Optional)
  - `website`: string (Optional company website)
- **Current Target:** Sends `POST` to `/api/contact`. The existing route in `src/app/api/contact/route.ts` is an unpersisted stub that prints to stdout.
- **Phase 2 Action:** Wire `POST /api/contact` to persistent PostgreSQL storage, generate an enquiry reference code, enqueue outbound confirmation emails, and render the reference code in the UI success card. Add a hidden honeypot field (`_orb_hp`) to catch automated spambots.

### 4.2 Demo Request Form
- **Status:** No dedicated interactive demo request form exists on the frontend. The 7 product detail pages (`/products/[slug]`) display "COMING SOON" cards and link to `/contact` with prefilled category parameters.
- **Phase 2 Action:** Implement the backend endpoint `POST /api/demo-request` with full Zod validation against the 7 official Orbion product IDs (`orbion-crm`, `orbion-ai-chatbot`, `orbion-bookings`, `orbion-fit`, `orbion-dine`, `orbion-docs`, `orbion-insights`). Document that the API is ready for future product landing page integration.

### 4.3 Newsletter Form
- **Status:** No newsletter subscription input exists in the global footer or any subpage.
- **Phase 2 Action:** Implement `POST /api/newsletter` and `POST /api/newsletter/unsubscribe` with secure HMAC/cryptographic tokens. Document that frontend integration remains pending a future marketing component rollout.

---

## 5. Missing Backend Components (Phase 2 Roadmap)

```text
src/
  app/
    api/
      contact/
        route.ts                  --> Upgrade from stub to production pipeline
      demo-request/
        route.ts                  --> NEW: Product demo intake endpoint
      newsletter/
        route.ts                  --> NEW: Subscriber intake endpoint
        unsubscribe/
          route.ts                --> NEW: Cryptographically secured unsubscribe
      jobs/
        process-email-outbox/
          route.ts                --> NEW: Protected background worker endpoint
  lib/
    validation/
      contact.schema.ts           --> NEW: Zod schema for contact enquiry
      demo-request.schema.ts      --> NEW: Zod schema for product demo requests
      newsletter.schema.ts        --> NEW: Zod schema for newsletter & unsubscribe
    security/
      rate-limit.ts               --> NEW: Distributed rate limiter with memory fallback
      spam-protection.ts          --> NEW: Honeypot & bot detection utilities
      tokens.ts                   --> NEW: Cryptographic HMAC tokens for unsubscribe
    email/
      client.ts                   --> NEW: Resend client factory with graceful fallback
      templates/
        contact-notification.ts   --> NEW: Internal HTML/text notification
        contact-confirmation.ts   --> NEW: Customer HTML/text receipt
        demo-notification.ts      --> NEW: Internal demo notification
        demo-confirmation.ts      --> NEW: Customer demo receipt
        newsletter-confirmation.ts--> NEW: Subscription confirmation
      outbox.ts                   --> NEW: Outbox dispatch worker with backoff retries
    services/
      contact.service.ts          --> NEW: Contact business logic & atomic DB write
      demo-request.service.ts     --> NEW: Demo request business logic & DB write
      newsletter.service.ts       --> NEW: Newsletter subscription & unsubscribe logic
```

---

## 6. Email Infrastructure State & Recommendations

* **Provider Selected:** Resend (`resend: ^6.6.0` installed).
* **Environment Variables Needed:**
  - `RESEND_API_KEY`: API key from Resend dashboard.
  - `ORBION_SENDER_EMAIL`: Verified sender address (e.g., `Orbion Technologies <notifications@orbiontechnologies.in>` or `onboarding@resend.dev` for testing).
  - `ORBION_CONTACT_EMAIL`: Recipient inbox for incoming business leads (defaults to `enquiry@orbiontechnologies.in`).
  - `EMAIL_JOB_SECRET`: Secret token used to authenticate outbox processing worker calls.
* **Failure Handling:** If `RESEND_API_KEY` is not yet configured, the system logs the outbound email as `pending` in `public.email_outbox` and returns a successful response to the user with their enquiry reference, ensuring **zero data loss**.

---

## 7. Migration Plan for Phase 2

Create `supabase/migrations/20261108000003_phase2_core_features.sql`:
1. Enhance `contact_leads` with `reference`, `website`, `ip_hash`.
2. Create `demo_requests` table with constraints and RLS.
3. Create `newsletter_subscribers` table with unique normalized email and RLS.
4. Create `email_outbox` table with status, attempts, next_retry_at, provider_message_id, and RLS.
5. Grant appropriate permissions to `service_role` and `authenticated`.
6. Implement database transaction function `public.submit_contact_enquiry` and `public.submit_demo_request` for atomic enquiry + outbox record creation.

