# Orbion Technologies — Email Reliability & Outbox Architecture
**Document Version:** 1.0.0  
**Phase:** Phase 2 (Email Reliability & Retries)  
**Status:** Approved  
**Author:** Backend Architecture & Engineering Team  

---

## 1. Architectural Motivation

A web application should never tie critical database persistence to third-party network latency. When a customer submits an inquiry or demo request:
1. If the email provider is slow, the visitor should not experience a 10-second hanging submit button.
2. If the email provider fails or credentials have not been configured, the customer inquiry must **never be dropped or lost**.

To solve this, Orbion Technologies implements the **Transactional Outbox Pattern**.

```text
Visitor Submits Enquiry
          │
          ▼
Database Transaction:
  1. Insert into public.contact_leads
  2. Insert job into public.email_outbox (status: 'pending')
          │
          ▼
Return Immediate HTTP 200 to Visitor (with Reference ID)
          │
          ├──────────────────────────────────────────┐
          │ (Immediate Attempt)                      │ (Scheduled Worker)
          ▼                                          ▼
Fast In-Process Dispatch                  /api/jobs/process-email-outbox
  • Resend API called                       • Polls pending/failed jobs
  • If success: status = 'sent'             • Exponential backoff (2^n min)
  • If fails: status = 'failed'             • Max attempts: 5
```

---

## 2. Outbox Schema (`public.email_outbox`)

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key identifier. |
| `related_entity_type` | `TEXT` | `contact_lead`, `demo_request`, `newsletter`, `system`. |
| `related_entity_id` | `UUID` | Primary key of source record. |
| `recipient` | `TEXT` | Target email address. |
| `template` | `TEXT` | Template identifier (`contact_notification`, etc.). |
| `subject` | `TEXT` | Email subject line. |
| `payload` | `JSONB` | Template variables (names, references, message). |
| `provider_message_id` | `TEXT` | Third-party provider tracking ID (e.g. Resend `re_12345`). |
| `status` | `TEXT` | `pending`, `processing`, `sent`, `failed`. |
| `attempts` | `INTEGER` | Current retry attempt count. |
| `max_attempts` | `INTEGER` | Maximum retry limit (default: 5). |
| `last_error` | `TEXT` | Message from last failure. |
| `next_retry_at` | `TIMESTAMPTZ` | Timestamp after which the job is eligible for retry. |
| `sent_at` | `TIMESTAMPTZ` | Timestamp of successful transmission. |

---

## 3. Exponential Backoff Retry Policy

When an email transmission encounters a temporary error (e.g. rate limit, socket timeout), the outbox worker recalculates `next_retry_at` with exponential backoff:

$$\text{backoffMinutes} = 2^{\text{attempts}}$$

* **Attempt 1:** Wait 2 minutes.
* **Attempt 2:** Wait 4 minutes.
* **Attempt 3:** Wait 8 minutes.
* **Attempt 4:** Wait 16 minutes.
* **Attempt 5:** Marked as permanently `failed` for manual staff review.

---

## 4. Protected Worker Endpoint (`POST /api/jobs/process-email-outbox`)

To process queued or retried emails in production, configure a scheduled worker:

* **Endpoint:** `POST /api/jobs/process-email-outbox`
* **Authorization:** `Bearer <EMAIL_JOB_SECRET>`

### 4.1 Vercel Cron Configuration (`vercel.json`)
```json
{
  "crons": [
    {
      "path": "/api/jobs/process-email-outbox?secret=YOUR_EMAIL_JOB_SECRET",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### 4.2 GitHub Actions Scheduled Workflow (Alternative)
```yaml
name: Process Email Outbox
on:
  schedule:
    - cron: '*/10 * * * *'
jobs:
  outbox:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Outbox Worker
        run: |
          curl -X POST https://orbiontechnologies.in/api/jobs/process-email-outbox \
            -H "Authorization: Bearer ${{ secrets.EMAIL_JOB_SECRET }}"
```

