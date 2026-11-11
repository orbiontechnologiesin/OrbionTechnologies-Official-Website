# Orbion Technologies — Newsletter Subscriber Administration

## 1. Executive Summary

The Newsletter Subscriber Management module (`/admin/newsletter`) extends the Phase 2 opt-in subscription infrastructure with an administrative interface for subscriber roster inspection, compliance auditing, and formula-safe CSV data exports.

### Core Architecture & Compliance Rules:
1. **Existing Source of Truth**: Reuses the `public.newsletter_subscribers` table created in Phase 2. No duplicate tables or parallel mailing systems are introduced.
2. **Strict Opt-In Consent**: Displays affirmative consent flags and UTC timestamps captured during visitor submission.
3. **Unsubscribe Protection**: Unsubscribed contacts (`status = 'unsubscribed'`) are preserved with their `unsubscribed_at` timestamp. The administration portal strictly prevents staff from forcibly reactivating an unsubscribed user.
4. **Token Security**: Cryptographic unsubscribe tokens (`unsubscribe_token`) are strictly excluded from administrative UI displays and CSV exports to prevent unauthorized account tampering.
5. **Zero Public Leakage**: The subscriber database is protected by Row Level Security (RLS) and is inaccessible to anonymous visitors.

---

## 2. Roster Schema (`newsletter_subscribers`)

```sql
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    consent BOOLEAN NOT NULL DEFAULT true CHECK (consent = true),
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    unsubscribe_token TEXT UNIQUE NOT NULL,
    source TEXT NOT NULL DEFAULT 'website_footer',
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

## 3. Administrative Interface Features

Located at `/admin/newsletter`:
- **Subscriber Counts**: Displays total registered, active subscribers, and unsubscribed contacts.
- **Search Engine**: Case-insensitive substring searching across subscriber email addresses.
- **Status Filter**: Rapid toggle between `All`, `Subscribed`, and `Unsubscribed`.
- **Compliance Audit Table**: Renders email address, status badge, source channel, consent status, subscription date, and unsubscribe timestamp.

---

## 4. Formula-Safe CSV Export

Located at `/api/admin/newsletter/export`:
- **Permission Check**: Enforces `newsletter:export` capability server-side.
- **Formula Neutralization**: Neutralizes spreadsheet formula injection risks via `sanitizeCsvCell`.
- **Audit Logging**: Emits an audit log entry in `audit_logs` (`EXPORT_NEWSLETTER_CSV`) detailing requesting administrator, row count, and applied date/status filters.

