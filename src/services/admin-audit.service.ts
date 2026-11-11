import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Tables, Json } from "@/types/database";

export interface AuditLogItem {
  id: string;
  actorId: string | null;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AuditLogFilterOptions {
  page?: number;
  limit?: number;
  action?: string;
  entityType?: string;
}

/**
 * Retrieves paginated audit logs for Super Admin and Admin roles.
 */
export async function getAdminAuditLogs(options: AuditLogFilterOptions = {}) {
  const { page = 1, limit = 25, action, entityType } = options;
  const offset = (page - 1) * limit;

  const supabase = await createServerClient();

  let query = supabase
    .from("audit_logs")
    .select(
      `
      id,
      actor_id,
      action,
      entity_type,
      entity_id,
      metadata,
      created_at,
      profiles:actor_id(full_name, email)
    `,
      { count: "exact" }
    );

  if (action && action.trim().length > 0) {
    query = query.eq("action", action.trim());
  }

  if (entityType && entityType.trim().length > 0) {
    query = query.eq("entity_type", entityType.trim());
  }

  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(`Failed to query audit logs: ${error.message}`);
  }

  const logs: AuditLogItem[] = (data || []).map((row: Tables<"audit_logs"> & { profiles: { full_name: string; email: string } | null }) => {
    const profile = row.profiles as { full_name: string; email: string } | null;
    return {
      id: row.id,
      actorId: row.actor_id,
      actorName: profile?.full_name ? `${profile.full_name} (${profile.email})` : "System / Unassigned",
      action: row.action,
      entityType: row.entity_type,
      entityId: row.entity_id,
      metadata: (row.metadata as Record<string, unknown>) || {},
      createdAt: row.created_at,
    };
  });

  return {
    logs,
    totalCount: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
    limit,
  };
}

/**
 * Persists an immutable audit log entry to PostgreSQL.
 */
export async function recordAuditAction(
  actorId: string | null,
  action: string,
  entityType: string,
  entityId: string | null = null,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from("audit_logs").insert({
      actor_id: actorId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata as Json,
    });
  } catch (err) {
    console.error("[Orbion Audit Log Error] Failed to write audit action:", err);
  }
}

