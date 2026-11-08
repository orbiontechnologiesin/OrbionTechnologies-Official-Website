import { renderEmailLayout, escapeHtml } from "./base-layout";

export interface NewsletterConfirmationData {
  email: string;
  unsubscribeUrl: string;
}

export function renderNewsletterConfirmationEmail(data: NewsletterConfirmationData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Subscription Confirmed | Orbion Technologies";

  const contentHtml = `
    <span class="badge badge-copper">Subscription Active</span>
    <h1 style="font-size: 24px; font-weight: 700; color: #1A1F20; margin: 16px 0 12px 0;">
      You're subscribed to Orbion updates.
    </h1>
    <p style="font-size: 15px; color: #434B4F; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for subscribing to updates from Orbion Technologies. You will receive engineering briefs, architecture notes, and progress updates as we advance our software ecosystem.
    </p>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Subscribed Email:</span>
        <span class="info-val" style="color: #173B3F;">${escapeHtml(data.email)}</span>
      </div>
      <div class="info-row" style="border-bottom: none;">
        <span class="info-label">Frequency:</span>
        <span class="info-val">Periodic engineering dispatches</span>
      </div>
    </div>

    <p style="font-size: 12px; color: #8F979D; line-height: 1.5; margin: 24px 0 0 0;">
      You received this email because you opted in at orbiontechnologies.in. If you did not make this request or wish to opt out, you can 
      <a href="${escapeHtml(data.unsubscribeUrl)}" style="color: #C86D51; text-decoration: underline;">unsubscribe immediately</a> at any time.
    </p>
  `;

  const html = renderEmailLayout({
    title: subject,
    preheader: "Your subscription to Orbion Technologies updates is confirmed.",
    contentHtml,
  });

  const text = `
Subscription Confirmed | Orbion Technologies
=============================================

You are now subscribed to receive updates, architecture briefs, and software announcements from Orbion Technologies.

Subscribed Email: ${data.email}

If you wish to unsubscribe, please use the following link:
${data.unsubscribeUrl}

Orbion Technologies
Engineering What's Next.
https://orbiontechnologies.in
  `.trim();

  return { subject, html, text };
}

