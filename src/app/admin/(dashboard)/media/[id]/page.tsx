import Dump from './Dump';
import prisma from '@/app/api/database';

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailMedia({ params }: Readonly<Props>) {
  const data = await prisma.media.findUnique({
    where: { id: parseInt(params.id) },
  });

  return <Dump data={data} />;
}
