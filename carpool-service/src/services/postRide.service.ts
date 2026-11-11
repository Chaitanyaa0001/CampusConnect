import { ROUTING_KEY } from "events-sdk";
import { prisma } from "../utils/prisma.client.js";
import { rideSelect } from "../interface/interface.js";
import type { CreateRideInput } from "../validator/validator.js";

export const createRideService = (input: CreateRideInput, userId: string) =>
  prisma.$transaction(async (tx) => {
    // only validated fields are copied; status and bookedSeats always start at their defaults
    const ride = await tx.ride.create({
      data: {
        userId,
        fromLocation: input.fromLocation,
        toLocation: input.toLocation,
        departureAt: input.departureAt,
        vehicleName: input.vehicleName,
        price: input.price,
        totalSeats: input.totalSeats,
        description: input.description,
      },
      select: rideSelect,
    });

    // same transaction: the ride and its event are saved together or not at all
    await tx.outboxEvent.create({
      data: {
        routingKey: ROUTING_KEY.CARPOOL_CREATED,
        payload: { userId: ride.userId, entityId: ride.id },
      },
    });

    return ride;
  });