import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { inviteUserSchema } from "@/lib/validation/admin.schema";
import { inviteStaffUser } from "@/services/admin-users.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    if (!hasPermission(session.profile.role, "users:create")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Only Super Administrators can invite staff." },
        { status: 403 }
      );
    }

    const json = await request.json();
    const result = inviteUserSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid invitation data.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, fullName, role } = result.data;

    const outcome = await inviteStaffUser({
      email,
      fullName,
      role,
      actorId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      message: `Invitation successfully dispatched to ${email}.`,
      data: outcome,
    });
  } catch (err: unknown) {
    console.error("[Orbion User Invite Error]", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to invite administrator.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}

