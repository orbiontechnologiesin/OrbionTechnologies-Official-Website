import { renderEmailLayout, escapeHtml } from "./base-layout";

export interface ContactNotificationData {
  reference: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  company?: string | null;
  phone?: string | null;
  website?: string | null;
  createdAt: string;
}

export function renderContactNotificationEmail(data: ContactNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `[New Enquiry] [${data.reference}] ${data.subject} — ${data.fullName}`;

  const contentHtml = `
    <span class="badge badge-copper">New Business Lead</span>
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1F20; margin: 16px 0 8px 0;">
      New Website Enquiry Received
    </h1>
    <p style="color: #6E757A; font-size: 14px; margin: 0 0 24px 0;">
      A visitor has submitted an enquiry through the official Orbion Technologies contact channel.
    </p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Reference ID:</span>
        <span class="info-val" style="font-family: monospace; color: #173B3F;">${escapeHtml(data.reference)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Visitor Name:</span>
        <span class="info-val">${escapeHtml(data.fullName)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Contact Email:</span>
        <span class="info-val"><a href="mailto:${escapeHtml(data.email)}" style="color: #5638FB;">${escapeHtml(data.email)}</a></span>
      </div>
      <div class="info-row">
        <span class="info-label">Category:</span>
        <span class="info-val" style="color: #C86D51;">${escapeHtml(data.subject)}</span>
      </div>
      ${data.company ? `
      <div class="info-row">
        <span class="info-label">Company:</span>
        <span class="info-val">${escapeHtml(data.company)}</span>
      </div>` : ""}
      ${data.phone ? `
      <div class="info-row">
        <span class="info-label">Phone:</span>
        <span class="info-val">${escapeHtml(data.phone)}</span>
      </div>` : ""}
      ${data.website ? `
      <div class="info-row">
        <span class="info-label">Website:</span>
        <span class="info-val"><a href="${escapeHtml(data.website)}" style="color: #173B3F;">${escapeHtml(data.website)}</a></span>
      </div>` : ""}
      <div class="info-row" style="border-bottom: none;">
        <span class="info-label">Received At:</span>
        <span class="info-val">${escapeHtml(data.createdAt)}</span>
      </div>
    </div>

    <div style="margin-top: 24px;">
      <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6E757A; margin-bottom: 8px;">
        Enquiry Message
      </h3>
      <div style="background-color: #FAF9F6; border-left: 3px solid #173B3F; padding: 16px 20px; border-radius: 4px; font-size: 14px; color: #1A1F20; white-space: pre-wrap;">
${escapeHtml(data.message)}
      </div>
    </div>

    <div style="margin-top: 32px;">
      <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20[${escapeHtml(data.reference)}]%20${encodeURIComponent(data.subject)}" class="btn">
        Reply Directly to ${escapeHtml(data.fullName)} &rarr;
      </a>
    </div>
  `;

  const html = renderEmailLayout({
    title: subject,
    preheader: `New enquiry from ${data.fullName} regarding ${data.subject}`,
    contentHtml,
  });

  const text = `
ORBION TECHNOLOGIES — NEW ENQUIRY
=================================
Reference: ${data.reference}
From: ${data.fullName} <${data.email}>
Category: ${data.subject}
Company: ${data.company || "N/A"}
Phone: ${data.phone || "N/A"}
Website: ${data.website || "N/A"}
Received: ${data.createdAt}

MESSAGE:
---------------------------------
${data.message}
---------------------------------

Reply directly to: ${data.email}
  `.trim();

  return { subject, html, text };
}

