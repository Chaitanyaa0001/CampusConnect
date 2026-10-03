import {prisma }from '../utils/prisma.client';

export const getRideByIdService = async (rideId: string) => {
  const ride = await prisma.ride.findUnique({
    where: {
      id: rideId
    }
  });
  return ride;
};