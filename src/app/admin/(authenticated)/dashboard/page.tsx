import React from "react";
import Link from "next/link";
import {
  Inbox,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  FileText,
  Award,
  Image as ImageIcon,
} from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import {
  getAdminDashboardMetrics,
  getDashboardRecentLeads,
  getDashboardRecentActivity,
} from "@/services/admin-dashboard.service";
import { getUnreadNotificationCount } from "@/services/admin-notifications.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Orbion Technologies",
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession("dashboard:view", "/admin/dashboard");

  const [metrics, recentLeads, recentActivity, unreadCount] = await Promise.all([
    getAdminDashboardMetrics(),
    getDashboardRecentLeads(6),
    getDashboardRecentActivity(6),
    getUnreadNotificationCount(session.profile.id, session.profile.role),
  ]);

  const statCards = [
    {
      label: "Total Inquiries",
      value: metrics.totalLeads,
      icon: Inbox,
      description: "Lifetime received contacts",
      color: "text-petrol",
      bg: "bg-petrol-subtle/70",
    },
    {
      label: "New & Uncontacted",
      value: metrics.newLeads,
      icon: Clock,
      description: "Requires staff response",
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      highlight: metrics.newLeads > 0,
    },
    {
      label: "Contacted",
      value: metrics.contactedLeads,
      icon: Sparkles,
      description: "Initial follow-up sent",
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "Qualified Leads",
      value: metrics.qualifiedLeads,
      icon: TrendingUp,
      description: "Confirmed opportunities",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Closed Inquiries",
      value: metrics.closedLeads,
      icon: CheckCircle2,
      description: "Resolved or fulfilled",
      color: "text-graphite-muted",
      bg: "bg-graphite/5",
    },
    {
      label: "Product Demos",
      value: metrics.totalDemoRequests,
      icon: Layers,
      description: "Upcoming software requests",
      color: "text-copper",
      bg: "bg-copper-subtle/80",
    },
  ];

  return (
    <>
      <AdminHeader
        title="Administrative Overview"
        description="Real-time operational indicators and inquiry management."
        role={session.profile.role}
        fullName={session.profile.fullName}
        unreadNotificationsCount={unreadCount}
        actions={
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper hover:bg-copper-hover text-pure-white rounded-md text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            <span>Manage Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      <main className="p-8 space-y-8">
        {/* Metric Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`bg-limestone-card p-5 rounded-xl border transition-all ${
                  card.highlight
                    ? "border-blue-500/40 shadow-sm ring-1 ring-blue-500/15"
                    : "border-graphite-border shadow-xs hover:border-graphite/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-graphite-muted uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div className={`w-7 h-7 rounded-md ${card.bg} ${card.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-bold font-mono text-graphite tracking-tight">
                    {card.value}
                  </span>
                  <p className="text-[11px] text-graphite-subtle mt-0.5 truncate">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* CMS Quick Overview Section */}
        <section className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-graphite-border mb-4">
            <div>
              <h2 className="text-sm font-semibold text-graphite tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-copper" />
                <span>Content Management Overview</span>
              </h2>
              <p className="text-xs text-graphite-subtle mt-0.5">
                Live publication telemetry across blog articles, catalog products, case studies, and media assets.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/admin/blog"
              className="p-4 rounded-lg bg-limestone-light/50 border border-graphite-border/70 hover:border-copper/50 hover:bg-limestone-light transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-graphite-muted">
                  Blog Articles
                </span>
                <FileText className="w-4 h-4 text-sage group-hover:text-copper transition-colors" />
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold font-mono text-graphite">
                  {metrics.totalBlogPosts}
                </span>
                <p className="text-[10px] text-graphite-subtle font-mono mt-0.5">
                  {metrics.publishedBlogPosts} Published • {metrics.draftBlogPosts} Drafts
                </p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="p-4 rounded-lg bg-limestone-light/50 border border-graphite-border/70 hover:border-copper/50 hover:bg-limestone-light transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-graphite-muted">
                  Products Catalog
                </span>
                <Layers className="w-4 h-4 text-sage group-hover:text-copper transition-colors" />
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold font-mono text-graphite">
                  {metrics.totalProducts}
                </span>
                <p className="text-[10px] text-graphite-subtle font-mono mt-0.5">
                  Planned SaaS Ecosystem
                </p>
              </div>
            </Link>

            <Link
              href="/admin/case-studies"
              className="p-4 rounded-lg bg-limestone-light/50 border border-graphite-border/70 hover:border-copper/50 hover:bg-limestone-light transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-graphite-muted">
                  Case Studies
                </span>
                <Award className="w-4 h-4 text-sage group-hover:text-copper transition-colors" />
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold font-mono text-graphite">
                  {metrics.publishedCaseStudies}
                </span>
                <p className="text-[10px] text-graphite-subtle font-mono mt-0.5">
                  Approved & Verified
                </p>
              </div>
            </Link>

            <Link
              href="/admin/media"
              className="p-4 rounded-lg bg-limestone-light/50 border border-graphite-border/70 hover:border-copper/50 hover:bg-limestone-light transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-graphite-muted">
                  Media Assets
                </span>
                <ImageIcon className="w-4 h-4 text-sage group-hover:text-copper transition-colors" />
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold font-mono text-graphite">
                  {metrics.totalMediaAssets}
                </span>
                <p className="text-[10px] text-graphite-subtle font-mono mt-0.5">
                  Stored Cloud Files
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Platform Intelligence & Operations Section */}
        <section className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-graphite-border mb-4">
            <div>
              <h2 className="text-sm font-semibold text-graphite tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-petrol" />
                <span>Business Operations & Platform Intelligence</span>
              </h2>
              <p className="text-xs text-graphite-subtle mt-0.5">
                Centralized telemetry across website traffic, lead progression, subscriber roster, and infrastructure health.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Business Intel", href: "/admin/business-intelligence", desc: "Executive KPI hub" },
              { label: "Site Analytics", href: "/admin/analytics", desc: "First-party traffic" },
              { label: "Lead Intel", href: "/admin/lead-intelligence", desc: "Funnel & conversion" },
              { label: "Newsletter", href: "/admin/newsletter", desc: "Subscriber roster" },
              { label: "System Health", href: "/admin/system-health", desc: "Outbox & database" },
              { label: "Reports / CSV", href: "/admin/reports", desc: "Formula-safe exports" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-3 rounded-lg bg-limestone-light/50 border border-graphite-border/70 hover:border-copper/50 hover:bg-limestone-light transition-all text-left group"
              >
                <span className="text-xs font-semibold text-graphite group-hover:text-copper block truncate">
                  {item.label}
                </span>
                <span className="text-[10px] text-graphite-subtle font-mono block mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Content Columns: Recent Inquiries & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Inquiries Table (2 Cols) */}
          <section className="lg:col-span-2 bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-graphite-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-graphite tracking-tight flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-copper" />
                  <span>Recent Customer Inquiries</span>
                </h2>
                <p className="text-xs text-graphite-subtle mt-0.5">
                  Latest contact submissions received through website channels.
                </p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-mono text-copper hover:text-copper-hover flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-10 h-10 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-graphite">No enquiries recorded yet</p>
                <p className="text-xs text-graphite-subtle mt-1">
                  When visitors submit inquiries on the Contact Us page, they will populate here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-limestone-light/60 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                    <tr>
                      <th className="px-6 py-3">Reference</th>
                      <th className="px-6 py-3">Name & Company</th>
                      <th className="px-6 py-3">Subject</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Received</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-graphite-border/60">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-limestone-light/40 transition-colors">
                        <td className="px-6 py-3.5 font-mono text-graphite-muted">
                          {lead.reference || "N/A"}
                        </td>
                        <td className="px-6 py-3.5">
                          <p className="font-medium text-graphite">{lead.fullName}</p>
                          <p className="text-[11px] text-graphite-subtle">{lead.company || lead.email}</p>
                        </td>
                        <td className="px-6 py-3.5 text-graphite max-w-[200px] truncate">
                          {lead.subject}
                        </td>
                        <td className="px-6 py-3.5">
                          <LeadStatusBadge status={lead.status} />
                        </td>
                        <td className="px-6 py-3.5 text-graphite-subtle font-mono text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="font-mono text-copper hover:text-copper-hover text-xs inline-flex items-center gap-1 font-medium"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Recent Audit Ledger (1 Col) */}
          <section className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-graphite-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-graphite tracking-tight flex items-center gap-2">
                  <Shield className="w-4 h-4 text-petrol" />
                  <span>Audit Trail</span>
                </h2>
                <p className="text-xs text-graphite-subtle mt-0.5">
                  Append-only administrative actions.
                </p>
              </div>
              <Link
                href="/admin/audit-logs"
                className="text-xs font-mono text-copper hover:text-copper-hover flex items-center gap-1 transition-colors"
              >
                <span>Logs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 flex-1">
              {recentActivity.length === 0 ? (
                <div className="p-8 text-center text-xs text-graphite-subtle">
                  No system audit records yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg bg-limestone-light/50 border border-graphite-border/50 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-graphite-subtle mb-1">
                        <span className="font-semibold text-petrol uppercase">
                          {log.action.replace(/_/g, " ")}
                        </span>
                        <span>
                          {new Date(log.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-graphite font-medium">
                        By {log.actorName || "Staff"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
