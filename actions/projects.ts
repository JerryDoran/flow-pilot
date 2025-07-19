'use server';

import { Prisma } from '@/lib/generated/prisma';

import db from '@/prisma/db';

type ProjectDataType = Prisma.ProjectCreateArgs['data'];

export async function createProject(projectData: ProjectDataType) {
  const { name, description, cover, emoji, ownerId } = projectData;
  const project = await db.project.create({
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

export async function getUserProjects(userId: string) {
  const projects = await db.project.findMany({
    where: {
      ownerId: userId,
    },
  });
  return projects;
}

export async function getProjectById(projectId: string) {
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
  });
  return project;
}
