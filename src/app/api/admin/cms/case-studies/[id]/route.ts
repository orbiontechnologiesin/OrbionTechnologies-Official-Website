import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { caseStudySchema } from "@/lib/validation/cms.schema";
import { getCaseStudyById, updateCaseStudy, deleteCaseStudy } from "@/services/cms-case-studies.service";

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
    const study = await getCaseStudyById(id);

    if (!study) {
      return NextResponse.json({ success: false, message: "Case study not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, study });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process case study operation.";
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
      return NextResponse.json({ success: false, message: "Access denied. Insufficient permissions to edit." }, { status: 403 });
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = caseStudySchema.partial().safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation error.", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (result.data.status === "published" && !hasPermission(session.profile.role, "cms:publish")) {
      return NextResponse.json(
        { success: false, message: "Access denied. Only Super Admin or Admin can publish case studies directly." },
        { status: 403 }
      );
    }

    const updated = await updateCaseStudy(id, result.data, session.user.id);
    if (!updated.success) {
      return NextResponse.json({ success: false, message: updated.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Case study updated.", study: updated.study });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process case study operation.";
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
      return NextResponse.json({ success: false, message: "Access denied. Only Super Admin or Admin can delete case studies." }, { status: 403 });
    }

    const { id } = await props.params;
    const deleted = await deleteCaseStudy(id, session.user.id);

    if (!deleted.success) {
      return NextResponse.json({ success: false, message: deleted.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Case study deleted." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process case study operation.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
