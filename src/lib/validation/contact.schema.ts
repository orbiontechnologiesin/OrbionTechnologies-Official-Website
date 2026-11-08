import { z } from "zod";

export const SUBJECT_CATEGORIES = [
  "General Enquiry",
  "Website Development",
  "Custom Software Development",
  "AI Development & Integration",
  "Business Automation",
  "Collaboration / Partnership",
  "Product Enquiry",
  "Other",
] as const;

/**
 * Strict server-side schema for contact form submissions.
 * Accepts both `name` (frontend form field) and `full_name` (canonical DB column).
 * Normalizes email and strips dangerous characters.
 */
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name must not exceed 120 characters.")
    .optional(),
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name must not exceed 120 characters.")
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address.")
    .max(255, "Email address is too long."),
  subject: z
    .string()
    .trim()
    .min(2, "Please select an enquiry category.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must not exceed 5,000 characters."),
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
  website: z
    .string()
    .trim()
    .max(255, "Website URL is too long.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  source: z
    .string()
    .trim()
    .max(80)
    .default("website_contact"),
  // Honeypot field (must be empty; filled only by automated bots)
  _orb_hp: z
    .string()
    .max(100)
    .optional(),
  turnstile_token: z
    .string()
    .optional(),
}).refine((data) => Boolean(data.name || data.full_name), {
  message: "Full name is required.",
  path: ["name"],
}).transform((data) => ({
  ...data,
  canonicalFullName: (data.full_name || data.name)!.trim(),
}));

export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>;
export type ContactSubmissionValidated = z.output<typeof contactSubmissionSchema>;

