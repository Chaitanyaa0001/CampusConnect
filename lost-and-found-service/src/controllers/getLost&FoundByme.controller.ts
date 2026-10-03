import {Request,Response,} from "express";
import { AppError } from "../error/AppError.js";
import {catchAsync,} from "../error/tryCatchAsync.js";

import {getLostAndFoundByMeService,} from "../services/getLostAndFoundbyme.service.js";
export const getLostAndFoundByMeController =
    catchAsync(async (req: Request,res: Response) => {
        const userId =req.user?.userId;
        if (!userId) {
            throw new AppError("User not authenticated",401);
        }
        const page =Number(req.query.page) || 1;
        const limit =Number(req.query.limit) || 10;
        const lostAndFound =await getLostAndFoundByMeService(userId,page,limit);
        return res.status(200).json({success: true,data:lostAndFound,});
});