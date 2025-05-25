import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function Projects() {
  return (
    <div className='flex flex-col gap-3'>
      <span className='uppercase text-sm font-bold text-muted-foreground'>
        projects
      </span>
      <Link
        href='/projects/new'
        className='flex justify-center items-center border py-3 text-sm rounded-lg font-medium'
      >
        <Plus className='mr-2 size-4' />
        Create New Project
      </Link>
    </div>
  );
}
