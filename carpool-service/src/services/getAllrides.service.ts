import { prisma } from "../utils/prisma.client";
import { ICreateRideInput, IGetRideFilters } from "../interface/interface";

export const getAllRidesService = async ({from,to,date,page = 1,limit = 10,}: IGetRideFilters) => {
    const where: any = {};
    if (from) {
        where.fromLocation = {
            contains: from,
            mode: "insensitive", // to prevent lower and upper case 
        };
    }

    if (to) {
        where.toLocation = {
            contains: to,
            mode: "insensitive",
        };
    }
    if (date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        where.departureAt = {
            gte: start,
            lte: end,
        };
    }
    const skip = (page - 1) * limit;     //to skip in pagination 
    const total = await prisma.ride.count({
        where,
    });
    const rides = await prisma.ride.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            departureAt: "asc",
        },
    });
    return {rides,pagination: {total,page,limit,totalPages: Math.ceil(total / limit),},
    };
};