import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../error/AppError.js";
import {uploadImage,isSupportedImage,} from "cloudinary-sdk";
import { cloudinaryClient } from "../config/cloudinary.config.js";
import { env } from "../config/env.config.js";

export const getMyProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      profileImageUrl: true,
      carpoolCount: true,
      projectCount: true,
      lostFoundCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User profile not found", 404);
  }

  return user;
};

export const updateProfilePhotoService = async (
  userId: string,
  file: { buffer: Buffer }
) => {
  if (!isSupportedImage(file.buffer)) {
    throw new AppError("Invalid image format", 400);
  }

  // Ensure profile exists before uploading.
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existingUser) {
    throw new AppError("User profile not found", 404);
  }

  const uploaded = await uploadImage(
    cloudinaryClient,
    file.buffer,
   env.CLOUDINARY_FOLDER ?? "campusconnect/profiles",
    {
      publicId: userId,
      maxWidth: 512,
      maxHeight: 512,
      allowedFormats: ["jpg", "png", "webp"],
    }
  );

  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        profileImagePublicId: uploaded.public_id,
        profileImageUrl: uploaded.secure_url,
      },
      select: {
        id: true,
        profileImageUrl: true,
        updatedAt: true,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      throw new AppError("User profile not found", 404);
    }

    throw err;
  }
};