import prisma from '@/app/api/database';
import Dump from './Dump';

export default async function Page() {
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

  return <Dump mediaData={media} techData={tech} />;
}
