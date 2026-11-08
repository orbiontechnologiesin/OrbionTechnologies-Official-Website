import { z } from "zod";

export const newsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address.")
    .max(255, "Email address is too long."),
  consent: z
    .boolean({
      message: "Explicit consent is required to subscribe.",
    })
    .refine((val) => val === true, {
      message: "You must agree to receive updates from Orbion Technologies.",
    }),
  source: z
    .string()
    .trim()
    .max(80)
    .default("website_footer"),
  _orb_hp: z
    .string()
    .max(100)
    .optional(),
});

export const newsletterUnsubscribeSchema = z.object({
  token: z
    .string()
    .trim()
    .min(16, "A valid unsubscribe token is required.")
    .max(255, "Unsubscribe token is invalid."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .optional(),
});

export type NewsletterSubscriptionInput = z.input<typeof newsletterSubscriptionSchema>;
export type NewsletterSubscriptionValidated = z.output<typeof newsletterSubscriptionSchema>;
export type NewsletterUnsubscribeInput = z.input<typeof newsletterUnsubscribeSchema>;
export type NewsletterUnsubscribeValidated = z.output<typeof newsletterUnsubscribeSchema>;
