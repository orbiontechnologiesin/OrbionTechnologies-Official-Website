import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { AnalyticsEventInput } from "@/lib/validation/analytics.schema";
import type { AnalyticsDeviceCategory, Json } from "@/types/database";

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  contactVisits: number;
  contactSubmissions: number;
  demoSubmissions: number;
  newsletterSubmissions: number;
  topPages: { path: string; views: number }[];
  topReferrers: { domain: string; count: number }[];
  devices: { category: AnalyticsDeviceCategory; count: number; percentage: number }[];
  dailyTrends: { date: string; views: number; visitors: number }[];
}

/**
 * Persists a privacy-conscious analytics event to PostgreSQL.
 * Executed server-side using service_role to decouple ingestion from public user permissions.
 */
export async function recordAnalyticsEvent(
  event: AnalyticsEventInput
): Promise<{ success: boolean; eventId?: string }> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("analytics_events")
    .insert({
      event_name: event.eventName,
      page_path: event.pagePath,
      referrer_domain: event.referrerDomain || null,
      visitor_id: event.visitorId,
      session_id: event.sessionId,
      device_category: event.deviceCategory,
      browser_category: event.browserCategory || null,
      utm_source: event.utmSource || null,
      utm_medium: event.utmMedium || null,
      utm_campaign: event.utmCampaign || null,
      metadata: event.metadata as Json,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[Orbion Analytics Service] Event ingestion error:", error);
    return { success: false };
  }

  return { success: true, eventId: data.id };
}

/**
 * Computes aggregated traffic and conversion metrics for an administrator-selected date window.
 */
export async function getAnalyticsMetrics(
  startDate: string,
  endDate: string
): Promise<AnalyticsSummary> {
  const supabase = await createServerClient();

  // Fetch events within the target date window
  const { data: events, error } = await supabase
    .from("analytics_events")
    .select("event_name, page_path, referrer_domain, visitor_id, session_id, device_category, created_at")
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .order("created_at", { ascending: true })
    .limit(5000);

  if (error || !events || events.length === 0) {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      totalSessions: 0,
      contactVisits: 0,
      contactSubmissions: 0,
      demoSubmissions: 0,
      newsletterSubmissions: 0,
      topPages: [],
      topReferrers: [],
      devices: [],
      dailyTrends: [],
    };
  }

  const visitorsSet = new Set<string>();
  const sessionsSet = new Set<string>();
  const pageCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0, unknown: 0 };
  const dailyMap: Record<string, { views: number; visitors: Set<string> }> = {};

  let totalViews = 0;
  let contactVisits = 0;
  let contactSubmissions = 0;
  let demoSubmissions = 0;
  let newsletterSubmissions = 0;

  for (const ev of events) {
    visitorsSet.add(ev.visitor_id);
    sessionsSet.add(ev.session_id);

    // Date aggregation
    const dateKey = ev.created_at.slice(0, 10);
    if (!dailyMap[dateKey]) {
      dailyMap[dateKey] = { views: 0, visitors: new Set() };
    }
    dailyMap[dateKey].visitors.add(ev.visitor_id);

    if (ev.event_name === "page_view") {
      totalViews++;
      dailyMap[dateKey].views++;
      pageCounts[ev.page_path] = (pageCounts[ev.page_path] || 0) + 1;

      if (ev.referrer_domain) {
        referrerCounts[ev.referrer_domain] = (referrerCounts[ev.referrer_domain] || 0) + 1;
      }
    } else if (ev.event_name === "contact_visit") {
      contactVisits++;
    } else if (ev.event_name === "contact_submit") {
      contactSubmissions++;
    } else if (ev.event_name === "demo_submit") {
      demoSubmissions++;
    } else if (ev.event_name === "newsletter_submit") {
      newsletterSubmissions++;
    }

    const dev = ev.device_category || "unknown";
    deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
  }

  // Sort top pages
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  // Sort top referrers
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([domain, count]) => ({ domain, count }));

  // Device breakdown
  const totalDeviceEvents = events.length || 1;
  const devices = (Object.keys(deviceCounts) as AnalyticsDeviceCategory[]).map((category) => ({
    category,
    count: deviceCounts[category] || 0,
    percentage: Math.round(((deviceCounts[category] || 0) / totalDeviceEvents) * 100),
  }));

  // Daily trends
  const dailyTrends = Object.entries(dailyMap).map(([date, d]) => ({
    date,
    views: d.views,
    visitors: d.visitors.size,
  }));

  return {
    totalViews,
    uniqueVisitors: visitorsSet.size,
    totalSessions: sessionsSet.size,
    contactVisits,
    contactSubmissions,
    demoSubmissions,
    newsletterSubmissions,
    topPages,
    topReferrers,
    devices,
    dailyTrends,
  };
}

