import "server-only";

import { getResendClient } from "./client";
import { getServerEnv } from "@/lib/env";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  pendingConfig?: boolean;
  error?: string;
}

/**
 * Dispatches an email via Resend if credentials are active.
 * If credentials are not yet configured, returns a clean result without crashing,
 * allowing the outbox to keep the record queued for delivery upon configuration.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const client = getResendClient();

  if (!client) {
    return {
      success: false,
      pendingConfig: true,
      error: "Resend API key is not configured in environment.",
    };
  }

  let fromAddress = options.from;
  if (!fromAddress) {
    try {
      const env = getServerEnv();
      fromAddress = env.senderEmail;
    } catch {
      fromAddress = "Orbion Technologies <notifications@orbiontechnologies.in>";
    }
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (data && data.id) {
      return {
        success: true,
        messageId: data.id,
      };
    }

    return {
      success: false,
      error: "Unexpected response from email provider.",
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

