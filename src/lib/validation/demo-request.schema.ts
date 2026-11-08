import { z } from "zod";

export const ORBION_PRODUCT_IDS = [
  "orbion-crm",
  "orbion-ai-chatbot",
  "orbion-bookings",
  "orbion-fit",
  "orbion-dine",
  "orbion-docs",
  "orbion-insights",
] as const;

export type OrbionProductId = (typeof ORBION_PRODUCT_IDS)[number];

export const demoRequestSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name must not exceed 120 characters.")
    .optional(),
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name must not exceed 120 characters.")
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid work email address.")
    .max(255, "Email address is too long."),
  product_id: z.enum(ORBION_PRODUCT_IDS, {
    message: `Please select a valid Orbion product (${ORBION_PRODUCT_IDS.join(", ")}).`,
  }),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .regex(/^[\d\s+\-().]{0,30}$/, "Please provide a valid phone number.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  preferred_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Preferred date must be in YYYY-MM-DD format.")
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), "Invalid date.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  message: z
    .string()
    .trim()
    .max(3000, "Message must not exceed 3,000 characters.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  source: z
    .string()
    .trim()
    .max(80)
    .default("website_demo_request"),
  _orb_hp: z
    .string()
    .max(100)
    .optional(),
  turnstile_token: z
    .string()
    .optional(),
}).refine((data) => Boolean(data.full_name || data.name), {
  message: "Full name is required.",
  path: ["full_name"],
}).transform((data) => ({
  ...data,
  canonicalFullName: (data.full_name || data.name)!.trim(),
}));

export type DemoRequestInput = z.input<typeof demoRequestSchema>;
export type DemoRequestValidated = z.output<typeof demoRequestSchema>;
