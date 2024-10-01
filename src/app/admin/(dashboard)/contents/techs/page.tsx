import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';

import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import { DataTable } from './data-table';
import prisma from '@/app/api/database';
import { columns } from './columns';

export default async function Techs() {
  const data = await prisma.tech.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      updated_at: true,
      media: true,
    },
  });

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
