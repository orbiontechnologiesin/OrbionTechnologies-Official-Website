import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { blogPostSchema } from "@/lib/validation/cms.schema";
import { getBlogPostsAdmin, createBlogPost } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:read")) {
      return NextResponse.json({ success: false, message: "Access denied. Insufficient permissions." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const status = searchParams.get("status") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const search = searchParams.get("search") || undefined;

    const result = await getBlogPostsAdmin({ page, limit, status, categoryId, search });
    return NextResponse.json({ success: true, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch blog posts.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:create")) {
      return NextResponse.json({ success: false, message: "Access denied. Insufficient permissions to create posts." }, { status: 403 });
    }

    const json = await request.json();
    const result = blogPostSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Role check: if status is 'published', require 'cms:publish' permission
    if (result.data.status === "published" && !hasPermission(session.profile.role, "cms:publish")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Only Super Admin and Admin can publish posts directly." },
        { status: 403 }
      );
    }

    const created = await createBlogPost(result.data, session.user.id);
    if (!created.success) {
      return NextResponse.json({ success: false, message: created.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Blog post created successfully.", post: created.post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create blog post.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
