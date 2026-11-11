# Orbion Technologies — Reporting Engine & CSV Exports

## 1. Overview

The Reporting & Data Export engine (`/admin/reports` and `/api/admin/reports/export`) allows authorized Orbion leadership to extract operational datasets as standardized CSV documents for business analysis, executive reporting, and external auditing.

---

## 2. Supported Report Types

| Report Type Identifier | Description | Data Sources |
| :--- | :--- | :--- |
| `traffic` | Daily page views, referrer domains, devices, and campaign tags | `analytics_events` |
| `enquiries` | Customer contact leads, company names, subjects, and statuses | `contact_leads` |
| `leads_funnel` | Inbound funnel progression and stage conversion percentages | `contact_leads` |
| `newsletter` | Opt-in subscriber roster, verification timestamps, and sources | `newsletter_subscribers` |
| `content` | Editorial inventory across blog articles, SaaS catalog, and studies | `blog_posts`, `products`, `case_studies` |
| `email_deliverability`| Transactional email delivery logs, retry counts, and status | `email_outbox` |

---

## 3. Security Standards & Injection Defense

### 3.1 Defensive CSV Formula Injection Sanitization (CWE-1236)
Spreadsheet applications (Microsoft Excel, LibreOffice Calc, Apple Numbers, Google Sheets) interpret cells starting with `=`, `+`, `-`, `@`, `\t`, or `\r` as dynamic formulas or executable DDE macros. If unmitigated, malicious user inputs (such as an enquiry company name `=cmd|'/c calc'!A1`) could execute arbitrary code when an administrator opens the CSV.

**Enforced Mitigation**:
The helper `sanitizeCsvCell()` inspects every string value. Any trimmed string starting with a formula trigger character is defensively prefixed with a single quote (`'`):
```typescript
const dangerousPrefixes = ["=", "+", "-", "@", "\t", "\r"];
const trimmed = str.trimStart();
if (dangerousPrefixes.some((p) => trimmed.startsWith(p))) {
  str = `'${str}`;
}
```

### 3.2 RFC 4180 Format Compliance
- Internal double-quotes (`"`) are escaped with double quotes (`""`).
- Rows terminate with standard CRLF (`\r\n`).
- Files include a UTF-8 Byte Order Mark (`\uFEFF`) ensuring Microsoft Excel renders UTF-8 international characters without garbling.

### 3.3 Server-Side Authorization & Audit Logging
- Every export endpoint verifies `reports:export` capability using `requireAdminSession()`.
- Every export dispatches an immutable audit log record to `audit_logs` capturing:
  - Actor ID of the requesting administrator
  - Export type (`traffic`, `enquiries`, etc.)
  - Applied date window (`startDate`, `endDate`)
  - Total row count exported

