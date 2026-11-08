import { renderEmailLayout, escapeHtml } from "./base-layout";

export interface DemoConfirmationData {
  reference: string;
  fullName: string;
  productId: string;
  productName: string;
}

export function renderDemoConfirmationEmail(data: DemoConfirmationData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Demo Request Received: ${data.productName} | Orbion Technologies`;

  const contentHtml = `
    <span class="badge badge-copper">Request Logged</span>
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1F20; margin: 16px 0 12px 0;">
      We received your demo request, ${escapeHtml(data.fullName)}.
    </h1>
    <p style="font-size: 15px; color: #434B4F; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for your interest in <strong>${escapeHtml(data.productName)}</strong>. We have logged your request for product evaluation.
    </p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Request Reference:</span>
        <span class="info-val" style="font-family: monospace; color: #173B3F;">${escapeHtml(data.reference)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Product:</span>
        <span class="info-val" style="color: #5638FB;">${escapeHtml(data.productName)}</span>
      </div>
      <div class="info-row" style="border-bottom: none;">
        <span class="info-label">Status:</span>
        <span class="info-val" style="color: #C86D51;">In Planning Pipeline</span>
      </div>
    </div>

    <div style="background-color: #FAF0ED; border: 1px solid #F2D2C8; border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #8F3A22;">
      <strong>Product Status Notice:</strong> Orbion software products are actively under architecture and development. Demonstration schedules and preview builds are coordinated directly with our engineering team as milestones are reached.
    </div>

    <p style="font-size: 14px; color: #6E757A; line-height: 1.6; margin: 16px 0 8px 0;">
      Our product team will reach out via the email address you provided to discuss your operational requirements. Please retain reference <strong>${escapeHtml(data.reference)}</strong> for your records.
    </p>

    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #EFECE6;">
      <p style="font-size: 13px; color: #434B4F; margin: 0 0 4px 0;">
        Orbion Technologies
      </p>
      <p style="font-size: 13px; font-weight: 700; color: #173B3F; margin: 0;">
        Engineering What's Next.
      </p>
    </div>
  `;

  const html = renderEmailLayout({
    title: subject,
    preheader: `Demo request confirmation for ${data.productName} (Ref: ${data.reference}).`,
    contentHtml,
  });

  const text = `
We received your demo request, ${data.fullName}.

Thank you for your interest in ${data.productName}. We have received your demonstration and evaluation request.

Reference ID: ${data.reference}
Product: ${data.productName}
Status: In Planning Pipeline

Notice: Orbion software products are currently under architecture and development. Our engineering team will review your requirements and coordinate directly through your contact details.

Orbion Technologies
Engineering What's Next.
https://orbiontechnologies.in
  `.trim();

  return { subject, html, text };
}

