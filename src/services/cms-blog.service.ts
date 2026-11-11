import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContentStatus, TablesUpdate } from "@/types/database";
import { revalidateBlogCache } from "./revalidation.service";
import { createAdminNotification } from "./admin-notifications.service";

interface RawBlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category_id: string | null;
  author_id: string;
  status: ContentStatus;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
  blog_categories?: { name: string; slug: string } | null;
  profiles?: { full_name: string } | null;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  categoryId: string | null;
  categoryName?: string;
  categorySlug?: string;
  authorId: string;
  authorName?: string;
  status: ContentStatus;
  publishedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  postCount?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Retrieves paginated blog posts for administration with status and category filtering.
 */
export async function getBlogPostsAdmin({
  page = 1,
  limit = 20,
  status,
  categoryId,
  search,
}: {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: string;
  search?: string;
} = {}): Promise<{
  posts: BlogPostItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const supabase = await createServerClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("blog_posts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      status,
      published_at,
      meta_title,
      meta_description,
      canonical_url,
      og_image,
      created_at,
      updated_at,
      blog_categories (name, slug),
      profiles:author_id (full_name)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && status !== "all") {
    query = query.eq("status", status as ContentStatus);
  }

  if (categoryId && categoryId !== "all") {
    query = query.eq("category_id", categoryId);
  }

  if (search && search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, count, error } = await query;

  if (error || !data) {
    console.error("[Orbion CMS Blog Error] getBlogPostsAdmin:", error);
    return { posts: [], total: 0, page, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  const posts: BlogPostItem[] = (data as unknown as RawBlogRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    categoryId: row.category_id,
    categoryName: row.blog_categories?.name || undefined,
    categorySlug: row.blog_categories?.slug || undefined,
    authorId: row.author_id,
    authorName: row.profiles?.full_name || undefined,
    status: row.status,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogImage: row.og_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return { posts, total, page, totalPages };
}

/**
 * Retrieves a single blog post by its ID for editing.
 */
export async function getBlogPostById(id: string): Promise<BlogPostItem | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      status,
      published_at,
      meta_title,
      meta_description,
      canonical_url,
      og_image,
      created_at,
      updated_at,
      blog_categories (name, slug),
      profiles:author_id (full_name)
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  const row = data as unknown as RawBlogRow;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    categoryId: row.category_id,
    categoryName: row.blog_categories?.name || undefined,
    categorySlug: row.blog_categories?.slug || undefined,
    authorId: row.author_id,
    authorName: row.profiles?.full_name || undefined,
    status: row.status,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogImage: row.og_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Creates a new blog post.
 */
export async function createBlogPost(
  payload: {
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    featuredImage?: string | null;
    categoryId?: string | null;
    status?: ContentStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    ogImage?: string | null;
  },
  authorId: string
): Promise<{ success: boolean; post?: BlogPostItem; error?: string }> {
  const supabase = await createServerClient();

  // 1. Slug uniqueness check
  const { data: existingSlug } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", payload.slug)
    .maybeSingle();

  if (existingSlug) {
    return { success: false, error: "A blog post with this URL slug already exists." };
  }

  const status = payload.status || "draft";
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  const insertData = {
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt || null,
    content: payload.content,
    featured_image: payload.featuredImage || null,
    category_id: payload.categoryId || null,
    author_id: authorId,
    status,
    published_at: publishedAt,
    meta_title: payload.metaTitle || null,
    meta_description: payload.metaDescription || null,
    canonical_url: payload.canonicalUrl || null,
    og_image: payload.ogImage || null,
  };

  const { data: created, error } = await supabase
    .from("blog_posts")
    .insert(insertData)
    .select()
    .single();

  if (error || !created) {
    console.error("[Orbion CMS Blog Error] createBlogPost:", error);
    return { success: false, error: error?.message || "Failed to create blog post." };
  }

  // Audit logging
  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: authorId,
      action: "cms_blog_created",
      entity_type: "blog_post",
      entity_id: created.id,
      metadata: {
        title: created.title,
        slug: created.slug,
        status: created.status,
      },
    });
  } catch (auditErr) {
    console.error("[Orbion Audit Error]", auditErr);
  }

  if (status === "published") {
    revalidateBlogCache(created.slug);
  }

  return { success: true, post: await getBlogPostById(created.id) || undefined };
}

