import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminAuditLogs } from "@/services/admin-audit.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Audit Logs | Orbion Technologies Admin",
};

interface AuditLogsPageProps {
  searchParams: Promise<{
    page?: string;
    action?: string;
    entityType?: string;
  }>;
}

export default async function AdminAuditLogsPage(props: AuditLogsPageProps) {
  const session = await requireAdminSession("audit_logs:read", "/admin/audit-logs");
  const params = await props.searchParams;

  const page = Math.max(1, parseInt(params.page || "1", 10));
  const { logs, totalCount, totalPages, limit } = await getAdminAuditLogs({
    page,
    limit: 25,
    action: params.action,
    entityType: params.entityType,
  });

  return (
    <>
      <AdminHeader
        title="Audit Logs & Compliance Ledger"
        description="Immutable, append-only record of administrative events and operations."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-6">
        <section className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-graphite">No audit records</h3>
              <p className="text-xs text-graphite-subtle mt-1">
                System operations (logins, status changes, assignments, user modifications) will record here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-limestone-light/70 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                  <tr>
                    <th className="px-6 py-3.5">Timestamp</th>
                    <th className="px-6 py-3.5">Actor</th>
                    <th className="px-6 py-3.5">Action</th>
                    <th className="px-6 py-3.5">Entity</th>
                    <th className="px-6 py-3.5">Metadata Snapshot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-border/60">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-limestone-light/40 transition-colors">
                      <td className="px-6 py-4 font-mono text-[11px] text-graphite-subtle whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-graphite block">
                          {log.actorName}
                        </span>
                        {log.actorId && (
                          <span className="font-mono text-[10px] text-graphite-subtle">
                            {log.actorId.slice(0, 8)}...
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono">
                        <span className="inline-block px-2 py-0.5 rounded bg-petrol/10 text-petrol font-medium text-[11px] border border-petrol/20">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-graphite-muted">
                        <span className="uppercase text-[10px] text-graphite-subtle block">
                          {log.entityType}
                        </span>
                        {log.entityId ? `${log.entityId.slice(0, 8)}...` : "—"}
                      </td>
                      <td className="px-6 py-4 max-w-xs font-mono text-[11px]">
                        <pre className="p-2 bg-limestone-light/70 rounded border border-graphite-border/70 overflow-x-auto text-[10px] text-graphite-muted leading-tight">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-graphite-border flex items-center justify-between font-mono text-xs text-graphite-muted bg-limestone-light/30">
              <div>
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalCount)} of {totalCount} records
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/audit-logs?page=${page - 1}`}
                  aria-disabled={page <= 1}
                  className={`px-2.5 py-1.5 rounded border border-graphite-border flex items-center gap-1 ${
                    page <= 1
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-limestone-card hover:text-graphite cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </Link>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Link
                  href={`/admin/audit-logs?page=${page + 1}`}
                  aria-disabled={page >= totalPages}
                  className={`px-2.5 py-1.5 rounded border border-graphite-border flex items-center gap-1 ${
                    page >= totalPages
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-limestone-card hover:text-graphite cursor-pointer"
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
