import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ProductStatus, TablesUpdate, Json } from "@/types/database";
import { PRODUCT_DETAILS, type ProductDetail } from "@/lib/product-detail-data";
import { revalidateProductCache } from "./revalidation.service";

export interface ManagedProductItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  category: string;
  categoryGroup: string;
  headline: string;
  shortDescription: string;
  detailedDescription: string | null;
  status: ProductStatus;
  statusNotice: string | null;
  logoUrl: string | null;
  features: unknown[];
  problems: unknown[];
  audiences: unknown[];
  workflow: Record<string, unknown>;
  metaTitle: string | null;
  metaDescription: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Retrieves all 7 managed products ordered by display_order.
 */
export async function getProductsAdmin(): Promise<ManagedProductItem[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data || data.length === 0) {
    // Return representation from canonical static definitions if table is pending initial sync
    return PRODUCT_DETAILS.map((p, idx) => ({
      id: `seed-${p.slug}`,
      number: p.number,
      name: p.name,
      slug: p.slug,
      category: p.category,
      categoryGroup: p.categoryGroup,
      headline: p.headline,
      shortDescription: p.supportingDescription,
      detailedDescription: p.overview.envisagedSolution,
      status: "coming_soon" as ProductStatus,
      statusNotice: p.statusNotice,
      logoUrl: null,
      features: p.features,
      problems: p.problems,
      audiences: p.audiences,
      workflow: p.workflow,
      metaTitle: `${p.name} | Orbion Technologies`,
      metaDescription: p.supportingDescription,
      displayOrder: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  return data.map((row) => ({
    id: row.id,
    number: row.number,
    name: row.name,
    slug: row.slug,
    category: row.category,
    categoryGroup: row.category_group,
    headline: row.headline,
    shortDescription: row.short_description,
    detailedDescription: row.detailed_description,
    status: row.status as ProductStatus,
    statusNotice: row.status_notice,
    logoUrl: row.logo_url,
    features: (Array.isArray(row.features) ? row.features : []),
    problems: (Array.isArray(row.problems) ? row.problems : []),
    audiences: (Array.isArray(row.audiences) ? row.audiences : []),
    workflow: (typeof row.workflow === "object" && row.workflow !== null ? (row.workflow as Record<string, unknown>) : {}),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

/**
 * Retrieves a single managed product by its ID or slug.
 */
export async function getProductById(id: string): Promise<ManagedProductItem | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    number: data.number,
    name: data.name,
    slug: data.slug,
    category: data.category,
    categoryGroup: data.category_group,
    headline: data.headline,
    shortDescription: data.short_description,
    detailedDescription: data.detailed_description,
    status: data.status as ProductStatus,
    statusNotice: data.status_notice,
    logoUrl: data.logo_url,
    features: (Array.isArray(data.features) ? data.features : []),
    problems: (Array.isArray(data.problems) ? data.problems : []),
    audiences: (Array.isArray(data.audiences) ? data.audiences : []),
    workflow: (typeof data.workflow === "object" && data.workflow !== null ? (data.workflow as Record<string, unknown>) : {}),
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    displayOrder: data.display_order,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Updates product details and development status.
 */
export async function updateProduct(
  id: string,
  payload: {
    name?: string;
    headline?: string;
    shortDescription?: string;
    detailedDescription?: string | null;
    status?: ProductStatus;
    statusNotice?: string | null;
    logoUrl?: string | null;
    features?: unknown[];
    problems?: unknown[];
    audiences?: unknown[];
    workflow?: Record<string, unknown>;
    metaTitle?: string | null;
    metaDescription?: string | null;
    displayOrder?: number;
  },
  actorId: string
): Promise<{ success: boolean; product?: ManagedProductItem; error?: string }> {
  const supabase = await createServerClient();

  const current = await getProductById(id);
  if (!current) {
    return { success: false, error: "Product record not found." };
  }

  const updateFields: TablesUpdate<"products"> = {
    updated_at: new Date().toISOString(),
  };

  if (payload.name !== undefined) updateFields.name = payload.name;
  if (payload.headline !== undefined) updateFields.headline = payload.headline;
  if (payload.shortDescription !== undefined) updateFields.short_description = payload.shortDescription;
  if (payload.detailedDescription !== undefined) updateFields.detailed_description = payload.detailedDescription;
  if (payload.status !== undefined) updateFields.status = payload.status;
  if (payload.statusNotice !== undefined) updateFields.status_notice = payload.statusNotice;
  if (payload.logoUrl !== undefined) updateFields.logo_url = payload.logoUrl;
  if (payload.features !== undefined) updateFields.features = payload.features as Json;
  if (payload.problems !== undefined) updateFields.problems = payload.problems as Json;
  if (payload.audiences !== undefined) updateFields.audiences = payload.audiences as Json;
  if (payload.workflow !== undefined) updateFields.workflow = payload.workflow as Json;
  if (payload.metaTitle !== undefined) updateFields.meta_title = payload.metaTitle;
  if (payload.metaDescription !== undefined) updateFields.meta_description = payload.metaDescription;
  if (payload.displayOrder !== undefined) updateFields.display_order = payload.displayOrder;

  const { data: updated, error } = await supabase
    .from("products")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error || !updated) {
    console.error("[Orbion CMS Product Error] updateProduct:", error);
    return { success: false, error: error?.message || "Failed to update product." };
  }

  // Audit log
  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_product_updated",
      entity_type: "product",
      entity_id: id,
      metadata: {
        product: updated.name,
        slug: updated.slug,
        status: updated.status,
        previous_status: current.status,
      },
    });
  } catch (auditErr) {
    console.error("[Orbion Audit Error]", auditErr);
  }

  revalidateProductCache(current.slug);

  return { success: true, product: await getProductById(id) || undefined };
}

/**
 * Public Reader: Retrieves public product details by slug, merging live CMS data
 * with rich static architecture schemas.
 */
export async function getPublicProductBySlug(slug: string): Promise<ProductDetail | null> {
  const staticProduct = PRODUCT_DETAILS.find((p) => p.slug === slug);
  if (!staticProduct) {
    return null;
  }

  try {
    const supabase = await createServerClient();
    const { data: dbProduct } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!dbProduct) {
      return staticProduct;
    }

    // Merge live CMS overrides cleanly
    return {
      ...staticProduct,
      name: dbProduct.name || staticProduct.name,
      headline: dbProduct.headline || staticProduct.headline,
      supportingDescription: dbProduct.short_description || staticProduct.supportingDescription,
      statusNotice: dbProduct.status_notice || staticProduct.statusNotice,
      // Map status cleanly to UI badge
      status: dbProduct.status === "available"
        ? "AVAILABLE"
        : dbProduct.status === "in_development"
        ? "IN DEVELOPMENT"
        : "COMING SOON",
    };
  } catch {
    return staticProduct;
  }
}
