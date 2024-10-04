import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
});

export const forgotPassword = z.object({
  email: z.string().email("Invalid email address"),
});
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must not exceed 16 characters"),
});
