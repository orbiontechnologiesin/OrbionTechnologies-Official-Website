import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type { ContactLeadStatus, Tables } from "@/types/database";

export interface LeadFilterOptions {
  search?: string;
  status?: ContactLeadStatus;
  page?: number;
  limit?: number;
}

export interface LeadItem {
  id: string;
  reference: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  subject: string;
  message: string;
  source: string;
  status: ContactLeadStatus;
  assignedTo: string | null;
  assignedStaffName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNoteItem {
  id: string;
  leadId: string;
  authorId: string;
  authorName: string;
  note: string;
  createdAt: string;
}

/**
 * Retrieves paginated contact leads with optional search and status filtering.
 */
export async function getAdminLeads(options: LeadFilterOptions = {}) {
  const { search, status, page = 1, limit = 15 } = options;
  const offset = (page - 1) * limit;

  const supabase = await createServerClient();

  let query = supabase
    .from("contact_leads")
    .select(
      `
      id,
      reference,
      full_name,
      email,
      phone,
      company,
      website,
      subject,
      message,
      source,
      status,
      assigned_to,
      created_at,
      updated_at
    `,
      { count: "exact" }
    );

  if (status) {
    query = query.eq("status", status);
  }

  if (search && search.trim().length > 0) {
    const term = search.trim();
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%,reference.ilike.%${term}%`
    );
  }

  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error("[Orbion Lead Service Error]", error);
    throw new Error(`Failed to query contact leads: ${error.message}`);
  }

  const leads: LeadItem[] = (data || []).map((row) => ({
    id: row.id,
    reference: row.reference,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    website: row.website,
    subject: row.subject,
    message: row.message,
    source: row.source,
    status: row.status,
    assignedTo: row.assigned_to,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return {
    leads,
    totalCount: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
    limit,
  };
}

/**
 * Retrieves an individual contact lead by UUID along with internal notes and assignee.
 */
export async function getAdminLeadById(id: string): Promise<{
  lead: LeadItem;
  notes: LeadNoteItem[];
  assignedStaff?: { id: string; fullName: string; email: string } | null;
} | null> {
  const supabase = await createServerClient();

  const { data: leadRow, error: leadError } = await supabase
    .from("contact_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError || !leadRow) {
    return null;
  }

  // Fetch internal notes
  const { data: notesData } = await supabase
    .from("lead_notes")
    .select("id, lead_id, author_id, note, created_at, profiles:author_id(full_name)")
    .eq("lead_id", id)
    .order("created_at", { ascending: true });

  const notes: LeadNoteItem[] = (notesData || []).map((n: Tables<"lead_notes"> & { profiles: { full_name: string } | null }) => {
    const profile = n.profiles as { full_name: string } | null;
    return {
      id: n.id,
      leadId: n.lead_id,
      authorId: n.author_id,
      authorName: profile?.full_name || "Orbion Staff",
      note: n.note,
      createdAt: n.created_at,
    };
  });

  // Fetch assigned staff profile if assigned
  let assignedStaff = null;
  if (leadRow.assigned_to) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("id", leadRow.assigned_to)
      .single();
    if (profile) {
      assignedStaff = {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
      };
    }
  }

  return {
    lead: {
      id: leadRow.id,
      reference: leadRow.reference,
      fullName: leadRow.full_name,
      email: leadRow.email,
      phone: leadRow.phone,
      company: leadRow.company,
      website: leadRow.website,
      subject: leadRow.subject,
      message: leadRow.message,
      source: leadRow.source,
      status: leadRow.status,
      assignedTo: leadRow.assigned_to,
      createdAt: leadRow.created_at,
      updatedAt: leadRow.updated_at,
    },
    notes,
    assignedStaff,
  };
}

/**
 * Updates lead status and/or assigned staff atomically, recording an audit log entry.
 */
export async function updateLeadStatusAtomic(params: {
  leadId: string;
  status: ContactLeadStatus;
  assignedTo?: string | null;
  internalNote?: string | null;
}) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.rpc("update_lead_status_with_audit", {
    p_lead_id: params.leadId,
    p_new_status: params.status,
    p_assigned_to: params.assignedTo || null,
    p_internal_note: params.internalNote || null,
  });

  if (error) {
    console.error("[Orbion Lead RPC Error]", error);
    throw new Error(`Failed to update lead: ${error.message}`);
  }

  return data;
}

/**
 * Fetches list of active staff profiles for lead assignment.
 */
export async function getAssignableStaffList() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("is_active", true)
    .in("role", ["super_admin", "admin", "sales"])
    .order("full_name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((staff: Pick<Tables<"profiles">, "id" | "full_name" | "email" | "role">) => ({
    id: staff.id,
    fullName: staff.full_name,
    email: staff.email,
    role: staff.role,
  }));
}
