import { z } from "zod";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — ANALYTICS VALIDATION SCHEMAS
 * ==============================================================================
 * Strict validation for first-party privacy-conscious event ingestion.
 * Rejects arbitrary payloads, scripts, and excessively long inputs.
 * ==============================================================================
 */

export const analyticsEventSchema = z.object({
  eventName: z
    .string()
    .trim()
    .min(2, "Event name must be at least 2 characters")
    .max(80, "Event name must not exceed 80 characters")
    .regex(/^[a-z0-9_]+$/, "Event name must only contain lowercase letters, numbers, and underscores"),
  pagePath: z
    .string()
    .trim()
    .min(1, "Page path is required")
    .max(500, "Page path must not exceed 500 characters")
    .refine((val) => val.startsWith("/"), {
      message: "Page path must begin with a leading slash",
    }),
  referrerDomain: z
    .string()
    .trim()
    .max(255)
    .nullable()
    .optional(),
  visitorId: z
    .string()
    .trim()
    .min(4, "Visitor identifier is required")
    .max(128, "Visitor identifier must not exceed 128 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Visitor ID must only contain alphanumeric characters, underscores, and dashes"),
  sessionId: z
    .string()
    .trim()
    .min(4, "Session identifier is required")
    .max(128, "Session identifier must not exceed 128 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Session ID must only contain alphanumeric characters, underscores, and dashes"),
  deviceCategory: z
    .enum(["desktop", "mobile", "tablet", "unknown"])
    .default("unknown"),
  browserCategory: z
    .string()
    .trim()
    .max(50)
    .nullable()
    .optional(),
  utmSource: z
    .string()
    .trim()
    .max(100)
    .nullable()
    .optional(),
  utmMedium: z
    .string()
    .trim()
    .max(100)
    .nullable()
    .optional(),
  utmCampaign: z
    .string()
    .trim()
    .max(100)
    .nullable()
    .optional(),
  metadata: z
    .record(z.string(), z.unknown())
    .optional()
    .default({}),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
