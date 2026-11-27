import { prisma } from "../utils/prisma.client.js";
import { AppError } from "../error/AppError.js";
import { itemSelect } from "./itemSelect.js";

export const getItemByIdService = async (id: string) => {
  const item = await prisma.lostAndFound.findUnique({ where: { id }, select: itemSelect });
  if (!item) throw new AppError("Item not found", 404);
  return item;
};