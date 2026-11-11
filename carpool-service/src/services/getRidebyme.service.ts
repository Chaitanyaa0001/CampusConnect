import { prisma } from "../utils/prisma.client.js";
import { rideSelect } from "../interface/interface.js";
import type { MyRidesQuery } from "../validator/validator.js";

// my rides (profile page tab): cursor pagination
export const getMyRidesService = async (userId: string, { limit, cursor }: MyRidesQuery) => {
  const rows = await prisma.ride.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1, // one extra row tells us whether there is a next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: rideSelect,
  });

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
};