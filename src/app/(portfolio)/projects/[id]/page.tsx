import prisma from '@/app/api/database';

import Dump from './Dump';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Readonly<Props>) {
  const data = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      cover: true,
      techStacks: { include: { media: true } },
      previews: { include: { image: true } },
      links: { include: { link: true } },
    },
  });

  if (!data) {
    return <p>Project with id {params.id} doesn't exist</p>
  }

  return <Dump data={data} id={params.id} />;
}
