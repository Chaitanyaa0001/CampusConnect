import { prisma } from "../utils/prisma.client.js";


export const getLostAndFoundByIdService =async (lostAndFoundId: string) => {
  const lostAndFound =await prisma.lostAndFound.findUnique({
      where: {
        id: lostAndFoundId,
      },
    });
  return lostAndFound;
};