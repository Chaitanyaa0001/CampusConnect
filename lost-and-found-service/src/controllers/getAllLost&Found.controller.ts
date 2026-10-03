import {
    Request,
    Response,
} from "express";

import { AppError } from "../error/AppError.js";

import {catchAsync,} from "../error/tryCatchAsync.js";
import {getAllLostAndFoundService,} from "../services/getAllLostAndFound.service.js";
import {LostFoundType,} from "../interface/interface.js";

export const getAllLostAndFoundController =catchAsync(async (req: Request,res: Response) => {
        const user = req.user;
        if (!user) {
            throw new AppError("User not authenticated",401);
        }
        const lostAndFound = await getAllLostAndFoundService({
            search:
                req.query.search as string,
            type:
                req.query.type as LostFoundType,
            location:
                req.query.location as string,
            date:
                req.query.date as string,
            page:
                Number(req.query.page) || 1,
            limit:
                Number(req.query.limit) || 10,
        });
    return res.status(200).json({ success: true,data:lostAndFound,});
});