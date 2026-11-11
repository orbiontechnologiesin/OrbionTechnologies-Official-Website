import type { AdminRole } from "@/types/database";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — ROLE-BASED ACCESS CONTROL (RBAC) PERMISSIONS
 * ==============================================================================
 * Centralized, server-enforced permission registry for Orbion administration.
 *
 * Rules:
 * 1. Never trust user-editable metadata or client-supplied role flags.
 * 2. Every administrative API and server component must verify permissions.
 * 3. Super Admin is the sole role authorized to assign roles or manage users.
 * ==============================================================================
 */

export type AdminPermission =
  | "dashboard:view"
  | "leads:read"
  | "leads:update"
  | "leads:assign"
  | "leads:delete"
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete"
  | "audit_logs:read"
  | "settings:read"
  | "settings:update"
  | "cms:read"
  | "cms:create"
  | "cms:update"
  | "cms:delete"
  | "cms:publish"
  | "products:update"
  | "media:read"
  | "media:upload"
  | "media:delete"
  | "business_intelligence:view"
  | "analytics:view"
  | "lead_intelligence:view"
  | "newsletter:view"
  | "newsletter:export"
  | "notifications:view"
  | "notifications:manage"
  | "system_health:view"
  | "reports:view"
  | "reports:export";

/**
 * Explicit mapping of roles to permitted administrative capabilities.
 */
export const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  super_admin: [
    "dashboard:view",
    "leads:read",
    "leads:update",
    "leads:assign",
    "leads:delete",
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "audit_logs:read",
    "settings:read",
    "settings:update",
    "cms:read",
    "cms:create",
    "cms:update",
    "cms:delete",
    "cms:publish",
    "products:update",
    "media:read",
    "media:upload",
    "media:delete",
    "business_intelligence:view",
    "analytics:view",
    "lead_intelligence:view",
    "newsletter:view",
    "newsletter:export",
    "notifications:view",
    "notifications:manage",
    "system_health:view",
    "reports:view",
    "reports:export",
  ],
  admin: [
    "dashboard:view",
    "leads:read",
    "leads:update",
    "leads:assign",
    "users:read",
    "audit_logs:read",
    "settings:read",
    "cms:read",
    "cms:create",
    "cms:update",
    "cms:delete",
    "cms:publish",
    "products:update",
    "media:read",
    "media:upload",
    "media:delete",
    "business_intelligence:view",
    "analytics:view",
    "lead_intelligence:view",
    "newsletter:view",
    "newsletter:export",
    "notifications:view",
    "notifications:manage",
    "system_health:view",
    "reports:view",
    "reports:export",
  ],
  sales: [
    "dashboard:view",
    "leads:read",
    "leads:update",
    "leads:assign",
    "lead_intelligence:view",
    "notifications:view",
    "notifications:manage",
    "reports:view",
  ],
  editor: [
    "dashboard:view",
    "cms:read",
    "cms:create",
    "cms:update",
    "media:read",
    "media:upload",
    "notifications:view",
    "notifications:manage",
  ],
  hr: [
    "dashboard:view",
    "notifications:view",
    "notifications:manage",
  ],
  viewer: [
    "dashboard:view",
    "leads:read",
    "cms:read",
    "media:read",
    "notifications:view",
  ],
} as const;

/**
 * Check if a role has a specific capability.
 */
export function hasPermission(
  role: AdminRole | null | undefined,
  permission: AdminPermission
): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  return Boolean(permissions && permissions.includes(permission));
}

/**
 * Check if a role possesses ANY of the specified permissions.
 */
export function hasAnyPermission(
  role: AdminRole | null | undefined,
  permissions: AdminPermission[]
): boolean {
  if (!role) return false;
  return permissions.some((perm) => hasPermission(role, perm));
}

/**
 * Check if a role possesses ALL of the specified permissions.
 */
export function hasAllPermissions(
  role: AdminRole | null | undefined,
  permissions: AdminPermission[]
): boolean {
  if (!role) return false;
  return permissions.every((perm) => hasPermission(role, perm));
}

/**
 * Human-readable display label for admin roles.
 */
export function getRoleLabel(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "Super Administrator";
    case "admin":
      return "Administrator";
    case "sales":
      return "Sales Executive";
    case "editor":
      return "Content Editor";
    case "hr":
      return "HR Manager";
    case "viewer":
      return "Read-Only Viewer";
    default:
      return "Staff";
  }
}

/**
 * Comprehensive role description.
 */
export function getRoleDescription(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "Complete administrative control over all resources, users, security, and audit records.";
    case "admin":
      return "Manages day-to-day leads, views audit activity, and oversees permitted site operations.";
    case "sales":
      return "Manages business leads, tracks conversion statuses, and adds internal customer notes.";
    case "editor":
      return "Reserved for future CMS and editorial content publishing.";
    case "hr":
      return "Reserved for future recruitment workflows and job applicant evaluations.";
    case "viewer":
      return "Read-only access to permitted inquiries without modification or assignment rights.";
    default:
      return "";
  }
}

/**
 * Privilege escalation check: Prevents an administrator from assigning roles
 * that exceed their own authority.
 */
export function isRoleAssignableBy(
  assignerRole: AdminRole,
  targetRole: AdminRole
): boolean {
  if (assignerRole === "super_admin") {
    return Boolean(targetRole);
  }
  // No other role is permitted to create or modify administrators
  return false;
}
