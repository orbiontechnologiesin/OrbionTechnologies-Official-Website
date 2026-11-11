import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Administrator logout handler.
 * Invalidates session on Supabase Auth and clears session cookies.
 */
export async function POST() {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
      message: "Session ended successfully.",
      redirectUrl: "/admin/login",
    });
  } catch (err) {
    console.error("[Orbion Logout Error]", err);
    return NextResponse.json(
      { success: false, message: "Failed to terminate session." },
      { status: 500 }
    );
  }
}

