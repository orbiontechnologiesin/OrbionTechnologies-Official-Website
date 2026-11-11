# ORBION TECHNOLOGIES — ROLE-BASED ACCESS CONTROL (RBAC)

This specification defines the Role-Based Access Control matrix, permission registry, and PostgreSQL Row Level Security policies for **Orbion Technologies** (`https://orbiontechnologies.in`).

---

## 1. Role Definitions

| Role Identifier | Role Title | Core Operational Scope |
| :--- | :--- | :--- |
| `super_admin` | Super Administrator | Complete administrative control over all resources, staff management, role assignment, and audit records. |
| `admin` | Administrator | Manages day-to-day leads, views audit activity, and oversees permitted site operations. Cannot create or alter Super Admins. |
| `sales` | Sales Executive | Manages inbound business leads, updates qualification statuses, assigns staff, and writes internal notes. |
| `editor` | Content Editor | Read-only dashboard view; reserved for future CMS and editorial content publishing. |
| `hr` | HR Manager | Read-only dashboard view; reserved for future careers, job applicants, and recruitment workflows. |
| `viewer` | Read-Only Viewer | Read-only access to permitted inquiries without modification or assignment rights. |

---

## 2. Granular Permissions Matrix

| Permission Key | Description | `super_admin` | `admin` | `sales` | `editor` | `hr` | `viewer` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `dashboard:view` | Access `/admin/dashboard` | Yes | Yes | Yes | Yes | Yes | Yes |
| `leads:read` | View contact leads & search | Yes | Yes | Yes | Denied | Denied | Yes |
| `leads:update` | Update lead status & add notes | Yes | Yes | Yes | Denied | Denied | Denied |
| `leads:assign` | Assign staff to inquiries | Yes | Yes | Yes | Denied | Denied | Denied |
| `leads:delete` | Hard delete customer leads | Yes | Denied | Denied | Denied | Denied | Denied |
| `users:read` | View administrator roster | Yes | Yes | Denied | Denied | Denied | Denied |
| `users:create` | Invite new administrators | Yes | Denied | Denied | Denied | Denied | Denied |
| `users:update` | Change roles & activate/deactivate | Yes | Denied | Denied | Denied | Denied | Denied |
| `audit_logs:read` | Inspect system audit ledger | Yes | Yes | Denied | Denied | Denied | Denied |
| `settings:read` | Inspect system settings | Yes | Yes | Denied | Denied | Denied | Denied |
| `settings:update` | Modify system configurations | Yes | Denied | Denied | Denied | Denied | Denied |

---

## 3. Centralized Authorization Architecture

Permissions are defined in [`src/lib/auth/permissions.ts`](file:///e:/Orbion%20Technologies%20Official%20Website/src/lib/auth/permissions.ts):

```typescript
import { hasPermission } from "@/lib/auth/permissions";

// Verify permission on server component or API route
if (!hasPermission(session.profile.role, "users:create")) {
  return NextResponse.json({ message: "Access denied." }, { status: 403 });
}
```

### PostgreSQL Defense in Depth
Authorization is enforced twice:
1. **Application Layer (Next.js)**: Server components call `requireAdminSession(permission)` and API routes call `hasPermission(role, permission)`.
2. **Database Layer (PostgreSQL RLS)**: Security definer functions (`public.current_user_role()`, `public.can_manage_leads()`, `public.can_manage_users()`, `public.can_view_audit_logs()`) evaluate the authenticated caller (`auth.uid()`) against `public.profiles`.

---

## 4. Privilege Escalation Prevention Rules

1. **No Client Role State**: The frontend cannot dictate its role; the role is loaded directly from PostgreSQL via server-side session checks.
2. **Self-Modification Block**:
   - `updateStaffRole()` refuses requests where `targetUserId === actorId`.
   - `updateStaffStatus()` refuses requests where `targetUserId === actorId`.
   - PostgreSQL RLS policy `"Users can update own avatar and name"` explicitly requires `role = (SELECT p.role FROM profiles WHERE p.id = auth.uid())`, prohibiting self-promotion via direct SQL.

