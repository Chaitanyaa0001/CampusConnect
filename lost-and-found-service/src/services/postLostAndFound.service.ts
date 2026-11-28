import { ROUTING_KEY } from "events-sdk";
import { prisma } from "../utils/prisma.client.js";
import { itemSelect } from "../types/itemSelect.js";
import { storeImage, removeImage } from "../utils/imagestorage.js";
import type { CreateItemInput } from "../validator/validator.js";

export const createItemService = async (input: CreateItemInput, userId: string, file?: Express.Multer.File) => {
  // upload BEFORE the transaction: never hold a database transaction open during a network call
  const image = file ? await storeImage(file.buffer) : undefined;

  try {
    return await prisma.$transaction(async (tx: { lostAndFound: { create: (arg0: { data: { userId: string; itemName: string; type: "LOST" | "FOUND"; location: string; date: Date; description: string | undefined; tags: string[]; imagePublicId: string | undefined; imageUrl: string | undefined; }; select: { id: true; userId: true; itemName: true; type: true; location: true; date: true; description: true; tags: true; imageUrl: true; status: true; createdAt: true; }; }) => any; }; outboxEvent: { create: (arg0: { data: { routingKey: "lost_found.created"; payload: { userId: string; entityId: any; }; }; }) => any; }; }) => {
      const item = await tx.lostAndFound.create({
        data: {
          userId,
          itemName: input.itemName,
          type: input.type,
          location: input.location,
          date: input.date,
          description: input.description,
          tags: input.tags,
          imagePublicId: image?.public_id,
          imageUrl: image?.secure_url,
        },
        select: itemSelect,
      });

      // same transaction: the item and its event are saved together or not at all
      await tx.outboxEvent.create({
        data: {
          routingKey: ROUTING_KEY.LOST_FOUND_CREATED,
          payload: { userId, entityId: item.id },
        },
      });

      return item;
    });
  } catch (error) {
    // the row was not saved, so the uploaded image would be orphaned: remove it (best effort)
    if (image) {
      await removeImage(image.public_id).catch((e) =>
        console.error("[lost-found] could not remove orphan image", image.public_id, e)
      );
    }
    throw error;
  }
};