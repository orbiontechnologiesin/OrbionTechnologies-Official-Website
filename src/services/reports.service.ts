import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { sanitizeCsvCell, toCsvRow } from "@/lib/validation/reporting.schema";
import { recordAuditAction } from "@/services/admin-audit.service";
import { exportLeadsCsv } from "./lead-intelligence.service";
import { exportSubscribersCsv } from "./newsletter-admin.service";
import { calculateDateWindow } from "./business-intelligence.service";

export interface GenerateReportParams {
  actorId: string;
  reportType: "traffic" | "enquiries" | "leads_funnel" | "newsletter" | "content" | "email_deliverability";
  period: "7d" | "30d" | "90d" | "custom";
  startDate?: string;
  endDate?: string;
}

/**
 * Generates an audit-logged CSV report with strict formula injection defense.
 */
export async function generateCsvReport(params: GenerateReportParams): Promise<{
  filename: string;
  csvContent: string;
}> {
  const { currentStart, currentEnd } = calculateDateWindow(params.period, params.startDate, params.endDate);
  const dateSuffix = currentStart.slice(0, 10) + "_to_" + currentEnd.slice(0, 10);

  if (params.reportType === "enquiries") {
    const csvContent = await exportLeadsCsv(params.actorId, {
      startDate: currentStart,
      endDate: currentEnd,
    });
    return {
      filename: `orbion_enquiries_${dateSuffix}.csv`,
      csvContent,
    };
  }

  if (params.reportType === "newsletter") {
    const csvContent = await exportSubscribersCsv(params.actorId, {
      startDate: currentStart,
      endDate: currentEnd,
    });
    return {
      filename: `orbion_newsletter_subscribers_${dateSuffix}.csv`,
      csvContent,
    };
  }

  const supabase = await createServerClient();

  if (params.reportType === "traffic") {
    const { data: events } = await supabase
      .from("analytics_events")
      .select("created_at, event_name, page_path, referrer_domain, device_category, utm_source")
      .gte("created_at", currentStart)
      .lte("created_at", currentEnd)
      .order("created_at", { ascending: false })
      .limit(5000);

    const headers = [
      "Timestamp (UTC)",
      "Event Name",
      "Page Path",
      "Referrer Domain",
      "Device Category",
      "Campaign Source",
    ];

    let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";
    for (const ev of events || []) {
      csvContent += toCsvRow([
        ev.created_at,
        ev.event_name,
        ev.page_path,
        ev.referrer_domain || "",
        ev.device_category,
        ev.utm_source || "",
      ]);
    }

    await recordAuditAction(params.actorId, "EXPORT_TRAFFIC_REPORT_CSV", "analytics_events", null, {
      rowCount: events?.length || 0,
      period: params.period,
      startDate: currentStart,
      endDate: currentEnd,
    });

    return {
      filename: `orbion_website_traffic_${dateSuffix}.csv`,
      csvContent,
    };
  }

  if (params.reportType === "leads_funnel") {
    const { data: leads } = await supabase
      .from("contact_leads")
      .select("status, created_at")
      .gte("created_at", currentStart)
      .lte("created_at", currentEnd);

    const counts: Record<string, number> = { new: 0, contacted: 0, qualified: 0, closed: 0 };
    for (const l of leads || []) {
      counts[l.status] = (counts[l.status] || 0) + 1;
    }
    const total = leads?.length || 0;

    const headers = ["Funnel Stage", "Lead Count", "Conversion % from Total"];
    let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";
    csvContent += toCsvRow(["New Inquiries", counts.new, total ? Math.round((counts.new / total) * 100) : 0]);
    csvContent += toCsvRow(["Contacted", counts.contacted, total ? Math.round((counts.contacted / total) * 100) : 0]);
    csvContent += toCsvRow(["Qualified", counts.qualified, total ? Math.round((counts.qualified / total) * 100) : 0]);
    csvContent += toCsvRow(["Closed / Won", counts.closed, total ? Math.round((counts.closed / total) * 100) : 0]);

    await recordAuditAction(params.actorId, "EXPORT_LEAD_FUNNEL_CSV", "contact_leads", null, {
      totalLeads: total,
      period: params.period,
    });

    return {
      filename: `orbion_lead_funnel_${dateSuffix}.csv`,
      csvContent,
    };
  }

  if (params.reportType === "content") {
    const [postsRes, productsRes, caseRes] = await Promise.all([
      supabase.from("blog_posts").select("title, slug, status, published_at, created_at"),
      supabase.from("products").select("name, slug, status, headline"),
      supabase.from("case_studies").select("title, slug, status, published_at"),
    ]);

    const headers = ["Content Type", "Title / Name", "Slug", "Publishing Status", "Published Date"];
    let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";

    for (const p of postsRes.data || []) {
      csvContent += toCsvRow(["Blog Post", p.title, p.slug, p.status, p.published_at || ""]);
    }
    for (const prod of productsRes.data || []) {
      csvContent += toCsvRow(["Product", prod.name, prod.slug, prod.status, ""]);
    }
    for (const cs of caseRes.data || []) {
      csvContent += toCsvRow(["Case Study", cs.title, cs.slug, cs.status, cs.published_at || ""]);
    }

    await recordAuditAction(params.actorId, "EXPORT_CONTENT_ACTIVITY_CSV", "cms", null, {
      postsCount: postsRes.data?.length || 0,
      productsCount: productsRes.data?.length || 0,
      caseStudiesCount: caseRes.data?.length || 0,
    });

    return {
      filename: `orbion_content_inventory_${dateSuffix}.csv`,
      csvContent,
    };
  }

  // email_deliverability
  const { data: outbox } = await supabase
    .from("email_outbox")
    .select("created_at, recipient, template, subject, status, attempts, last_error, sent_at")
    .gte("created_at", currentStart)
    .lte("created_at", currentEnd)
    .order("created_at", { ascending: false })
    .limit(2000);

  const headers = [
    "Queued At (UTC)",
    "Recipient",
    "Template",
    "Subject",
    "Status",
    "Retry Attempts",
    "Last Error",
    "Delivered At (UTC)",
  ];

  let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";
  for (const item of outbox || []) {
    csvContent += toCsvRow([
      item.created_at,
      item.recipient,
      item.template,
      item.subject,
      item.status,
      item.attempts,
      item.last_error || "",
      item.sent_at || "",
    ]);
  }

  await recordAuditAction(params.actorId, "EXPORT_EMAIL_DELIVERABILITY_CSV", "email_outbox", null, {
    rowCount: outbox?.length || 0,
    period: params.period,
  });

  return {
    filename: `orbion_email_deliverability_${dateSuffix}.csv`,
    csvContent,
  };
}

