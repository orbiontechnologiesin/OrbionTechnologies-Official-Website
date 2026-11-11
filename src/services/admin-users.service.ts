import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AdminRole, Tables } from "@/types/database";

export interface StaffUserItem {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Retrieves all registered staff profiles.
 */
export async function getStaffUsers(): Promise<StaffUserItem[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, avatar_url, is_active, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to list staff users: ${error.message}`);
  }

  return (data || []).map((p: Tables<"profiles">) => ({
    id: p.id,
    email: p.email,
    fullName: p.full_name,
    role: p.role,
    avatarUrl: p.avatar_url,
    isActive: p.is_active,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));
}

/**
 * Invites a new administrator or staff member.
 * Only callable by Super Admin.
 */
export async function inviteStaffUser(params: {
  email: string;
  fullName: string;
  role: AdminRole;
  actorId: string;
}) {
  const adminClient = createAdminClient();
  const normalizedEmail = params.email.trim().toLowerCase();

  // 1. Check if user already exists in profiles
  const { data: existingProfile } = await adminClient
    .from("profiles")
    .select("id")
    .eq("email", normalizedEmail)
    .single();

  if (existingProfile) {
    throw new Error(`An administrator account with email ${normalizedEmail} already exists.`);
  }

  // 2. Dispatch invitation via Supabase Auth Admin
  const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(
    normalizedEmail,
    {
      data: {
        full_name: params.fullName,
      },
    }
  );

  if (inviteError) {
    throw new Error(`Failed to send invitation: ${inviteError.message}`);
  }

  const newUserId = inviteData.user.id;

  // 3. Upsert into profiles table
  const { error: profileError } = await adminClient.from("profiles").upsert(
    {
      id: newUserId,
      email: normalizedEmail,
      full_name: params.fullName,
      role: params.role,
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (profileError) {
    throw new Error(`User was invited in Auth but profile creation failed: ${profileError.message}`);
  }

  // 4. Record audit log
  await adminClient.from("audit_logs").insert({
    actor_id: params.actorId,
    action: "invite_admin_user",
    entity_type: "profile",
    entity_id: newUserId,
    metadata: {
      email: normalizedEmail,
      role: params.role,
      invited_by: params.actorId,
    },
  });

  return { success: true, userId: newUserId, email: normalizedEmail };
}

/**
 * Deactivates or reactivates a staff account.
 */
export async function updateStaffStatus(params: {
  targetUserId: string;
  isActive: boolean;
  actorId: string;
}) {
  if (params.targetUserId === params.actorId) {
    throw new Error("Security Violation: You cannot deactivate your own administrative account.");
  }

  const adminClient = createAdminClient();

  const { data: targetProfile, error: getError } = await adminClient
    .from("profiles")
    .select("role, email, is_active")
    .eq("id", params.targetUserId)
    .single();

  if (getError || !targetProfile) {
    throw new Error("Target user profile not found.");
  }

  const { error: updateError } = await adminClient
    .from("profiles")
    .update({
      is_active: params.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.targetUserId);

  if (updateError) {
    throw new Error(`Failed to update user status: ${updateError.message}`);
  }

  // Record audit log
  await adminClient.from("audit_logs").insert({
    actor_id: params.actorId,
    action: params.isActive ? "reactivate_admin_user" : "deactivate_admin_user",
    entity_type: "profile",
    entity_id: params.targetUserId,
    metadata: {
      email: targetProfile.email,
      previous_status: targetProfile.is_active,
      new_status: params.isActive,
    },
  });

  return { success: true };
}

/**
 * Changes a staff member's administrative role.
 */
export async function updateStaffRole(params: {
  targetUserId: string;
  newRole: AdminRole;
  actorId: string;
}) {
  if (params.targetUserId === params.actorId) {
    throw new Error("Security Violation: You cannot modify your own administrative role.");
  }

  const adminClient = createAdminClient();

  const { data: targetProfile, error: getError } = await adminClient
    .from("profiles")
    .select("role, email")
    .eq("id", params.targetUserId)
    .single();

  if (getError || !targetProfile) {
    throw new Error("Target user profile not found.");
  }

  const oldRole = targetProfile.role;

  const { error: updateError } = await adminClient
    .from("profiles")
    .update({
      role: params.newRole,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.targetUserId);

  if (updateError) {
    throw new Error(`Failed to update user role: ${updateError.message}`);
  }

  // Record audit log
  await adminClient.from("audit_logs").insert({
    actor_id: params.actorId,
    action: "change_admin_role",
    entity_type: "profile",
    entity_id: params.targetUserId,
    metadata: {
      email: targetProfile.email,
      previous_role: oldRole,
      new_role: params.newRole,
    },
  });

  return { success: true };
}
