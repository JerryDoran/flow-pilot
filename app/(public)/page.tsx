import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
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
              <Link href='/app'>Get Started</Link>
            </Button>
            <Button variant='outline' className='cursor-pointer'>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
