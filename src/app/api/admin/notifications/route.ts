import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getAdminNotifications } from "@/services/admin-notifications.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "notifications:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const unreadOnly = searchParams.get("unreadOnly") === "true";
  const category = searchParams.get("category") || undefined;

  try {
    const data = await getAdminNotifications(session.profile.id, session.profile.role, {
      page,
      limit,
      unreadOnly,
      category,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("[Orbion Notifications API] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve notifications" }, { status: 500 });
  }
}

