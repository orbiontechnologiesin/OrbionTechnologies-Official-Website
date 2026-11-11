import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { getNewsletterSubscribers } from "@/services/newsletter-admin.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session || !hasPermission(session.profile.role, "newsletter:view")) {
    return NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  try {
    const data = await getNewsletterSubscribers({
      page,
      limit,
      search,
      status,
      startDate,
      endDate,
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Orbion Newsletter Admin API] Error:", err);
    return NextResponse.json({ error: "Failed to retrieve newsletter subscribers" }, { status: 500 });
  }
}

