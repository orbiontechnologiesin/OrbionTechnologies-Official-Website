# ORBION TECHNOLOGIES — LEAD MANAGEMENT SPECIFICATION

This document details the operational workflow, search capabilities, atomic state transitions, internal notes storage, and audit logging for customer contact inquiries (`/admin/leads` and `/admin/leads/[id]`).

---

## 1. Operational Overview

Lead management is the primary day-to-day feature of the Orbion administrative portal. It operates on the existing `contact_leads` table created in Phase 1 & 2 without duplicating storage.

### Supported Lead Statuses
* **`new`**: Fresh inbound inquiry from the Contact Us page awaiting triage.
* **`contacted`**: Staff has initiated initial email or telephone dialogue.
* **`qualified`**: Requirements verified as an active software or AI engineering opportunity.
* **`closed`**: Engagement completed, resolved, or marked inactive.

---

## 2. Lead Listing & Search Features (`/admin/leads`)

### Filter & Search Capabilities:
* **Full-Text Search**: Case-insensitive search matching `full_name`, `email`, `company`, or `reference` code.
* **Status Tabs**: Fast filtering by status (`All`, `New`, `Contacted`, `Qualified`, `Closed`).
* **Server-Side Pagination**: Defaults to 15 leads per page with `Prev` and `Next` controls.
* **Empty State Handling**: Provides clear guidance when search queries return zero results.

---

## 3. Lead Detail View (`/admin/leads/[id]`)

Displays complete submission metadata:
* **Reference Identifier**: Formatted tracking reference (e.g., `ORB-CNT-123456`).
* **Customer Profile**: Full Name, Email (clickable mailto), Phone (clickable tel), Company, Website.
* **Submission Timing**: Precise date, time, and relative duration.
* **Customer Inquiry Message**: Rendered in a dedicated, read-only card. **The original customer message is strictly immutable and cannot be overwritten.**

---

## 4. Atomic Updates & Internal Staff Notes

### 4.1 Internal Notes Architecture (`public.lead_notes`)
Internal staff notes are stored separately from customer inquiries in the `lead_notes` table:
* `id UUID PRIMARY KEY`
* `lead_id UUID REFERENCES contact_leads(id) ON DELETE CASCADE`
* `author_id UUID REFERENCES profiles(id) ON DELETE RESTRICT`
* `note TEXT (1 to 4000 chars)`
* `created_at TIMESTAMPTZ`

### 4.2 Stored Procedure (`public.update_lead_status_with_audit`)
When an authorized staff member updates a lead's status, assigns an owner, or leaves a note, the changes are processed inside a single atomic PostgreSQL transaction:

```sql
SELECT public.update_lead_status_with_audit(
    p_lead_id := 'c6b8c8d8-7440-4f51-b883-9ef28ce55452',
    p_new_status := 'qualified',
    p_assigned_to := '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    p_internal_note := 'Client confirmed requirement for custom LLM workflow.'
);
```

#### Transaction Guarantees:
1. Validates caller permissions (`can_manage_leads()`).
2. Updates `status`, `assigned_to`, and `updated_at` on `contact_leads`.
3. Inserts the internal commentary into `lead_notes`.
4. Appends an audit event to `audit_logs` capturing `previous_status`, `new_status`, `assigned_to`, and `actor_id`.
5. If any step fails, the entire transaction rolls back.

