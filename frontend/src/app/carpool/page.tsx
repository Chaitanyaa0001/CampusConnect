'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { Button } from '@/shared/ui/button';
import { SearchBar } from '@/features/carpool/components/search-bar';
import { CarpoolGrid } from '@/features/carpool/components/carpool-grid';
import { carpoolData } from '@/data/carpool';
import { useState } from 'react';

export default function CarpoolPage() {
  const [filteredCarpools, setFilteredCarpools] = useState(carpoolData);

  const handleSearch = (filters: any) => {
    // Filter logic
    let filtered = carpoolData;

    if (filters.from) {
      filtered = filtered.filter((c) =>
        c.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }

    if (filters.to) {
      filtered = filtered.filter((c) =>
        c.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }

    setFilteredCarpools(filtered);
  };

  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Find a Carpool</h1>
            <p className='text-muted-foreground mt-1'>Browse and join carpools with your campus mates</p>
          </div>
          <Button className='bg-primary hover:bg-primary/80 text-primary-foreground'>
            + Add Carpool
          </Button>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Available Carpools ({filteredCarpools.length})
          </h2>
          <CarpoolGrid carpools={filteredCarpools} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
