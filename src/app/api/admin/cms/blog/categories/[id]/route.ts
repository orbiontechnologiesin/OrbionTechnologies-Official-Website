import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { deleteBlogCategory } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

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
      return NextResponse.json({ success: false, message: "Access denied. Only Super Admin or Admin can delete categories." }, { status: 403 });
    }

    const { id } = await props.params;
    const result = await deleteBlogCategory(id, session.user.id);

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Category deleted successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete category.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
