import { Prisma } from '@/lib/generated/prisma';

type ProjectDataType = Prisma.ProjectCreateArgs['data'];

export async function createProject(projectData: ProjectDataType) {
  const { name, description, cover, emoji, ownerId } = projectData;
  const project = await Prisma.project.create({
    data: {
      name,
      description,
      cover,
      emoji,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
  return project;
}
