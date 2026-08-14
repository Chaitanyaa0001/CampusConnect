import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import {getAllProjectsService} from "../services/getAllProjects.service";
import {ProjectStatus} from "../interface/IProjectsInput";

export const getAllProjectsController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new AppError("User not authenticated",401);
        }
        const projects = await getAllProjectsService({
            search:
                req.query.search as string,
            status:
                req.query.status as ProjectStatus,
            page:
                Number(req.query.page) || 1,
            limit:
                Number(req.query.limit) || 10,
        });
        return res.status(200).json({success: true,data: projects,});
    }
);