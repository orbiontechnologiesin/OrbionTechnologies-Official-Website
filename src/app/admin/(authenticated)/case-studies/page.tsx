import React from "react";
import Link from "next/link";
import {
  Award,
  Plus,
  Search,
  Eye,
  Edit,
  ShieldAlert,
} from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ContentStatusBadge } from "@/components/admin/ContentStatusBadge";
import { getCaseStudiesAdmin } from "@/services/cms-case-studies.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Case Studies Management | Orbion Admin",
};

export default async function AdminCaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
}) {
  const session = await requireAdminSession("cms:read", "/admin/case-studies");
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const status = params.status || "all";
  const search = params.search || "";

  const { studies, total, totalPages } = await getCaseStudiesAdmin({
    page,
    limit: 15,
    status,
    search,
  });

  return (
    <>
      <AdminHeader
        title="Commercial Case Studies"
        description="Curate verified client case studies, engineering deliveries, and architecture milestones."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <Link
            href="/admin/case-studies/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-copper hover:bg-copper-hover text-pure-white rounded-md text-xs font-mono font-medium transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Study</span>
          </Link>
        }
      />

      <main className="p-8 space-y-6">
        {/* Compliance Warning */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-graphite space-y-1">
            <p className="font-semibold text-amber-800 dark:text-amber-300">
              Approved Client Evidence Policy
            </p>
            <p className="text-graphite-muted leading-relaxed">
              Orbion strictly prohibits fabricating customer names, logos, metrics, or quotes. Only verified commercial engagements with signed publicity approval may be transitioned to &quot;Published&quot;. If zero published studies exist, the public website displays an honest empty state.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <section className="bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
          <form method="GET" className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite-subtle pointer-events-none" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search case studies by title or client..."
                className="w-full pl-9 pr-4 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              className="bg-limestone-light/50 border border-graphite-border rounded-lg px-3 py-2 text-xs font-mono text-graphite focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Drafts</option>
              <option value="in_review">In Review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <button
              type="submit"
              className="px-3.5 py-2 bg-petrol text-pure-white rounded-lg text-xs font-mono hover:bg-petrol-light transition-colors"
            >
              Filter
            </button>
          </form>

          <span className="text-xs font-mono text-graphite-muted">
            {total} {total === 1 ? "case study" : "case studies"} registered
          </span>
        </section>

        {/* Studies Table */}
        <div className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
          {studies.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-sage" />
              </div>
              <h3 className="text-sm font-semibold text-graphite">No case studies recorded yet</h3>
              <p className="text-xs text-graphite-subtle mt-1 max-w-sm mx-auto">
                No case studies match your query. Commercial case studies remain unpublished until verified and approved.
              </p>
              <Link
                href="/admin/case-studies/new"
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper text-pure-white rounded-md text-xs font-mono font-medium hover:bg-copper-hover transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Draft Case Study</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-limestone-light/60 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                  <tr>
                    <th className="px-6 py-3">Case Study Title & Slug</th>
                    <th className="px-6 py-3">Client & Industry</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Published Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-border/60">
                  {studies.map((study) => (
                    <tr key={study.id} className="hover:bg-limestone-light/40 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/case-studies/${study.id}/edit`}
                          className="font-medium text-graphite hover:text-copper transition-colors block text-sm"
                        >
                          {study.title}
                        </Link>
                        <span className="font-mono text-[11px] text-graphite-subtle block mt-0.5">
                          /case-studies/{study.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-graphite">{study.clientName || "Confidential"}</p>
                        <span className="text-[11px] text-graphite-subtle font-mono">
                          {study.industry || "Technology"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ContentStatusBadge status={study.status} />
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-graphite-muted">
                        {study.publishedAt
                          ? new Date(study.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {study.status === "published" && (
                          <Link
                            href={`/case-studies/${study.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 p-1.5 text-graphite-subtle hover:text-graphite rounded transition-colors"
                            title="View Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/case-studies/${study.id}/edit`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-copper hover:text-copper-hover bg-copper-subtle/50 rounded border border-copper/20 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="p-4 border-t border-graphite-border/70 flex items-center justify-between text-xs font-mono text-graphite-muted">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/case-studies?page=${page - 1}&status=${status}&search=${search}`}
                    className="px-3 py-1 rounded border border-graphite-border hover:bg-limestone-light"
                  >
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/case-studies?page=${page + 1}&status=${status}&search=${search}`}
                    className="px-3 py-1 rounded border border-graphite-border hover:bg-limestone-light"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

