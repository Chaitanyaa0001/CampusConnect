import { z } from "zod";

export const userIdSchema = z.object({
  userId: z.string().min(1, "Invalid user ID"),
});


export const getUserProfileSchema = z.object({
  userId: z.string().min(1, "Invalid user ID"),
});

export const updateProfileSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(250, "Bio cannot exceed 250 characters")
    .nullable()
    .optional(),
});

export const userEmailVerifiedSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  username: z.string().trim().min(3).max(30),
});

export const profilePhotoSchema = z.object({
  mimetype: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]),
  size: z.number().max(
    5 * 1024 * 1024,
    "Image cannot exceed 5MB"
  ),
});