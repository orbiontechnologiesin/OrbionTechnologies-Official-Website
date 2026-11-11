# Orbion Technologies — Platform Health & Operational Monitoring

## 1. System Overview

The Platform Health & Monitoring module (`/admin/system-health`) provides continuous observability over the critical infrastructure components powering the Orbion website and backend services.

### Observability Objectives:
- Measure live database latency without imposing full-table scan overhead.
- Provide real-time visibility into the transactional email outbox queue and retry backoff states.
- Expose actionable diagnostics for delivery failures.
- Stream filtered audit logs for operational transparency.

---

## 2. Monitored Infrastructure Subsystems

### 2.1 Supabase PostgreSQL Database Connectivity
- **Health Check Mechanism**: Lightweight `count` query on `profiles` verifying database connectivity, authentication, and measuring round-trip latency in milliseconds.
- **Latency Classifications**:
  - `< 600ms`: `connected` (Optimal / Healthy)
  - `600ms - 1000ms`: `latency_high` (Degraded)
  - `> 1000ms` or unreachable: `disconnected` (Down)

### 2.2 Transactional Email Outbox Queue
Monitors the `public.email_outbox` table established in Phase 2:
- **Pending**: Messages waiting for the next retry interval or initial dispatch.
- **Processing**: Currently held by the background email worker.
- **Sent**: Dispatched to the upstream SMTP / transactional provider.
- **Failed**: Messages that have exceeded their maximum allowable attempts (`max_attempts = 5`).
- **Delivery Success Rate**: Computed as $\frac{\text{Sent}}{\text{Total Messages}} \times 100\%$.

---

## 3. Operational Error Handling & Log Hygiene

1. **Zero Secret Exposure**: Database connection strings (`DATABASE_URL`), service role keys (`SUPABASE_SERVICE_ROLE_KEY`), and SMTP credentials are never exposed in monitoring responses or UI cards.
2. **Sanitized Error Summaries**: Outbox failure messages and operational logs display human-readable failure causes (e.g., "SMTP timeout", "Recipient mailbox unavailable") while omitting internal execution stack traces from client views.
3. **Audit Log Severity Mapping**:
   - `INFO`: Normal operational mutations (`BLOG_POST_CREATED`, `USER_INVITED`).
   - `WARNING`: Potentially destructive actions (`LEAD_DELETED`, `MEDIA_ASSET_DELETED`).
   - `ERROR`: Delivery exhaustion, authentication rejections, or database errors.

---

## 4. Operational Monitoring Interface

Located at `/admin/system-health`:
- **Subsystem Status Callout**: Overall status indicator (`HEALTHY`, `DEGRADED`, `DOWN`).
- **Telemetry KPI Grid**: Database ping, delivery success rate, outbox queue size, and active failed deliveries.
- **Outbox Diagnostic Roster**: Table of failed messages with recipient, template, attempt count, error cause, and queued timestamp.
- **Operational Audit Log**: Chronological stream of recent system actions.

