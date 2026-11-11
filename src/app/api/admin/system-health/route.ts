import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getSystemHealthOverview, getOperationalLogs } from "@/services/system-health.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "system_health:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  try {
    const [health, logs] = await Promise.all([
      getSystemHealthOverview(),
      getOperationalLogs(20),
    ]);

    return NextResponse.json({
      health,
      logs,
    });
  } catch (err) {
    console.error("[Orbion System Health API] Error:", err);
    return NextResponse.json({ error: "Failed to query system health" }, { status: 500 });
  }
}

