import type { Prisma } from "../generated/prisma/client.js";

// What an item card needs. imagePublicId is internal, so it is never selected for responses.
// userId IS returned: the chat feature needs it to message the person who posted.
export const itemSelect = {
  id: true,
  userId: true,
  itemName: true,
  type: true,
  location: true,
  date: true,
  description: true,
  tags: true,
  imageUrl: true,
  status: true,
  createdAt: true,
} satisfies Prisma.LostAndFoundSelect;