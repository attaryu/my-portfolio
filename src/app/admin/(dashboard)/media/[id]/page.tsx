import { getMedia } from '@/app/api/media/action';
import Dump from './Dump';

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailMedia({ params }: Readonly<Props>) {
  const data = await getMedia(params.id);

  return <Dump data={data} />;
}
