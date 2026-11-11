import { prisma } from "../utils/prisma.client.js";
import { AppError } from "../error/AppError.js";
import { rideSelect } from "../interface/interface.js";

export const getRideByIdService = async (id: string) => {
  const ride = await prisma.ride.findUnique({ where: { id }, select: rideSelect });
  if (!ride) throw new AppError("Ride not found", 404);
  return ride;
};