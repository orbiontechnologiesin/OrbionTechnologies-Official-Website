import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MediaBucket } from "@/types/database";

interface RawMediaRow {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  bucket: MediaBucket;
  storage_path: string;
  public_url: string | null;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string } | null;
}

export interface MediaAssetItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  bucket: MediaBucket;
  storagePath: string;
  publicUrl: string | null;
  altText: string | null;
  uploadedBy: string | null;
  uploaderName?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Retrieves paginated media library assets.
 */
export async function getMediaAssets({
  bucket,
  mimeType,
  search,
  page = 1,
  limit = 24,
}: {
  bucket?: MediaBucket;
  mimeType?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{
  assets: MediaAssetItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const supabase = await createServerClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("media_assets")
    .select(
      `
      id,
      filename,
      original_name,
      mime_type,
      size_bytes,
      bucket,
      storage_path,
      public_url,
      alt_text,
      uploaded_by,
      created_at,
      updated_at,
      profiles:uploaded_by (full_name)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (bucket) {
    query = query.eq("bucket", bucket);
  }

  if (mimeType) {
    if (mimeType === "image") {
      query = query.ilike("mime_type", "image/%");
    } else if (mimeType === "document") {
      query = query.eq("mime_type", "application/pdf");
    }
  }

  if (search && search.trim()) {
    query = query.ilike("original_name", `%${search.trim()}%`);
  }

  const { data, count, error } = await query;

  if (error || !data) {
    console.error("[Orbion CMS Media Error] getMediaAssets:", error);
    return { assets: [], total: 0, page, totalPages: 0 };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  const assets: MediaAssetItem[] = (data as unknown as RawMediaRow[]).map((row) => ({
    id: row.id,
    filename: row.filename,
    originalName: row.original_name,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    bucket: row.bucket as MediaBucket,
    storagePath: row.storage_path,
    publicUrl: row.public_url,
    altText: row.alt_text,
    uploadedBy: row.uploaded_by,
    uploaderName: row.profiles?.full_name || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  return { assets, total, page, totalPages };
}

/**
 * Uploads a file to Supabase Storage and records metadata in media_assets.
 */
export async function uploadMediaAsset({
  file,
  altText,
  bucket = "media",
  actorId,
}: {
  file: File;
  altText?: string | null;
  bucket?: MediaBucket;
  actorId: string;
}): Promise<{ success: boolean; asset?: MediaAssetItem; error?: string }> {
  const adminClient = createAdminClient();

  // 1. Sanitize filename & generate unique path
  const sanitizedOriginal = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const extension = sanitizedOriginal.split(".").pop() || "bin";
  const uniqueId = crypto.randomUUID().slice(0, 8);
  const timestamp = Date.now();
  const safeFilename = `${timestamp}-${uniqueId}.${extension}`;
  const storagePath = `uploads/${new Date().getFullYear()}/${safeFilename}`;

  // 2. Upload to Supabase Storage bucket
  const fileBuffer = await file.arrayBuffer();
  const { error: storageError } = await adminClient.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (storageError) {
    console.error("[Orbion Storage Upload Error]:", storageError);
    return { success: false, error: storageError.message };
  }

  // 3. Resolve public URL for public bucket
  let publicUrl: string | null = null;
  if (bucket === "media") {
    const { data: urlData } = adminClient.storage.from(bucket).getPublicUrl(storagePath);
    publicUrl = urlData.publicUrl;
  }

  // 4. Record metadata in public.media_assets
  const { data: asset, error: dbError } = await adminClient
    .from("media_assets")
    .insert({
      filename: safeFilename,
      original_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      bucket,
      storage_path: storagePath,
      public_url: publicUrl,
      alt_text: altText || null,
      uploaded_by: actorId,
    })
    .select()
    .single();

  if (dbError || !asset) {
    console.error("[Orbion Media Metadata Error]:", dbError);
    // Cleanup storage file on db failure
    await adminClient.storage.from(bucket).remove([storagePath]);
    return { success: false, error: dbError?.message || "Failed to record asset metadata." };
  }

  // 5. Audit Log
  try {
    await adminClient.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_media_uploaded",
      entity_type: "media_asset",
      entity_id: asset.id,
      metadata: {
        filename: asset.filename,
        original_name: asset.original_name,
        bucket: asset.bucket,
        size_bytes: asset.size_bytes,
      },
    });
  } catch (auditErr) {
    console.error("[Orbion Audit Error]", auditErr);
  }

  return {
    success: true,
    asset: {
      id: asset.id,
      filename: asset.filename,
      originalName: asset.original_name,
      mimeType: asset.mime_type,
      sizeBytes: asset.size_bytes,
      bucket: asset.bucket as MediaBucket,
      storagePath: asset.storage_path,
      publicUrl: asset.public_url,
      altText: asset.alt_text,
      uploadedBy: asset.uploaded_by,
      createdAt: asset.created_at,
      updatedAt: asset.updated_at,
    },
  };
}

/**
 * Deletes a media asset from both Storage and Database.
 */
export async function deleteMediaAsset(
  id: string,
  actorId: string
): Promise<{ success: boolean; error?: string }> {
  const adminClient = createAdminClient();

  // Find asset
  const { data: asset, error: findError } = await adminClient
    .from("media_assets")
    .select("*")
    .eq("id", id)
    .single();

  if (findError || !asset) {
    return { success: false, error: "Media asset not found." };
  }

  // 1. Remove from Storage
  const { error: storageError } = await adminClient.storage
    .from(asset.bucket)
    .remove([asset.storage_path]);

  if (storageError) {
    console.warn("[Orbion Storage Deletion Warning]:", storageError.message);
  }

  // 2. Remove from Database
  const { error: dbError } = await adminClient
    .from("media_assets")
    .delete()
    .eq("id", id);

  if (dbError) {
    return { success: false, error: dbError.message };
  }

  // 3. Audit log
  try {
    await adminClient.from("audit_logs").insert({
      actor_id: actorId,
      action: "cms_media_deleted",
      entity_type: "media_asset",
      entity_id: id,
      metadata: {
        filename: asset.filename,
        original_name: asset.original_name,
        storage_path: asset.storage_path,
      },
    });
  } catch (err) {
    console.error("[Orbion Audit Error]", err);
  }

  return { success: true };
}
