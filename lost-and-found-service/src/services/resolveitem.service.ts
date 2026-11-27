import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { AppError } from "../error/AppError.js";
import { itemSelect } from "./itemSelect.js";

// owner only: mark the item as resolved so it leaves the public feed
export const resolveItemService = async (id: string, userId: string) => {
  try {
    // id + userId + status in the WHERE: the ownership check and the update are ONE statement
    return await prisma.lostAndFound.update({
      where: { id, userId, status: "OPEN" },
      data: { status: "RESOLVED" },
      select: itemSelect,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      // not found, not yours, or already resolved: same answer, so ids cannot be probed
      throw new AppError("Item not found or already resolved", 404);
    }
    throw err;
  }
};