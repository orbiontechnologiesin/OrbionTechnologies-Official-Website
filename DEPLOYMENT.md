# Orbion Technologies — Multi-Platform Production Deployment Guide

This guide details the complete deployment architecture, environment configurations, and self-hosted authentication setup for Orbion Technologies across **Vercel** (Primary), **Render** (Alternative), and **Netlify** (Alternative).

---

## 1. Primary Architecture Overview

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind CSS
- **Database**: Neon Serverless PostgreSQL
- **ORM & Data Layer**: Prisma ORM with connection pooling support
- **Authentication**: Better Auth (self-hosted inside Next.js, Email & Password only)
- **Sessions**: Secure, HTTP-Only SameSite Cookies
- **Production Domain**: `https://orbiontechnologies.in`

---

## 2. Neon PostgreSQL Database Setup

### Step 1: Create or Connect Neon Project
1. Log in to [Neon Console](https://console.neon.tech).
2. Create or select the project: **OrbionTechnologies**.
3. Choose the region (e.g., `AWS US East (Ohio)` / `ap-south-1`).
4. Retrieve the connection string from the dashboard:
   - **Pooled connection string** (recommended for serverless):
     `postgresql://[user]:[password]@[endpoint]-pooler.[region].aws.neon.tech/[dbname]?sslmode=require`

### Step 2: Apply Database Schema Migration
Run migrations using Prisma:
```bash
npx prisma migrate deploy
```
Or execute the migration SQL script located at:
`prisma/migrations/20261030000000_init_neon_postgresql/migration.sql`

This creates:
- `user`, `session`, `account`, `verification` (Better Auth required schema)
- `profiles` (User profile records linked to `user.id` on delete cascade)
- `inquiries` (Contact form submissions with track constraints and indexes)

---

## 3. Environment Variables Configuration

Set these exact variables across your hosting platforms (Vercel, Render, Netlify) and in `.env.local` for local development:

| Variable | Description | Example / Note |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon PostgreSQL connection URI | `postgresql://user:pass@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `BETTER_AUTH_SECRET` | 32-byte secret for signing & hashing | Generate with: `openssl rand -hex 32` |
| `BETTER_AUTH_URL` | Canonical application base URL | `https://orbiontechnologies.in` (Local: `http://localhost:3000`) |
| `NEXT_PUBLIC_SITE_URL`| Canonical frontend site URL | `https://orbiontechnologies.in` |

---

## 4. Platform 1: Vercel Deployment (Primary Target)

1. Connect repository `orbiontechnologiesin/OrbionTechnologies-Official-Website` in Vercel.
2. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (runs `prisma generate && next build`)
   - **Output Directory**: `.next`
3. In **Project Settings > Environment Variables**, add:
   - `DATABASE_URL`: Your production Neon PostgreSQL connection string.
   - `BETTER_AUTH_SECRET`: Your generated 32-byte secret.
   - `BETTER_AUTH_URL`: `https://orbiontechnologies.in`
   - `NEXT_PUBLIC_SITE_URL`: `https://orbiontechnologies.in`
4. Deploy the project.
5. In **Domains**, configure `orbiontechnologies.in` and `www.orbiontechnologies.in`.

---

## 5. Platform 2: Render Deployment (Alternative Target)

1. Connect the repository or use Blueprint from `render.yaml`.
2. Configure Environment:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
3. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `BETTER_AUTH_SECRET`: Your generated 32-byte secret.
   - `BETTER_AUTH_URL`: `https://orbiontechnologies.in`
   - `NEXT_PUBLIC_SITE_URL`: `https://orbiontechnologies.in`

---

## 6. Platform 3: Netlify Deployment (Alternative Target)

1. Connect the repository. Netlify reads `netlify.toml` automatically.
2. Ensure the build command is `npm run build`.
3. In **Site Configuration > Environment Variables**, add:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `BETTER_AUTH_SECRET`: Your generated 32-byte secret.
   - `BETTER_AUTH_URL`: `https://orbiontechnologies.in`
   - `NEXT_PUBLIC_SITE_URL`: `https://orbiontechnologies.in`
