import "server-only";

import { createServerClient } from "@/lib/supabase/server";

export interface EmailOutboxHealth {
  pending: number;
  processing: number;
  sent: number;
  failed: number;
  total: number;
  deliverySuccessRate: number;
  recentFailures: {
    id: string;
    recipient: string;
    template: string;
    attempts: number;
    lastError: string | null;
    createdAt: string;
  }[];
}

export interface SystemHealthOverview {
  overallStatus: "healthy" | "degraded" | "down";
  database: {
    status: "connected" | "disconnected" | "latency_high";
    latencyMs: number;
    timestamp: string;
  };
  emailSystem: EmailOutboxHealth;
  environment: {
    nodeEnv: string;
    nextVersion: string;
    edgeRegion: string;
  };
}

export interface OperationalLogItem {
  id: string;
  timestamp: string;
  severity: "info" | "warning" | "error";
  category: string;
  message: string;
  actor: string;
}

/**
 * Checks platform health metrics without exposing secrets or credentials.
 */
export async function getSystemHealthOverview(): Promise<SystemHealthOverview> {
  const supabase = await createServerClient();
  const startTime = Date.now();

  let dbConnected = false;
  let latencyMs = 0;

  try {
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    latencyMs = Date.now() - startTime;
    dbConnected = !error && count !== null;
  } catch {
    dbConnected = false;
    latencyMs = Date.now() - startTime;
  }

  // Email Outbox metrics
  const [pendingRes, processingRes, sentRes, failedRes, failuresData] = await Promise.all([
    supabase.from("email_outbox").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("email_outbox").select("*", { count: "exact", head: true }).eq("status", "processing"),
    supabase.from("email_outbox").select("*", { count: "exact", head: true }).eq("status", "sent"),
    supabase.from("email_outbox").select("*", { count: "exact", head: true }).eq("status", "failed"),
    supabase
      .from("email_outbox")
      .select("id, recipient, template, attempts, last_error, created_at")
      .eq("status", "failed")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const pending = pendingRes.count || 0;
  const processing = processingRes.count || 0;
  const sent = sentRes.count || 0;
  const failed = failedRes.count || 0;
  const total = pending + processing + sent + failed;
  const deliverySuccessRate = total > 0 ? Math.round((sent / total) * 100) : 100;

  const recentFailures = (failuresData.data || []).map((row) => ({
    id: row.id,
    recipient: row.recipient,
    template: row.template,
    attempts: row.attempts,
    lastError: row.last_error,
    createdAt: row.created_at,
  }));

  let overallStatus: "healthy" | "degraded" | "down" = "healthy";
  if (!dbConnected) {
    overallStatus = "down";
  } else if (latencyMs > 1000 || failed > 10) {
    overallStatus = "degraded";
  }

  return {
    overallStatus,
    database: {
      status: !dbConnected ? "disconnected" : latencyMs > 600 ? "latency_high" : "connected",
      latencyMs,
      timestamp: new Date().toISOString(),
    },
    emailSystem: {
      pending,
      processing,
      sent,
      failed,
      total,
      deliverySuccessRate,
      recentFailures,
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || "development",
      nextVersion: "15.x",
      edgeRegion: process.env.VERCEL_REGION || "local",
    },
  };
}

/**
 * Retrieves safe filtered operational logs from audit_logs and failed outbox entries.
 */
export async function getOperationalLogs(limit = 15): Promise<OperationalLogItem[]> {
  const supabase = await createServerClient();

  const { data: logs, error } = await supabase
    .from("audit_logs")
    .select("id, action, entity_type, created_at, actor_id")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !logs) {
    return [];
  }

  return logs.map((log) => {
    const isError = log.action.includes("FAIL") || log.action.includes("ERROR");
    const isWarn = log.action.includes("WARN") || log.action.includes("DELETE");

    return {
      id: log.id,
      timestamp: log.created_at,
      severity: isError ? "error" : isWarn ? "warning" : "info",
      category: log.entity_type,
      message: `Action executed: ${log.action}`,
      actor: log.actor_id ? "Authenticated Staff" : "System Worker",
    };
  });
}

