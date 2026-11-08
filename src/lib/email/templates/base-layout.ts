/**
 * Escapes unsafe HTML characters to prevent email-based XSS attacks.
 */
export function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface EmailLayoutOptions {
  preheader?: string;
  title: string;
  contentHtml: string;
}

/**
 * Responsive, branded HTML email template for Orbion Technologies.
 * Designed to render consistently across Gmail, Apple Mail, Outlook, and mobile clients.
 */
export function renderEmailLayout({ preheader, title, contentHtml }: EmailLayoutOptions): string {
  const currentYear = new Date().getUTCFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F6F4EF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1F20; line-height: 1.6; }
    table { border-collapse: collapse; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E8E5DF; }
    .header { background-color: #1A1F20; padding: 32px 40px; text-align: left; }
    .logo-text { color: #FFFFFF; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; text-decoration: none; }
    .logo-accent { color: #5638FB; }
    .content { padding: 40px; }
    .footer { background-color: #F6F4EF; padding: 24px 40px; text-align: center; font-size: 12px; color: #6E757A; border-top: 1px solid #E8E5DF; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .badge-copper { background-color: #FAF0ED; color: #C86D51; border: 1px solid #F2D2C8; }
    .info-box { background-color: #FAF9F6; border: 1px solid #E8E5DF; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #EFECE6; font-size: 13px; }
    .info-label { color: #6E757A; }
    .info-val { font-weight: 600; color: #1A1F20; }
    .btn { display: inline-block; background-color: #173B3F; color: #FFFFFF; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;font-size:1px;color:#F6F4EF;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>` : ""}
  
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #F6F4EF; padding: 40px 16px;">
    <tr>
      <td align="center">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <span class="logo-text">Orbion <span class="logo-accent">Technologies</span></span>
            <div style="color: #A4ACB0; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">
              Engineering What's Next.
            </div>
          </div>

          <!-- Main Body -->
          <div class="content">
            ${contentHtml}
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #1A1F20;">Orbion Technologies</p>
            <p style="margin: 0 0 12px 0;">Solapur, Maharashtra, India &bull; <a href="https://orbiontechnologies.in" style="color: #173B3F; text-decoration: underline;">orbiontechnologies.in</a></p>
            <p style="margin: 0; color: #8F979D; font-size: 11px;">
              &copy; ${currentYear} Orbion Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

