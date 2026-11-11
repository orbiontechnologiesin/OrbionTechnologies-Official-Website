import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getBusinessIntelligenceData } from "@/services/business-intelligence.service";
import { StatCard } from "@/components/admin/bi/StatCard";
import { TrendLineChart } from "@/components/admin/bi/TrendLineChart";
import { CategoryBarChart } from "@/components/admin/bi/CategoryBarChart";
import {
  Globe,
  Inbox,
  Mail,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    period?: "7d" | "30d" | "90d" | "custom";
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function BusinessIntelligencePage(props: PageProps) {
  const session = await requireAdminSession("business_intelligence:view");
  const params = await props.searchParams;
  const period = params.period || "30d";

  const data = await getBusinessIntelligenceData(
    period,
    params.startDate,
    params.endDate
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Business Intelligence"
        description="Comprehensive platform telemetry, visitor traffic, lead conversion, and operational health."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Period Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted block">
              Reporting Window
            </span>
            <span className="text-sm font-semibold text-graphite">
              {data.startDate.slice(0, 10)} to {data.endDate.slice(0, 10)}
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
                href={`/admin/business-intelligence?period=${opt.value}`}
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

        {/* Section 1: KPI Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Page Views"
            value={data.website.totalViews.toLocaleString()}
            deltaPct={data.website.viewsTrendPct}
            icon={Globe}
            subtext="First-party privacy tracking"
          />
          <StatCard
            label="Business Enquiries"
            value={data.enquiries.total.toLocaleString()}
            deltaPct={data.enquiries.enquiriesTrendPct}
            icon={Inbox}
            subtext={`${data.enquiries.qualifiedCount} qualified leads`}
          />
          <StatCard
            label="Newsletter Subscribers"
            value={data.newsletter.activeSubscribers.toLocaleString()}
            deltaPct={data.newsletter.netGrowthPct}
            icon={Mail}
            subtext={`${data.newsletter.newSubscribers} joined this period`}
          />
          <StatCard
            label="Platform Status"
            value={data.operations.healthStatus === "healthy" ? "100% Operational" : "Degraded"}
            icon={data.operations.healthStatus === "healthy" ? CheckCircle2 : AlertTriangle}
            badge={`${data.operations.dbLatencyMs}ms ping`}
            subtext={`${data.operations.emailDeliveryRate}% email success rate`}
          />
        </div>

        {/* Section 2: Traffic Trend & Lead Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendLineChart
              data={data.website.dailyTrends}
              title="Website Visitor Trends"
              description="Daily traffic events recorded across the official Orbion web estate"
            />
          </div>

          <div>
            <CategoryBarChart
              title="Enquiry Source Channels"
              description="Inbound channels yielding business leads"
              items={data.enquiries.topSources.map((s) => ({
                label: s.source,
                count: s.count,
              }))}
              emptyMessage="No enquiry sources recorded yet"
            />
          </div>
        </div>

        {/* Section 3: Popular Content & Publishing Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-graphite mb-1">
              Most Visited Pages
            </h3>
            <p className="text-xs text-graphite-subtle mb-4">
              Top requested routes in this reporting period
            </p>

            {data.website.topPages.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-graphite-muted border border-dashed border-graphite-border/60 rounded-lg">
                No page view traffic recorded yet
              </div>
            ) : (
              <div className="divide-y divide-graphite-border/40">
                {data.website.topPages.map((page, idx) => (
                  <div
                    key={page.path}
                    className="py-2.5 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="w-5 text-graphite-muted text-right">
                        #{idx + 1}
                      </span>
                      <span className="text-graphite font-medium truncate">
                        {page.path}
                      </span>
                    </div>
                    <span className="text-petrol font-semibold ml-4">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publishing & Content Health */}
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-graphite">
                  Content & Catalog Status
                </h3>
                <p className="text-xs text-graphite-subtle mt-0.5">
                  Live publications across CMS and SaaS product catalog
                </p>
              </div>
              <Layers className="w-4 h-4 text-graphite-muted" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-limestone-light border border-graphite-border/50">
                <span className="text-[11px] font-mono uppercase text-graphite-muted block">
                  Blog Posts
                </span>
                <div className="text-xl font-bold font-mono text-graphite mt-1">
                  {data.content.publishedPosts}
                </div>
                <span className="text-[11px] text-graphite-subtle">
                  {data.content.draftPosts} in draft / review
                </span>
              </div>

              <div className="p-4 rounded-lg bg-limestone-light border border-graphite-border/50">
                <span className="text-[11px] font-mono uppercase text-graphite-muted block">
                  SaaS Products
                </span>
                <div className="text-xl font-bold font-mono text-graphite mt-1">
                  {data.content.productsCount}
                </div>
                <span className="text-[11px] text-graphite-subtle">
                  Official products in development
                </span>
              </div>

              <div className="p-4 rounded-lg bg-limestone-light border border-graphite-border/50">
                <span className="text-[11px] font-mono uppercase text-graphite-muted block">
                  Approved Case Studies
                </span>
                <div className="text-xl font-bold font-mono text-graphite mt-1">
                  {data.content.publishedCaseStudies}
                </div>
                <span className="text-[11px] text-graphite-subtle">
                  Verified client engagements
                </span>
              </div>

              <div className="p-4 rounded-lg bg-limestone-light border border-graphite-border/50">
                <span className="text-[11px] font-mono uppercase text-graphite-muted block">
                  Email Outbox Queue
                </span>
                <div className="text-xl font-bold font-mono text-graphite mt-1">
                  {data.operations.pendingEmails}
                </div>
                <span className="text-[11px] text-graphite-subtle">
                  {data.operations.emailFailures} failed attempts
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
