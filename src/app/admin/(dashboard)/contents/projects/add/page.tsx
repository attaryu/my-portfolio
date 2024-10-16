import { unstable_cache } from 'next/cache';

import Dump from './Dump';

import prisma from '@/app/api/database';

const getData = unstable_cache(
  async () => {
    const tech = await prisma.tech.findMany({
      include: { media: true },
    });

    const media = await prisma.media
      .findMany({
        include: { tech: true, projectPreview: true, project: true },
      })
      .then((media) =>
        media.filter(
          (media) => !(media.tech || media.projectPreview || media.project),
        ),
      );

    return { tech, media };
  },
  ['add-project'],
  { tags: ['projects', 'techs', 'medias'] },
);

export default async function Page() {
  const { media, tech } = await getData();

  return <Dump mediaData={media} techData={tech} />;
}
