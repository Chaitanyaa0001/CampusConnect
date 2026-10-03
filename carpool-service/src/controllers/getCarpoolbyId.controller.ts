import {Request, Response} from "express";
import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import { getRideByIdService } from "../services/getRidebyId.service";

export const getCarpoolbyIdController = catchAsync(async (req: Request, res: Response) => {
    const carpoolId= req.params.id as string;
    
    if (!carpoolId) {
        throw new AppError("Carpool ID is required", 400);
    }
    // Assuming you have a service function to get carpool by ID
    const carpool = await getRideByIdService(carpoolId);
    if (!carpool) {
        throw new AppError("Carpool not found", 404);
    }
    return res.status(200).json({ success: true, data: carpool });
});

