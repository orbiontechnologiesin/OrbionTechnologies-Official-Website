import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { ALLOWED_MIME_TYPES } from "@/lib/validation/cms.schema";
import { getMediaAssets, uploadMediaAsset } from "@/services/cms-media.service";
import type { MediaBucket } from "@/types/database";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "media:read")) {
      return NextResponse.json({ success: false, message: "Access denied." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "24", 10);
    const bucket = (searchParams.get("bucket") as MediaBucket) || undefined;
    const mimeType = searchParams.get("mimeType") || undefined;
    const search = searchParams.get("search") || undefined;

    const result = await getMediaAssets({ page, limit, bucket, mimeType, search });
    return NextResponse.json({ success: true, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process media request.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "media:upload")) {
      return NextResponse.json({ success: false, message: "Access denied. Insufficient permissions to upload media." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || null;
    const bucket = (formData.get("bucket") as MediaBucket) || "media";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided in upload request." }, { status: 400 });
    }

    // MIME verification
    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      return NextResponse.json(
        {
          success: false,
          message: `Unsupported file type: ${file.type}. Allowed types: JPEG, PNG, WebP, GIF, SVG, PDF.`,
        },
        { status: 400 }
      );
    }

    // Size limit check (10MB for media, 15MB for documents)
    const maxBytes = bucket === "media" ? 10 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { success: false, message: `File size (${Math.round(file.size / 1024)} KB) exceeds the maximum limit.` },
        { status: 400 }
      );
    }

    const uploaded = await uploadMediaAsset({
      file,
      altText,
      bucket,
      actorId: session.user.id,
    });

    if (!uploaded.success) {
      return NextResponse.json({ success: false, message: uploaded.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Asset uploaded successfully.", asset: uploaded.asset });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process media request.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
