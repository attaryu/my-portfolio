import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';

import prisma from '@/app/api/database';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import { columns } from './columns';

const getTechs = unstable_cache(
  async () => await prisma.tech.findMany({ include: { media: true } }),
  ['techs'],
  { tags: ['techs', 'medias'] },
);

export default async function Techs() {
  const data = await getTechs();

  return (
    <main>
      <header className="flex items-end justify-between">
        <Text tag="h1">Techs</Text>

        <Button asChild variant="secondary">
          <Link href="/admin/contents/techs/add">
            <IoMdAdd className="mr-2" />
            Add
          </Link>
        </Button>
      </header>

      <section className="mt-8">
        <DataTable data={data} columns={columns} />
      </section>
    </main>
  );
}
