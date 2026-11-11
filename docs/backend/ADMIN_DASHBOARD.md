# ORBION TECHNOLOGIES — ADMIN DASHBOARD SPECIFICATION

This document outlines the layout, metrics calculation, and user experience of the private administration dashboard (`/admin/dashboard`) for **Orbion Technologies**.

---

## 1. Design Direction & Visual Identity

The administration dashboard is a private operational console built specifically for company executives, sales engineers, and administrators. It follows Orbion's core visual identity while prioritizing information density, clarity, and performance.

### Design Tokens Used
* **Primary Accents**: `--color-petrol` (`#173B3F`) and `--color-copper` (`#C77D56`).
* **Backgrounds & Surfaces**: `--color-limestone-light` (`#F6F4EF`) and `--color-limestone-card` (`#FFFFFF`).
* **Borders & Dividers**: `--color-graphite-border` (`rgba(36, 43, 44, 0.1)`).
* **Typography**: Sans-serif (`Geist Sans`) for headers and prose; Monospace (`Geist Mono`) for references, timestamps, metrics, and role badges.

---

## 2. Dashboard Layout

### 2.1 Sidebar Navigation (`/components/admin/AdminSidebar.tsx`)
* **Company Branding**: Orbion logo icon, title, and "Admin Portal" sub-label.
* **Navigation Links**:
  - `Overview` (`/admin/dashboard`)
  - `Leads & Enquiries` (`/admin/leads`)
  - `Administrator Management` (`/admin/users`) — conditionally rendered for Super Admins.
  - `Audit Logs` (`/admin/audit-logs`) — conditionally rendered for Super Admins and Admins.
* **Footer**: Current authenticated administrator's name, email, and one-click `Sign Out` button.

### 2.2 Top Header (`/components/admin/AdminHeader.tsx`)
* Page Title & Subtitle.
* Authenticated Staff Identifier.
* Color-coded `RoleBadge` component (`Super Administrator`, `Administrator`, `Sales Executive`, etc.).
* Contextual action buttons (e.g. `Manage Leads`).

---

## 3. Real-Time Operational Metrics

All indicators are calculated from live PostgreSQL tables via [`src/services/admin-dashboard.service.ts`](file:///e:/Orbion%20Technologies%20Official%20Website/src/services/admin-dashboard.service.ts):

| Metric Card | Source Table | Filter Criteria | Operational Purpose |
| :--- | :--- | :--- | :--- |
| **Total Inquiries** | `contact_leads` | Lifetime count | High-level volume benchmark |
| **New & Uncontacted** | `contact_leads` | `status = 'new'` | Actionable queue requiring initial response |
| **Contacted** | `contact_leads` | `status = 'contacted'` | Inquiries currently in dialogue |
| **Qualified Leads** | `contact_leads` | `status = 'qualified'` | Sales-ready business opportunities |
| **Closed Inquiries** | `contact_leads` | `status = 'closed'` | Resolved or fulfilled inquiries |
| **Product Demos** | `demo_requests` | Lifetime count | Evaluation requests for planned software products |

*Rule: No fake numbers, mock statistics, or decorative animations are used in the production dashboard.*

---

## 4. Inquiries & Activity Widgets

1. **Recent Customer Inquiries Table**:
   - Displays the last 6 submissions with Reference ID, Name, Company/Email, Subject, Status Badge, and Date.
   - Quick "Inspect →" link opens the full lead management view.
2. **Audit Ledger Feed**:
   - Displays the last 6 system actions recorded in `audit_logs` with actor name, operation description, and timestamp.

