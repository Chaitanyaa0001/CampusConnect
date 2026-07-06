import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import { ICreateRideInput } from "../interface/interface";
import { postRideService } from "../services/postRide.service";

export const createRideController = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }
        const rideData: ICreateRideInput = req.body;
        const ride = await postRideService(rideData,userId);
        return res.status(201).json({success: true,message: "Ride created successfully",data: ride,});
    }
);