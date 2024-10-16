'use server';

import type { Link, Project, ProjectLabel, Status } from '@prisma/client';

import { revalidateTag } from 'next/cache';

import prisma from '../database';
import { ActionResponse } from '../response-type';

export async function addProject(
  _: ActionResponse<{ project: Project }> | null,
  form: FormData,
) {
  const bodyRequest = {
    title: form.get('title')!.toString(),
    subtitle: form.get('subtitle')!.toString(),
    description: form.get('description')?.toString(),
    status: form.get('status')!.toString() as Status,
    label: form.get('label')!.toString() as ProjectLabel,
    finished_at: new Date(form.get('finished_at')!.toString()).toISOString(),
  };

  // Data of arrays is transported in the JSON format through the data form
  const coverId = parseInt(form.get('coverId')!.toString());
  const links = JSON.parse(form.get('links')!.toString()) as Link[];
  const techIds = JSON.parse(form.get('techIds')!.toString()) as number[];
  const previewIds = JSON.parse(form.get('previewIds')!.toString()) as number[];

  try {
    const newProject = await prisma.$transaction(async (client) => {
      const projectLinks = await client.link.createManyAndReturn({
        data: links,
        select: { id: true },
      });

      const project = await client.project.create({
        data: {
          ...bodyRequest,
          cover: {
            connect: { id: coverId },
          },
          previews: {
            create: previewIds.map((id, index) => ({
              image: { connect: { id } },
              order: index + 1,
            })),
          },
          techStacks: {
            connect: techIds.map((id) => ({ id })),
          },
          links: {
            create: projectLinks.map(({ id }) => ({ linkId: id })),
          },
        },
      });

      return project;
    });

    revalidateTag('projects');

    return {
      error: false,
      message: 'Success',
      payload: {
        project: newProject,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'Unexpected error, try again!',
    };
  }
}

export async function updateProject(
  _: ActionResponse<{ project: Project }> | null,
  form: FormData,
) {
  const id = parseInt(form.get('id')!.toString());

  const bodyRequest = {
    title: form.get('title')!.toString(),
    subtitle: form.get('subtitle')!.toString(),
    description: form.get('description')?.toString(),
    status: form.get('status')!.toString() as Status,
    label: form.get('label')!.toString() as ProjectLabel,
    finished_at: new Date(form.get('finished_at')!.toString()).toISOString(),
  };

  const coverId = parseInt(form.get('coverId')!.toString());
  const links = JSON.parse(form.get('links')!.toString()) as Link[];
  const techIds = JSON.parse(form.get('techIds')!.toString()) as number[];
  const previewIds = JSON.parse(form.get('previewIds')!.toString()) as number[];

  try {
    const updatedProject = await prisma.$transaction(async (client) => {
      const willDeletedLinkIds = await client.link.findMany({
        select: { id: true },
        where: { projectLink: { projectId: id } },
      });

      await client.projectLink.deleteMany({ where: { projectId: id } });

      await client.link.deleteMany({
        where: {
          id: {
            in: willDeletedLinkIds.map(({ id }) => id),
          },
        },
      });

      const projectLinks = await client.link.createManyAndReturn({
        data: links,
        select: { id: true },
      });

      const project = await client.project.update({
        where: { id },
        data: {
          ...bodyRequest,
          cover: { connect: { id: coverId } },
          techStacks: {
            set: [],
            connect: techIds.map((id) => ({ id })),
          },
          previews: {
            deleteMany: {},
            create: previewIds.map((id, index) => ({
              image: { connect: { id } },
              order: index + 1,
            })),
          },
          links: {
            create: projectLinks.map(({ id }) => ({ linkId: id })),
          },
        },
      });

      return project;
    });

    revalidateTag('projects');

    return {
      error: false,
      message: 'Success',
      payload: {
        project: updatedProject,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'Unexpected error, try again!',
    };
  }
}

export async function deleteProject(id: number) {
  try {
    const deletedProject = await prisma.$transaction(async (client) => {
      const willDeletedLinkIds = await client.link.findMany({
        select: { id: true },
        where: { projectLink: { projectId: id } },
      });

      const deletedProject = await client.project.delete({ where: { id } });

      await client.link.deleteMany({
        where: { id: { in: willDeletedLinkIds.map(({ id }) => id) } },
      });

      return deletedProject;
    });

    revalidateTag('projects');

    return {
      error: false,
      message: 'Success!',
      payload: {
        project: deletedProject,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'Unexpected error, try again!',
    };
  }
}
