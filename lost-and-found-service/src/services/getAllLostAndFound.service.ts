import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { itemSelect } from "../types/itemSelect.js";
import { dayRange } from "./dayRange.js";
import type { ListItemsQuery } from "../validator/validator.js";

// Newest first, so this uses a CURSOR instead of page numbers: with page numbers, every new post
// pushes older items onto the next page and users would see duplicates while scrolling.
export const listItemsService = async ({ search, type, location, tag, date, limit, cursor }: ListItemsQuery) => {
  const where: Prisma.LostAndFoundWhereInput = { status: "OPEN" }; // resolved items leave the feed

  if (type) where.type = type;
  if (tag) where.tags = { has: tag };
  if (location) where.location = { contains: location, mode: "insensitive" };
  if (search) {
    where.OR = [
      { itemName: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  if (date) {
    const { start, end } = dayRange(date);
    where.date = { gte: start, lt: end };
  }

  const rows = await prisma.lostAndFound.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }], // id breaks ties so pages never repeat or skip rows
    take: limit + 1, // one extra row tells us whether there is a next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: itemSelect,
  });

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
};