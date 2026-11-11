import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { blogCategorySchema } from "@/lib/validation/cms.schema";
import { getBlogCategories, createBlogCategory } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    const categories = await getBlogCategories();
    return NextResponse.json({ success: true, categories });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve categories.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:publish")) {
      return NextResponse.json({ success: false, message: "Access denied. Only Super Admin or Admin can create categories." }, { status: 403 });
    }

    const json = await request.json();
    const result = blogCategorySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation error.", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const created = await createBlogCategory(result.data, session.user.id);
    if (!created.success) {
      return NextResponse.json({ success: false, message: created.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Category created.", category: created.category });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve categories.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
