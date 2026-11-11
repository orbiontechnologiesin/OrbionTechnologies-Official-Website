import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { updateLeadStatusSchema } from "@/lib/validation/admin.schema";
import { updateLeadStatusAtomic } from "@/services/admin-leads.service";

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

    if (!hasPermission(session.profile.role, "leads:update")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Insufficient role permissions." },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = updateLeadStatusSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid lead update payload.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { status, assignedTo, internalNote } = result.data;

    const updated = await updateLeadStatusAtomic({
      leadId: id,
      status,
      assignedTo,
      internalNote,
    });

    return NextResponse.json({
      success: true,
      message: "Lead status updated successfully.",
      data: updated,
    });
  } catch (err: unknown) {
    console.error("[Orbion Lead Update Error]", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to update lead status.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

