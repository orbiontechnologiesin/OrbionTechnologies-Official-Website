/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — SUPABASE CLIENT SUITE
 * ==============================================================================
 * Centralized entry point for browser and server clients.
 * - `createClient` from `./client`: For React Client Components ('use client').
 * - `createServerClient` from `./server`: For Server Components, Actions, & Route Handlers.
 * - `createAdminClient` from `./admin`: For privileged server-only background processes.
 * ==============================================================================
 */

export { createClient as createBrowserClient } from "./client";
export { createClient as createServerClient } from "./server";
export { createAdminClient } from "./admin";
export * from "@/types/database";

