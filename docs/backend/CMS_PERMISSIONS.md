# Orbion Technologies — CMS Roles & Permissions Matrix

## 1. Overview

The CMS permission framework extends the core Role-Based Access Control (RBAC) engine established in Phase 3 (`src/lib/auth/permissions.ts`). Authorization checks are enforced at both the API Route boundary (`requireCapability`) and the Database boundary (Supabase PostgreSQL Row Level Security policies).

---

## 2. Granular CMS Capabilities

The CMS introduces 9 dedicated capabilities:

| Capability | Scope / Purpose |
| :--- | :--- |
| `cms:read` | View blog posts, categories, case studies, and editorial telemetry in admin |
| `cms:create` | Create new blog posts, categories, and case study drafts |
| `cms:update` | Edit existing blog posts, categories, and case studies |
| `cms:delete` | Delete blog posts, categories, or case studies |
| `cms:publish` | Transition content status to `published` or `archived`, or trigger unpublishing |
| `products:update` | Update SaaS product public catalog fields, headlines, and development status |
| `media:read` | Browse and view files in the media asset library |
| `media:upload` | Upload new assets and documents to Supabase Storage |
| `media:delete` | Permanently delete assets from storage buckets |

---

## 3. Role-to-Capability Mapping Matrix

Every system role is assigned explicit capabilities based on the principle of least privilege:

| Capability | `super_admin` | `admin` | `editor` | `sales` | `hr` | `viewer` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `cms:read` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `cms:create` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `cms:update` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `cms:delete` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `cms:publish` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `products:update` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `media:read` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `media:upload` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `media:delete` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Key Policy Rules:
1. **Editors Can Draft, But Cannot Publish**:
   Editors possess `cms:create` and `cms:update`. They can draft and submit posts for review (`status = 'in_review'`), but cannot transition content to `published` or `archived`.
2. **Editors Cannot Delete**:
   Destructive actions (`cms:delete`, `media:delete`) are restricted to `admin` and `super_admin` to prevent accidental loss of intellectual property or orphaned media links.
3. **Product Catalog Protection**:
   Updating public product status or catalog descriptions requires `products:update`, held exclusively by `admin` and `super_admin`.
4. **Sales & HR Boundary**:
   The `sales` and `hr` roles have zero access to CMS operations or media storage, maintaining clean role segregation.
5. **Viewers Read-Only**:
   `viewer` has read access (`cms:read`, `media:read`) for auditing and editorial review, but cannot modify any content.

---

## 4. Enforcement Implementation

### API Route Handler Guard
```typescript
// Example: src/app/api/admin/cms/blog/route.ts
const session = await requireCapability("cms:create");
if (!session) {
  return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
}
```

### PostgreSQL Row Level Security (RLS)
The migration `supabase/migrations/20261108000005_phase4_cms_and_storage.sql` establishes:
- Public anonymous users: `SELECT` allowed ONLY where `status = 'published'` (or products where `status IS NOT NULL`).
- Authenticated staff: `SELECT` allowed across all statuses if user has `cms:read`.
- Mutations: `INSERT`, `UPDATE`, `DELETE` governed by the user's role profile checked via `has_role(auth.uid(), ARRAY['super_admin', 'admin', 'editor'])`.

