import fetcher from '@/utils/fetcher';
import Dump from './Dump';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Readonly<Props>) {
  const data = await fetcher(
    `/projects/${params.id}?populate[1]=cover&populate[2]=preview&populate[3]=links&populate[0]=tech_stacks.icon`,
  );

  return <Dump data={data.data.attributes} id={params.id} />;
}
