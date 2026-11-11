import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAnalyticsMetrics } from "@/services/analytics.service";
import { calculateDateWindow } from "@/services/business-intelligence.service";
import { StatCard } from "@/components/admin/bi/StatCard";
import { TrendLineChart } from "@/components/admin/bi/TrendLineChart";
import { CategoryBarChart } from "@/components/admin/bi/CategoryBarChart";
import {
  Globe,
  Users,
  Compass,
  Monitor,
  CheckCircle,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    period?: "7d" | "30d" | "90d" | "custom";
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function AnalyticsPage(props: PageProps) {
  const session = await requireAdminSession("analytics:view");
  const params = await props.searchParams;
  const period = params.period || "30d";

  const { currentStart, currentEnd } = calculateDateWindow(
    period,
    params.startDate,
    params.endDate
  );

  const metrics = await getAnalyticsMetrics(currentStart, currentEnd);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Website Analytics"
        description="First-party, privacy-preserving website traffic, popular content, and conversion event monitoring."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Privacy Assurance Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-petrol/5 border border-petrol/20 text-xs font-mono text-petrol">
          <Shield className="w-4 h-4 text-copper shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-graphite mb-0.5">
              First-Party Privacy-Conscious Architecture
            </strong>
            Orbion Analytics operates with zero third-party advertising cookies, zero browser fingerprinting, and respects visitor &quot;Do Not Track&quot; headers. All metrics represent genuine aggregate engagement.
          </div>
        </div>

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
                href={`/admin/analytics?period=${opt.value}`}
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

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Page Views"
            value={metrics.totalViews.toLocaleString()}
            icon={Globe}
            subtext="First-party verified requests"
          />
          <StatCard
            label="Unique Visitors"
            value={metrics.uniqueVisitors.toLocaleString()}
            icon={Users}
            subtext="Pseudonymous visitor tokens"
          />
          <StatCard
            label="Active Sessions"
            value={metrics.totalSessions.toLocaleString()}
            icon={Compass}
            subtext="Ephemeral visitor sessions"
          />
          <StatCard
            label="Conversion Actions"
            value={(metrics.contactSubmissions + metrics.demoSubmissions + metrics.newsletterSubmissions).toLocaleString()}
            icon={CheckCircle}
            subtext={`${metrics.contactSubmissions} contact, ${metrics.demoSubmissions} demos, ${metrics.newsletterSubmissions} subs`}
          />
        </div>

        {/* Traffic Chart */}
        <TrendLineChart
          data={metrics.dailyTrends}
          title="Daily Traffic Progression"
          description="Daily aggregate views and unique visitor volume"
        />

        {/* Detailed Breakdown Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Pages */}
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-graphite mb-1">
              Top Page Destinations
            </h3>
            <p className="text-xs text-graphite-subtle mb-4">
              Most requested URLs
            </p>

            {metrics.topPages.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-graphite-muted border border-dashed border-graphite-border/60 rounded-lg">
                No page views recorded
              </div>
            ) : (
              <div className="divide-y divide-graphite-border/40">
                {metrics.topPages.map((page, idx) => (
                  <div
                    key={page.path}
                    className="py-2.5 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-graphite-muted w-4">#{idx + 1}</span>
                      <span className="text-graphite font-medium truncate">
                        {page.path}
                      </span>
                    </div>
                    <span className="text-petrol font-semibold ml-2">
                      {page.views}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Referrers */}
          <div>
            <CategoryBarChart
              title="Referring Domains"
              description="External domains referring inbound traffic"
              items={metrics.topReferrers.map((r) => ({
                label: r.domain,
                count: r.count,
              }))}
              emptyMessage="No external referring traffic captured"
            />
          </div>

          {/* Device Distribution */}
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-graphite">
                  Device Categories
                </h3>
                <p className="text-xs text-graphite-subtle mt-0.5">
                  Visitor viewport distribution
                </p>
              </div>
              <Monitor className="w-4 h-4 text-graphite-muted" />
            </div>

            {metrics.devices.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-graphite-muted border border-dashed border-graphite-border/60 rounded-lg">
                No device telemetry available
              </div>
            ) : (
              <div className="space-y-4">
                {metrics.devices.map((dev) => (
                  <div key={dev.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-graphite capitalize font-medium">
                        {dev.category}
                      </span>
                      <span className="text-graphite-muted">
                        {dev.count} ({dev.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-limestone-light overflow-hidden border border-graphite-border/40">
                      <div
                        className="h-full rounded-full bg-copper transition-all"
                        style={{ width: `${dev.percentage}%` }}
                      />
                    </div>
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

