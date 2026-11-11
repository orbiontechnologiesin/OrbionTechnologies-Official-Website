import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { deleteMediaAsset } from "@/services/cms-media.service";

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

    if (!hasPermission(session.profile.role, "media:delete")) {
      return NextResponse.json({ success: false, message: "Access denied. Only Super Admin and Admin can delete media assets." }, { status: 403 });
    }

    const { id } = await props.params;
    const deleted = await deleteMediaAsset(id, session.user.id);

    if (!deleted.success) {
      return NextResponse.json({ success: false, message: deleted.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Asset deleted successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete media asset.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
