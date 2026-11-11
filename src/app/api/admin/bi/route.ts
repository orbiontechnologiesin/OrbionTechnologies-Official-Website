import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getBusinessIntelligenceData } from "@/services/business-intelligence.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "business_intelligence:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const period = (searchParams.get("period") || "30d") as "7d" | "30d" | "90d" | "custom";
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  try {
    const data = await getBusinessIntelligenceData(period, startDate, endDate);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Orbion BI API] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve business intelligence data" }, { status: 500 });
  }
}

