// src/services/ride.service.ts

import { GetRideInput, CreateRideInput, UpdateRideInput } from '../interface/interface';
import { AppError } from '../error/AppError';

import {prisma} from '../utils/prisma.client'

export const getAllRides = async (filters: GetRideInput) => {
  const { from, to, date, page, limit } = filters;
  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    status: 'OPEN', // Only show open rides
  };

  if (from) {
    where.fromLocation = {
      contains: from,
      mode: 'insensitive',
    };
  }

  if (to) {
    where.toLocation = {
      contains: to,
      mode: 'insensitive',
    };
  }

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    where.departureAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  // Get total count for pagination
  const total = await prisma.ride.count({ where });

  // Get rides with pagination
  const rides = await prisma.ride.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      departureAt: 'asc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      bookings: {
        where: {
          status: 'CONFIRMED',
        },
      },
    },
  });

  // Calculate available seats for each ride
  const ridesWithAvailableSeats = rides.map(ride => ({
    ...ride,
    availableSeats: ride.totalSeats - ride.bookedSeats,
  }));

  return {
    data: ridesWithAvailableSeats,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRideById = async (rideId: string) => {
  const ride = await prisma.ride.findUnique({
    where: { id: rideId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      bookings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  // Calculate available seats
  const confirmedBookings = ride.bookings.filter(
    booking => booking.status === 'CONFIRMED'
  );
  
  return {
    ...ride,
    availableSeats: ride.totalSeats - confirmedBookings.length,
  };
};

export const getUserRides = async (userId: string) => {
  const rides = await prisma.ride.findMany({
    where: { userId },
    orderBy: {
      departureAt: 'desc',
    },
    include: {
      bookings: {
        where: {
          status: 'CONFIRMED',
        },
      },
    },
  });

  return rides.map(ride => ({
    ...ride,
    availableSeats: ride.totalSeats - ride.bookings.length,
  }));
};

export const createRide = async (userId: string, rideData: CreateRideInput) => {
  const { 
    fromLocation, 
    toLocation, 
    departureAt, 
    vehicleType, 
    vehicleName, 
    price, 
    totalSeats, 
    description 
  } = rideData;

  // Validation
  if (departureAt < new Date()) {
    throw new AppError('Departure time must be in the future', 400);
  }

  if (totalSeats < 1) {
    throw new AppError('Total seats must be at least 1', 400);
  }

  if (price < 0) {
    throw new AppError('Price cannot be negative', 400);
  }

  const ride = await prisma.ride.create({
    data: {
      userId,
      fromLocation,
      toLocation,
      departureAt,
      vehicleType,
      vehicleName,
      price,
      totalSeats,
      description,
    },
  });

  return ride;
};

export const updateRide = async (
  rideId: string, 
  userId: string, 
  updateData: UpdateRideInput
) => {
  // Check if ride exists and belongs to user
  const existingRide = await prisma.ride.findUnique({
    where: { id: rideId },
  });

  if (!existingRide) {
    throw new AppError('Ride not found', 404);
  }

  if (existingRide.userId !== userId) {
    throw new AppError('You are not authorized to update this ride', 403);
  }

  // Validate departure time if updating
  if (updateData.departureAt && updateData.departureAt < new Date()) {
    throw new AppError('Departure time must be in the future', 400);
  }

  // Validate total seats
  if (updateData.totalSeats && updateData.totalSeats < existingRide.bookedSeats) {
    throw new AppError(
      `Cannot reduce seats below booked count (${existingRide.bookedSeats})`,
      400
    );
  }

  const updatedRide = await prisma.ride.update({
    where: { id: rideId },
    data: updateData,
  });

  return updatedRide;
};

export const deleteRide = async (rideId: string, userId: string) => {
  // Check if ride exists and belongs to user
  const existingRide = await prisma.ride.findUnique({
    where: { id: rideId },
    include: {
      bookings: {
        where: {
          status: 'CONFIRMED',
        },
      },
    },
  });

  if (!existingRide) {
    throw new AppError('Ride not found', 404);
  }

  if (existingRide.userId !== userId) {
    throw new AppError('You are not authorized to delete this ride', 403);
  }

  // Check if there are confirmed bookings
  if (existingRide.bookings.length > 0) {
    throw new AppError(
      'Cannot delete ride with confirmed bookings. Please cancel bookings first.',
      400
    );
  }

  // Delete all bookings first (cascade delete)
  await prisma.booking.deleteMany({
    where: { rideId },
  });

  // Delete the ride
  await prisma.ride.delete({
    where: { id: rideId },
  });

  return { success: true, message: 'Ride deleted successfully' };
};