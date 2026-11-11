import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { env } from "../config/env.config.js";
import { rideSelect } from "../interface/interface.js";
import type { ListRidesQuery } from "../validator/validator.js";

const dayRange = (date: string) => {
  const start = new Date(`${date}T00:00:00${env.CAMPUS_TZ_OFFSET}`); // campus midnight, not server midnight
  return { start, end: new Date(start.getTime() + 24 * 60 * 60 * 1000) };
};


export const listRidesService = async ({ from, to, date, page, limit }: ListRidesQuery) => {
  const now = new Date();
  // only rides that are still open and have not left yet
  const where: Prisma.RideWhereInput = { status: "OPEN", departureAt: { gte: now } };

  if (from) where.fromLocation = { contains: from, mode: "insensitive" };
  if (to) where.toLocation = { contains: to, mode: "insensitive" };
  if (date) {
    const { start, end } = dayRange(date);
    where.departureAt = { gte: start > now ? start : now, lt: end };
  }

  const [total, items] = await prisma.$transaction([
    prisma.ride.count({ where }),
    prisma.ride.findMany({
      where,
      orderBy: [{ departureAt: "asc" }, { id: "asc" }], // id breaks ties so pages never repeat or skip rows
      skip: (page - 1) * limit,
      take: limit,
      select: rideSelect,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  return {
    items,
    pagination: { total, page, limit, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
  };
};