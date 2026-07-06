import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getAllRides } from "../services/getAllrides.service.js";
import { AppError } from "../error/AppError.js";


export const getAllRidesController = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    if(!user){
        throw  new AppError("User not authenticated", 401);
    }
        const rides = await getAllRides({
            from: req.query.from as string,
            to: req.query.to as string,
            date: req.query.date as string,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        });

        return res.status(200).json({
            success: true,
            data: rides,
        });
    }
);