import { prisma } from "../utils/prisma.client";
import { AppError } from "../error/AppError.js";
import { publishEvent } from "../events/publisher.js";
import { ROUTING_KEY } from "../events/routingKey.js";

export const deleteRideService = async (
    rideId: string,
    userId: string
) => {

    const ride = await prisma.ride.findUnique({
        where: {
            id: rideId,
        },
    });

    if (!ride) {
        throw new AppError("Ride not found", 404);
    }

    if (ride.userId !== userId) {
        throw new AppError("You are not authorized to delete this ride", 403);
    }

    await prisma.ride.delete({
        where: {
            id: rideId,
        },
    });

    try {
        await publishEvent(
            ROUTING_KEY.RIDE_DELETED,
            {
                rideId: ride.id,
                userId: ride.userId,
            }
        );
    } catch (err) {
        console.error("Failed to publish ride.deleted event", err);
    }
};