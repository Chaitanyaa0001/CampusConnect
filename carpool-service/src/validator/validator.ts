import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError.js";

const DAY = 24 * 60 * 60 * 1000;

// ---------- schemas ----------

export const createRideSchema = z
  .object({
    fromLocation: z.string().trim().min(2).max(100),
    toLocation: z.string().trim().min(2).max(100),
    departureAt: z.coerce
      .date()
      .refine((d) => d.getTime() > Date.now() + 5 * 60 * 1000, "Departure must be in the future")
      .refine((d) => d.getTime() < Date.now() + 90 * DAY, "Departure must be within 90 days"),
    vehicleName: z.string().trim().max(50).optional(),
    price: z.number().int().min(0).max(100_000),
    totalSeats: z.number().int().min(1).max(8),
    description: z.string().trim().max(500).optional(),
  })
  .refine((v) => v.fromLocation.toLowerCase() !== v.toLocation.toLowerCase(), {
    message: "From and to must be different",
    path: ["toLocation"],
  });
// unknown keys (userId, status, bookedSeats...) are stripped: a client cannot set them

const optionalText = z
  .string()
  .trim()
  .max(100)
  .optional()
  .transform((v) => v || undefined); // "" counts as not given

export const listRidesQuerySchema = z.object({
  from: optionalText,
  to: optionalText,
  // YYYY-MM-DD, interpreted in the campus time zone
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
    .refine((v) => !Number.isNaN(new Date(`${v}T00:00:00Z`).getTime()), "Invalid date")
    .optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const myRidesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().trim().min(1).max(40).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^[a-z0-9]{10,40}$/i, "Invalid ride id"),
});

export type CreateRideInput = z.infer<typeof createRideSchema>;
export type ListRidesQuery = z.infer<typeof listRidesQuerySchema>;
export type MyRidesQuery = z.infer<typeof myRidesQuerySchema>;
export type IdParam = z.infer<typeof idParamSchema>;

// ---------- middleware ----------

type Source = "body" | "query" | "params";

// Validated data goes to res.locals.valid, NOT back into req.query: in Express 5 req.query is
// read-only, so assigning to it throws.
export const validate = (schema: z.ZodType, source: Source = "body") => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((i) => i.message).join(", ");
      return next(new AppError(`Validation error: ${messages}`, 400));
    }
    res.locals.valid = { ...res.locals.valid, [source]: parsed.data };
    next();
  };

export const getValid = <T>(res: Response, source: Source): T => res.locals.valid?.[source] as T;