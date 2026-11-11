"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Send,
  Globe,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ContentStatusBadge } from "./ContentStatusBadge";
import type { CaseStudyItem } from "@/services/cms-case-studies.service";
import type { ContentStatus, AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface CaseStudyFormProps {
  initialStudy?: CaseStudyItem;
  userRole: AdminRole;
}

export function CaseStudyForm({ initialStudy, userRole }: CaseStudyFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialStudy);

  const [title, setTitle] = useState(initialStudy?.title || "");
  const [slug, setSlug] = useState(initialStudy?.slug || "");
  const [summary, setSummary] = useState(initialStudy?.summary || "");
  const [clientName, setClientName] = useState(initialStudy?.clientName || "");
  const [industry, setIndustry] = useState(initialStudy?.industry || "");
  const [challenge, setChallenge] = useState(initialStudy?.challenge || "");
  const [approach, setApproach] = useState(initialStudy?.approach || "");
  const [solution, setSolution] = useState(initialStudy?.solution || "");
  const [outcome, setOutcome] = useState(initialStudy?.outcome || "");
  const [featuredImage, setFeaturedImage] = useState(initialStudy?.featuredImage || "");
  const [technologiesText, setTechnologiesText] = useState((initialStudy?.technologies || []).join(", "));
  const [status, setStatus] = useState<ContentStatus>(initialStudy?.status || "draft");

  const [metaTitle, setMetaTitle] = useState(initialStudy?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialStudy?.metaDescription || "");

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

    const techs = technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      summary,
      clientName: clientName || null,
      industry: industry || null,
      challenge: challenge || null,
      approach: approach || null,
      solution: solution || null,
      outcome: outcome || null,
      featuredImage: featuredImage || null,
      technologies: techs,
      status: targetStatus,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
    };

    try {
      const endpoint = isEditing ? `/api/admin/cms/case-studies/${initialStudy?.id}` : `/api/admin/cms/case-studies`;
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to save case study.");
        setSaving(false);
        return;
      }

      setStatus(targetStatus);
      setSuccessMsg(data.message || "Case study saved.");
      setSaving(false);

      if (!isEditing && data.study?.id) {
        router.push(`/admin/case-studies/${data.study.id}/edit`);
      } else {
        router.refresh();
      }
    } catch {
      setErrorMsg("Network error.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialStudy || !confirm("Are you sure you want to delete this case study?")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/cms/case-studies/${initialStudy.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete case study.");
        setDeleting(false);
        return;
      }

      router.push("/admin/case-studies");
    } catch {
      alert("Network error.");
      setDeleting(false);
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
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Case Study Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Ledger Scalability for High-Frequency Logistics"
                className="w-full px-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-base font-semibold text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <span>Auto</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="logistics-distributed-ledger"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Client / Organization Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Apex Global Logistics (or Confidential)"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Executive Summary *
              </label>
              <textarea
                rows={2}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="High-level overview of the challenge and results..."
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>

          {/* Detailed Narrative Sections */}
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-graphite font-semibold">
              Narrative Breakdown
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                The Architectural Challenge
              </label>
              <textarea
                rows={3}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="What operational hurdle, bottleneck, or legacy issue was faced?"
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Engineering Approach & Methodology
              </label>
              <textarea
                rows={3}
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                placeholder="How did Orbion analyze and architect the solution?"
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Delivered Solution
              </label>
              <textarea
                rows={3}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Technologies, microservices, and platforms deployed..."
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Measurable Business Outcome
              </label>
              <textarea
                rows={3}
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="Real, verified business outcome (must NOT be fabricated)..."
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>

          {/* Search Engine Optimization */}
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
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Defaults to case study title if omitted"
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
                placeholder="Defaults to summary if omitted"
                className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Controls (1/3) */}
        <div className="space-y-6">
          <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
              <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted font-semibold">
                Publication Status
              </span>
              <ContentStatusBadge status={status} />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Healthcare, Fintech, Supply Chain"
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={technologiesText}
                onChange={(e) => setTechnologiesText(e.target.value)}
                placeholder="Next.js, PostgreSQL, Supabase, Python"
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                Featured Graphic URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/brand/Mockups/... or storage URL"
                className="w-full px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
              />
            </div>

            {/* Workflow Buttons */}
            <div className="pt-3 border-t border-graphite-border space-y-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("draft")}
                className="w-full flex items-center justify-center gap-2 py-2 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite font-mono text-xs rounded-lg transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-graphite-muted" />
                <span>{saving ? "Saving..." : "Save Draft"}</span>
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("in_review")}
                className="w-full flex items-center justify-center gap-2 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-xs rounded-lg transition-colors cursor-pointer"
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
                      className="w-full flex items-center justify-center gap-2 py-2 bg-graphite/10 border border-graphite/20 hover:bg-graphite/20 text-graphite font-mono text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Unpublish to Draft</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleSave("published")}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-pure-white font-mono text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Publish Verified Study</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {isEditing && canDelete && (
              <div className="pt-3 border-t border-graphite-border">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{deleting ? "Deleting..." : "Delete Case Study"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
