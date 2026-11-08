import { z } from "zod";

/**
 * Client-safe environment schema (exposed to the browser).
 * Variables MUST begin with NEXT_PUBLIC_ to be embedded in client bundles.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL (e.g., https://your-project.supabase.co)")
    .optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .min(10, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a valid key")
    .optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
});

/**
 * Server-only environment schema (contains secrets).
 * NEVER expose this schema or its parsed values to the browser.
 */
const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SECRET_KEY: z
    .string()
    .min(10, "SUPABASE_SECRET_KEY must be a valid service key")
    .optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  RESEND_API_KEY: z.string().optional(),
  ORBION_CONTACT_EMAIL: z.string().email().default("enquiry@orbiontechnologies.in"),
  ORBION_SENDER_EMAIL: z.string().default("Orbion Technologies <notifications@orbiontechnologies.in>"),
  EMAIL_JOB_SECRET: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  UNSUBSCRIBE_SIGNING_SECRET: z.string().optional(),
});

export type PublicEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
  siteUrl: string;
  turnstileSiteKey?: string;
};

export type ServerEnv = PublicEnv & {
  supabaseSecretKey: string;
  nodeEnv: "development" | "production" | "test";
  resendApiKey?: string;
  contactEmail: string;
  senderEmail: string;
  emailJobSecret?: string;
  turnstileSecretKey?: string;
  unsubscribeSigningSecret?: string;
};

/**
 * Safe accessor for public environment variables.
 * Can be called safely from both client components and server code.
 */
export function getPublicEnv(): PublicEnv {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  });

  if (!parsed.success) {
    const errorDetails = parsed.error.issues
      .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `[Orbion Config Error] Invalid public environment configuration:\n${errorDetails}\n\n` +
      `Check your .env.local file. See .env.example for required variables.`
    );
  }

  const supabaseUrl = parsed.data.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabasePublishableKey =
    parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
  const siteUrl = parsed.data.NEXT_PUBLIC_SITE_URL;
  const turnstileSiteKey = parsed.data.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return {
    supabaseUrl,
    supabasePublishableKey,
    siteUrl,
    turnstileSiteKey,
  };
}

/**
 * Safe accessor for server-only environment variables.
 * CRITICAL: Must only be invoked in server contexts (RSC, Route Handlers, Server Actions).
 * Throws a clean, descriptive error (without leaking credential values) if required
 * server variables are absent.
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Orbion Security Violation] getServerEnv() was invoked in a browser environment. " +
      "Server secrets must never be accessed from client code."
    );
  }

  const publicConfig = getPublicEnv();

  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  const parsed = serverEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: publicConfig.supabaseUrl || undefined,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      publicConfig.supabasePublishableKey || undefined,
    SUPABASE_SECRET_KEY: secretKey || undefined,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: publicConfig.siteUrl,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: publicConfig.turnstileSiteKey,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ORBION_CONTACT_EMAIL: process.env.ORBION_CONTACT_EMAIL,
    ORBION_SENDER_EMAIL: process.env.ORBION_SENDER_EMAIL,
    EMAIL_JOB_SECRET: process.env.EMAIL_JOB_SECRET,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    UNSUBSCRIBE_SIGNING_SECRET: process.env.UNSUBSCRIBE_SIGNING_SECRET,
  });

  if (!parsed.success) {
    const errorDetails = parsed.error.issues
      .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `[Orbion Config Error] Invalid server environment configuration:\n${errorDetails}\n\n` +
      `Ensure SUPABASE_SECRET_KEY is configured in your server environment.`
    );
  }

  return {
    ...publicConfig,
    supabaseSecretKey: secretKey,
    nodeEnv: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
    resendApiKey: parsed.data.RESEND_API_KEY,
    contactEmail: parsed.data.ORBION_CONTACT_EMAIL,
    senderEmail: parsed.data.ORBION_SENDER_EMAIL,
    emailJobSecret: parsed.data.EMAIL_JOB_SECRET,
    turnstileSecretKey: parsed.data.TURNSTILE_SECRET_KEY,
    unsubscribeSigningSecret: parsed.data.UNSUBSCRIBE_SIGNING_SECRET,
  };
}

/**
 * Non-throwing helper to verify whether Supabase credentials have been configured.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && url.trim().length > 0 && key.trim().length > 0);
}

/**
 * Non-throwing helper to verify whether the private administrative secret key is configured.
 */
export function isSupabaseAdminConfigured(): boolean {
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return isSupabaseConfigured() && Boolean(secretKey && secretKey.trim().length > 0);
}

/**
 * Non-throwing helper to verify whether transactional email (Resend) credentials are active.
 */
export function isEmailConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  return Boolean(key && key.trim().length > 0);
}
