import { publishEvent } from "../events/publisher";
import { ROUTING_KEY } from "../events/routingKey";
import { ICreateRideInput } from "../interface/interface";
import { prisma } from "../utils/prisma.client";

export const postRideService = async (data: ICreateRideInput, userId: string) => {
    const ride = await prisma.ride.create({
        data: {
            userId,
            fromLocation: data.fromLocation,
            toLocation: data.toLocation,
            departureAt: data.departureAt,
            vehicleName: data.vehicleName,
            price: data.price,
            totalSeats: data.totalSeats,
            bookedSeats: 0,
            description: data.description,
        },
    });
    await publishEvent(ROUTING_KEY.CARPOO_KEY, {
            rideId: ride.id,
            userId: ride.userId,
        });

    return ride;
};