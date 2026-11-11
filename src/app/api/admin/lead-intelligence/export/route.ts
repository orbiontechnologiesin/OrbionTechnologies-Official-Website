import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { exportLeadsCsv } from "@/services/lead-intelligence.service";
import { calculateDateWindow } from "@/services/business-intelligence.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (
    !session ||
    (!hasPermission(session.profile.role, "reports:export") &&
      !hasPermission(session.profile.role, "lead_intelligence:view"))
  ) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  try {
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
      // Use defaults
    }

    const period = (body.period || "30d") as "7d" | "30d" | "90d" | "custom";
    const { currentStart, currentEnd } = calculateDateWindow(
      period,
      body.startDate as string | undefined,
      body.endDate as string | undefined
    );

    const csvContent = await exportLeadsCsv(session.profile.id, {
      startDate: currentStart,
      endDate: currentEnd,
      status: body.status as string | undefined,
    });

    const filename = `orbion_leads_${currentStart.slice(0, 10)}_to_${currentEnd.slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[Orbion Leads Export API] Error:", err);
    return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
  }
}
