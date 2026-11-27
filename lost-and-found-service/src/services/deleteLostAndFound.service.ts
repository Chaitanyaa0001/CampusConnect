import { ROUTING_KEY } from "events-sdk";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { AppError } from "../error/AppError.js";
import { removeImage } from "../utils/imagestorage.js";

// owner only
export const deleteItemService = async (id: string, userId: string) => {
  let imagePublicId: string | null;

  try {
    imagePublicId = await prisma.$transaction(async (tx : Prisma.TransactionClient) => {
      // delete returns the removed row, so we learn the image id in the same statement
      const removed = await tx.lostAndFound.delete({
        where: { id, userId }, // ownership is part of the WHERE
        select: { imagePublicId: true },
      });

      await tx.outboxEvent.create({
        data: { routingKey: ROUTING_KEY.LOST_FOUND_DELETED, payload: { userId, entityId: id } },
      });

      return removed.imagePublicId;
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      // "not found" and "not yours" give the same answer, so ids cannot be probed
      throw new AppError("Item not found", 404);
    }
    throw err;
  }

  // AFTER the commit, best effort: a failed image delete leaves an orphan image, never a broken item
  if (imagePublicId) {
    await removeImage(imagePublicId).catch((e) =>
      console.error("[lost-found] could not remove image", imagePublicId, e)
    );
  }
};