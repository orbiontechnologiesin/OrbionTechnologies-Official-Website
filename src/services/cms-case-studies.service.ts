import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContentStatus, TablesUpdate } from "@/types/database";
import { revalidateCaseStudyCache } from "./revalidation.service";

export interface CaseStudyItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  clientName: string | null;
  industry: string | null;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  outcome: string | null;
  featuredImage: string | null;
  technologies: string[];
  status: ContentStatus;
  authorId: string | null;
  publishedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Retrieves paginated case studies for administration.
 */
export async function getCaseStudiesAdmin({
  page = 1,
  limit = 20,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
} = {}): Promise<{
  studies: CaseStudyItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const supabase = await createServerClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("case_studies")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && status !== "all") {
    query = query.eq("status", status as ContentStatus);
  }

  if (search && search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, count, error } = await query;

  if (error || !data) {
    return { studies: [], total: 0, page, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  const studies: CaseStudyItem[] = data.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    clientName: row.client_name,
    industry: row.industry,
    challenge: row.challenge,
    approach: row.approach,
    solution: row.solution,
    outcome: row.outcome,
    featuredImage: row.featured_image,
    technologies: (row.technologies as string[]) || [],
    status: row.status as ContentStatus,
    authorId: row.author_id,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return { studies, total, page, totalPages };
}

/**
 * Retrieves a single case study by ID.
 */
export async function getCaseStudyById(id: string): Promise<CaseStudyItem | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    clientName: data.client_name,
    industry: data.industry,
    challenge: data.challenge,
    approach: data.approach,
    solution: data.solution,
    outcome: data.outcome,
    featuredImage: data.featured_image,
    technologies: (data.technologies as string[]) || [],
    status: data.status as ContentStatus,
    authorId: data.author_id,
    publishedAt: data.published_at,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Creates a case study.
 */
export async function createCaseStudy(
  payload: {
    title: string;
    slug: string;
    summary: string;
    clientName?: string | null;
    industry?: string | null;
    challenge?: string | null;
    approach?: string | null;
    solution?: string | null;
    outcome?: string | null;
    featuredImage?: string | null;
    technologies?: string[];
    status?: ContentStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
  },
  authorId: string
): Promise<{ success: boolean; study?: CaseStudyItem; error?: string }> {
  const supabase = await createServerClient();

  // Check unique slug
  const { data: existingSlug } = await supabase
    .from("case_studies")
    .select("id")
    .eq("slug", payload.slug)
    .maybeSingle();

  if (existingSlug) {
    return { success: false, error: "A case study with this slug already exists." };
  }

  const status = payload.status || "draft";
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  const insertData = {
    title: payload.title,
    slug: payload.slug,
    summary: payload.summary,
    client_name: payload.clientName || null,
    industry: payload.industry || null,
    challenge: payload.challenge || null,
    approach: payload.approach || null,
    solution: payload.solution || null,
    outcome: payload.outcome || null,
    featured_image: payload.featuredImage || null,
    technologies: payload.technologies || [],
    status,
    author_id: authorId,
    published_at: publishedAt,
    meta_title: payload.metaTitle || null,
    meta_description: payload.metaDescription || null,
  };

  const { data: created, error } = await supabase
    .from("case_studies")
    .insert(insertData)
    .select()
    .single();

  if (error || !created) {
    return { success: false, error: error?.message || "Failed to create case study." };
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: authorId,
      action: "cms_case_study_created",
      entity_type: "case_study",
      entity_id: created.id,
      metadata: { title: created.title, slug: created.slug, status: created.status },
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  if (status === "published") {
    revalidateCaseStudyCache(created.slug);
  }

  return { success: true, study: await getCaseStudyById(created.id) || undefined };
}

/**
 * Updates an existing case study.
 */
export async function updateCaseStudy(
  id: string,
  payload: {
    title?: string;
    slug?: string;
    summary?: string;
    clientName?: string | null;
    industry?: string | null;
    challenge?: string | null;
    approach?: string | null;
    solution?: string | null;
    outcome?: string | null;
    featuredImage?: string | null;
    technologies?: string[];
    status?: ContentStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
  },
  actorId: string
): Promise<{ success: boolean; study?: CaseStudyItem; error?: string }> {
  const supabase = await createServerClient();
  const current = await getCaseStudyById(id);

  if (!current) {
    return { success: false, error: "Case study not found." };
  }

  if (payload.slug && payload.slug !== current.slug) {
    const { data: slugCheck } = await supabase
      .from("case_studies")
      .select("id")
      .eq("slug", payload.slug)
      .neq("id", id)
      .maybeSingle();

    if (slugCheck) {
      return { success: false, error: "A case study with this slug already exists." };
    }
  }

  let publishedAt = current.publishedAt;
  if (payload.status === "published" && current.status !== "published") {
    publishedAt = new Date().toISOString();
  }

  const updateFields: TablesUpdate<"case_studies"> = {
    updated_at: new Date().toISOString(),
  };

  if (payload.title !== undefined) updateFields.title = payload.title;
  if (payload.slug !== undefined) updateFields.slug = payload.slug;
  if (payload.summary !== undefined) updateFields.summary = payload.summary;
  if (payload.clientName !== undefined) updateFields.client_name = payload.clientName;
  if (payload.industry !== undefined) updateFields.industry = payload.industry;
  if (payload.challenge !== undefined) updateFields.challenge = payload.challenge;
  if (payload.approach !== undefined) updateFields.approach = payload.approach;
  if (payload.solution !== undefined) updateFields.solution = payload.solution;
  if (payload.outcome !== undefined) updateFields.outcome = payload.outcome;
  if (payload.featuredImage !== undefined) updateFields.featured_image = payload.featuredImage;
  if (payload.technologies !== undefined) updateFields.technologies = payload.technologies;
  if (payload.status !== undefined) updateFields.status = payload.status;
  if (publishedAt !== current.publishedAt) updateFields.published_at = publishedAt;
  if (payload.metaTitle !== undefined) updateFields.meta_title = payload.metaTitle;
  if (payload.metaDescription !== undefined) updateFields.meta_description = payload.metaDescription;

  const { data: updated, error } = await supabase
    .from("case_studies")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error || !updated) {
    return { success: false, error: error?.message || "Failed to update case study." };
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_case_study_updated",
      entity_type: "case_study",
      entity_id: id,
      metadata: {
        title: updated.title,
        slug: updated.slug,
        status: updated.status,
        previous_status: current.status,
      },
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  revalidateCaseStudyCache(current.slug);
  if (updated.slug !== current.slug) {
    revalidateCaseStudyCache(updated.slug);
  }

  return { success: true, study: await getCaseStudyById(id) || undefined };
}

/**
 * Deletes a case study.
 */
export async function deleteCaseStudy(
  id: string,
  actorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient();
  const current = await getCaseStudyById(id);

  if (!current) {
    return { success: false, error: "Case study not found." };
  }

  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_case_study_deleted",
      entity_type: "case_study",
      entity_id: id,
      metadata: { title: current.title, slug: current.slug },
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  revalidateCaseStudyCache(current.slug);
  return { success: true };
}

/**
 * Public Reader: Retrieves published case studies.
 */
export async function getPublicCaseStudies({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<{
  studies: CaseStudyItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const supabase = await createServerClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("case_studies")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !data) {
    return { studies: [], total: 0, page, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  const studies: CaseStudyItem[] = data.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    clientName: row.client_name,
    industry: row.industry,
    challenge: row.challenge,
    approach: row.approach,
    solution: row.solution,
    outcome: row.outcome,
    featuredImage: row.featured_image,
    technologies: (row.technologies as string[]) || [],
    status: row.status as ContentStatus,
    authorId: row.author_id,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return { studies, total, page, totalPages };
}

/**
 * Public Reader: Retrieves a single published case study by slug.
 */
export async function getPublicCaseStudyBySlug(slug: string): Promise<CaseStudyItem | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    clientName: data.client_name,
    industry: data.industry,
    challenge: data.challenge,
    approach: data.approach,
    solution: data.solution,
    outcome: data.outcome,
    featuredImage: data.featured_image,
    technologies: (data.technologies as string[]) || [],
    status: data.status as ContentStatus,
    authorId: data.author_id,
    publishedAt: data.published_at,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
