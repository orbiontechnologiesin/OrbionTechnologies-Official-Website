import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSystemHealthOverview, getOperationalLogs } from "@/services/system-health.service";
import { StatCard } from "@/components/admin/bi/StatCard";
import {
  Activity,
  Database,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SystemHealthPage() {
  const session = await requireAdminSession("system_health:view");
  const health = await getSystemHealthOverview();
  const logs = await getOperationalLogs(15);

  const isHealthy = health.overallStatus === "healthy";

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Platform Health & Monitoring"
        description="Real-time infrastructure connectivity, transactional email reliability, background queue state, and system logs."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Status Callout Banner */}
        <div
          className={`p-5 rounded-xl border flex items-center justify-between shadow-xs ${
            isHealthy
              ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
              : "bg-amber-50/60 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {isHealthy ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <strong className="text-sm font-semibold block">
                {isHealthy
                  ? "All Core Platform Subsystems Operational"
                  : "Degraded Operational State Detected"}
              </strong>
              <span className="text-xs font-mono opacity-80">
                Database ping: {health.database.latencyMs}ms | Edge Region: {health.environment.edgeRegion}
              </span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-md bg-pure-white/80 border border-current font-bold">
            {health.overallStatus.toUpperCase()}
          </span>
        </div>

        {/* Telemetry KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <StatCard
            label="Database Ping"
            value={`${health.database.latencyMs} ms`}
            icon={Database}
            subtext="Supabase PostgreSQL roundtrip"
            badge={health.database.status.toUpperCase()}
          />
          <StatCard
            label="Email Delivery Rate"
            value={`${health.emailSystem.deliverySuccessRate}%`}
            icon={Mail}
            subtext={`${health.emailSystem.sent} delivered out of ${health.emailSystem.total}`}
          />
          <StatCard
            label="Outbox Queue Size"
            value={health.emailSystem.pending}
            icon={Clock}
            subtext="Pending background dispatches"
          />
          <StatCard
            label="Failed Deliveries"
            value={health.emailSystem.failed}
            icon={AlertTriangle}
            subtext="Max retry attempts exhausted"
          />
        </div>

        {/* Recent Email Failures & Diagnostic Records */}
        <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-graphite">
                Transactional Email Outbox Diagnostics
              </h3>
              <p className="text-xs text-graphite-subtle mt-0.5">
                Delivery errors tracked in the exponential backoff retry queue
              </p>
            </div>
            <Mail className="w-4 h-4 text-graphite-muted" />
          </div>

          {health.emailSystem.recentFailures.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-emerald-800 bg-emerald-50/50 border border-emerald-200/60 rounded-lg">
              ✓ Zero active delivery failures recorded in the outbox queue.
            </div>
          ) : (
            <div className="divide-y divide-graphite-border/40 text-xs font-mono">
              {health.emailSystem.recentFailures.map((failure) => (
                <div
                  key={failure.id}
                  className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-graphite">
                        {failure.recipient}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">
                        {failure.template}
                      </span>
                    </div>
                    <p className="text-rose-700 text-[11px] truncate max-w-xl">
                      {failure.lastError || "No explicit provider error message returned"}
                    </p>
                  </div>
                  <span className="text-graphite-muted shrink-0 text-[11px]">
                    {failure.attempts} attempts • {failure.createdAt.slice(0, 16).replace("T", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Operational Activity Log */}
        <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-graphite">
                Recent Operational Audit Events
              </h3>
              <p className="text-xs text-graphite-subtle mt-0.5">
                Immutable record of administrative mutations and job executions
              </p>
            </div>
            <Activity className="w-4 h-4 text-graphite-muted" />
          </div>

          <div className="divide-y divide-graphite-border/40 text-xs font-mono">
            {logs.map((log) => (
              <div
                key={log.id}
                className="py-2.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 truncate">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      log.severity === "error"
                        ? "bg-rose-500"
                        : log.severity === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-graphite font-medium truncate">
                    {log.message}
                  </span>
                  <span className="text-[10px] text-graphite-muted px-1.5 py-0.5 rounded bg-limestone-light border border-graphite-border">
                    {log.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-graphite-muted text-[11px]">
                  <span>{log.actor}</span>
                  <span>{log.timestamp.slice(11, 19)} UTC</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
