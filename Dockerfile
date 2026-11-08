# ==============================================================================
# ORBION TECHNOLOGIES — PRODUCTION DOCKERFILE
# ==============================================================================
# Multi-stage build optimized for Render, Railway, AWS ECS, GCP Cloud Run
# Produces an ultra-slim (~120MB) standalone Alpine container
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. Base image
# ------------------------------------------------------------------------------
FROM node:20-alpine AS base

# ------------------------------------------------------------------------------
# 2. Dependencies installation stage
# ------------------------------------------------------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ------------------------------------------------------------------------------
# 3. Build stage
# ------------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry and set production environment for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Client-safe dummy build variables if not provided at build-time
ARG NEXT_PUBLIC_SITE_URL=https://orbiontechnologies.in
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

# ------------------------------------------------------------------------------
# 4. Production runner stage
# ------------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and public directory
COPY --from=builder /app/public ./public

# Set permissions for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Leverage Next.js standalone output to copy only required runtime files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 10000

# server.js is generated in the root of .next/standalone
CMD ["node", "server.js"]

