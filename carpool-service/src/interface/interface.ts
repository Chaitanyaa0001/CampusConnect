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