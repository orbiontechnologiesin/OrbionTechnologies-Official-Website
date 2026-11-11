import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { updateUserRoleSchema } from "@/lib/validation/admin.schema";
import { updateStaffRole } from "@/services/admin-users.service";

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
        { success: false, message: "Access denied. Only Super Administrators can alter roles." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = updateUserRoleSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid role payload.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await updateStaffRole({
      targetUserId: id,
      newRole: result.data.role,
      actorId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      message: `Role updated to ${result.data.role} successfully.`,
    });
  } catch (err: unknown) {
    console.error("[Orbion User Role Error]", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to update role.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}

