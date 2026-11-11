import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { blogPostSchema } from "@/lib/validation/cms.schema";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:read")) {
      return NextResponse.json({ success: false, message: "Access denied." }, { status: 403 });
    }

    const { id } = await props.params;
    const post = await getBlogPostById(id);

    if (!post) {
      return NextResponse.json({ success: false, message: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve blog post.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:update")) {
      return NextResponse.json({ success: false, message: "Access denied. Insufficient permissions to edit posts." }, { status: 403 });
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = blogPostSchema.partial().safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // If publishing, check 'cms:publish' capability
    if (result.data.status === "published" && !hasPermission(session.profile.role, "cms:publish")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Only Super Admin and Admin can publish posts directly." },
        { status: 403 }
      );
    }

    const updated = await updateBlogPost(id, result.data, session.user.id);
    if (!updated.success) {
      return NextResponse.json({ success: false, message: updated.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Blog post updated successfully.", post: updated.post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update blog post.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:delete")) {
      return NextResponse.json({ success: false, message: "Access denied. Only administrators can delete blog posts." }, { status: 403 });
    }

    const { id } = await props.params;
    const deleted = await deleteBlogPost(id, session.user.id);

    if (!deleted.success) {
      return NextResponse.json({ success: false, message: deleted.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete blog post.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
