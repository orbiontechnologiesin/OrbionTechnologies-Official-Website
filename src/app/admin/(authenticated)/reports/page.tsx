import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Download,
  ShieldCheck,
  Globe,
  Inbox,
  Filter,
  Mail,
  Layers,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsAndExportsPage() {
  const session = await requireAdminSession("reports:view");

  const reportCards = [
    {
      id: "traffic",
      title: "Website Traffic & Engagement",
      description: "First-party page views, referring domains, visitor device categories, and UTM campaign attributes.",
      icon: Globe,
    },
    {
      id: "enquiries",
      title: "Business Enquiries & Leads",
      description: "Full customer enquiry records with contact details, company, source channel, and assignment status.",
      icon: Inbox,
    },
    {
      id: "leads_funnel",
      title: "Lead Conversion Funnel",
      description: "Aggregated status stage progression from intake to qualification and final closure rates.",
      icon: Filter,
    },
    {
      id: "newsletter",
      title: "Newsletter Subscribers",
      description: "Active and unsubscribed email contacts, verified opt-in timestamps, and acquisition channels.",
      icon: Mail,
    },
    {
      id: "content",
      title: "Content & Catalog Inventory",
      description: "Live inventory of technical blog posts, 7 SaaS products in development, and approved case studies.",
      icon: Layers,
    },
    {
      id: "email_deliverability",
      title: "Transactional Email Reliability",
      description: "Outbox delivery logs, dispatch timestamps, retry attempts, and provider error codes.",
      icon: Activity,
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Reports & CSV Data Exports"
        description="Audit-logged, formula-sanitized business reports and operational data exports."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Security & Injection Protection Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-petrol/5 border border-petrol/20 text-xs font-mono text-petrol shadow-xs">
          <ShieldCheck className="w-4 h-4 text-copper shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-graphite mb-0.5">
              Defensive CSV Formula Injection Sanitization (CWE-1236)
            </strong>
            All exported text cells are sanitized against spreadsheet formula injection attacks (=, +, -, @). Internal staff commentary and sensitive cryptographic tokens are excluded. Every export is recorded in the immutable audit log.
          </div>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-copper/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-limestone-light border border-graphite-border flex items-center justify-center text-petrol mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-graphite mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-graphite-subtle leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <form action="/api/admin/reports/export" method="POST" className="space-y-3 pt-4 border-t border-graphite-border/40">
                  <input type="hidden" name="reportType" value={card.id} />

                  <div className="flex items-center justify-between gap-2">
                    <select
                      name="period"
                      defaultValue="30d"
                      className="px-2.5 py-1.5 text-xs font-mono bg-limestone-light border border-graphite-border rounded-lg text-graphite focus:outline-hidden"
                    >
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 90 Days</option>
                    </select>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-petrol text-pure-white hover:bg-petrol-light transition-colors border border-petrol-light cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </form>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
