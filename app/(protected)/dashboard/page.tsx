import { getUserProjects } from '@/actions/projects';
import { auth } from '@/lib/auth'; // path to your Better Auth server instance
import { Plus, Users } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg'>You must be logged in to view this page.</p>
      </div>
    );
  }

  const projects = await getUserProjects(user.id);

  return (
    <div className='md:grid md:grid-cols-3 flex flex-col gap-4'>
      <Link
        href='/projects/new'
        className='w-full h-full rounded-lg border border-dashed flex justify-center items-center'
      >
        <div className='flex flex-col text-center justify-center items-center gap-3 font-bold min-h-[200px] text-muted-foreground'>
          <Plus className='w-8 h-8' />
          <span className='text-xl'>Create New Project</span>
        </div>
      </Link>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className='w-full rounded-lg h-full border border-dashed flex flex-col justify-center items-center '
        >
          <div className='w-full h-44 relative'>
            <Image
              fill
              src={project?.cover ?? '/pilot.svg'}
              alt={project.name}
              className='rounded object-cover transition duration-300 hover:scale-105'
            />
          </div>
          <div className='p-5 rounded space-y-1'>
            <p className='text-sm font-bold text-muted-foreground'>
              {project.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
