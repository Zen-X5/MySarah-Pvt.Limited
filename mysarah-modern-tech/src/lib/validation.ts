import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  location: z.string().min(2).max(120),
  type: z.enum(["quote", "contact", "order"]),
  message: z.string().min(5).max(1200),
});

export const adminLoginSchema = z.object({
  username: z.string().min(3).max(40),
  password: z.string().min(6).max(200),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["new", "in-progress", "closed"]).optional(),
  visitConfirmed: z.boolean().optional(),
  installationCompleted: z.boolean().optional(),
}).refine((payload) => payload.status !== undefined || payload.visitConfirmed !== undefined || payload.installationCompleted !== undefined, {
  message: "At least one field is required.",
});
