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

    return ride;
};