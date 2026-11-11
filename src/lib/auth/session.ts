import "server-only";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { hasPermission, type AdminPermission } from "@/lib/auth/permissions";
import type { AdminRole } from "@/types/database";

export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface AdminSession {
  user: {
    id: string;
    email: string;
  };
  profile: AdminProfile;
}

/**
 * ==============================================================================
 * SERVER-SIDE SESSION VALIDATION
 * ==============================================================================
 * 1. Uses `@supabase/ssr` cookie-based authentication.
 * 2. Authenticates cryptographically against Supabase Auth via `getUser()`.
 * 3. Enforces that the administrator account exists, is active, and possesses a profile.
 * ==============================================================================
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const supabase = await createServerClient();

    // Cryptographically verify session token with Supabase Auth
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.email) {
      return null;
    }

    // Retrieve trusted profile record
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, avatar_url, is_active, created_at")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    // Deactivated account check
    if (!profile.is_active) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      profile: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        avatarUrl: profile.avatar_url,
        isActive: profile.is_active,
        createdAt: profile.created_at,
      },
    };
  } catch (err) {
    console.error("[Orbion Auth Error] Failed to retrieve admin session:", err);
    return null;
  }
}

/**
 * Enforces authentication on Server Components.
 * Redirects to `/admin/login` if unauthenticated or `/admin/unauthorized` if lacking permission.
 */
export async function requireAdminSession(
  requiredPermission?: AdminPermission,
  currentPath = "/admin/dashboard"
): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    const safeCallback = encodeURIComponent(sanitizeRedirectUrl(currentPath));
    redirect(`/admin/login?next=${safeCallback}`);
  }

  if (requiredPermission && !hasPermission(session.profile.role, requiredPermission)) {
    redirect("/admin/unauthorized");
  }

  return session;
}

/**
 * Open-Redirect Prevention: Sanitizes redirect destination URLs.
 * Strictly permits only relative administrative paths starting with `/admin`.
 */
export function sanitizeRedirectUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") {
    return "/admin/dashboard";
  }

  const trimmed = url.trim();

  // Prevent protocol relative URLs (//evil.com) or external schemes (https://)
  if (trimmed.startsWith("//") || trimmed.includes("://") || !trimmed.startsWith("/admin")) {
    return "/admin/dashboard";
  }

  // Prevent redirect loops back to login/forgot-password
  if (trimmed.startsWith("/admin/login") || trimmed.startsWith("/admin/forgot-password")) {
    return "/admin/dashboard";
  }

  return trimmed;
}

