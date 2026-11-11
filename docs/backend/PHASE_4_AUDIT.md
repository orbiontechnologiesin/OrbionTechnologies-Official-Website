# ORBION TECHNOLOGIES — BACKEND ARCHITECTURE
## PHASE 4 PRE-IMPLEMENTATION AUDIT: CONTENT MANAGEMENT SYSTEM (CMS)

**Audit Date:** November 8, 2026  
**Auditor:** Senior Full-Stack Engineer, Backend Architect & Security Lead  
**Scope:** Phase 4 CMS Architecture, Database Schema, Permissions, Storage, Admin Dashboard & Public Integration  
**Status:** AUDIT COMPLETE — APPROVED FOR IMPLEMENTATION  

---

## 1. Executive Summary

This audit establishes the baseline architectural state of the Orbion Technologies codebase following the successful completion of **Phase 1 (Database & RLS Foundation)**, **Phase 2 (Contact APIs, Demo Requests & Transactional Email)**, and **Phase 3 (Admin Authentication, Session Security & RBAC Dashboard)**.

Phase 4 mandates building an enterprise-grade, secure, integrated Content Management System (CMS) within the existing Next.js 15 App Router architecture and Supabase PostgreSQL backend. The CMS will govern:
1. **Blog Management & Categories**
2. **Planned Product Catalog (Orbion's 7 planned SaaS products)**
3. **Approved Case Studies**
4. **Media Library (Supabase Storage integration)**
5. **Content Publishing Workflow (`draft` -> `in_review` -> `published` -> `archived`)**
6. **SEO Metadata Management & Dynamic Sitemap**
7. **Granular Cache Revalidation via Next.js `revalidatePath`**

---

## 2. Existing Architecture & Reusability Audit

### 2.1 Reusable Infrastructure
| Subsystem | Existing File / Asset | Reusability Assessment |
| :--- | :--- | :--- |
| **Server Supabase Client** | `src/lib/supabase/server.ts` | **Fully Reusable:** Asynchronously parses Next.js 15 cookie store, enforces RLS policies. |
| **Admin Supabase Client** | `src/lib/supabase/admin.ts` | **Fully Reusable:** High-privilege client bypassing RLS, restricted strictly to server actions & audit writes. |
| **Browser Supabase Client**| `src/lib/supabase/client.ts` | **Fully Reusable:** Standard singleton browser client. |
| **Session Security** | `src/lib/auth/session.ts` | **Fully Reusable:** Contains `getAdminSession()` and `requireAdminSession(permission)` for cryptographic verification. |
| **RBAC Matrix** | `src/lib/auth/permissions.ts`| **Extendable:** Contains role enum (`super_admin`, `admin`, `editor`, `sales`, `hr`, `viewer`). Role `editor` explicitly has placeholder comment for CMS. |
| **Edge Middleware** | `src/middleware.ts` | **Extendable:** Already guards `/admin/*` and `/api/admin/*`, while exempting public auth routes. |
| **Audit Ledger** | `public.audit_logs` | **Fully Reusable:** Append-only ledger with trigger protection preventing deletion or mutation. |
| **Admin Shell** | `src/components/admin/AdminSidebar.tsx` | **Extendable:** Fixed sidebar requiring new navigation entries for Blog, Products, Case Studies, and Media. |
| **Product Master Data** | `src/lib/product-detail-data.ts` | **Authoritative Seed Source:** Rich schema and descriptions for all 7 Orbion products (`orbion-crm`, `orbion-ai-chatbot`, `orbion-bookings`, `orbion-fit`, `orbion-dine`, `orbion-docs`, `orbion-insights`). |

### 2.2 What is Missing (To Be Built in Phase 4)
1. **Database Schema:**
   - `blog_categories` table (taxonomies with unique slug).
   - `blog_posts` table (full editorial lifecycle with author/category relations, SEO metadata, rich markdown content).
   - `products` table (persisting the 7 planned products, status: `coming_soon`, `in_development`, `available`, display order, features JSON).
   - `case_studies` table (client name, industry, problem/solution/outcome, published status).
   - `media_assets` table (file tracking, storage path, public vs. signed URL, MIME type, byte size, author).
2. **Supabase Storage:**
   - `media` storage bucket (public bucket with strict 10MB limit and image/document MIME type checks).
   - `documents` storage bucket (private bucket with signed URLs for confidential documents).
   - Storage RLS policies for `storage.objects`.
3. **Permissions Matrix:**
   - New capabilities: `cms:read`, `cms:create`, `cms:update`, `cms:delete`, `cms:publish`, `media:read`, `media:upload`, `media:delete`.
4. **Admin UI Routes:**
   - `/admin/blog` (Index, search, status/category filter, pagination).
   - `/admin/blog/new` & `/admin/blog/[id]/edit` (Content editor, slug generation, SEO panel, workflow controls).
   - `/admin/blog/categories` (Category manager with deletion safety check).
   - `/admin/products` & `/admin/products/[id]/edit` (Catalog manager with strict Coming Soon preservation).
   - `/admin/case-studies` (Listing, new, edit).
   - `/admin/media` (Grid view, search, upload dropzone, MIME inspection, public URL copier).
5. **Public UI Routes:**
   - `/blog` (Public list of published posts).
   - `/blog/[slug]` (Full reading experience for published posts, 404 for drafts).
   - `/case-studies` (Public list with dignified empty state when no approved studies exist).
   - `/case-studies/[slug]` (Detailed case study page).
   - `/products/[slug]` (Connected to database with fallback to static master data).
   - `src/app/sitemap.ts` (Dynamic sitemap including only published pages).
6. **API Route Handlers:**
   - `GET/POST /api/admin/blog`
   - `GET/PATCH/DELETE /api/admin/blog/[id]`
   - `GET/POST/PATCH/DELETE /api/admin/blog/categories`
   - `GET/PATCH /api/admin/products/[id]`
   - `GET/POST/PATCH/DELETE /api/admin/case-studies/[id]`
   - `POST/DELETE /api/admin/media`

---

## 3. Database Schema Dependencies & Migration Plan

### 3.1 Migration File: `20261108000005_phase4_cms_and_storage.sql`
The migration will declare the following relational structures:

```
+-----------------------------------------------------------------------------------+
|                                 DATABASE SCHEMA                                   |
+-----------------------------------------------------------------------------------+
|  profiles (id, full_name, email, role, ...)                                       |
|     ^                     ^                         ^                             |
|     | author_id           | author_id               | uploaded_by                 |
|     |                     |                         |                             |
|  blog_posts            case_studies              media_assets                     |
|  - id                  - id                      - id                             |
|  - title               - title                   - filename                       |
|  - slug (UNIQUE)       - slug (UNIQUE)           - original_name                  |
|  - category_id ----+   - client_name             - mime_type                      |
|  - status          |   - status                  - size_bytes                     |
|  - content         |   - challenge               - bucket ('media' | 'documents') |
|  - published_at    |   - solution                - storage_path                   |
|                    |   - outcome                 - public_url                     |
|                    v   - published_at                                             |
|              blog_categories                                                      |
|              - id                                                                 |
|              - name                                                               |
|              - slug (UNIQUE)                                                      |
+-----------------------------------------------------------------------------------+
|  products (persisted catalog)                                                     |
|  - id, number, name, slug (UNIQUE), category, status ('coming_soon' DEFAULT),     |
|    headline, short_description, features (JSONB), workflow (JSONB), display_order |
+-----------------------------------------------------------------------------------+
```

### 3.2 Content Status Check Constraints
All publication-capable tables (`blog_posts`, `case_studies`) will enforce an identical enum check:
```sql
CHECK (status IN ('draft', 'in_review', 'published', 'archived'))
```
Product status will enforce:
```sql
CHECK (status IN ('coming_soon', 'in_development', 'available'))
```
*Note: In accordance with core company instructions, all 7 Orbion products default to `coming_soon`.*

---

## 4. Permission Dependencies & RBAC Matrix Expansion

In [`src/lib/auth/permissions.ts`](file:///e:/Orbion%20Technologies%20Official%20Website/src/lib/auth/permissions.ts), the roles will map to CMS capabilities as follows:

| Permission | Description | `super_admin` | `admin` | `editor` | `sales` | `hr` | `viewer` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `cms:read` | View CMS content listings & drafts | Yes | Yes | Yes | No | No | Yes |
| `cms:create` | Create new drafts (posts, case studies) | Yes | Yes | Yes | No | No | No |
| `cms:update` | Update existing drafts and submit for review | Yes | Yes | Yes | No | No | No |
| `cms:delete` | Archive or delete content | Yes | Yes | No | No | No | No |
| `cms:publish` | Transition status to `published` or `unpublished` | Yes | Yes | No | No | No | No |
| `products:update` | Update product copy, features, or status | Yes | Yes | No | No | No | No |
| `media:read` | Browse and view media assets | Yes | Yes | Yes | No | No | Yes |
| `media:upload` | Upload new media assets to library | Yes | Yes | Yes | No | No | No |
| `media:delete` | Delete media assets from storage | Yes | Yes | No | No | No | No |

---

## 5. Storage Requirements & Security Safeguards

1. **Bucket Provisioning:**
   - `media`: Public bucket for web images, graphics, product logos, Open Graph banners.
   - `documents`: Private bucket for PDF whitepapers, proposals, or internal collateral.
2. **File Size Enforcement:**
   - 10MB ceiling for images/media assets.
   - 15MB ceiling for documents.
3. **MIME Validation:**
   - Only allow: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `application/pdf`.
   - Reject dangerous executable files (`.exe`, `.sh`, `.php`, `.js`, `.html`, `.bat`).
4. **Filename Sanitization:**
   - Stripping special characters, timestamping, and prepending UUIDs to eliminate collisions and directory traversal attacks (`../`).
5. **Storage RLS Policies:**
   - `media` bucket: `SELECT` allowed for `public` / `anon`.
   - `documents` bucket: `SELECT` allowed only for authenticated staff via signed URLs.
   - `INSERT`, `UPDATE`, `DELETE` allowed only for authenticated users with role `super_admin`, `admin`, or `editor`.

---

## 6. Public Route Integration & SEO Architecture

1. **Dynamic Sitemap (`src/app/sitemap.ts`):**
   - Queries `blog_posts` where `status = 'published'`.
   - Queries `case_studies` where `status = 'published'`.
   - Queries `products` (all 7 verified products).
   - Concatenates static routes (`/about`, `/contact`, `/pricing`, `/industries`, `/services`, `/solutions`).
   - Strictly excludes any draft, in-review, or archived records.
2. **Cache Invalidation:**
   - Every status transition (e.g. `draft` -> `published`, or `published` -> `draft`) calls `revalidatePath('/blog')`, `revalidatePath('/blog/[slug]')`, and `revalidatePath('/sitemap.xml')`.
3. **Empty States & Content Integrity:**
   - Case Studies: Since no verified commercial case studies have been approved yet, `/case-studies` will render a refined, honest empty state rather than fabricated company logos or artificial metrics.
   - Products: Retain strict Coming Soon messaging with no fabricated pricing or release timelines.

---

## 7. Security Risk Assessment

| Risk Vector | Mitigation Strategy |
| :--- | :--- |
| **Draft Leakage** | PostgreSQL RLS policy allows `anon` role to SELECT only where `status = 'published'`. Server-side data fetching explicitly appends `.eq('status', 'published')`. |
| **XSS in Rich Content** | Markdown renderer is configured with safe parsing or sanitization. Raw HTML execution is strictly disabled. |
| **Privilege Escalation** | Status changes to `published` require `cms:publish` capability. `editor` role attempting to publish receives HTTP 403 Forbidden. |
| **Orphaned Media Deletion** | Media deletion checks foreign references across `blog_posts`, `products`, and `case_studies` prior to dropping from storage. |
| **Category Deletion Cascade** | `blog_posts.category_id` references `blog_categories.id` with `ON DELETE RESTRICT`, preventing accidental removal of categories with active posts. |
| **Audit Bypass** | All content creations, edits, status transitions, and uploads write an immutable row to `public.audit_logs`. |

---

## 8. Audit Conclusion

The existing Phase 1–3 infrastructure is stable, secure, and ready to host Phase 4.
Implementation will proceed in the following structured sequence:
1. Database migration & Storage configuration (`20261108000005_phase4_cms_and_storage.sql`).
2. TypeScript database definitions (`src/types/database.ts`).
3. RBAC permission extensions (`src/lib/auth/permissions.ts`).
4. Core CMS server services (`src/services/cms-*.service.ts`).
5. Content Validation schemas (`src/lib/validation/cms.schema.ts`).
6. Admin API Route Handlers (`src/app/api/admin/cms/*`).
7. Admin Dashboard UI & Sidebar Integration.
8. Public Website Pages (`/blog`, `/blog/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/products`).
9. SEO & Dynamic Sitemap (`src/app/sitemap.ts`).
10. Automated Phase 4 Test Suite & Quality Verification.

