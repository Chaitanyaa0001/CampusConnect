'use client';

import { featuresData } from '@/data/features';
import { FeatureCard } from './feature-card';

export function FeaturesGrid() {
  return (
    <section className='py-16 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Everything You Need
          </h2>
          <p className='text-lg text-muted-foreground'>
            One platform connecting the entire campus community
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
