'use client';

import { CarRental } from '@/data/car-rental';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';

interface CarRentalCardProps {
  car: CarRental;
}

export function CarRentalCard({ car }: CarRentalCardProps) {
  return (
    <Card className='border border-border bg-card hover:shadow-lg transition-shadow overflow-hidden h-full'>
      <div className='relative h-48 w-full bg-muted'>
        <Image
          src={car.image}
          alt={car.name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        {!car.availability && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <Badge className='bg-destructive text-destructive-foreground text-lg py-1 px-3'>Not Available</Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-lg'>{car.name}</CardTitle>
            <p className='text-sm text-muted-foreground'>{car.model}</p>
          </div>
          <Badge variant='secondary' className='text-accent-foreground bg-accent/20'>
            ⭐ {car.rating.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div>
            <p className='text-muted-foreground'>Per Day</p>
            <p className='font-semibold text-primary'>₹{car.pricePerDay}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Per Hour</p>
            <p className='font-semibold text-primary'>₹{car.pricePerHour}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Seats</p>
            <p className='font-semibold text-foreground'>{car.seats}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Fuel</p>
            <p className='font-semibold text-foreground'>{car.fuelType}</p>
          </div>
        </div>

        <div className='bg-muted rounded-lg p-3 border border-border'>
          <p className='text-sm text-foreground/80'>
            <span className='font-semibold'>Owner:</span> {car.owner}
          </p>
          <p className='text-sm text-foreground/80 mt-1'>
            <span className='font-semibold'>Transmission:</span> {car.transmission}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
