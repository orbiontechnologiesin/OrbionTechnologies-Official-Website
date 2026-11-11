import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { adminLoginSchema } from "@/lib/validation/admin.schema";
import { sanitizeRedirectUrl } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * Administrator login handler using Supabase Auth with cookie-based session management.
 * Checks account activation and logs audit event on success.
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = adminLoginSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login credentials format.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password, next } = result.data;
    const supabase = await createServerClient();

    // Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      // Generic error message to prevent account enumeration
      return NextResponse.json(
        { success: false, message: "Invalid email address or password." },
        { status: 401 }
      );
    }

    const userId = authData.user.id;

    // Check profile and activation state
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, is_active, full_name")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { success: false, message: "No administrative profile is assigned to this account." },
        { status: 403 }
      );
    }

    if (!profile.is_active) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { success: false, message: "Your administrator account has been deactivated. Contact Super Admin." },
        { status: 403 }
      );
    }

    // Write login audit log
    try {
      const adminClient = createAdminClient();
      await adminClient.from("audit_logs").insert({
        actor_id: userId,
        action: "admin_login_success",
        entity_type: "profile",
        entity_id: userId,
        metadata: {
          email,
          role: profile.role,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (auditErr) {
      console.error("[Orbion Audit Error]", auditErr);
    }

    const targetUrl = sanitizeRedirectUrl(next);

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      redirectUrl: targetUrl,
      user: {
        id: userId,
        email,
        fullName: profile.full_name,
        role: profile.role,
      },
    });
  } catch (err) {
    console.error("[Orbion Login Error]", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}

