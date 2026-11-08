# Orbion Technologies — Contact Enquiry API Specification
**Document Version:** 1.0.0  
**Phase:** Phase 2 (Core Functionality & Contact APIs)  
**Endpoint:** `POST /api/contact`  
**Status:** Live & Production Ready  

---

## 1. Overview

The Contact Enquiry API processes customer, business, and partnership inquiries submitted via the official Orbion Technologies website. It replaces unpersisted mock stubs with a resilient, server-validated, database-persisted ingestion pipeline.

```text
Visitor Submits Form
         │
         ▼
Next.js API Gateway (/api/contact)
  ├── 1. Request Body Size Check (Max 64KB)
  ├── 2. Distributed Rate Limiter (5 req/min per IP)
  ├── 3. Honeypot Bot Trap (_orb_hp)
  ├── 4. Optional Cloudflare Turnstile Bot Verification
  ├── 5. Strict Server Zod Validation & Email Normalization
  ├── 6. Reference Code Generation (ORB-CNT-YYYYMM-XXXX)
  └── 7. Durable PostgreSQL Storage (contact_leads)
         │
         ├───► Enqueue Internal Notification (email_outbox)
         └───► Enqueue Customer Confirmation (email_outbox)
```

---

## 2. Request Specification

* **URL:** `/api/contact`
* **Method:** `POST`
* **Content-Type:** `application/json`

### Payload Parameters

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `name` / `full_name` | `string` | **Yes** | 2–120 characters, trimmed | Visitor's full name. |
| `email` | `string` | **Yes** | Valid RFC email, max 255 chars | Work or contact email address (normalized to lowercase). |
| `subject` | `string` | **Yes** | 2–120 characters | Enquiry topic or category. |
| `message` | `string` | **Yes** | 10–5,000 characters | Inquiry details and project requirements. |
| `company` | `string` | Optional | Max 120 characters | Company, startup, or organization name. |
| `phone` | `string` | Optional | Max 30 characters, telephone regex | Telephone or mobile contact number. |
| `website` | `string` | Optional | Max 255 characters | Company website URL. |
| `source` | `string` | Optional | Max 80 chars, default: `website_contact` | Lead acquisition attribution. |
| `_orb_hp` | `string` | Optional | Hidden honeypot field | Must be empty. If populated, request is trapped as a bot. |
| `turnstile_token` | `string` | Optional | Cloudflare challenge token | Verified if `TURNSTILE_SECRET_KEY` is configured. |

---

## 3. Response Specification

### 3.1 Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your enquiry has been submitted successfully.",
  "data": {
    "reference": "ORB-CNT-2611-3361D9"
  }
}
```

### 3.2 Validation Error (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Please check the information you entered.",
  "errors": {
    "email": "Please provide a valid email address.",
    "message": "Message must be at least 10 characters."
  }
}
```

### 3.3 Rate Limit Exceeded (`429 Too Many Requests`)
```json
{
  "success": false,
  "message": "Too many submission attempts. Please wait a moment before trying again."
}
```
*Includes HTTP Header:* `Retry-After: 60`

### 3.4 Payload Too Large (`413 Payload Too Large`)
```json
{
  "success": false,
  "message": "Payload size exceeds allowable threshold."
}
```

---

## 4. Security & Abuse Controls

1. **Distributed Rate Limiting:** 5 requests per 60 seconds per IP address (`contact:<ip>`).
2. **Silent Honeypot Trap:** Automated scrapers that populate `_orb_hp` receive a fake success status `ORB-CNT-OK` without writing to the database or dispatching notifications.
3. **PII Sanitization:** Visitor IP addresses are salted and hashed (`SHA-256`) into an irreversible identifier stored in `contact_leads.ip_hash`.
4. **Reliability Rule:** Database storage is executed before email queuing. Outbound email failures never trigger a rollback of a genuine lead.

---

## 5. cURL Example

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bhavin Shankur",
    "email": "bhavin@orbiontechnologies.in",
    "subject": "Custom Software Development",
    "message": "We would like to discuss building an automated workflow system.",
    "company": "Orbion Technologies",
    "phone": "+91 98765 43210"
  }'
```

