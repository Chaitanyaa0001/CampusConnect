'use client';

import { LostItem } from '@/data/lost-and-found';
import { LostItemCard } from './lost-item-card';

interface LostItemGridProps {
  items: LostItem[];
}

export function LostItemGrid({ items }: LostItemGridProps) {
  if (items.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground text-lg'>No items found. Check back later.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {items.map((item) => (
        <LostItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
