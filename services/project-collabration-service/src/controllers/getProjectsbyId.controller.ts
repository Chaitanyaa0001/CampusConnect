import {Request,Response} from "express";
import { AppError } from "../error/AppError";
import {catchAsync} from "../error/tryCatchAsync";
import {getProjectByIdService} from "../services/getProjectbyId.service";

export const getProjectByIdController =catchAsync(async (req: Request,res: Response) => {
            const projectId = req.params.id as string;
            if (!projectId) {
                throw new AppError("Project ID is required",400);
            }
            const project =await getProjectByIdService(projectId);
            if (!project) {
                throw new AppError("Project not found",404);
            }
            return res.status(200).json({success: true,data: project,});
        }
    );