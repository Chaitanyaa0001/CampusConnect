'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { LostItemGrid } from '@/features/lost-n-found/components/lost-item-grid';
import { lostAndFoundData } from '@/data/lost-and-found';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

const categories = ['Accessories', 'Bags', 'Electronics', 'Documents'];

export default function LostAndFoundPage() {
  const [filteredItems, setFilteredItems] = useState(lostAndFoundData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterItems(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterItems(searchTerm, category);
  };

  const filterItems = (term: string, category: string) => {
    let filtered = lostAndFoundData;

    if (term) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    setFilteredItems(filtered);
  };

  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Lost & Found</h1>
            <p className='text-muted-foreground mt-1'>
              Help reunite lost items with their owners
            </p>
          </div>
          <Button className='bg-primary hover:bg-primary/80 text-primary-foreground'>
            + Report Lost Item
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Search Items
              </label>
              <Input
                placeholder='Search by title or description'
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className='w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className='w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              >
                <option value=''>All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Found Items ({filteredItems.length})
          </h2>
          <LostItemGrid items={filteredItems} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
