import { Navbar } from './navbar';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar authenticated={false} />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
