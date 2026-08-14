import { Request, Response } from "express";
import { AppError } from "../error/AppError.js";
import { catchAsync } from "../error/tryCatchAsync.js";
import { deleteRideService } from "../services/deleteRide.service.js";

export const deleteRideController = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user?.userId;

        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }

        const { rideId } = req.params;

        await deleteRideService(rideId, userId);

        return res.status(200).json({
            success: true,
            message: "Ride deleted successfully",
        });
    }
);