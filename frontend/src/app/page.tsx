'use client';

import { PublicLayout } from '@/shared/layouts/public-layout';
import { HeroSection } from '@/features/landing/hero-section';
import { FeaturesGrid } from '@/features/landing/features-grid';

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesGrid />

      {/* Footer */}
      <footer className='border-t border-border bg-background py-8 px-4 md:px-6 mt-12'>
        <div className='max-w-7xl mx-auto text-center text-muted-foreground text-sm'>
          <p>&copy; 2025 CampusConnect. All rights reserved.</p>
        </div>
      </footer>
    </PublicLayout>
  );
}