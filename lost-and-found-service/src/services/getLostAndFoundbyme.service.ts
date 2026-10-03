import { prisma } from "../utils/prisma.client.js";


export const getLostAndFoundByMeService = async (userId: string,page = 1,limit = 10,) => {
    const skip =(page - 1) * limit;
    const [total,lostAndFound,] = await prisma.$transaction([
        prisma.lostAndFound.count({
            where: {
                userId,
            },
        }),
        prisma.lostAndFound.findMany({
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
    return {
        lostAndFound,
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