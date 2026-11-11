import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { sanitizeCsvCell, toCsvRow } from "@/lib/validation/reporting.schema";
import { recordAuditAction } from "@/services/admin-audit.service";
import type { NewsletterStatus } from "@/types/database";

export interface SubscriberItem {
  id: string;
  email: string;
  status: NewsletterStatus;
  consent: boolean;
  consentTimestamp: string;
  source: string;
  unsubscribedAt: string | null;
  createdAt: string;
}

export interface NewsletterSubscribersResponse {
  subscribers: SubscriberItem[];
  total: number;
  activeCount: number;
  unsubscribedCount: number;
}

/**
 * Retrieves paginated newsletter subscribers with search and filtering.
 */
export async function getNewsletterSubscribers(options?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<NewsletterSubscribersResponse> {
  const supabase = await createServerClient();
  const page = Math.max(1, options?.page || 1);
  const limit = Math.min(100, Math.max(1, options?.limit || 25));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("newsletter_subscribers")
    .select("id, email, status, consent, consent_timestamp, source, unsubscribed_at, created_at", {
      count: "exact",
    });

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status as NewsletterStatus);
  }

  if (options?.search) {
    query = query.ilike("email", `%${options.search.trim()}%`);
  }

  if (options?.startDate) {
    query = query.gte("created_at", options.startDate);
  }

  if (options?.endDate) {
    query = query.lte("created_at", options.endDate);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const [mainRes, activeRes, unsubRes] = await Promise.all([
    query,
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "subscribed"),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "unsubscribed"),
  ]);

  if (mainRes.error || !mainRes.data) {
    console.error("[Orbion Newsletter Admin] Query error:", mainRes.error);
    return {
      subscribers: [],
      total: 0,
      activeCount: 0,
      unsubscribedCount: 0,
    };
  }

  const subscribers: SubscriberItem[] = mainRes.data.map((row) => ({
    id: row.id,
    email: row.email,
    status: row.status,
    consent: row.consent,
    consentTimestamp: row.consent_timestamp,
    source: row.source,
    unsubscribedAt: row.unsubscribed_at,
    createdAt: row.created_at,
  }));

  return {
    subscribers,
    total: mainRes.count || 0,
    activeCount: activeRes.count || 0,
    unsubscribedCount: unsubRes.count || 0,
  };
}

/**
 * Generates an audit-logged CSV export of subscribers.
 * Excludes cryptographic unsubscribe tokens for safety.
 */
export async function exportSubscribersCsv(
  actorId: string,
  options?: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<string> {
  const supabase = await createServerClient();

  let query = supabase
    .from("newsletter_subscribers")
    .select("email, status, source, consent, consent_timestamp, created_at, unsubscribed_at")
    .order("created_at", { ascending: false })
    .limit(10000);

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status as NewsletterStatus);
  }

  if (options?.startDate) {
    query = query.gte("created_at", options.startDate);
  }

  if (options?.endDate) {
    query = query.lte("created_at", options.endDate);
  }

  const { data: rows, error } = await query;

  if (error || !rows) {
    throw new Error("Failed to export newsletter subscribers.");
  }

  const headers = [
    "Subscriber Email",
    "Subscription Status",
    "Source Channel",
    "Consent Verified",
    "Consent Timestamp (UTC)",
    "Subscription Date (UTC)",
    "Unsubscribed Date (UTC)",
  ];

  let csvContent = "\uFEFF" + headers.map(sanitizeCsvCell).join(",") + "\r\n";

  for (const row of rows) {
    csvContent += toCsvRow([
      row.email,
      row.status,
      row.source,
      row.consent ? "YES" : "NO",
      row.consent_timestamp,
      row.created_at,
      row.unsubscribed_at || "",
    ]);
  }

  await recordAuditAction(
    actorId,
    "EXPORT_NEWSLETTER_CSV",
    "newsletter_subscribers",
    null,
    {
      rowCount: rows.length,
      statusFilter: options?.status || "all",
      startDate: options?.startDate || null,
      endDate: options?.endDate || null,
    }
  );

  return csvContent;
}

