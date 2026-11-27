import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError.js";

const DAY = 24 * 60 * 60 * 1000;

// ---------- helpers ----------

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined); // "" counts as not given

// multipart forms send every field as a string, so `tags` can arrive as a JSON array string
// ('["wallet","black"]'), a comma list ("wallet,black"), or as repeated fields.
// A broken JSON string is passed through as-is and then fails the array check: a 400, not a crash.
const tagsField = z.preprocess(
  (v) => {
    if (v === undefined || v === "") return [];
    if (Array.isArray(v)) return v;
    if (typeof v === "string") {
      const t = v.trim();
      if (t.startsWith("[")) {
        try {
          return JSON.parse(t);
        } catch {
          return t;
        }
      }
      return t.split(",");
    }
    return v;
  },
  z
    .array(z.string().trim().toLowerCase().min(1).max(20))
    .max(5, "At most 5 tags")
    .transform((arr) => [...new Set(arr)]) // no duplicates
);

// ---------- schemas ----------

export const createItemSchema = z.object({
  itemName: z.string().trim().min(2).max(100),
  type: z.enum(["LOST", "FOUND"]),
  location: z.string().trim().min(2).max(100),
  date: z.coerce
    .date()
    .refine((d) => d.getTime() <= Date.now() + DAY, "Date cannot be in the future")
    .refine((d) => d.getTime() >= Date.now() - 365 * DAY, "Date is more than a year ago"),
  description: optionalText(500),
  tags: tagsField,
});
// unknown keys (userId, status, imageUrl...) are stripped: a client cannot set them

export const listItemsQuerySchema = z.object({
  search: optionalText(100),
  type: z.enum(["LOST", "FOUND"]).optional(),
  location: optionalText(100),
  tag: z.string().trim().toLowerCase().max(20).optional().transform((v) => v || undefined),
  // YYYY-MM-DD, read in the campus time zone
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
    .refine((v) => !Number.isNaN(new Date(`${v}T00:00:00Z`).getTime()), "Invalid date")
    .optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().trim().min(1).max(40).optional(),
});

export const myItemsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().trim().min(1).max(40).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^[a-z0-9]{10,40}$/i, "Invalid item id"),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type ListItemsQuery = z.infer<typeof listItemsQuerySchema>;
export type MyItemsQuery = z.infer<typeof myItemsQuerySchema>;
export type IdParam = z.infer<typeof idParamSchema>;

// ---------- middleware ----------

type Source = "body" | "query" | "params";

// Validated data goes to res.locals.valid, not back into req: in Express 5 req.query is read-only.
// `{ ...req[source] }` also covers a missing body (Express 5 leaves req.body undefined) and the
// null-prototype object multer produces for multipart forms.
export const validate =
  (schema: z.ZodType, source: Source = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({ ...req[source] });
    if (!parsed.success) {
      const messages = parsed.error.issues.map((i) => i.message).join(", ");
      return next(new AppError(`Validation error: ${messages}`, 400));
    }
    res.locals.valid = { ...res.locals.valid, [source]: parsed.data };
    next();
  };

export const getValid = <T>(res: Response, source: Source): T => res.locals.valid?.[source] as T;