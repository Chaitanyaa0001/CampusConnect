import {Request,Response,} from "express";
import { AppError } from "../error/AppError.js";
import {catchAsync,} from "../error/tryCatchAsync.js";
import {ICreateLostAndFoundInput,} from "../interface/interface.js";
import {postLostAndFoundService,} from "../services/postLostAndFound.service.js";

export const postLostAndFoundController =catchAsync(async (req: Request,res: Response) => {
        const userId =req.user?.userId;
        if (!userId) {
            throw new AppError("User not authenticated",401);
        }
        const lostAndFoundData:ICreateLostAndFoundInput = {
            itemName:
                req.body.itemName,
            type:
                req.body.type,
            location:
                req.body.location,
            date:
                new Date(req.body.date),
            description:
                req.body.description,
            tags:
                typeof req.body.tags === "string"
                    ? JSON.parse(req.body.tags)
                    : req.body.tags,
        };
        const lostAndFound = await postLostAndFoundService(lostAndFoundData,userId,req.file);
        return res.status(201).json({success: true, message:"Lost and found item created successfully",data:lostAndFound,});
    });