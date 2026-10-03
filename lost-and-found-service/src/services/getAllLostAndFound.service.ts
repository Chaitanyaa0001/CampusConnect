import { prisma } from "../utils/prisma.client.js";
import {IGetLostAndFoundFilters,} from "../interface/interface.js";

export const getAllLostAndFoundService = async ({search,type,location,date,page = 1,limit = 10,}: IGetLostAndFoundFilters) => {
    const where: any = {};
    if (search) {
        where.OR = [
            {
                itemName: {
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
    if (type) {
        where.type = type;
    }
    if (location) {
        where.location = {
            contains: location,
            mode: "insensitive",
        };
    }
    if (date) {
        const start = new Date(date);
        start.setHours(
            0,
            0,
            0,
            0
        );
        const end = new Date(date);
        end.setHours(
            23,
            59,
            59,
            999
        );
        where.date = {
            gte: start,
            lte: end,
        };
    }
    const skip = (page - 1) * limit;
    const total =await prisma.lostAndFound.count({
            where,
        });
    const lostAndFound = await prisma.lostAndFound.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        });
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