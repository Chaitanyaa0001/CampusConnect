'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { CarRentalGrid } from '@/features/car-rental/components/car-rental-grid';
import { carRentalData } from '@/data/car-rental';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export default function CarRentalPage() {
  const [filteredCars, setFilteredCars] = useState(carRentalData);
  const [fuelFilter, setFuelFilter] = useState('');

  const handleFuelFilterChange = (value: string) => {
    setFuelFilter(value);
    if (value) {
      setFilteredCars(carRentalData.filter((car) => car.fuelType === value));
    } else {
      setFilteredCars(carRentalData);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Rent a Car</h1>
            <p className='text-muted-foreground mt-1'>
              Browse and rent vehicles for your campus needs
            </p>
          </div>
          <Button className='bg-primary hover:bg-primary/80 text-primary-foreground'>
            + Add Car
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Search
              </label>
              <Input placeholder='Search by model or owner' className='w-full' />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Fuel Type
              </label>
              <select
                value={fuelFilter}
                onChange={(e) => handleFuelFilterChange(e.target.value)}
                className='w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              >
                <option value=''>All fuel types</option>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Transmission
              </label>
              <select className='w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'>
                <option value=''>All types</option>
                <option value='Manual'>Manual</option>
                <option value='Automatic'>Automatic</option>
              </select>
            </div>
          </div>

        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Available Cars ({filteredCars.length})
          </h2>
          <CarRentalGrid cars={filteredCars} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
