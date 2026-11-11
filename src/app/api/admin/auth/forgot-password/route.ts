import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { adminForgotPasswordSchema } from "@/lib/validation/admin.schema";
import { getPublicEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Initiates the password reset workflow for administrators.
 * Security: Generic response returned regardless of account existence to defeat enumeration.
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = adminForgotPasswordSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid administrator email address.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const { siteUrl } = getPublicEnv();
    const supabase = await createServerClient();

    // Trigger Supabase Auth password reset email
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/admin/reset-password`,
    });

    return NextResponse.json({
      success: true,
      message:
        "If an authorized administrator account exists for that email, a secure password reset link has been dispatched.",
    });
  } catch (err) {
    console.error("[Orbion Forgot Password Error]", err);
    return NextResponse.json(
      {
        success: true,
        message:
          "If an authorized administrator account exists for that email, a secure password reset link has been dispatched.",
      },
      { status: 200 }
    );
  }
}

