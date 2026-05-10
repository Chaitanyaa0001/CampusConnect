'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  authenticated?: boolean;
}

export function Navbar({ authenticated = false }: NavbarProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  if (authenticated) {
    return (
      <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6'>
          <Link href='/dashboard' className='flex items-center space-x-2'>
            <div className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              CampusConnect
            </div>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            CampusConnect
          </div>
        </Link>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={handleLogin}>
            Login
          </Button>
          <Button onClick={handleSignup} className='bg-primary hover:bg-primary/80'>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
