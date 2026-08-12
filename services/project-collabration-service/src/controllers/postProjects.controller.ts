import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import { ICreateProjectInput } from "../interface/IProjectsInput.js";
import { postProjectService } from "../services/postProject.service";


export const createProjectController = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }

        const projectData: ICreateProjectInput = req.body;
        const project = await postProjectService(projectData,userId);
        return res.status(201).json({success: true,message: "Project created successfully",data: project,});
    }
);