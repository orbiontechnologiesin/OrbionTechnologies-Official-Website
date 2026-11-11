import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { markAllNotificationsAsRead } from "@/services/admin-notifications.service";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "notifications:manage")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  await markAllNotificationsAsRead(session.profile.id, session.profile.role);
  return NextResponse.json({ success: true });
}

