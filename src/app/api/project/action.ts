'use server';

import { Link, Project, ProjectLabel, Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

    revalidatePath('/admin/contents/projects');
    revalidatePath('/admin/contents/projects/add');

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
  };

  // Data of arrays is transported in the JSON format through the data form
  const coverId = parseInt(form.get('coverId')!.toString());
  const links = JSON.parse(form.get('links')!.toString()) as Link[];
  const techIds = JSON.parse(form.get('techIds')!.toString()) as number[];
  const previewIds = JSON.parse(form.get('previewIds')!.toString()) as number[];

  try {
    const updatedProject = await prisma.$transaction(async (client) => {
      // simpan seluruh id link yang lama sebelum dihapus
      const willDeletedLinkIds = await client.link.findMany({
        select: { id: true },
        where: { projectLink: { projectId: id } },
      });

      // menghapus seluruh relasi berdasarkan id project
      await client.projectLink.deleteMany({ where: { projectId: id } });

      // hapus link berdasarkan id relasi dengan project
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

    revalidatePath('/admin/contents/projects');
    revalidatePath(`/admin/contents/projects/${id}`);

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

    revalidatePath('/admin/contents/projects');
    revalidatePath(`/admin/contents/projects/${deletedProject.id}`);

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
