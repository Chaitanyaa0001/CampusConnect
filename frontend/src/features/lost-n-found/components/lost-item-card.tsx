'use client';

import { LostItem } from '@/data/lost-and-found';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';

interface LostItemCardProps {
  item: LostItem;
}

export function LostItemCard({ item }: LostItemCardProps) {
  return (
    <Card className='border border-border bg-card hover:shadow-lg transition-shadow overflow-hidden h-full'>
      <div className='relative h-48 w-full bg-muted'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <CardHeader>
        <div className='flex justify-between items-start gap-2'>
          <div>
            <CardTitle className='text-lg'>{item.title}</CardTitle>
            <p className='text-sm text-muted-foreground mt-1'>{item.location}</p>
          </div>
          <Badge variant='outline' className='text-xs'>
            {item.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sm text-foreground/80 line-clamp-2'>{item.description}</p>

        <div className='bg-muted rounded-lg p-3 border border-border space-y-2'>
          <div>
            <p className='text-xs text-muted-foreground'>Found</p>
            <p className='text-sm font-semibold text-foreground'>{item.dateFound}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Posted by</p>
            <p className='text-sm font-semibold text-foreground'>{item.postedBy}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Contact</p>
            <p className='text-sm text-primary break-all'>{item.contact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
