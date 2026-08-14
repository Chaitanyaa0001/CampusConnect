import { prisma } from "../utils/prisma.js";
import {IGetProjectFilters} from '../interface/IProjectsInput.js'

export const getAllProjectsService = async ({search,status,page = 1,limit = 10,}: IGetProjectFilters) => {
    const where: any = {};
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },

        ];
    }
    if (status) {
        where.status = status;
    }
    const skip =
        (page - 1) * limit;
    const total =
        await prisma.project.count({
            where,
        });

    const projects =
        await prisma.project.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        });
    return {projects,
        pagination: {
            total,
            page,
            limit,
            totalPages:
                Math.ceil(
                    total / limit
                ),
            hasNext:
                page * limit < total,
            hasPrev:
                page > 1,
        },
    };
};