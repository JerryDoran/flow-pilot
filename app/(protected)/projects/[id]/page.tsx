import { getProjectById } from '@/actions/projects';
import { get } from 'http';
import Image from 'next/image';

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const project = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className='flex flex-col gap-4 max-w-6xl mx-auto'>
      <p className='text-sm text-muted-foreground font-semibold'>
        {project.name}
      </p>
      <div className='relative w-full h-[400px]'>
        <Image
          src={project?.cover ?? '/pilot.svg'}
          alt={project.name}
          fill
          className='object-cover rounded-lg'
        />
      </div>
    </div>
  );
}
