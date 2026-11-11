import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { reportExportSchema } from "@/lib/validation/reporting.schema";
import { generateCsvReport } from "@/services/reports.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "reports:export")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  let body: Record<string, unknown> = {};
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    }
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const validation = reportExportSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid report configuration", details: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const report = await generateCsvReport({
      actorId: session.profile.id,
      reportType: validation.data.reportType,
      period: validation.data.period,
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
    });

    return new NextResponse(report.csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${report.filename}"`,
      },
    });
  } catch (err) {
    console.error("[Orbion Reports Export API] Error:", err);
    return NextResponse.json({ error: "Failed to generate report export" }, { status: 500 });
  }
}
