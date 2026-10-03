import { Request, Response } from "express";

import { AppError } from "../error/AppError.js";
import { catchAsync } from "../error/tryCatchAsync.js";
import {getProjectByMeService} from "../services/getProjectbyme.service.js";

export const getProjectByMeController = catchAsync(async (req: Request, res: Response) => {
        const userId =req.user?.userId;
        if (!userId) {
            throw new AppError("User not authenticated",401);
        }
        const page =Number(req.query.page) || 1;
        const limit =Number(req.query.limit) || 10;
        const projects =await getProjectByMeService(userId,page,limit);
        return res.status(200).json({success: true,data: projects,});
    }
);