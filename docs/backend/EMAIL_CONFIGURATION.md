# Orbion Technologies — Transactional Email Configuration Guide
**Document Version:** 1.0.0  
**Phase:** Phase 2 (Transactional Email System)  
**Provider:** Resend (`resend: ^6.6.0`)  
**Status:** Approved  

---

## 1. Overview

Orbion Technologies utilizes **Resend** for transactional email delivery. Outbound emails are decoupled from the web request lifecycle via an asynchronous outbox queue (`public.email_outbox`).

If email credentials are not yet configured or an email provider outage occurs, customer leads and demo requests are **never lost**. They remain safely stored in PostgreSQL and queued in the outbox.

---

## 2. Environment Variables

Add the following keys to `.env.local` (local) and Vercel Environment Variables (production):

```env
# 1. Resend API Key (https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# 2. Verified Sender Address
# In development, you may use: onboarding@resend.dev
# In production, use your verified domain address:
ORBION_SENDER_EMAIL=Orbion Technologies <notifications@orbiontechnologies.in>

# 3. Recipient for Inbound Leads
ORBION_CONTACT_EMAIL=enquiry@orbiontechnologies.in

# 4. Outbox Worker Protection Secret
EMAIL_JOB_SECRET=your-random-high-entropy-worker-secret
```

---

## 3. Domain Authentication Setup (DNS Records)

To ensure high inbox delivery rates and prevent spoofing, configure your DNS provider for `orbiontechnologies.in`:

### 3.1 SPF (Sender Policy Framework)
Add or include Resend in your domain TXT record:
* **Host:** `@`
* **Type:** `TXT`
* **Value:** `v=spf1 include:resend.com ~all`

### 3.2 DKIM (DomainKeys Identified Mail)
In the Resend Dashboard, go to **Domains** → **Add Domain** (`orbiontechnologies.in`). Add the generated three CNAME records:
* **Host:** `resend._domainkey` (and secondary selectors)
* **Type:** `CNAME`
* **Value:** Provided in Resend dashboard

### 3.3 DMARC (Domain-based Message Authentication)
Protect your brand identity from email spoofing:
* **Host:** `_dmarc`
* **Type:** `TXT`
* **Value:** `v=DMARC1; p=reject; sp=reject; rua=mailto:dmarc@orbiontechnologies.in; pct=100`

---

## 4. Email Template Catalog

All templates reside in `src/lib/email/templates/`:

1. **`contact_notification`:** Internal business lead notification dispatched to `enquiry@orbiontechnologies.in`. Includes customer name, company, phone, category, full message, and direct reply link.
2. **`contact_confirmation`:** Customer receipt dispatched to visitor with reference code (`ORB-CNT-XXXXX`) and company tagline.
3. **`demo_notification`:** Internal product evaluation notification detailing the requested software product ID.
4. **`demo_confirmation`:** Customer evaluation receipt with disclaimer regarding upcoming software status.
5. **`newsletter_confirmation`:** Opt-in confirmation with cryptographic unsubscribe URL.

### Security Note: XSS Protection
All templates wrap user-supplied content through `escapeHtml()` in `base-layout.ts`. Raw user-submitted HTML is strictly escaped to prevent client-side injection.

