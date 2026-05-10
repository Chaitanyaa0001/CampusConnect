'use client';

import { CarpoolListing } from '@/data/carpool';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';

interface CarpoolCardProps {
  carpool: CarpoolListing;
}

export function CarpoolCard({ carpool }: CarpoolCardProps) {
  return (
    <Link href={`/chat?carpoolId=${carpool.id}`}>
      <Card className='border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer h-full'>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <div>
              <CardTitle className='text-lg'>{carpool.driverName}</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                {carpool.from} → {carpool.to}
              </p>
            </div>
            <Badge variant='secondary' className='text-accent-foreground bg-accent/20'>
              ⭐ {carpool.rating.toFixed(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <p className='text-muted-foreground'>Departure</p>
              <p className='font-semibold text-foreground'>{carpool.departureTime}</p>
            </div>
            <div>
              <p className='text-muted-foreground'>Available Seats</p>
              <p className='font-semibold text-foreground'>
                {carpool.seats - carpool.passengers}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground'>Price Per Seat</p>
              <p className='font-semibold text-primary'>₹{carpool.pricePerSeat}</p>
            </div>
            <div>
              <p className='text-muted-foreground'>Passengers</p>
              <p className='font-semibold text-foreground'>
                {carpool.passengers}/{carpool.seats}
              </p>
            </div>
          </div>

          {carpool.description && (
            <div className='bg-muted rounded-lg p-3 border border-border'>
              <p className='text-sm text-foreground/80'>{carpool.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
