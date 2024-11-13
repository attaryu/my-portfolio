'use server';

import type { Media, Tech } from '@prisma/client';

import { revalidateTag } from 'next/cache';

import prisma from '../database';
import { ActionResponse } from '../response-type';

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

    revalidateTag('techs');

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

    revalidateTag('techs');

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

    revalidateTag('techs');

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
