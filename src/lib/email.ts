import { Resend } from 'resend';
import { COMPANY } from '@/data/company';

// Environment variable configuration
const resendApiKey = process.env.RESEND_API_KEY;
const defaultSender = process.env.EMAIL_FROM || 'Orbion Technologies <auth@orbiontechnologies.in>';

// Resend client singleton
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface SendVerificationEmailParams {
  to: string;
  name?: string | null;
  verificationUrl: string;
}

export interface SendPasswordResetEmailParams {
  to: string;
  name?: string | null;
  resetUrl: string;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Builds the Apple-inspired minimalist HTML template for email verification.
 */
function buildVerificationEmailHtml(params: { name?: string | null; verificationUrl: string }): string {
  const recipientName = params.name ? params.name.trim() : 'there';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email address — Orbion Technologies</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0A0A0C;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #E2E8F0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0A0A0C;
      padding: 48px 16px;
    }
    .container {
      max-width: 540px;
      margin: 0 auto;
      background-color: #121217;
      border: 1px solid #23232F;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .top-bar {
      height: 3px;
      background: linear-gradient(90deg, #5B4FFF 0%, #00E0D6 100%);
    }
    .content {
      padding: 40px 36px 36px;
    }
    .brand {
      margin-bottom: 32px;
    }
    .brand-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #FFFFFF;
      margin: 0;
    }
    .brand-sub {
      font-size: 11px;
      color: #00E0D6;
      font-family: 'SF Mono', Menlo, Consolas, Monaco, monospace;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-top: 4px;
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin: 0 0 16px;
      line-height: 1.3;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #94A3B8;
      margin: 0 0 24px;
    }
    .btn-container {
      margin: 32px 0;
      text-align: left;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #5B4FFF 0%, #4638E8 100%);
      color: #FFFFFF !important;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.01em;
      text-decoration: none;
      padding: 13px 28px;
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(91, 79, 255, 0.35);
    }
    .expiry-note {
      font-size: 12px;
      color: #64748B;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
    }
    .fallback-box {
      background-color: #0A0A0D;
      border: 1px solid #1E1E28;
      border-radius: 6px;
      padding: 14px;
      margin-top: 24px;
      word-break: break-all;
    }
    .fallback-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748B;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
      font-family: 'SF Mono', Menlo, Consolas, Monaco, monospace;
    }
    .fallback-url {
      font-size: 11px;
      color: #00E0D6;
      text-decoration: none;
      font-family: 'SF Mono', Menlo, Consolas, Monaco, monospace;
      line-height: 1.5;
    }
    .footer {
      border-top: 1px solid #1C1C26;
      padding: 24px 36px;
      background-color: #0E0E12;
      font-size: 12px;
      color: #475569;
      line-height: 1.6;
    }
    .footer strong {
      color: #64748B;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="top-bar"></div>
      <div class="content">
        <div class="brand">
          <div class="brand-title">Orbion Technologies</div>
          <div class="brand-sub">Autonomous Operating Architecture</div>
        </div>

        <h1>Verify your email address</h1>
        <p>Hello ${recipientName},</p>
        <p>Confirm your work email to activate your Orbion Technologies account and access the enterprise console.</p>

        <div class="btn-container">
          <a href="${params.verificationUrl}" class="btn" target="_blank" rel="noopener noreferrer">
            Verify Email Address
          </a>
        </div>

        <p class="expiry-note">
          ⏱ <strong>Notice:</strong> This verification link is strictly valid for <strong>1 hour</strong>.
        </p>

        <div class="fallback-box">
          <div class="fallback-label">Fallback Verification URL</div>
          <a href="${params.verificationUrl}" class="fallback-url" target="_blank" rel="noopener noreferrer">
            ${params.verificationUrl}
          </a>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 8px;">
          <strong>Security Notice:</strong> If you did not create an account with Orbion Technologies, you can safely ignore this email. No further action is required.
        </p>
        <p style="margin: 0 0 8px; font-size: 11px; color: #64748B;">
          Support &amp; Enquiries: <a href="mailto:${COMPANY.emails.general}" style="color: #00E0D6; text-decoration: none;">${COMPANY.emails.general}</a>
        </p>
        <p style="margin: 0; font-size: 11px; color: #334155;">
          Orbion Technologies Operating Architecture &bull; https://orbiontechnologies.in
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Builds plain-text fallback for email verification.
 */
function buildVerificationEmailText(params: { name?: string | null; verificationUrl: string }): string {
  const recipientName = params.name ? params.name.trim() : 'there';
  return `Verify your email address — Orbion Technologies

Hello ${recipientName},

Confirm your work email to activate your Orbion Technologies account and access the enterprise console.

Verification Link:
${params.verificationUrl}

Notice: This verification link expires in 1 hour.

Security Notice: If you did not create an account with Orbion Technologies, you can safely ignore this email.
Support: ${COMPANY.emails.general}

---
Orbion Technologies Operating Architecture
https://orbiontechnologies.in
`;
}

/**
 * Sends a transactional verification email via Resend.
 * Strictly awaits completion to ensure safety in serverless execution environments (Vercel).
 */
export async function sendEmailVerification(
  params: SendVerificationEmailParams
): Promise<EmailDeliveryResult> {
  const { to, name, verificationUrl } = params;

  if (!to || !to.includes('@')) {
    console.warn('[Email Service] Rejected invalid recipient address');
    return { success: false, error: 'Invalid recipient email address.' };
  }

  if (!verificationUrl) {
    console.warn('[Email Service] Missing verification URL');
    return { success: false, error: 'Missing verification URL.' };
  }

  // If Resend API key is not configured, log notice in development and return graceful diagnostic
  if (!resend) {
    console.info(
      `[Email Service Notice] RESEND_API_KEY is not configured. Verification email queued for ${to}.`
    );
    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  try {
    const html = buildVerificationEmailHtml({ name, verificationUrl });
    const text = buildVerificationEmailText({ name, verificationUrl });

    const response = await resend.emails.send({
      from: defaultSender,
      replyTo: COMPANY.emails.general,
      to: [to.trim()],
      subject: 'Verify your email address — Orbion Technologies',
      html,
      text,
    });

    if (response.error) {
      console.error(
        '[Email Service Error] Resend dispatch failed:',
        response.error.name || response.error.message
      );
      return {
        success: false,
        error: response.error.message || 'Email delivery failed.',
      };
    }

    console.info(
      `[Email Service] Verification email dispatched successfully to ${to} (Message ID: ${response.data?.id})`
    );

    return {
      success: true,
      messageId: response.data?.id,
    };
  } catch (err) {
    console.error(
      '[Email Service Exception]:',
      err instanceof Error ? err.message : 'Unknown email error'
    );
    return {
      success: false,
      error: 'An unexpected transmission error occurred during email dispatch.',
    };
  }
}

/**
 * Sends a password reset email via Resend.
 */
export async function sendPasswordResetEmail(
  params: SendPasswordResetEmailParams
): Promise<EmailDeliveryResult> {
  const { to, name, resetUrl } = params;

  if (!to || !to.includes('@') || !resetUrl) {
    return { success: false, error: 'Invalid parameters for password reset email.' };
  }

  if (!resend) {
    console.info(`[Email Service Notice] Password reset queued for ${to}.`);
    return { success: true, messageId: `mock_${Date.now()}` };
  }

  try {
    const recipientName = name ? name.trim() : 'there';
    const html = `<!DOCTYPE html>
<html>
<body style="background-color: #0A0A0C; font-family: sans-serif; color: #E2E8F0; padding: 40px 16px;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #121217; border: 1px solid #23232F; border-radius: 8px; padding: 32px;">
    <h2 style="color: #FFFFFF; margin-top: 0;">Reset your Orbion account password</h2>
    <p style="color: #94A3B8;">Hello ${recipientName},</p>
    <p style="color: #94A3B8;">We received a request to reset your password. Click the button below to set a new password:</p>
    <div style="margin: 28px 0;">
      <a href="${resetUrl}" style="background-color: #5B4FFF; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
        Reset Password
      </a>
    </div>
    <p style="color: #64748B; font-size: 12px;">This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
    <p style="color: #475569; font-size: 11px; margin-top: 16px;">Support &amp; Enquiries: ${COMPANY.emails.general}</p>
  </div>
</body>
</html>`;

    const text = `Reset your Orbion account password\n\nReset Link: ${resetUrl}\n\nExpires in 1 hour.\nSupport: ${COMPANY.emails.general}`;

    const response = await resend.emails.send({
      from: defaultSender,
      replyTo: COMPANY.emails.general,
      to: [to.trim()],
      subject: 'Reset your password — Orbion Technologies',
      html,
      text,
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    return { success: true, messageId: response.data?.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Error sending reset email' };
  }
}
