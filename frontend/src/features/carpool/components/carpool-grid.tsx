'use client';

import { CarpoolListing } from '@/data/carpool';
import { CarpoolCard } from './carpool-card';

interface CarpoolGridProps {
  carpools: CarpoolListing[];
}

export function CarpoolGrid({ carpools }: CarpoolGridProps) {
  if (carpools.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground text-lg'>No carpools found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {carpools.map((carpool) => (
        <CarpoolCard key={carpool.id} carpool={carpool} />
      ))}
    </div>
  );
}
