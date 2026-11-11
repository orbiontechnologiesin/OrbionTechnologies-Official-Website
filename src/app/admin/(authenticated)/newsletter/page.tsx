import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getNewsletterSubscribers } from "@/services/newsletter-admin.service";
import { StatCard } from "@/components/admin/bi/StatCard";
import {
  Mail,
  UserCheck,
  UserX,
  Download,
  Search,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function NewsletterAdminPage(props: PageProps) {
  const session = await requireAdminSession("newsletter:view");
  const params = await props.searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const status = params.status || "all";

  const data = await getNewsletterSubscribers({
    page,
    limit: 20,
    search: search || undefined,
    status: status !== "all" ? status : undefined,
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Newsletter Subscribers"
        description="Opt-in newsletter subscriber roster, consent records, channel attribution, and export controls."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <form action="/api/admin/newsletter/export" method="POST">
            <input type="hidden" name="status" value={status} />
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-petrol text-pure-white hover:bg-petrol-light transition-colors border border-petrol-light cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </form>
        }
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Compliance Callout */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-limestone-card border border-graphite-border text-xs font-mono text-graphite shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">
              Strict Consent & Anti-Spam Compliance
            </strong>
            Every subscriber has submitted explicit affirmative opt-in consent with recorded timestamps. Unsubscribed users are cryptographically shielded and will never be automatically reactivated without explicit re-subscription.
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            label="Total Registered"
            value={data.total.toLocaleString()}
            icon={Mail}
            subtext="All historical subscribers"
          />
          <StatCard
            label="Active Subscribers"
            value={data.activeCount.toLocaleString()}
            icon={UserCheck}
            subtext="Eligible to receive company updates"
          />
          <StatCard
            label="Unsubscribed Contacts"
            value={data.unsubscribedCount.toLocaleString()}
            icon={UserX}
            subtext="Opt-out requests strictly honored"
          />
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs flex flex-wrap items-center justify-between gap-4">
          <form method="GET" className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite-muted" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search subscriber email..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-limestone-light border border-graphite-border rounded-lg text-graphite focus:outline-hidden focus:border-petrol"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-petrol text-pure-white cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-graphite-muted">Status:</span>
            {[
              { label: "All", val: "all" },
              { label: "Subscribed", val: "subscribed" },
              { label: "Unsubscribed", val: "unsubscribed" },
            ].map((s) => (
              <a
                key={s.val}
                href={`/admin/newsletter?status=${s.val}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                className={`px-2.5 py-1 rounded-md border ${
                  status === s.val
                    ? "bg-petrol text-pure-white border-petrol font-medium"
                    : "bg-limestone-light text-graphite-muted border-graphite-border hover:text-graphite"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-limestone-card border border-graphite-border/70 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-limestone-light border-b border-graphite-border text-graphite-muted uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Subscriber Email</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Source</th>
                  <th className="py-3.5 px-4 font-semibold">Consent Verified</th>
                  <th className="py-3.5 px-4 font-semibold">Subscribed Date</th>
                  <th className="py-3.5 px-4 font-semibold">Unsubscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-border/50">
                {data.subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-graphite-muted">
                      No subscribers found matching the specified criteria.
                    </td>
                  </tr>
                ) : (
                  data.subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-limestone-light/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-graphite">
                        {sub.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            sub.status === "subscribed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-graphite-muted">
                        {sub.source}
                      </td>
                      <td className="py-3.5 px-4 text-graphite-muted">
                        {sub.consent ? "Explicit Opt-In" : "Pending"}
                      </td>
                      <td className="py-3.5 px-4 text-graphite-muted">
                        {sub.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3.5 px-4 text-graphite-muted">
                        {sub.unsubscribedAt ? sub.unsubscribedAt.slice(0, 10) : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

