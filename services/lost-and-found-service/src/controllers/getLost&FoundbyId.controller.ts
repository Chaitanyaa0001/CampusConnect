import {Request,Response,} from "express";
import { AppError } from "../error/AppError.js";
import {catchAsync,} from "../error/tryCatchAsync.js";
import {getLostAndFoundByIdService,} from "../services/getLostAndFoundbyId.service.js";


export const getLostAndFoundByIdController =catchAsync(async (req: Request,res: Response) => {
    const lostAndFoundId =req.params.id as string;
    if (!lostAndFoundId) {
        throw new AppError("Lost and found ID is required",400);
    }
    const lostAndFound =await getLostAndFoundByIdService(lostAndFoundId);
    if (!lostAndFound) {
        throw new AppError("Lost and found item not found",404);
    }
    return res.status(200).json({success: true,data:lostAndFound,});
});