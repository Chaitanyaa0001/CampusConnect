import { prisma } from "../utils/prisma.client";

export const getCarpoolByMeService = async (userId: string,page = 1,limit = 10,) => {
	const skip = (page - 1) * limit;

	const [total, rides] = await prisma.$transaction([
		prisma.ride.count({
			where: {
				userId,
			},
		}),
		prisma.ride.findMany({
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

	return {rides,pagination: {total,page,limit,totalPages: Math.ceil(total / limit),hasNext: page * limit < total,hasPrev: page > 1,},
	};
};