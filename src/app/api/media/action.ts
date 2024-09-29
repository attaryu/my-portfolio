'use server';

import { Media, MediaExtension, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'node:path';

import prisma from '../database';
import { ActionResponse } from '../response-type';

export async function getMedia(id: string) {
  try {
    const data = await prisma.media.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        extension: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!data) {
      return {
        error: false,
        message: `Media with id ${id} doesn't exist`,
      };
    }

    return {
      error: false,
      message: 'Success',
      payload: {
        media: data,
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

export async function addMedia(
  _: { error: boolean; message: string; id?: number } | null,
  formData: FormData,
) {
  const media = formData.get('media') as File;

  const payload = {
    title: formData.get('title')?.toString().split(' ').join('_'),
    extension: media.name.match(/^.*\.(svg|jpg|jpeg|png)$/i),
  };

  try {
    const { id } = await prisma.$transaction(async (client) => {
      if (!(payload.title && payload.extension)) {
        throw new Error('Empty form');
      }

      const newData = await client.media.create({
        data: {
          title: payload.title,
          extension: payload.extension[1] as MediaExtension,
        },
      });

      await createFile(newData, Buffer.from(await media.arrayBuffer()));

      return newData;
    });

    revalidatePath('/admin/media');
    revalidatePath(`/admin/media/${id}`);

    return {
      error: false,
      message: 'Success!',
      id,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: true,
          message: 'The media title is already used, use another title!',
        };
      }

      return {
        error: true,
        message: 'Datastore is no longer active',
      };
    }

    return {
      error: true,
      message: 'Unexpected error, try again!',
    };
  }
}

export async function updateMedia(
  _: ActionResponse<{ media: Media }> | null,
  formData: FormData,
) {
  const media = formData.get('media') as File;

  const payload = {
    id: formData.get('id')?.toString(),
    title: formData.get('title')?.toString().split(' ').join('_'),
    extension: media.name.match(/^.*\.(svg|jpg|jpeg|png)$/i),
  };

  try {
    if (!payload.id) {
      throw new Error('Empty form');
    }

    const id = parseInt(payload.id);

    const updatedData = await prisma.$transaction(async (client) => {
      // get existing data
      const oldData = await client.media.findUnique({ where: { id } });

      // validate it
      if (!oldData) {
        throw new Error(`Media with id ${payload.id} doesn't exist`);
      }

      // update data
      const updatedData = await client.media.update({
        where: { id },
        data: {
          title: payload.title,
          extension: payload.extension
            ? (payload.extension[1] as MediaExtension)
            : undefined,
        },
      });

      // rename media or change media
      await updateFile(
        oldData,
        updatedData,
        media.size ? Buffer.from(await media.arrayBuffer()) : undefined,
      );

      // return new data
      return updatedData;
    });

    revalidatePath('/admin/media');
    revalidatePath(`/admin/media/${id}`);

    return {
      error: false,
      message: 'Success!',
      payload: {
        media: updatedData,
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

export async function deleteMedia(id: number) {
  try {
    await prisma.$transaction(async (client) => {
      const oldData = await client.media.delete({ where: { id } });
      await deleteFile(oldData);
    });

    revalidatePath('/admin/media');

    return {
      error: false,
      message: 'Success!',
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'Unexpected error, try again!',
    };
  }
}

const createFile = async (data: Media, buffer: Buffer) => {
  const mediaPath = path.resolve('public', 'images', data.extension);

  try {
    await fs.mkdir(mediaPath);
  } catch {}

  await fs.writeFile(
    mediaPath + `/${data.title}.${data.extension}`,
    new Int8Array(buffer),
  );
};

const updateFile = async (lastData: Media, oldData: Media, buffer?: Buffer) => {
  const lastMediaPath = path.resolve('public', 'images', lastData.extension);
  const newMediaPath = path.resolve('public', 'images', oldData.extension);

  try {
    await fs.mkdir(newMediaPath);
  } catch {}

  if (buffer) {
    await fs.unlink(lastMediaPath + `/${lastData.title}.${lastData.extension}`);
    await fs.writeFile(
      newMediaPath + `/${oldData.title}.${oldData.extension}`,
      new Int8Array(buffer),
    );
  } else {
    await fs.rename(
      lastMediaPath + `/${lastData.title}.${lastData.extension}`,
      newMediaPath + `/${oldData.title}.${oldData.extension}`,
    );
  }
};

const deleteFile = async (data: Media) => {
  const mediaPath = path.resolve('public', 'images', data.extension);
  await fs.unlink(mediaPath + `/${data.title}.${data.extension}`);
};
