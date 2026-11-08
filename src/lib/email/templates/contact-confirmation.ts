import { renderEmailLayout, escapeHtml } from "./base-layout";

export interface ContactConfirmationData {
  reference: string;
  fullName: string;
  subject: string;
  message: string;
}

export function renderContactConfirmationEmail(data: ContactConfirmationData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "We received your enquiry | Orbion Technologies";

  const contentHtml = `
    <span class="badge badge-copper">Enquiry Confirmed</span>
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1F20; margin: 16px 0 12px 0;">
      Thank you for reaching out, ${escapeHtml(data.fullName)}.
    </h1>
    <p style="font-size: 15px; color: #434B4F; line-height: 1.6; margin: 0 0 16px 0;">
      Your enquiry has been successfully received by Orbion Technologies. Our team will review your message and get back to you through the contact details you provided.
    </p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Enquiry Reference:</span>
        <span class="info-val" style="font-family: monospace; color: #173B3F;">${escapeHtml(data.reference)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Subject Category:</span>
        <span class="info-val" style="color: #C86D51;">${escapeHtml(data.subject)}</span>
      </div>
      <div class="info-row" style="border-bottom: none;">
        <span class="info-label">Status:</span>
        <span class="info-val" style="color: #173B3F;">Under Review</span>
      </div>
    </div>

    <p style="font-size: 14px; color: #6E757A; line-height: 1.6; margin: 24px 0 8px 0;">
      Please retain your reference number <strong>${escapeHtml(data.reference)}</strong> for any follow-up communications.
    </p>

    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #EFECE6;">
      <p style="font-size: 13px; color: #434B4F; margin: 0 0 4px 0;">
        Thank you for your interest in Orbion Technologies.
      </p>
      <p style="font-size: 13px; font-weight: 700; color: #173B3F; margin: 0;">
        Engineering What's Next.
      </p>
    </div>
  `;

  const html = renderEmailLayout({
    title: subject,
    preheader: `We have received your enquiry (Ref: ${data.reference}).`,
    contentHtml,
  });

  const text = `
Thank you for reaching out to Orbion Technologies.

Your enquiry has been successfully received. Our team will review your message and get back to you through the contact details you provided.

Enquiry Reference: ${data.reference}
Subject: ${data.subject}

Thank you for your interest in Orbion Technologies.
Engineering What's Next.

Orbion Technologies
https://orbiontechnologies.in
  `.trim();

  return { subject, html, text };
}

