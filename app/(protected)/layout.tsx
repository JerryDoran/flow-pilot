import type { Metadata } from 'next';
import '../globals.css';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Create a New Project',
  description: 'Project creation page',
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='min-h-screen flex md:flex-row flex-col'>
        <div className='md:w-[350px] w-auto'>
          <Sidebar />
        </div>

        <div className='md:p-24 px-12 py-12 w-full'>{children}</div>
      </div>
    </>
  );
}
