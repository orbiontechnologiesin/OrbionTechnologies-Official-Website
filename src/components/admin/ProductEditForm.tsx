"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ProductStatusBadge } from "./ProductStatusBadge";
import type { ManagedProductItem } from "@/services/cms-products.service";
import type { ProductStatus, AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface ProductEditFormProps {
  product: ManagedProductItem;
  userRole: AdminRole;
}

export function ProductEditForm({ product, userRole }: ProductEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [headline, setHeadline] = useState(product.headline);
  const [shortDescription, setShortDescription] = useState(product.shortDescription);
  const [detailedDescription, setDetailedDescription] = useState(product.detailedDescription || "");
  const [status, setStatus] = useState<ProductStatus>(product.status);
  const [statusNotice, setStatusNotice] = useState(product.statusNotice || "");
  const [metaTitle, setMetaTitle] = useState(product.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(product.metaDescription || "");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canEdit = hasPermission(userRole, "products:update");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/cms/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          headline,
          shortDescription,
          detailedDescription: detailedDescription || null,
          status,
          statusNotice: statusNotice || null,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to update product.");
        setSaving(false);
        return;
      }

      setSuccessMsg("Product information successfully updated.");
      setSaving(false);
      router.refresh();
    } catch {
      setErrorMsg("Network error.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={!canEdit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-sm font-semibold text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Slug (Immutable)
                </label>
                <input
                  type="text"
                  disabled
                  value={product.slug}
                  className="w-full px-3.5 py-2 bg-limestone-light/70 border border-graphite-border rounded-lg text-xs font-mono text-graphite-muted cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Headline *
              </label>
              <input
                type="text"
                required
                disabled={!canEdit}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Short Description *
              </label>
              <textarea
                rows={3}
                required
                disabled={!canEdit}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Detailed Envisaged Architecture & Vision
              </label>
              <textarea
                rows={5}
                disabled={!canEdit}
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-graphite font-semibold">
              Search Engine Metadata
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={2}
                disabled={!canEdit}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column Controls (1/3) */}
        <div className="space-y-6">
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
              <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted font-semibold">
                Development Stage
              </span>
              <ProductStatusBadge status={status} />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Publishing Status *
              </label>
              <select
                disabled={!canEdit}
                value={status}
                onChange={(e) => setStatus(e.target.value as ProductStatus)}
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
              >
                <option value="coming_soon">Coming Soon</option>
                <option value="in_development">In Development</option>
                <option value="available">Available</option>
              </select>
              <p className="text-[10px] text-graphite-subtle font-mono mt-1">
                Preserve &quot;Coming Soon&quot; unless commercial availability has launched.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Public Status Notice
              </label>
              <textarea
                rows={3}
                disabled={!canEdit}
                value={statusNotice}
                onChange={(e) => setStatusNotice(e.target.value)}
                placeholder="Currently in active development..."
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none resize-none"
              />
            </div>

            {canEdit && (
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-copper hover:bg-copper-hover text-pure-white font-mono text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Saving Changes..." : "Save Product Details"}</span>
              </button>
            )}

            <div className="pt-2 border-t border-graphite-border">
              <Link
                href={`/products/${product.slug}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-graphite-muted hover:text-graphite transition-colors"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-sage" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
