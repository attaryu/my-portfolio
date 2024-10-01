import prisma from '@/app/api/database';
import Dump from './Dump';

export default async function AddTech() {
  const techData = await prisma.tech.findMany();
  const mediaData = await prisma.media.findMany({
    where: {
      id: {
        notIn: techData.map(({ logoId }) => logoId),
      },
    },
  });

  return <Dump mediaData={mediaData} />;
}
