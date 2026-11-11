import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { markNotificationAsRead } from "@/services/admin-notifications.service";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, props: RouteProps) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "notifications:manage")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { id } = await props.params;
  if (!id) {
    return NextResponse.json({ error: "Notification ID is required" }, { status: 400 });
  }

  const success = await markNotificationAsRead(id, session.profile.id, session.profile.role);
  if (!success) {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