/**
 * Updates an existing blog post.
 */
export async function updateBlogPost(
  id: string,
  payload: {
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string;
    featuredImage?: string | null;
    categoryId?: string | null;
    status?: ContentStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    ogImage?: string | null;
  },
  actorId: string
): Promise<{ success: boolean; post?: BlogPostItem; error?: string }> {
  const supabase = await createServerClient();

  const currentPost = await getBlogPostById(id);
  if (!currentPost) {
    return { success: false, error: "Blog post not found." };
  }

  // Slug collision check if changing
  if (payload.slug && payload.slug !== currentPost.slug) {
    const { data: slugCheck } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", payload.slug)
      .neq("id", id)
      .maybeSingle();

    if (slugCheck) {
      return { success: false, error: "A blog post with this URL slug already exists." };
    }
  }

  let publishedAt = currentPost.publishedAt;
  if (payload.status === "published" && currentPost.status !== "published") {
    publishedAt = new Date().toISOString();
  } else if (payload.status && payload.status !== "published") {
    // If unpublished, keep or nullify publishedAt
  }

  const updateFields: TablesUpdate<"blog_posts"> = {
    updated_at: new Date().toISOString(),
  };

  if (payload.title !== undefined) updateFields.title = payload.title;
  if (payload.slug !== undefined) updateFields.slug = payload.slug;
  if (payload.excerpt !== undefined) updateFields.excerpt = payload.excerpt;
  if (payload.content !== undefined) updateFields.content = payload.content;
  if (payload.featuredImage !== undefined) updateFields.featured_image = payload.featuredImage;
  if (payload.categoryId !== undefined) updateFields.category_id = payload.categoryId;
  if (payload.status !== undefined) updateFields.status = payload.status;
  if (publishedAt !== currentPost.publishedAt) updateFields.published_at = publishedAt;
  if (payload.metaTitle !== undefined) updateFields.meta_title = payload.metaTitle;
  if (payload.metaDescription !== undefined) updateFields.meta_description = payload.metaDescription;
  if (payload.canonicalUrl !== undefined) updateFields.canonical_url = payload.canonicalUrl;
  if (payload.ogImage !== undefined) updateFields.og_image = payload.ogImage;

  const { data: updated, error } = await supabase
    .from("blog_posts")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error || !updated) {
    console.error("[Orbion CMS Blog Error] updateBlogPost:", error);
    return { success: false, error: error?.message || "Failed to update blog post." };
  }

  // Audit logging
  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_blog_updated",
      entity_type: "blog_post",
      entity_id: id,
      metadata: {
        title: updated.title,
        slug: updated.slug,
        status: updated.status,
        previous_status: currentPost.status,
      },
    });
  } catch (auditErr) {
    console.error("[Orbion Audit Error]", auditErr);
  }

  // Dispatch in-app notifications on key workflow transitions
  if (payload.status === "in_review" && currentPost.status !== "in_review") {
    createAdminNotification({
      category: "cms",
      title: "Content Submitted for Review",
      message: `Blog post "${updated.title}" was submitted for editorial review.`,
      relatedEntityType: "blog_post",
      relatedEntityId: id,
      linkUrl: `/admin/blog/${id}/edit`,
    }).catch((e) => console.warn("[CMS Notif Warning]", e));
  } else if (payload.status === "published" && currentPost.status !== "published") {
    createAdminNotification({
      category: "cms",
      title: "Blog Post Published",
      message: `Blog post "${updated.title}" is now live on the public website.`,
      relatedEntityType: "blog_post",
      relatedEntityId: id,
      linkUrl: `/admin/blog/${id}/edit`,
    }).catch((e) => console.warn("[CMS Notif Warning]", e));
  }

  revalidateBlogCache(currentPost.slug);
  if (updated.slug !== currentPost.slug) {
    revalidateBlogCache(updated.slug);
  }

  return { success: true, post: await getBlogPostById(id) || undefined };
}

/**
 * Deletes or archives a blog post.
 */
