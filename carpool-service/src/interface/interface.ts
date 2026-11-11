// src/interfaces/ride.interface.ts

export interface IGetRideFilters {
  from?: string;
  to?: string;
  date?: string;
  page: number;
  limit: number;
}

export interface ICreateRideInput {
  fromLocation: string;
  toLocation: string;
  departureAt: Date;
  vehicleName?: string;
  price: number;
  totalSeats: number;
  description?: string;
}

export interface IPaginationResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

import type { Prisma } from "../generated/prisma/client";

// what a ride card needs: never `select` more than the client should see.
// Shared by every ride service so the response shape is defined in ONE place.
export const rideSelect = {
  id: true,
  userId: true,
  fromLocation: true,
  toLocation: true,
  departureAt: true,
  vehicleName: true,
  price: true,
  totalSeats: true,
  bookedSeats: true,
  description: true,
  status: true,
  createdAt: true,
} satisfies Prisma.RideSelect;