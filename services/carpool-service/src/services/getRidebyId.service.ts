import {prisma }from '../utils/prisma.client';

export const getUserRides = async (userId: string) => {
  const rides = await prisma.ride.findMany({
    where: {
      userId
    }
  });
  return rides;
};