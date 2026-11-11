import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getLeadIntelligenceSummary } from "@/services/lead-intelligence.service";
import { calculateDateWindow } from "@/services/business-intelligence.service";
import { StatCard } from "@/components/admin/bi/StatCard";
import { FunnelChart } from "@/components/admin/bi/FunnelChart";
import { CategoryBarChart } from "@/components/admin/bi/CategoryBarChart";
import {
  Inbox,
  CheckCircle,
  Clock,
  Award,
  Download,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    period?: "7d" | "30d" | "90d" | "custom";
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function LeadIntelligencePage(props: PageProps) {
  const session = await requireAdminSession("lead_intelligence:view");
  const params = await props.searchParams;
  const period = params.period || "30d";

  const { currentStart, currentEnd } = calculateDateWindow(
    period,
    params.startDate,
    params.endDate
  );

  const data = await getLeadIntelligenceSummary(currentStart, currentEnd);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Lead Intelligence"
        description="Inbound customer enquiry progression, qualification rates, source attribution, and team assignments."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <form action="/api/admin/lead-intelligence/export" method="POST">
            <input type="hidden" name="period" value={period} />
            <input type="hidden" name="startDate" value={currentStart} />
            <input type="hidden" name="endDate" value={currentEnd} />
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
        {/* Date Window Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted block">
              Reporting Window
            </span>
            <span className="text-sm font-semibold text-graphite">
              {currentStart.slice(0, 10)} to {currentEnd.slice(0, 10)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { label: "Last 7 Days", value: "7d" },
              { label: "Last 30 Days", value: "30d" },
              { label: "Last 90 Days", value: "90d" },
            ].map((opt) => (
              <a
                key={opt.value}
                href={`/admin/lead-intelligence?period=${opt.value}`}
                className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                  period === opt.value
                    ? "bg-petrol text-pure-white border-petrol font-medium"
                    : "bg-limestone-light text-graphite-muted border-graphite-border hover:text-graphite"
                }`}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>

        {/* Lead KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Inquiries"
            value={data.totalLeads.toLocaleString()}
            icon={Inbox}
            subtext="Enquiries received in period"
          />
          <StatCard
            label="New / Uncontacted"
            value={data.newLeads.toLocaleString()}
            icon={Clock}
            subtext="Awaiting initial outreach"
          />
          <StatCard
            label="Qualified Pipeline"
            value={data.qualifiedLeads.toLocaleString()}
            icon={CheckCircle}
            subtext={`${data.qualificationRate}% qualification rate`}
          />
          <StatCard
            label="Closed / Won"
            value={data.closedLeads.toLocaleString()}
            icon={Award}
            subtext="Converted partnerships / customers"
          />
        </div>

        {/* Funnel & Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelChart
            stages={data.funnel}
            title="Inbound Lead Funnel"
            description="Progression from 'new' to 'contacted', 'qualified', and 'closed' stages"
          />

          <CategoryBarChart
            title="Inquiry Subject Taxonomy"
            description="Distribution of customer inquiry topics"
            items={data.byCategory.map((c) => ({
              label: c.category,
              count: c.count,
              percentage: c.percentage,
            }))}
            emptyMessage="No categorized leads recorded in this period"
          />
        </div>

        {/* Sources & Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBarChart
            title="Inbound Source Channels"
            description="Website contact forms, footer forms, and partner referrals"
            items={data.bySource.map((s) => ({
              label: s.source,
              count: s.count,
              percentage: s.percentage,
            }))}
            emptyMessage="No source records captured"
          />

          {/* Staff Assignment Distribution */}
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-graphite">
                  Staff Lead Allocation
                </h3>
                <p className="text-xs text-graphite-subtle mt-0.5">
                  Distribution of leads across internal operators
                </p>
              </div>
              <Users className="w-4 h-4 text-graphite-muted" />
            </div>

            {data.byStaff.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-graphite-muted border border-dashed border-graphite-border/60 rounded-lg">
                No staff assignments recorded
              </div>
            ) : (
              <div className="space-y-3">
                {data.byStaff.map((staff) => (
                  <div
                    key={staff.staffId || "unassigned"}
                    className="flex items-center justify-between p-3 rounded-lg bg-limestone-light border border-graphite-border/50 text-xs font-mono"
                  >
                    <span className="font-semibold text-graphite">
                      {staff.staffName}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-petrol/10 text-petrol font-bold">
                      {staff.assignedCount} leads
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

