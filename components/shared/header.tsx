import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
      </nav>
    </header>
  );
}
