import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getLeadIntelligenceSummary } from "@/services/lead-intelligence.service";
import { calculateDateWindow } from "@/services/business-intelligence.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "lead_intelligence:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const period = (searchParams.get("period") || "30d") as "7d" | "30d" | "90d" | "custom";
  const customStart = searchParams.get("startDate") || undefined;
  const customEnd = searchParams.get("endDate") || undefined;

  const { currentStart, currentEnd } = calculateDateWindow(period, customStart, customEnd);

  try {
    const data = await getLeadIntelligenceSummary(currentStart, currentEnd);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Orbion Lead Intelligence API] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve lead intelligence" }, { status: 500 });
  }
}

