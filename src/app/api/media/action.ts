'use server';

import { Media, MediaExtension, Prisma } from '@prisma/client';
import { copy, del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

import { mediaBlobPath } from '@/utils/blob';
import prisma from '../database';
import { ActionResponse } from '../response-type';

export async function addMedia(
  _: { error: boolean; message: string; id?: number } | null,
  formData: FormData,
) {
  const media = formData.get('media') as File;

  const payload = {
    title: formData.get('title')!.toString().split(' ').join('_'),
    extension: /^.*\.(svg|jpg|jpeg|png)$/i.exec(
      media.name,
    )![1] as unknown as MediaExtension,
  };

  try {
    const { id } = await prisma.$transaction(async (client) => {
      if (!(payload.title && payload.extension)) {
        throw new Error('Empty form');
      }
      const url = await createFile(
        payload,
        Buffer.from(await media.arrayBuffer()),
      );

      const newData = await client.media.create({ data: { ...payload, url } });

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
    id: formData.get('id')!.toString(),
    title: formData.get('title')!.toString().split(' ').join('_'),
    extension: media.size
      ? /^.*\.(svg|jpg|jpeg|png)$/i.exec(media.name)![0]
      : undefined,
  };

  try {
    const id = parseInt(payload.id);

    const updatedData = await prisma.$transaction(async (client) => {
      const oldData = await client.media.findUnique({ where: { id } });

      if (!oldData) {
        throw new Error(`Media with id ${payload.id} doesn't exist`);
      }

      const url = await updateFile(
        {
          ...payload,
          extension: payload.extension ?? oldData.extension,
        },
        oldData,
        media.size ? Buffer.from(await media.arrayBuffer()) : undefined,
      );

      const updatedData = await client.media.update({
        where: { id },
        data: {
          title: payload.title,
          extension: (payload.extension as MediaExtension) ?? undefined,
          url,
        },
      });

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

type FileParameter = { title: string; extension: string };

const createFile = async (data: FileParameter, buffer: Buffer) => {
  const { url } = await put(
    `${data.extension}/${data.title}.${data.extension}`,
    buffer,
    {
      access: 'public',
    },
  );

  return url;
};

const updateFile = async (
  newData: FileParameter,
  oldData: Media,
  buffer?: Buffer,
) => {
  const newDataPath = mediaBlobPath(newData);

  if (buffer) {
    await deleteFile(oldData);
    const { url } = await put(newDataPath, buffer, { access: 'public' });

    return url;
  } else {
    const { url } = await copy(oldData.url, newDataPath, { access: 'public' });
    await deleteFile(oldData);

    return url;
  }
};

const deleteFile = async (data: Media) => {
  await del(data.url);
};
