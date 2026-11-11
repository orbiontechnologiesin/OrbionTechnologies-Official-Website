import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeCsvCell, toCsvRow } from "@/lib/validation/reporting.schema";
import { recordAuditAction } from "@/services/admin-audit.service";
import type { ContactLeadStatus } from "@/types/database";

export interface LeadFunnelStage {
  stage: ContactLeadStatus;
  label: string;
  count: number;
  percentage: number;
}

export interface LeadCategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
}

export interface LeadSourceBreakdown {
  source: string;
  count: number;
  percentage: number;
}

export interface StaffAssignmentBreakdown {
  staffId: string | null;
  staffName: string;
  assignedCount: number;
}

export interface LeadIntelligenceSummary {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  closedLeads: number;
  qualificationRate: number;
  funnel: LeadFunnelStage[];
  byCategory: LeadCategoryBreakdown[];
  bySource: LeadSourceBreakdown[];
  byStaff: StaffAssignmentBreakdown[];
  monthlyTrend: { month: string; count: number }[];
}

/**
 * Computes deep lead intelligence and conversion funnel data.
 */
export async function getLeadIntelligenceSummary(
  startDate?: string,
  endDate?: string
): Promise<LeadIntelligenceSummary> {
  const supabase = await createServerClient();

  let query = supabase
    .from("contact_leads")
    .select("id, status, source, subject, assigned_to, created_at");

  if (startDate) {
    query = query.gte("created_at", startDate);
  }
  if (endDate) {
    query = query.lte("created_at", endDate);
  }

  const { data: leads, error } = await query;

  if (error || !leads || leads.length === 0) {
    return {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      closedLeads: 0,
      qualificationRate: 0,
      funnel: [
        { stage: "new", label: "New Inquiries", count: 0, percentage: 0 },
        { stage: "contacted", label: "Contacted", count: 0, percentage: 0 },
        { stage: "qualified", label: "Qualified", count: 0, percentage: 0 },
        { stage: "closed", label: "Closed / Won", count: 0, percentage: 0 },
      ],
      byCategory: [],
      bySource: [],
      byStaff: [],
      monthlyTrend: [],
    };
  }

  const total = leads.length;
  let newCount = 0;
  let contactedCount = 0;
  let qualifiedCount = 0;
  let closedCount = 0;

  const categoryMap: Record<string, number> = {};
  const sourceMap: Record<string, number> = {};
  const staffMap: Record<string, number> = {};
  const monthMap: Record<string, number> = {};

  for (const lead of leads) {
    if (lead.status === "new") newCount++;
    else if (lead.status === "contacted") contactedCount++;
    else if (lead.status === "qualified") qualifiedCount++;
    else if (lead.status === "closed") closedCount++;

    // Category inference from subject / keywords
    const sub = lead.subject ? lead.subject.trim() : "General";
    categoryMap[sub] = (categoryMap[sub] || 0) + 1;

    // Source
    const src = lead.source || "website_contact";
    sourceMap[src] = (sourceMap[src] || 0) + 1;

    // Staff
    const staffId = lead.assigned_to || "unassigned";
    staffMap[staffId] = (staffMap[staffId] || 0) + 1;

    // Month
    const month = lead.created_at.slice(0, 7); // YYYY-MM
    monthMap[month] = (monthMap[month] || 0) + 1;
  }

  const qualificationRate = total > 0 ? Math.round(((qualifiedCount + closedCount) / total) * 100) : 0;

  const funnel: LeadFunnelStage[] = [
    { stage: "new", label: "New Inquiries", count: newCount, percentage: total ? Math.round((newCount / total) * 100) : 0 },
    { stage: "contacted", label: "Contacted", count: contactedCount, percentage: total ? Math.round((contactedCount / total) * 100) : 0 },
    { stage: "qualified", label: "Qualified", count: qualifiedCount, percentage: total ? Math.round((qualifiedCount / total) * 100) : 0 },
    { stage: "closed", label: "Closed / Won", count: closedCount, percentage: total ? Math.round((closedCount / total) * 100) : 0 },
  ];

  const byCategory = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / total) * 100),
    }));

  const bySource = Object.entries(sourceMap)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / total) * 100),
    }));

  // Fetch staff names for assignments
  const adminClient = createAdminClient();
  const { data: profiles } = await adminClient.from("profiles").select("id, full_name");
  const profileNameMap = new Map<string, string>();
  if (profiles) {
    for (const p of profiles) {
      profileNameMap.set(p.id, p.full_name);
    }
  }

  const byStaff: StaffAssignmentBreakdown[] = Object.entries(staffMap).map(([staffId, count]) => ({
    staffId: staffId === "unassigned" ? null : staffId,
    staffName: staffId === "unassigned" ? "Unassigned" : profileNameMap.get(staffId) || "Staff Member",
    assignedCount: count,
  }));

  const monthlyTrend = Object.entries(monthMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }));

  return {
    totalLeads: total,
    newLeads: newCount,
    contactedLeads: contactedCount,
    qualifiedLeads: qualifiedCount,
    closedLeads: closedCount,
    qualificationRate,
    funnel,
    byCategory,
    bySource,
    byStaff,
    monthlyTrend,
  };
}

/**
 * Generates an audit-logged, formula-sanitized CSV export of lead records.
 */
export async function exportLeadsCsv(
  actorId: string,
  options?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }
): Promise<string> {
  const supabase = await createServerClient();

  let query = supabase
    .from("contact_leads")
    .select("reference, created_at, full_name, email, company, subject, source, status, assigned_to")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (options?.startDate) query = query.gte("created_at", options.startDate);
  if (options?.endDate) query = query.lte("created_at", options.endDate);
  if (options?.status && options.status !== "all") query = query.eq("status", options.status as ContactLeadStatus);

  const { data: rows, error } = await query;

  if (error || !rows) {
    throw new Error("Failed to export leads.");
  }

  // Header row
  const headers = [
    "Reference",
    "Created Date (UTC)",
    "Customer Name",
    "Customer Email",
    "Company",
    "Subject",
    "Source",
    "Status",
  ];

  let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";

  for (const row of rows) {
    csvContent += toCsvRow([
      row.reference || "",
      row.created_at,
      row.full_name,
      row.email,
      row.company || "",
      row.subject,
      row.source,
      row.status,
    ]);
  }

  // Immutable Audit Log entry
  await recordAuditAction(
    actorId,
    "EXPORT_LEADS_CSV",
    "contact_leads",
    null,
    {
      rowCount: rows.length,
      startDate: options?.startDate || null,
      endDate: options?.endDate || null,
      statusFilter: options?.status || "all",
    }
  );

  return csvContent;
}

