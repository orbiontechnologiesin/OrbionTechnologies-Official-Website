import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { getAnalyticsMetrics } from "./analytics.service";
import { getLeadIntelligenceSummary } from "./lead-intelligence.service";
import { getSystemHealthOverview } from "./system-health.service";

export interface BIMetrics {
  period: "7d" | "30d" | "90d" | "custom";
  startDate: string;
  endDate: string;
  website: {
    totalViews: number;
    uniqueVisitors: number;
    viewsTrendPct: number;
    topPages: { path: string; views: number }[];
    topReferrers: { domain: string; count: number }[];
    dailyTrends: { date: string; views: number; visitors: number }[];
  };
  enquiries: {
    total: number;
    newCount: number;
    qualifiedCount: number;
    closedCount: number;
    conversionRate: number;
    enquiriesTrendPct: number;
    topSources: { source: string; count: number }[];
  };
  newsletter: {
    activeSubscribers: number;
    newSubscribers: number;
    unsubscribed: number;
    netGrowthPct: number;
  };
  content: {
    publishedPosts: number;
    draftPosts: number;
    productsCount: number;
    publishedCaseStudies: number;
  };
  operations: {
    healthStatus: "healthy" | "degraded" | "down";
    dbLatencyMs: number;
    emailDeliveryRate: number;
    emailFailures: number;
    pendingEmails: number;
  };
}

import { calculateDateWindow } from "@/lib/validation/reporting.schema";
export { calculateDateWindow };

/**
 * Gathers centralized Business Intelligence metrics with period-over-period delta calculations.
 */
export async function getBusinessIntelligenceData(
  period: "7d" | "30d" | "90d" | "custom" = "30d",
  customStart?: string,
  customEnd?: string
): Promise<BIMetrics> {
  const supabase = await createServerClient();
  const { currentStart, currentEnd, prevStart, prevEnd } = calculateDateWindow(period, customStart, customEnd);

  // Parallel data extraction across analytics, leads, newsletter, CMS, and platform health
  const [
    currentAnalytics,
    prevAnalytics,
    leadSummary,
    prevLeadsRes,
    newsletterActiveRes,
    newsletterPeriodRes,
    newsletterPrevRes,
    cmsMetrics,
    systemHealth,
  ] = await Promise.all([
    getAnalyticsMetrics(currentStart, currentEnd),
    getAnalyticsMetrics(prevStart, prevEnd),
    getLeadIntelligenceSummary(currentStart, currentEnd),
    supabase.from("contact_leads").select("*", { count: "exact", head: true }).gte("created_at", prevStart).lt("created_at", prevEnd),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "subscribed"),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).gte("created_at", currentStart).lte("created_at", currentEnd),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).gte("created_at", prevStart).lt("created_at", prevEnd),
    Promise.all([
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("case_studies").select("*", { count: "exact", head: true }).eq("status", "published"),
    ]),
    getSystemHealthOverview(),
  ]);

  // Delta calculations
  const viewsTrendPct = prevAnalytics.totalViews > 0
    ? Math.round(((currentAnalytics.totalViews - prevAnalytics.totalViews) / prevAnalytics.totalViews) * 100)
    : currentAnalytics.totalViews > 0 ? 100 : 0;

  const prevLeadsCount = prevLeadsRes.count || 0;
  const enquiriesTrendPct = prevLeadsCount > 0
    ? Math.round(((leadSummary.totalLeads - prevLeadsCount) / prevLeadsCount) * 100)
    : leadSummary.totalLeads > 0 ? 100 : 0;

  const newSubsCount = newsletterPeriodRes.count || 0;
  const prevSubsCount = newsletterPrevRes.count || 0;
  const netGrowthPct = prevSubsCount > 0
    ? Math.round(((newSubsCount - prevSubsCount) / prevSubsCount) * 100)
    : newSubsCount > 0 ? 100 : 0;

  const [publishedBlogRes, draftBlogRes, productsRes, caseStudiesRes] = cmsMetrics;

  return {
    period,
    startDate: currentStart,
    endDate: currentEnd,
    website: {
      totalViews: currentAnalytics.totalViews,
      uniqueVisitors: currentAnalytics.uniqueVisitors,
      viewsTrendPct,
      topPages: currentAnalytics.topPages.slice(0, 5),
      topReferrers: currentAnalytics.topReferrers.slice(0, 5),
      dailyTrends: currentAnalytics.dailyTrends,
    },
    enquiries: {
      total: leadSummary.totalLeads,
      newCount: leadSummary.newLeads,
      qualifiedCount: leadSummary.qualifiedLeads,
      closedCount: leadSummary.closedLeads,
      conversionRate: leadSummary.qualificationRate,
      enquiriesTrendPct,
      topSources: leadSummary.bySource.slice(0, 5),
    },
    newsletter: {
      activeSubscribers: newsletterActiveRes.count || 0,
      newSubscribers: newSubsCount,
      unsubscribed: 0,
      netGrowthPct,
    },
    content: {
      publishedPosts: publishedBlogRes.count || 0,
      draftPosts: draftBlogRes.count || 0,
      productsCount: productsRes.count || 7,
      publishedCaseStudies: caseStudiesRes.count || 0,
    },
    operations: {
      healthStatus: systemHealth.overallStatus,
      dbLatencyMs: systemHealth.database.latencyMs,
      emailDeliveryRate: systemHealth.emailSystem.deliverySuccessRate,
      emailFailures: systemHealth.emailSystem.failed,
      pendingEmails: systemHealth.emailSystem.pending,
    },
  };
}
