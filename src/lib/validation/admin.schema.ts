import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid administrator email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  next: z.string().optional(),
});

export const adminForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid administrator email address." }),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "closed"], {
    message: "Status must be one of: new, contacted, qualified, or closed.",
  }),
  assignedTo: z.string().uuid().nullable().optional(),
  internalNote: z.string().trim().max(4000).optional(),
});

export const inviteUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address." }),
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(120),
  role: z.enum(
    ["super_admin", "admin", "editor", "sales", "hr", "viewer"],
    { message: "Please select a valid administrative role." }
  ),
});

export const updateUserStatusSchema = z.object({
  isActive: z.boolean({ message: "isActive status boolean is required." }),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(
    ["super_admin", "admin", "editor", "sales", "hr", "viewer"],
    { message: "Please select a valid administrative role." }
  ),
});

