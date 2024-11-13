import TechDetailDump from './Dump';
import Text from '@/components/Text';

import prisma from '@/app/api/database';

type Props = {
  params: {
    id: string;
  };
};

export default async function TechDetail({ params }: Readonly<Props>) {
  const mediaData = await prisma.media.findMany();
  const techData = await prisma.tech.findUnique({
    where: { id: parseInt(params.id) },
    include: { media: true },
  });

  if (!techData) {
    return (
      <main className="space-y-2">
        <Text tag="h1">404 not found</Text>
        <Text tag="p">Tech with id {params.id} not found</Text>
      </main>
    );
  }

  return <TechDetailDump techData={techData} mediaData={mediaData} />;
}
