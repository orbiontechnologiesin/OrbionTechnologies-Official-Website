import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { PRODUCT_DETAILS } from "@/lib/product-detail-data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://orbiontechnologies.in";
  const now = new Date();

  // 1. Core Static Public Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // 2. Official Products Catalog (7 Planned Products)
  const productRoutes: MetadataRoute.Sitemap = PRODUCT_DETAILS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Published Blog Posts Only
  let blogRoutes: MetadataRoute.Sitemap = [];
  let caseStudyRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createServerClient();

    // Query strictly published posts
    const { data: publishedPosts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published");

    if (publishedPosts && publishedPosts.length > 0) {
      blogRoutes = publishedPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || now),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }

    // Query strictly published case studies
    const { data: publishedStudies } = await supabase
      .from("case_studies")
      .select("slug, updated_at, published_at")
      .eq("status", "published");

    if (publishedStudies && publishedStudies.length > 0) {
      caseStudyRoutes = publishedStudies.map((study) => ({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: new Date(study.updated_at || study.published_at || now),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.warn("[Orbion Sitemap] Supabase query skipped during build-time rendering:", err);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...caseStudyRoutes];
}

