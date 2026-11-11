"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Send,
  Globe,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { MarkdownEditor } from "./MarkdownEditor";
import { ContentStatusBadge } from "./ContentStatusBadge";
import type { BlogPostItem, BlogCategoryItem } from "@/services/cms-blog.service";
import type { ContentStatus, AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface BlogPostFormProps {
  initialPost?: BlogPostItem;
  categories: BlogCategoryItem[];
  userRole: AdminRole;
}

export function BlogPostForm({ initialPost, categories, userRole }: BlogPostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialPost);

  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [featuredImage, setFeaturedImage] = useState(initialPost?.featuredImage || "");
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || "");
  const [status, setStatus] = useState<ContentStatus>(initialPost?.status || "draft");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState(initialPost?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost?.canonicalUrl || "");
  const [ogImage, setOgImage] = useState(initialPost?.ogImage || "");

  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canPublish = hasPermission(userRole, "cms:publish");
  const canDelete = hasPermission(userRole, "cms:delete");

  function generateSlug() {
    const clean = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 100);
    setSlug(clean);
  }

  async function handleSave(targetStatus: ContentStatus) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    const payload = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,
      categoryId: categoryId || null,
      status: targetStatus,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      ogImage: ogImage || null,
    };

    try {
      const endpoint = isEditing ? `/api/admin/cms/blog/${initialPost?.id}` : `/api/admin/cms/blog`;
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to save article.");
        setSaving(false);
        return;
      }

      setStatus(targetStatus);
      setSuccessMsg(data.message || "Article saved successfully.");
      setSaving(false);

      if (!isEditing && data.post?.id) {
        router.push(`/admin/blog/${data.post.id}/edit`);
      } else {
        router.refresh();
      }
    } catch {
      setErrorMsg("Network error: Unable to contact CMS service.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialPost || !confirm("Are you sure you want to permanently delete this article? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/cms/blog/${initialPost.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete article.");
        setDeleting(false);
        return;
      }

      router.push("/admin/blog");
    } catch {
      alert("Network error: Could not complete deletion.");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-400 text-xs font-mono flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-mono flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Form Inputs (2/3) + Sidebar Controls (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Next-Generation Enterprise Systems Architecture"
                className="w-full px-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-base font-semibold text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-xs font-mono text-copper hover:text-copper-hover flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Generate from Title</span>
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-graphite-subtle">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="enterprise-systems-architecture"
                  className="w-full pl-16 pr-4 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Article Excerpt
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise synopsis shown on blog listing cards and search engines..."
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-2">
              Article Content (Markdown) *
            </label>
            <MarkdownEditor value={content} onChange={setContent} minHeight="450px" />
          </div>

          {/* Collapsible SEO Panel */}
          <div className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full px-6 py-4 flex items-center justify-between bg-limestone-light/40 hover:bg-limestone-light transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-copper" />
                <span className="text-sm font-semibold text-graphite">Search Engine Optimization (SEO)</span>
              </div>
              {seoOpen ? <ChevronUp className="w-4 h-4 text-graphite-subtle" /> : <ChevronDown className="w-4 h-4 text-graphite-subtle" />}
            </button>

            {seoOpen && (
              <div className="p-6 space-y-4 border-t border-graphite-border">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Defaults to article title if omitted"
                    className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Defaults to excerpt if omitted"
                    className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://orbiontechnologies.in/..."
                      className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                      Social Sharing Image (OG Image)
                    </label>
                    <input
                      type="text"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      placeholder="/brand/... or https://..."
                      className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Publishing Workflow Box */}
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
              <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted font-semibold">
                Lifecycle Status
              </span>
              <ContentStatusBadge status={status} />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
              >
                <option value="">Select Category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Featured Banner Image
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/brand/Mockups/... or storage URL"
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
              <p className="text-[10px] text-graphite-subtle font-mono mt-1">
                Tip: Copy URL from the Media Library.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-graphite-border space-y-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("draft")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite font-mono text-xs rounded-lg transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-graphite-muted" />
                <span>{saving ? "Saving..." : "Save Draft"}</span>
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("in_review")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-xs rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Review</span>
              </button>

              {canPublish && (
                <>
                  {status === "published" ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleSave("draft")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-graphite/10 border border-graphite/20 hover:bg-graphite/20 text-graphite font-mono text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Unpublish to Draft</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleSave("published")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-pure-white font-mono text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Publish Live</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Archive / Delete */}
            {isEditing && (
              <div className="pt-3 border-t border-graphite-border flex items-center justify-between">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave("archived")}
                  className="text-xs font-mono text-graphite-subtle hover:text-graphite transition-colors"
                >
                  Archive Post
                </button>

                {canDelete && (
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={handleDelete}
                    className="text-xs font-mono text-red-600 hover:text-red-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{deleting ? "Deleting..." : "Delete"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
