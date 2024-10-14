import { unstable_cache } from 'next/cache';

import prisma from '@/app/api/database';
import Dump from './Dump';

const getMedias = unstable_cache(
  async () => {
    const techData = await prisma.tech.findMany();

    return await prisma.media.findMany({
      where: {
        id: {
          notIn: techData.map(({ logoId }) => logoId),
        },
      },
    });
  },
  ['add-tech'],
  { tags: ['medias', 'techs'] },
);

export default async function AddTech() {
  const mediaData = await getMedias();
  return <Dump mediaData={mediaData} />;
}
