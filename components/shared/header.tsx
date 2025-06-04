'use client';

import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data: session, isPending, error } = useSession();
  const { user } = session || {};
  const isLoggedIn = !!user;
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isPending || isLoggingOut) {
    // Optionally, you can return a skeleton or nothing while loading or logging out
    return null;
  }

  async function handleLogout() {
    try {
      // Set a local state to indicate logging out
      setIsLoggingOut(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
          },
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  }

  return (
    <header className='px-4 lg:px-6 h-14 flex items-center py-12'>
      <Link className='flex items-center justify-center' href='#'>
        <Image
          src='/pilot.svg'
          width='40'
          height='40'
          alt='Flow Pilot logo'
          className='rounded-lg'
        />
        <span className='ml-2 text-2xl font-bold'>Flow Pilot</span>
      </Link>
      <nav className='ml-auto flex items-center gap-4 font-medium'>
        {isLoggedIn && (
          <Link
            href='/dashboard'
            className='uppercase text-xs bg-gradient-to-r from-blue-400 via-blue-500  to-blue-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition-colors'
          >
            Dashboard
          </Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link
              href='/login'
              className='uppercase text-xs bg-gradient-to-r from-blue-400 via-blue-500  to-blue-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition-colors'
            >
              Login
            </Link>
            <Link
              href='/register'
              className='uppercase text-xs bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition-colors duration-500'
            >
              Sign up
            </Link>
          </>
        ) : (
          <Button variant='outline' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
