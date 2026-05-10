'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface SearchBarProps {
  onSearch: (filters: any) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [time, setTime] = useState('');

  const handleSearch = () => {
    onSearch({ from, to, time });
  };

  return (
    <div className='p-0'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            From
          </label>
          <Input
            placeholder='Starting point'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className='w-full'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            To
          </label>
          <Input
            placeholder='Destination'
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className='w-full'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Time
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
          >
            <option value=''>Select time</option>
            <option value='morning'>Morning (6 AM - 12 PM)</option>
            <option value='afternoon'>Afternoon (12 PM - 6 PM)</option>
            <option value='evening'>Evening (6 PM - 11 PM)</option>
            <option value='anytime'>Anytime</option>
          </select>
        </div>

        <div className='flex items-end'>
          <Button onClick={handleSearch} className='w-full bg-primary hover:bg-primary/80'>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
