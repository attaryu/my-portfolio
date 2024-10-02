'use server';

import { Media, Status, Tech } from '@prisma/client';
import { ActionResponse } from '../response-type';
import prisma from '../database';
import { revalidatePath } from 'next/cache';

export async function addTech(
  _: ActionResponse<{ tech: Tech }> | null,
  form: FormData,
) {
  const bodyRequest = {
    name: form.get('name')?.toString(),
    logoId: form.get('logoId')?.toString(),
  };

  try {
    if (!(bodyRequest.name && bodyRequest.logoId)) {
      return {
        error: true,
        message: 'Invalid input, try again!',
      };
    }

    const newData = await prisma.tech.create({
      data: {
        name: bodyRequest.name,
        logoId: parseInt(bodyRequest.logoId),
      },
    });

    revalidatePath('/admin/contents/techs');

    return {
      error: false,
      message: 'Success!',
      payload: {
        tech: newData,
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

export async function updateTech(
  _: ActionResponse<{
    tech: Omit<Tech & { media: Media }, 'created_at' | 'logoId' | 'projects'>;
  }> | null,
  form: FormData,
) {
  const bodyRequest = {
    id: form.get('id')?.toString(),
    name: form.get('name')?.toString(),
    logoId: form.get('logoId')?.toString(),
  };

  try {
    if (!bodyRequest.id) {
      return {
        error: true,
        message: 'Id must be included',
      };
    }

    const updatedData = await prisma.tech.update({
      where: { id: parseInt(bodyRequest.id) },
      data: {
        name: bodyRequest.name,
        logoId: bodyRequest.logoId ? parseInt(bodyRequest.logoId) : undefined,
      },
      select: {
        id: true,
        name: true,
        updated_at: true,
        media: true,
      },
    });

    revalidatePath('/admin/contents/techs');
    revalidatePath(`/admin/contents/techs/${updatedData.id}`);

    return {
      error: false,
      message: 'Success!',
      payload: {
        tech: updatedData,
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

export async function deleteTech(id: string) {
  try {
    const deletedData = await prisma.tech.delete({
      where: { id: parseInt(id) },
    });

    revalidatePath('/admin/contents/techs');
    revalidatePath(`/admin/contents/techs/${deletedData.id}`);

    return {
      error: false,
      message: 'Success!',
      payload: {
        tech: deletedData,
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
