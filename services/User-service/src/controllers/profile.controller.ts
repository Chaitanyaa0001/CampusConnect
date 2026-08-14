import { Request, Response } from "express";

import { AppError } from "../error/AppError.js";
import { catchAsync } from "../error/tryCatchAsync.js";

import {
    getMyProfileService,
    updateProfilePhotoService,
} from "../services/profile.service.js";

export const getMyProfileController = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user?.userId;

        if (!userId) {
            throw new AppError(
                "User not authenticated",
                401
            );
        }

        const user = await getMyProfileService(userId);

        return res.status(200).json({
            success: true,
            data: user,
        });

    }
);

export const updateMyProfilePhotoController =
catchAsync(async (req: Request, res: Response) => {

    const userId = req.user?.userId;

    if (!userId) {
        throw new AppError(
            "User not authenticated",
            401
        );
    }

    if (!req.file) {
        throw new AppError(
            "Profile image is required",
            400
        );
    }

    const user = await updateProfilePhotoService(
        userId,
        req.file
    );

    return res.status(200).json({
        success: true,
        message: "Profile photo updated successfully",
        data: user,
    });

});