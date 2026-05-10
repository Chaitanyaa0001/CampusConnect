'use client';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='relative py-20 px-4 md:px-6 bg-gradient-to-br from-muted via-background to-accent'>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          Welcome to CampusConnect
        </h1>

        <p className='text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto'>
          Your all-in-one platform for campus carpooling, car rentals, lost & found,
          and project collaboration
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href='/auth/login'>
            <Button className='w-full sm:w-auto bg-primary hover:bg-primary/80 text-white px-8 py-6 text-lg'>
              Get Started
            </Button>
          </Link>
          <Link href='#features'>
            <Button
              variant='outline'
              className='w-full sm:w-auto px-8 py-6 text-lg border-border'
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
