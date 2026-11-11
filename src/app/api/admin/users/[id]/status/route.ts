import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { updateUserStatusSchema } from "@/lib/validation/admin.schema";
import { updateStaffStatus } from "@/services/admin-users.service";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    if (!hasPermission(session.profile.role, "users:update")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Only Super Administrators can alter account statuses." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = updateUserStatusSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status update payload.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await updateStaffStatus({
      targetUserId: id,
      isActive: result.data.isActive,
      actorId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      message: `Account status successfully ${result.data.isActive ? "activated" : "deactivated"}.`,
    });
  } catch (err: unknown) {
    console.error("[Orbion User Status Error]", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to update account status.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}

