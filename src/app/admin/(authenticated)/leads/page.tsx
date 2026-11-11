import React, { Suspense } from "react";
import Link from "next/link";
import { Inbox, ChevronLeft, ChevronRight } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { LeadFilterBar } from "@/components/admin/LeadFilterBar";
import { getAdminLeads } from "@/services/admin-leads.service";
import type { ContactLeadStatus } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leads Management | Orbion Technologies Admin",
};

interface LeadsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: ContactLeadStatus;
    page?: string;
  }>;
}

export default async function AdminLeadsPage(props: LeadsPageProps) {
  const session = await requireAdminSession("leads:read", "/admin/leads");
  const params = await props.searchParams;

  const search = params.search || "";
  const status = params.status;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const { leads, totalCount, totalPages, limit } = await getAdminLeads({
    search,
    status,
    page,
    limit: 15,
  });

  return (
    <>
      <AdminHeader
        title="Inquiries & Lead Management"
        description="Review, qualify, assign, and manage inbound customer contact inquiries."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-6">
        <Suspense fallback={<div className="font-mono text-xs text-graphite-subtle">Loading filters...</div>}>
          <LeadFilterBar currentSearch={search} currentStatus={status} />
        </Suspense>

        <section className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-graphite">No enquiries found</h3>
              <p className="text-xs text-graphite-subtle mt-1 max-w-sm mx-auto">
                {search || status
                  ? "No submissions matched the selected filter or search term. Try adjusting your filters."
                  : "Customer inquiries submitted through the website will appear here in real time."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-limestone-light/70 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                  <tr>
                    <th className="px-6 py-3.5">Reference</th>
                    <th className="px-6 py-3.5">Contact Details</th>
                    <th className="px-6 py-3.5">Subject & Preview</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Received</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-border/60">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-limestone-light/40 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-graphite">
                        {lead.reference || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-graphite">{lead.fullName}</p>
                        <p className="text-[11px] text-graphite-subtle">{lead.email}</p>
                        {lead.company && (
                          <span className="inline-block mt-0.5 text-[10px] font-mono bg-graphite/5 text-graphite-muted px-1.5 py-0.2 rounded">
                            {lead.company}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-[280px]">
                        <p className="font-medium text-graphite truncate">{lead.subject}</p>
                        <p className="text-[11px] text-graphite-subtle truncate mt-0.5">
                          {lead.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <LeadStatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-graphite-subtle whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-petrol-surface hover:bg-petrol-light text-pure-white rounded-md text-xs transition-colors"
                        >
                          <span>Manage</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-graphite-border flex items-center justify-between font-mono text-xs text-graphite-muted bg-limestone-light/30">
              <div>
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalCount)} of {totalCount} leads
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/leads?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ""}${status ? `&status=${status}` : ""}`}
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
                  href={`/admin/leads?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}${status ? `&status=${status}` : ""}`}
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
