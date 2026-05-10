'use client';

import { CarRental } from '@/data/car-rental';
import { CarRentalCard } from './car-rental-card';

interface CarRentalGridProps {
  cars: CarRental[];
}

export function CarRentalGrid({ cars }: CarRentalGridProps) {
  if (cars.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground text-lg'>No cars available. Try again later.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {cars.map((car) => (
        <CarRentalCard key={car.id} car={car} />
      ))}
    </div>
  );
}