export async function deleteBlogPost(
  id: string,
  actorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient();
  const currentPost = await getBlogPostById(id);

  if (!currentPost) {
    return { success: false, error: "Blog post not found." };
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("[Orbion CMS Blog Error] deleteBlogPost:", error);
    return { success: false, error: error.message };
  }

  // Audit log
  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_blog_deleted",
      entity_type: "blog_post",
      entity_id: id,
      metadata: {
        title: currentPost.title,
        slug: currentPost.slug,
      },
    });
  } catch (auditErr) {
    console.error("[Orbion Audit Error]", auditErr);
  }

  revalidateBlogCache(currentPost.slug);
  return { success: true };
}

/**
 * Retrieves all categories with post counts.
 */
export async function getBlogCategories(): Promise<BlogCategoryItem[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, name, slug, description, created_at, updated_at")
    .order("name", { ascending: true });

  if (error || !data) {
    return [];
  }

  // Retrieve post counts per category
  const categoriesWithCount = await Promise.all(
    data.map(async (cat) => {
      const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("category_id", cat.id);
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        postCount: count || 0,
        createdAt: cat.created_at,
        updatedAt: cat.updated_at,
      };
    })
  );

  return categoriesWithCount;
}

/**
 * Creates a blog category.
 */
export async function createBlogCategory(
  payload: { name: string; slug: string; description?: string | null },
  actorId: string
): Promise<{ success: boolean; category?: BlogCategoryItem; error?: string }> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("blog_categories")
    .insert({
      name: payload.name,
      slug: payload.slug,
      description: payload.description || null,
    })
    .select()
    .single();

  if (error || !data) {
    return { success: false, error: error?.message || "Failed to create category." };
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_category_created",
      entity_type: "blog_category",
      entity_id: data.id,
      metadata: { name: data.name, slug: data.slug },
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  return {
    success: true,
    category: {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      postCount: 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  };
}

/**
 * Deletes a blog category safely (rejects if posts are assigned).
 */
export async function deleteBlogCategory(
  id: string,
  actorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient();

  // Check if any posts reference this category
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if (count && count > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${count} blog post(s) are assigned to it. Reassign or delete them first.`,
    };
  }

  const { error } = await supabase.from("blog_categories").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_category_deleted",
      entity_type: "blog_category",
      entity_id: id,
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  return { success: true };
}

/**
 * Public Reader: Retrieves published posts only.
 */
export async function getPublicBlogPosts({
  page = 1,
  limit = 10,
  categorySlug,
}: {
  page?: number;
  limit?: number;
  categorySlug?: string;
} = {}): Promise<{
  posts: BlogPostItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const supabase = await createServerClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("blog_posts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      status,
      published_at,
      meta_title,
      meta_description,
      canonical_url,
      og_image,
      created_at,
      updated_at,
      blog_categories!inner (name, slug),
      profiles:author_id (full_name)
    `,
      { count: "exact" }
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (categorySlug) {
    query = query.eq("blog_categories.slug", categorySlug);
  }

  const { data, count, error } = await query;

  if (error || !data) {
    return { posts: [], total: 0, page, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  const posts: BlogPostItem[] = (data as unknown as RawBlogRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    categoryId: row.category_id,
    categoryName: row.blog_categories?.name || undefined,
    categorySlug: row.blog_categories?.slug || undefined,
    authorId: row.author_id,
    authorName: row.profiles?.full_name || undefined,
    status: row.status,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogImage: row.og_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return { posts, total, page, totalPages };
}

/**
 * Public Reader: Retrieves a single published blog post by slug.
 */
export async function getPublicBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      status,
      published_at,
      meta_title,
      meta_description,
      canonical_url,
      og_image,
      created_at,
      updated_at,
      blog_categories (name, slug),
      profiles:author_id (full_name)
    `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  const row = data as unknown as RawBlogRow;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    categoryId: row.category_id,
    categoryName: row.blog_categories?.name || undefined,
    categorySlug: row.blog_categories?.slug || undefined,
    authorId: row.author_id,
    authorName: row.profiles?.full_name || undefined,
    status: row.status,
    publishedAt: row.published_at,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogImage: row.og_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
