import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
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
            href='/dashboard'
            className='uppercase text-sm bg-gradient-to-br from-blue-400 to-blue-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-bl transition-colors'
          >
            Get Started
          </Link>
        </nav>
      </header>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className=' px-4 md:px-6 '>
          <div className='flex flex-col items-center space-y-4 text-center '>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text pb-2'>
                Organize Your Life with Flow Pilot
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 '>
                Flow Pilot is the advanced organization app that helps you
                streamline your tasks, projects, and life. Stay on top of
                everything with ease.
              </p>
            </div>
            <div className='space-x-4'>
              <Button>
                <Link href='/dashboard'>Get Started</Link>
              </Button>
              <Button variant='outline' className='cursor-pointer'>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
