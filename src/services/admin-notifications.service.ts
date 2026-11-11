import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { AdminRole, NotificationCategory } from "@/types/database";

export interface NotificationItem {
  id: string;
  recipientUserId: string | null;
  title: string;
  message: string;
  category: NotificationCategory;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  linkUrl: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface CreateNotificationParams {
  recipientUserId?: string | null;
  title: string;
  message: string;
  category: NotificationCategory;
  relatedEntityType?: string | null;
  relatedEntityId?: string | null;
  linkUrl?: string | null;
}

/**
 * Creates an administrative alert notification with deduplication.
 * Prevents flood alerts if an identical unread notification was issued recently.
 */
export async function createAdminNotification(
  params: CreateNotificationParams
): Promise<{ success: boolean; id?: string }> {
  const supabase = createAdminClient();

  // Deduplication: Check if an unread notification with identical category and entity exists in the last 10 minutes
  if (params.relatedEntityId && params.category) {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("admin_notifications")
      .select("id")
      .eq("category", params.category)
      .eq("related_entity_id", params.relatedEntityId)
      .is("read_at", null)
      .gte("created_at", tenMinutesAgo)
      .limit(1)
      .maybeSingle();

    if (existing) {
      // Duplicate alert suppressed
      return { success: true, id: existing.id };
    }
  }

  const { data, error } = await supabase
    .from("admin_notifications")
    .insert({
      recipient_user_id: params.recipientUserId || null,
      title: params.title.trim(),
      message: params.message.trim(),
      category: params.category,
      related_entity_type: params.relatedEntityType || null,
      related_entity_id: params.relatedEntityId || null,
      link_url: params.linkUrl || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[Orbion Notification Service] Failed to create notification:", error);
    return { success: false };
  }

  return { success: true, id: data.id };
}

/**
 * Retrieves notifications visible to the caller (personal + broadcast if admin).
 */
export async function getAdminNotifications(
  userId: string,
  userRole: AdminRole,
  options?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
    category?: string;
  }
): Promise<{
  notifications: NotificationItem[];
  total: number;
  unreadCount: number;
}> {
  const supabase = await createServerClient();
  const page = Math.max(1, options?.page || 1);
  const limit = Math.min(50, Math.max(1, options?.limit || 20));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("admin_notifications")
    .select("*", { count: "exact" });

  // Access filter: user's personal notifications OR broadcast (if admin)
  if (userRole === "super_admin" || userRole === "admin") {
    query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`);
  } else {
    query = query.eq("recipient_user_id", userId);
  }

  if (options?.unreadOnly) {
    query = query.is("read_at", null);
  }

  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category as NotificationCategory);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;

  if (error || !data) {
    console.error("[Orbion Notification Service] Error fetching notifications:", error);
    return { notifications: [], total: 0, unreadCount: 0 };
  }

  // Also query total unread count for badge
  const unreadCount = await getUnreadNotificationCount(userId, userRole);

  const notifications: NotificationItem[] = data.map((row) => ({
    id: row.id,
    recipientUserId: row.recipient_user_id,
    title: row.title,
    message: row.message,
    category: row.category,
    relatedEntityType: row.related_entity_type,
    relatedEntityId: row.related_entity_id,
    linkUrl: row.link_url,
    readAt: row.read_at,
    createdAt: row.created_at,
  }));

  return {
    notifications,
    total: count || 0,
    unreadCount,
  };
}

/**
 * Returns total unread notifications count for header badge.
 */
export async function getUnreadNotificationCount(
  userId: string,
  userRole: AdminRole
): Promise<number> {
  const supabase = await createServerClient();

  let query = supabase
    .from("admin_notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);

  if (userRole === "super_admin" || userRole === "admin") {
    query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`);
  } else {
    query = query.eq("recipient_user_id", userId);
  }

  const { count } = await query;
  return count || 0;
}

/**
 * Marks a specific notification as read.
 */
export async function markNotificationAsRead(
  notificationId: string,
  userId: string,
  userRole: AdminRole
): Promise<boolean> {
  const supabase = await createServerClient();

  let query = supabase
    .from("admin_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .is("read_at", null);

  if (userRole === "super_admin" || userRole === "admin") {
    query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`);
  } else {
    query = query.eq("recipient_user_id", userId);
  }

  const { error } = await query;
  return !error;
}

/**
 * Marks all notifications for caller as read.
 */
export async function markAllNotificationsAsRead(
  userId: string,
  userRole: AdminRole
): Promise<number> {
  const supabase = await createServerClient();

  let query = supabase
    .from("admin_notifications")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);

  if (userRole === "super_admin" || userRole === "admin") {
    query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`);
  } else {
    query = query.eq("recipient_user_id", userId);
  }

  const { error } = await query;
  return error ? 0 : 1;
}

