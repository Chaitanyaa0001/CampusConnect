import { ROUTING_KEY } from "events-sdk";
import { prisma } from "../utils/prisma.client.js";
import { AppError } from "../error/AppError.js";

// owner only
export const deleteRideService = (id: string, userId: string) =>
  prisma.$transaction(async (tx) => {
    // ownership check and delete in ONE statement: no window between "is it mine?" and "delete it"
    const { count } = await tx.ride.deleteMany({ where: { id, userId } });
    // "not found" and "not yours" give the same answer, so ride ids cannot be probed
    if (count === 0) throw new AppError("Ride not found", 404);

    await tx.outboxEvent.create({
      data: {
        routingKey: ROUTING_KEY.CARPOOL_DELETED,
        payload: { userId, entityId: id },
      },
    });
  });