'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarNavigation } from '@/data/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r border-border bg-card p-6 md:block overflow-y-auto'>
      <nav className='space-y-3'>
        {sidebarNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-foreground hover:bg-muted'
            )}
          >
            <span className='text-lg'>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
