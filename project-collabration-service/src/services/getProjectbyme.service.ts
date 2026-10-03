import { prisma } from "../utils/prisma.js";

export const getProjectByMeService = async (userId: string,page = 1,limit = 10) => {
    const skip =(page - 1) * limit;
    const [total, projects] =await prisma.$transaction([
            prisma.project.count({
            where: {userId,},}),

            prisma.project.findMany({
                where: {
                    userId,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),
        ]);
    return {projects,pagination: {
		total,
        	page,
            limit,
            totalPages:
                Math.ceil(
                    total / limit
                ),
            hasNext:page * limit < total,
            hasPrev:page > 1,
        },
    };
};