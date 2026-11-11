import { z } from "zod";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — CMS ZOD VALIDATION SCHEMAS
 * ==============================================================================
 * Strict server-side validation for Blog Posts, Categories, Products,
 * Case Studies, and Media Assets.
 * ==============================================================================
 */

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const contentStatusSchema = z.enum(["draft", "in_review", "published", "archived"]);
export const productStatusSchema = z.enum(["coming_soon", "in_development", "available"]);

// 1. BLOG CATEGORY SCHEMA
export const blogCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(80, "Category name cannot exceed 80 characters."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(SLUG_REGEX, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .max(80, "Slug cannot exceed 80 characters."),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional()
    .nullable(),
});

// 2. BLOG POST SCHEMA
export const blogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(255, "Title cannot exceed 255 characters."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(SLUG_REGEX, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .max(120, "Slug cannot exceed 120 characters."),
  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt cannot exceed 500 characters.")
    .optional()
    .nullable(),
  content: z
    .string()
    .trim()
    .min(10, "Article content must be at least 10 characters."),
  featuredImage: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .nullable(),
  categoryId: z
    .string()
    .uuid("Invalid category ID format.")
    .optional()
    .nullable(),
  status: contentStatusSchema.default("draft"),
  metaTitle: z
    .string()
    .trim()
    .max(120, "Meta title cannot exceed 120 characters.")
    .optional()
    .nullable(),
  metaDescription: z
    .string()
    .trim()
    .max(300, "Meta description cannot exceed 300 characters.")
    .optional()
    .nullable(),
  canonicalUrl: z
    .string()
    .trim()
    .url("Invalid canonical URL.")
    .max(500)
    .optional()
    .nullable()
    .or(z.literal("")),
  ogImage: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .nullable(),
});

// 3. PRODUCT UPDATE SCHEMA
export const productUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(100, "Product name cannot exceed 100 characters."),
  headline: z
    .string()
    .trim()
    .min(5, "Headline must be at least 5 characters.")
    .max(255, "Headline cannot exceed 255 characters."),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(1000, "Short description cannot exceed 1000 characters."),
  detailedDescription: z
    .string()
    .trim()
    .optional()
    .nullable(),
  status: productStatusSchema.default("coming_soon"),
  statusNotice: z
    .string()
    .trim()
    .max(500)
    .optional()
    .nullable(),
  logoUrl: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .nullable(),
  features: z.array(z.any()).optional().default([]),
  problems: z.array(z.any()).optional().default([]),
  audiences: z.array(z.any()).optional().default([]),
  workflow: z.record(z.string(), z.any()).optional().default({}),
  metaTitle: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable(),
  metaDescription: z
    .string()
    .trim()
    .max(300)
    .optional()
    .nullable(),
  displayOrder: z.number().int().min(0).max(99).optional(),
});

// 4. CASE STUDY SCHEMA
export const caseStudySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(255, "Title cannot exceed 255 characters."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(SLUG_REGEX, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .max(120, "Slug cannot exceed 120 characters."),
  summary: z
    .string()
    .trim()
    .min(10, "Summary must be at least 10 characters.")
    .max(1000, "Summary cannot exceed 1000 characters."),
  clientName: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable(),
  industry: z
    .string()
    .trim()
    .max(80)
    .optional()
    .nullable(),
  challenge: z.string().trim().optional().nullable(),
  approach: z.string().trim().optional().nullable(),
  solution: z.string().trim().optional().nullable(),
  outcome: z.string().trim().optional().nullable(),
  featuredImage: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .nullable(),
  technologies: z.array(z.string()).optional().default([]),
  status: contentStatusSchema.default("draft"),
  metaTitle: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable(),
  metaDescription: z
    .string()
    .trim()
    .max(300)
    .optional()
    .nullable(),
});

// 5. MEDIA ASSET UPLOAD METADATA SCHEMA
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
] as const;

export const mediaMetadataSchema = z.object({
  altText: z
    .string()
    .trim()
    .max(255)
    .optional()
    .nullable(),
  bucket: z.enum(["media", "documents"]).default("media"),
});

