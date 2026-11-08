import { renderEmailLayout, escapeHtml } from "./base-layout";

export interface DemoNotificationData {
  reference: string;
  fullName: string;
  email: string;
  productId: string;
  productName: string;
  company?: string | null;
  phone?: string | null;
  preferredDate?: string | null;
  message?: string | null;
  createdAt: string;
}

export function renderDemoNotificationEmail(data: DemoNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `[Demo Evaluation] [${data.reference}] ${data.productName} — ${data.fullName}`;

  const contentHtml = `
    <span class="badge badge-copper">Product Demo Request</span>
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1F20; margin: 16px 0 8px 0;">
      New Demo Request Received
    </h1>
    <p style="color: #6E757A; font-size: 14px; margin: 0 0 24px 0;">
      A prospective customer has requested a product demonstration and evaluation for upcoming software.
    </p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Reference ID:</span>
        <span class="info-val" style="font-family: monospace; color: #173B3F;">${escapeHtml(data.reference)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Product Requested:</span>
        <span class="info-val" style="color: #5638FB;">${escapeHtml(data.productName)} (${escapeHtml(data.productId)})</span>
      </div>
      <div class="info-row">
        <span class="info-label">Visitor Name:</span>
        <span class="info-val">${escapeHtml(data.fullName)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email:</span>
        <span class="info-val"><a href="mailto:${escapeHtml(data.email)}" style="color: #5638FB;">${escapeHtml(data.email)}</a></span>
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
      ${data.preferredDate ? `
      <div class="info-row">
        <span class="info-label">Preferred Date:</span>
        <span class="info-val">${escapeHtml(data.preferredDate)}</span>
      </div>` : ""}
      <div class="info-row" style="border-bottom: none;">
        <span class="info-label">Requested At:</span>
        <span class="info-val">${escapeHtml(data.createdAt)}</span>
      </div>
    </div>

    ${data.message ? `
    <div style="margin-top: 24px;">
      <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6E757A; margin-bottom: 8px;">
        Additional Requirements
      </h3>
      <div style="background-color: #FAF9F6; border-left: 3px solid #173B3F; padding: 16px 20px; border-radius: 4px; font-size: 14px; color: #1A1F20; white-space: pre-wrap;">
${escapeHtml(data.message)}
      </div>
    </div>` : ""}

    <div style="margin-top: 32px;">
      <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20[${escapeHtml(data.reference)}]%20Demo%20Request%20for%20${encodeURIComponent(data.productName)}" class="btn">
        Contact ${escapeHtml(data.fullName)} &rarr;
      </a>
    </div>
  `;

  const html = renderEmailLayout({
    title: subject,
    preheader: `Demo request for ${data.productName} by ${data.fullName}`,
    contentHtml,
  });

  const text = `
ORBION TECHNOLOGIES — DEMO REQUEST
==================================
Reference: ${data.reference}
Product: ${data.productName} (${data.productId})
Requested by: ${data.fullName} <${data.email}>
Company: ${data.company || "N/A"}
Phone: ${data.phone || "N/A"}
Preferred Date: ${data.preferredDate || "N/A"}
Requested At: ${data.createdAt}

MESSAGE:
${data.message || "No additional notes provided."}

Reply to: ${data.email}
  `.trim();

  return { subject, html, text };
}

