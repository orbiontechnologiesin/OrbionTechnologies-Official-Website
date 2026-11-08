# ORBION TECHNOLOGIES — PRODUCTION DEPLOYMENT GUIDE (VERCEL & RENDER)

This guide documents the enterprise production deployment setup for the **Orbion Technologies Official Website and Core Backend APIs** (`https://orbiontechnologies.in`), optimized for both **Vercel** and **Render**.

---

## 1. Architectural Highlights

| Feature | Vercel Deployment | Render Deployment |
| :--- | :--- | :--- |
| **Runtime Model** | Serverless / Edge Functions (`nodejs20.x`) | Containerized Standalone Node.js (`Alpine Linux`) |
| **Output Type** | Next.js Serverless Functions | Next.js Standalone (`.next/standalone`, ~120MB) |
| **Health Probes** | Edge deploy health check | `/api/health` Zero-Downtime Rolling Deployment probe |
| **Background Cron** | Vercel Crons (`vercel.json`) executing `/api/jobs/process-email-outbox` | Render Cron Job or external webhook caller |
| **Host & Port** | Managed automatically | `0.0.0.0` bound to dynamic `$PORT` (default: 10000) |
| **Asset Delivery** | Global Edge CDN with AVIF/WebP image optimization | Multi-stage Dockerized or Node runner with HTTP caching headers |
| **Security Headers** | OWASP-compliant headers (HSTS, Frame-Options, XSS, nosniff, Permissions) | OWASP-compliant headers (HSTS, Frame-Options, XSS, nosniff, Permissions) |

---

## 2. Environment Variables Reference

Configure these in the **Vercel Project Settings > Environment Variables** and **Render Service Settings > Environment Variables**:

### A. Public Client Variables (Embedded at Build Time)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the website | `https://orbiontechnologies.in` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project REST/GraphQL endpoint | `https://mkpwfgrkkhxdjkoiowom.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Anon/Publishable API Key | `eyJhbGciOi...` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | *(Optional)* Cloudflare Turnstile public key | `0x4AAAAAA...` |

### B. Server-Only Secret Variables (Never Exposed to Client)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment mode | `production` |
| `SUPABASE_SECRET_KEY` | Supabase service_role secret key for database operations | `eyJhbGciOi...` |
| `RESEND_API_KEY` | Resend API key for transactional email delivery | `re_123456789...` |
| `ORBION_CONTACT_EMAIL` | Admin inbox receiving customer enquiries | `enquiry@orbiontechnologies.in` |
| `ORBION_SENDER_EMAIL` | Verified sending domain identity | `Orbion Technologies <notifications@orbiontechnologies.in>` |
| `EMAIL_JOB_SECRET` | Bearer token securing `/api/jobs/process-email-outbox` | High-entropy random string (64+ chars) |
| `UNSUBSCRIBE_SIGNING_SECRET` | Secret used to sign HMAC tokens in newsletter unsubscribe links | High-entropy random string (64+ chars) |
| `TURNSTILE_SECRET_KEY` | *(Optional)* Cloudflare Turnstile verification secret | `0x4AAAAAA...` |

---

## 3. Deploying to Vercel

### Step 1: Import Repository
1. Navigate to [Vercel Dashboard](https://vercel.com/new).
2. Select your repository: `orbiontechnologiesin/OrbionTechnologies-Official-Website`.
3. Set Framework Preset to **Next.js**.

### Step 2: Configure Environment Variables
Add all variables listed in Section 2 under Project Settings.

### Step 3: Automated Cron Jobs
The repository includes `vercel.json`:
```json
{
  "framework": "nextjs",
  "cleanUrls": true,
  "trailingSlash": false,
  "crons": [
    {
      "path": "/api/jobs/process-email-outbox",
      "schedule": "*/10 * * * *"
    }
  ]
}
```
Vercel automatically schedules the email outbox processor every 10 minutes. Requests sent by Vercel Cron automatically include the header `x-vercel-cron: 1`, which `/api/jobs/process-email-outbox` accepts without requiring the bearer token.

### Step 4: Verification
After deployment:
- Verify homepage: `https://orbiontechnologies.in`
- Verify health check: `https://orbiontechnologies.in/api/health`

---

## 4. Deploying to Render

Render offers two deployment options: **Render Blueprint (Recommended)** and **Docker Container Service**.

### Option A: Render Blueprint (One-Click)
1. In the Render Dashboard, click **New > Blueprint**.
2. Connect `OrbionTechnologies-Official-Website`.
3. Render reads `render.yaml` automatically:
   - Sets web service name: `orbion-technologies-web`
   - Configures `npm ci && npm run build`
   - Configures start command: `npm run start` (binds to `0.0.0.0:$PORT`)
   - Configures health check path: `/api/health`
4. Fill in the non-synced secret environment variables in the Render Dashboard (`SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, etc.).
5. Click **Apply**.

### Option B: Render Web Service via Docker
1. In the Render Dashboard, click **New > Web Service**.
2. Select your repository.
3. Choose **Docker** as the Environment.
4. Render automatically detects the production `Dockerfile` in the root:
   - Multi-stage build isolates dependencies and strips devDependencies.
   - Leverages `.next/standalone` to run with only ~120MB image footprint.
   - Runs as unprivileged non-root user `nextjs:nodejs` (UID: 1001).
   - Listens on `0.0.0.0:$PORT` (defaults to 10000 on Render).
5. Set Health Check Path to `/api/health`.
6. Add the environment variables from Section 2.
7. Click **Deploy**.

---

## 5. Health Check Endpoint (`/api/health`)

The health check endpoint provides real-time application diagnostics:
- **URL:** `GET /api/health`
- **Cache-Control:** `no-store, no-cache, must-revalidate`
- **Response Format:**
```json
{
  "status": "healthy",
  "company": "Orbion Technologies",
  "service": "Orbion Official Website & Core APIs",
  "timestamp": "2026-11-08T14:45:00.000Z",
  "uptimeSeconds": 1420,
  "environment": "production",
  "services": {
    "supabase": "ready",
    "supabaseAdmin": "ready",
    "emailOutbox": "ready"
  }
}
```

---

## 6. Local Production Build Validation

To verify the standalone build and zero-warning deployment locally:
```bash
# 1. Typecheck the entire codebase
npm run typecheck

# 2. Run ESLint across all files
npm run lint

# 3. Create optimized standalone production build
npm run build

# 4. Start production server locally (bound to 0.0.0.0)
npm run start
```

