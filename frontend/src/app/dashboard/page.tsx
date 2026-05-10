'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { currentUser } from '@/data/user';

export default function Dashboard() {
  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 space-y-6'>
        <div>
          <h1 className='text-4xl font-bold text-foreground'>Welcome back, {currentUser.name}!</h1>
          <p className='text-muted-foreground mt-2'>
            Here's what's happening in the campus community
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='border border-border bg-card'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Active Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-primary'>3</div>
              <p className='text-xs text-muted-foreground mt-2'>2 unread messages</p>
            </CardContent>
          </Card>

          <Card className='border border-border bg-card'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Available Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-primary'>6</div>
              <p className='text-xs text-muted-foreground mt-2'>Around you</p>
            </CardContent>
          </Card>

          <Card className='border border-border bg-card'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Project Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-secondary'>2</div>
              <p className='text-xs text-muted-foreground mt-2'>Looking for members</p>
            </CardContent>
          </Card>

          <Card className='border border-border bg-card'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Your Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-accent'>4.7 ⭐</div>
              <p className='text-xs text-muted-foreground mt-2'>Based on 15 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Card className='border border-border bg-card'>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <a
                href='/carpool'
                className='p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all'
              >
                <div className='text-2xl mb-2'>🚗</div>
                <div className='font-semibold text-foreground'>Find a Carpool</div>
                <p className='text-sm text-muted-foreground mt-1'>Browse available rides</p>
              </a>

              <a
                href='/car-rental'
                className='p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all'
              >
                <div className='text-2xl mb-2'>🔑</div>
                <div className='font-semibold text-foreground'>Rent a Car</div>
                <p className='text-sm text-muted-foreground mt-1'>Check available vehicles</p>
              </a>

              <a
                href='/lost-n-found'
                className='p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all'
              >
                <div className='text-2xl mb-2'>🔍</div>
                <div className='font-semibold text-foreground'>Lost & Found</div>
                <p className='text-sm text-muted-foreground mt-1'>Find lost items</p>
              </a>

              <a
                href='/projects'
                className='p-4 rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all'
              >
                <div className='text-2xl mb-2'>👥</div>
                <div className='font-semibold text-foreground'>Join Projects</div>
                <p className='text-sm text-muted-foreground mt-1'>Collaborate with others</p>
              </a>

              <a
                href='/chat'
                className='p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-all'
              >
                <div className='text-2xl mb-2'>💬</div>
                <div className='font-semibold text-foreground'>Chat & Connect</div>
                <p className='text-sm text-muted-foreground mt-1'>Message your network</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
