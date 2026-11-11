import { revalidatePath } from "next/cache";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — ON-DEMAND NEXT.JS CACHE REVALIDATION SERVICE
 * ==============================================================================
 * Efficiently purges static page caches when CMS content is published, updated,
 * or unpublished, without requiring global cache busts or redeployment.
 * ==============================================================================
 */

export function revalidateBlogCache(slug?: string) {
  try {
    revalidatePath("/blog");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn("[Orbion Cache] Could not revalidate blog cache (e.g. build-time context):", err);
  }
}

export function revalidateProductCache(slug?: string) {
  try {
    revalidatePath("/products");
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn("[Orbion Cache] Could not revalidate product cache:", err);
  }
}

export function revalidateCaseStudyCache(slug?: string) {
  try {
    revalidatePath("/case-studies");
    if (slug) {
      revalidatePath(`/case-studies/${slug}`);
    }
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn("[Orbion Cache] Could not revalidate case study cache:", err);
  }
}

