"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  HardDrive,
} from "lucide-react";
import type { MediaAssetItem } from "@/services/cms-media.service";
import type { MediaBucket, AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface MediaLibraryProps {
  initialAssets: MediaAssetItem[];
  total: number;
  userRole: AdminRole;
}

export function MediaLibrary({ initialAssets, total, userRole }: MediaLibraryProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const assets = initialAssets;
  const [filterType, setFilterType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [bucket, setBucket] = useState<MediaBucket>("media");
  const [altText, setAltText] = useState<string>("");

  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canUpload = hasPermission(userRole, "media:upload");
  const canDelete = hasPermission(userRole, "media:delete");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    if (altText) formData.append("altText", altText);

    try {
      const res = await fetch("/api/admin/cms/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to upload file.");
        setUploading(false);
        return;
      }

      setSuccessMsg(`File "${file.name}" uploaded successfully.`);
      setAltText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploading(false);
      router.refresh();
    } catch {
      setErrorMsg("Network error during file upload.");
      setUploading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This removes the file from cloud storage.`)) {
      return;
    }

    setDeletingId(id);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/cms/media/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to delete asset.");
        setDeletingId(null);
        return;
      }

      setSuccessMsg(`Asset "${name}" deleted.`);
      setDeletingId(null);
      router.refresh();
    } catch {
      setErrorMsg("Network error.");
      setDeletingId(null);
    }
  }

  function copyToClipboard(url: string | null, id: string) {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filteredAssets = assets.filter((asset) => {
    if (filterType === "images" && !asset.mimeType.startsWith("image/")) return false;
    if (filterType === "documents" && asset.mimeType !== "application/pdf") return false;
    if (search && !asset.originalName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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

      {/* Upload Dropzone & Controls */}
      {canUpload && (
        <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-graphite-border mb-4">
            <div>
              <h3 className="text-sm font-semibold text-graphite flex items-center gap-2">
                <Upload className="w-4 h-4 text-copper" />
                <span>Upload Media Asset</span>
              </h3>
              <p className="text-xs text-graphite-subtle mt-0.5">
                Supported formats: JPEG, PNG, WebP, GIF, SVG, PDF. Size limit: 10MB (images), 15MB (documents).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={bucket}
                onChange={(e) => setBucket(e.target.value as MediaBucket)}
                className="px-3 py-1.5 bg-limestone-light border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
              >
                <option value="media">Public Media Bucket</option>
                <option value="documents">Private Documents Bucket</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
              className="hidden"
            />

            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descriptive Alt Text for accessibility (optional)..."
              className="flex-1 px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-copper hover:bg-copper-hover text-pure-white rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? "Uploading..." : "Select & Upload"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite-subtle pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by filename..."
              className="w-full pl-9 pr-4 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none"
          >
            <option value="all">All File Types</option>
            <option value="images">Images Only</option>
            <option value="documents">PDFs & Documents</option>
          </select>
        </div>

        <span className="text-xs font-mono text-graphite-muted">
          Showing {filteredAssets.length} of {total} assets
        </span>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length === 0 ? (
        <div className="bg-limestone-card rounded-xl border border-graphite-border p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
            <HardDrive className="w-6 h-6 text-sage" />
          </div>
          <h3 className="text-sm font-semibold text-graphite">No media assets found</h3>
          <p className="text-xs text-graphite-subtle mt-1 max-w-sm mx-auto">
            {search ? "No assets match your search term." : "Upload brand logos, mockups, or article graphics to populate the media library."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAssets.map((asset) => {
            const isImage = asset.mimeType.startsWith("image/");
            const isCopied = copiedId === asset.id;

            return (
              <div
                key={asset.id}
                className="group bg-limestone-card rounded-xl border border-graphite-border hover:border-copper/40 transition-all overflow-hidden flex flex-col shadow-xs"
              >
                {/* Thumbnail Preview Area */}
                <div className="h-32 bg-limestone-light/60 relative flex items-center justify-center overflow-hidden border-b border-graphite-border/70">
                  {isImage && asset.publicUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset.publicUrl}
                      alt={asset.altText || asset.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center p-3 text-graphite-muted">
                      <FileText className="w-8 h-8 mx-auto text-sage mb-1" />
                      <span className="text-[10px] font-mono uppercase block">{asset.mimeType.split("/")[1]}</span>
                    </div>
                  )}

                  {/* Bucket Pill */}
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-petrol/90 text-pure-white text-[9px] font-mono uppercase">
                    {asset.bucket}
                  </span>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-graphite truncate" title={asset.originalName}>
                      {asset.originalName}
                    </p>
                    <p className="text-[10px] font-mono text-graphite-subtle mt-0.5">
                      {formatBytes(asset.sizeBytes)} • {new Date(asset.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-graphite-border/60">
                    {asset.publicUrl ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(asset.publicUrl, asset.id)}
                        className={`text-[11px] font-mono flex items-center gap-1 transition-colors ${
                          isCopied ? "text-emerald-600 font-semibold" : "text-copper hover:text-copper-hover"
                        }`}
                        title="Copy Public URL"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? "Copied" : "Copy URL"}</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-graphite-subtle italic">Private File</span>
                    )}

                    {canDelete && (
                      <button
                        type="button"
                        disabled={deletingId === asset.id}
                        onClick={() => handleDelete(asset.id, asset.originalName)}
                        className="text-graphite-subtle hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
