import { prisma } from "../utils/prisma.client.js";
import { itemSelect } from "./itemSelect.js";
import type { MyItemsQuery } from "../validator/validator.js";

// my posts (profile page tab): every status, newest first, cursor pagination
export const getMyItemsService = async (userId: string, { limit, cursor }: MyItemsQuery) => {
  const rows = await prisma.lostAndFound.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: itemSelect,
  });

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
};