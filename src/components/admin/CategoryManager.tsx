"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag, Plus, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { BlogCategoryItem } from "@/services/cms-blog.service";
import type { AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface CategoryManagerProps {
  categories: BlogCategoryItem[];
  userRole: AdminRole;
}

export function CategoryManager({ categories, userRole }: CategoryManagerProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canManage = hasPermission(userRole, "cms:publish");
  const canDelete = hasPermission(userRole, "cms:delete");

  function handleNameChange(val: string) {
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(autoSlug);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/cms/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, description: description || null }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to create category.");
        setLoading(false);
        return;
      }

      setName("");
      setSlug("");
      setDescription("");
      setSuccessMsg("Category created successfully.");
      setLoading(false);
      router.refresh();
    } catch {
      setErrorMsg("Network error.");
      setLoading(false);
    }
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) {
      return;
    }

    setDeletingId(id);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/cms/blog/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to delete category.");
        setDeletingId(null);
        return;
      }

      setSuccessMsg(`Category "${catName}" deleted.`);
      setDeletingId(null);
      router.refresh();
    } catch {
      setErrorMsg("Network error.");
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form (1/3) */}
        {canManage && (
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
            <h3 className="text-sm font-semibold text-graphite flex items-center gap-2 mb-4">
              <Plus className="w-4 h-4 text-copper" />
              <span>Create New Category</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Distributed Computing"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="distributed-computing"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Editorial scope of this category..."
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-copper hover:bg-copper-hover text-pure-white text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer"
              >
                {loading ? "Creating..." : "Add Category"}
              </button>
            </form>
          </div>
        )}

        {/* Existing Categories Table (2/3) */}
        <div className={`bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden ${canManage ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <div className="p-4 border-b border-graphite-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-graphite flex items-center gap-2">
              <Tag className="w-4 h-4 text-sage" />
              <span>Registered Categories ({categories.length})</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-limestone-light/60 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                <tr>
                  <th className="px-6 py-3">Category Name & Slug</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3 text-center">Assigned Posts</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-border/60">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-limestone-light/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-graphite">{cat.name}</p>
                      <span className="font-mono text-[11px] text-graphite-subtle">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-graphite-muted max-w-[220px]">
                      {cat.description || "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-limestone-light border border-graphite-border font-mono text-[11px] text-graphite">
                        {cat.postCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {canDelete && (
                        <button
                          type="button"
                          disabled={deletingId === cat.id}
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="text-graphite-subtle hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

