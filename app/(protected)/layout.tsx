import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import '../globals.css';

import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Flow Pilot',
  description: 'Create and manage your workflows with Flow Pilot',
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const loggedInUser = {
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    avatar: session?.user?.image || session?.user?.name[0]?.toUpperCase() || '',
  };

  if (!loggedInUser) {
    // If session exists but no user, redirect to login page
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg'>You must be logged in to view this page.</p>
      </div>
    );
  }
  return (
    <>
      <div className='min-h-screen flex md:flex-row flex-col'>
        <div className='md:w-[350px] w-auto'>
          <Sidebar user={loggedInUser} />
        </div>

        <div className='md:p-24 px-12 py-12 w-full'>{children}</div>
      </div>
    </>
  );
}
