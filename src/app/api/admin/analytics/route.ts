import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getAnalyticsMetrics } from "@/services/analytics.service";
import { calculateDateWindow } from "@/services/business-intelligence.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "analytics:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const period = (searchParams.get("period") || "30d") as "7d" | "30d" | "90d" | "custom";
  const customStart = searchParams.get("startDate") || undefined;
  const customEnd = searchParams.get("endDate") || undefined;

  const { currentStart, currentEnd } = calculateDateWindow(period, customStart, customEnd);

  try {
    const data = await getAnalyticsMetrics(currentStart, currentEnd);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Orbion Analytics API] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve analytics metrics" }, { status: 500 });
  }
}

