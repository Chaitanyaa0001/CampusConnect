import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

// lowercased + validated: "A@x.com" and "a@x.com" must be the same account
const email = z.string().trim().toLowerCase().email("Invalid email").max(254);

// policy only applies when CREATING a password. max 72 because bcrypt ignores bytes past 72.
// No .trim(): spaces are valid password characters.
const newPassword = z.string().min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters")
  .regex(/[a-z]/, "Password needs a lowercase letter")
  .regex(/[A-Z]/, "Password needs an uppercase letter")
  .regex(/\d/, "Password needs a number")
  .regex(/[^A-Za-z0-9]/, "Password needs a special character");

export const signupSchema = z.object({
  email,
  username: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: newPassword,
});

// signin must NOT enforce the signup policy: older passwords would be locked out,
// and the policy would leak to anyone probing the endpoint
export const signinSchema = z.object({
  email,
  password: z.string().min(1, "Password required").max(72),
});

export const resendSchema = z.object({ email });

export const verifyEmailSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/, "Invalid token"),
});

export const validateSchema =
  (schema: z.ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.issues.map((err) => err.message);
      return next(new AppError(`Validation error: ${errorMessages.join(", ")}`, 400));
    }
    req.body = result.data; // cleaned: trimmed + lowercased email
    next();
  };