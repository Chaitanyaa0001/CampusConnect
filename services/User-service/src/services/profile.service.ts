import { prisma } from "../lib/prisma.js";
import { AppError } from "../error/AppError.js";

import {
    uploadImage,
    deleteImage,
} from "./cloudinary.service.js";

import { env } from "../config/env.config.js";

export const getMyProfileService = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            profileImageUrl: true,
            carpoolCount: true,
            carRentalCount: true,
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
    file: Express.Multer.File
) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Upload first
    const uploaded = await uploadImage(
        file.buffer,
        env.CLOUDINARY_FOLDER
    );

    let updatedUser;

    try {

        updatedUser = await prisma.user.update({

            where: {
                id: userId,
            },

            data: {
                profileImagePublicId: uploaded.public_id,
                profileImageUrl: uploaded.secure_url,
            },

            select: {
                id: true,
                profileImageUrl: true,
                profileImagePublicId: true,
                updatedAt: true,
            },

        });

    } catch (err) {

        // Cleanup newly uploaded image if DB update fails
        await deleteImage(uploaded.public_id);

        throw err;
    }

    // Delete old image after successful DB update
    if (user.profileImagePublicId) {
        await deleteImage(user.profileImagePublicId);
    }

    return updatedUser;
};