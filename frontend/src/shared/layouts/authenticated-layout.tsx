import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Navbar authenticated />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 md:ml-64 w-full'>{children}</main>
      </div>
    </div>
  );
}
