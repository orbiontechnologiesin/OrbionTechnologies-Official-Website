import { NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  isSupabaseAdminConfigured,
  isEmailConfigured,
} from "@/lib/env";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — APPLICATION HEALTH CHECK ENDPOINT
 * ==============================================================================
 * Route: GET /api/health
 *
 * Used by:
 * 1. Render Zero-Downtime Health Check probe
 * 2. Vercel deployment verification
 * 3. Uptime monitors (BetterStack, UptimeRobot, Pingdom)
 * 4. Container orchestration probes (Docker, Kubernetes)
 * ==============================================================================
 */
export async function GET() {
  const uptimeSeconds = Math.floor(process.uptime ? process.uptime() : 0);
  const now = new Date().toISOString();

  const services = {
    supabase: isSupabaseConfigured() ? "ready" : "unconfigured",
    supabaseAdmin: isSupabaseAdminConfigured() ? "ready" : "unconfigured",
    emailOutbox: isEmailConfigured() ? "ready" : "mock_mode",
  };

  // Determine overall health status
  // Even if external services are in mock mode during build/dev, the web app is healthy
  const isHealthy = true;

  const payload = {
    status: isHealthy ? "healthy" : "degraded",
    company: "Orbion Technologies",
    service: "Orbion Official Website & Core APIs",
    timestamp: now,
    uptimeSeconds,
    environment: process.env.NODE_ENV || "development",
    services,
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

