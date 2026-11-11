# Orbion Technologies — Phase 5 Security Architecture & Threat Mitigations

## 1. Security Architecture Principles

Phase 5 processes company operations metrics, visitor analytics, customer lead intelligence, and data exports. Security controls are strictly enforced at the API route boundary, service layer, and database storage layer.

---

## 2. Threat Vector Mitigations

### 2.1 CSV Formula Injection (CWE-1236)
- **Threat**: Malicious actors submit contact inquiries with company names or subjects starting with `=`, `+`, `-`, or `@`. When administrators download lead or traffic reports and open them in Microsoft Excel or Google Sheets, the spreadsheet software interprets the text as executable macros or external web connections.
- **Mitigation**: Every text cell in every export (`exportLeadsCsv`, `exportSubscribersCsv`, `generateCsvReport`) passes through `sanitizeCsvCell()`. Dangerous prefixes are escaped with a leading single quote (`'`), neutralizing formula execution.

### 2.2 Analytics Ingestion Abuse & Database Inflation
- **Threat**: Bots or attackers flood `/api/analytics/event` with high-volume fake events, inflating database storage or causing denial of service.
- **Mitigation**:
  - Distributed IP rate limiting (`checkRateLimit`) caps requests to a maximum of 60 events per minute per IP address.
  - Body payload size ceiling enforces a strict 16KB limit.
  - Strict Zod validation (`analyticsEventSchema`) validates regex constraints on event names and slugs, rejecting unregistered properties.

### 2.3 Cross-User Notification Privacy & Escalation
- **Threat**: Lower-tier staff (`sales`, `editor`, `hr`) attempt to query confidential administrative alerts, system warnings, or another user's private notifications.
- **Mitigation**:
  - PostgreSQL Row Level Security (RLS) on `admin_notifications` enforces that non-admin callers can only `SELECT` and `UPDATE` records where `recipient_user_id = auth.uid()`.
  - System-wide broadcasts (`recipient_user_id IS NULL`) are visible exclusively to `super_admin` and `admin` roles via `public.has_role('super_admin', 'admin')`.

### 2.4 Visitor Privacy & Regulatory Compliance
- **Threat**: Storing sensitive personal identifiers, tracking authenticated staff in public analytics, or violating visitor privacy preferences.
- **Mitigation**:
  - Zero third-party ad networks or cookies installed.
  - Strict client-side evaluation of `navigator.doNotTrack`.
  - Pseudonymous visitor tokens stored ephemerally; no hardware or browser fingerprinting.
  - Internal routes (`/admin/*`) and API endpoints (`/api/*`) are completely excluded from analytics tracking.

### 2.5 Infrastructure Credential Exposure in Health Monitoring
- **Threat**: Operational monitoring endpoints leaking database connection strings, API secrets, or stack traces.
- **Mitigation**:
  - Health checks perform minimal `count` queries to calculate latency without returning schema internals.
  - Database strings and service role keys remain strictly server-only.
  - Failure summaries are sanitized before presentation.

---

## 3. Immutable Audit Logging of Export Operations

All data extraction operations emit structured records in the immutable `public.audit_logs` table:
```sql
INSERT INTO public.audit_logs (actor_id, action, entity_type, metadata)
VALUES (
    session.profile.id,
    'EXPORT_LEADS_CSV',
    'contact_leads',
    jsonb_build_object('rowCount', count, 'startDate', start, 'endDate', end)
);
```
Audit logs record the exact administrator identity, timestamp, row volume, and applied filter parameters for forensic compliance.

