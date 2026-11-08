import "server-only";

import { Resend } from "resend";
import { getServerEnv, isEmailConfigured } from "@/lib/env";

let resendInstance: Resend | null = null;

/**
 * Returns a configured Resend client instance or null if credentials are not set.
 * Safe to call even before API keys are added.
 */
export function getResendClient(): Resend | null {
  if (!isEmailConfigured()) {
    return null;
  }

  if (resendInstance) {
    return resendInstance;
  }

  try {
    const { resendApiKey } = getServerEnv();
    if (resendApiKey) {
      resendInstance = new Resend(resendApiKey);
      return resendInstance;
    }
  } catch {
    // If environment not yet fully set up
  }

  return null;
}

