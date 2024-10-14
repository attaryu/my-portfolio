import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';

import prisma from '@/app/api/database';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import { columns } from './column';

const getProjects = unstable_cache(
  async () =>
    await prisma.project.findMany({
      include: { techStacks: true },
    }),
  ['projects'],
  { tags: ['projects', 'techs'] },
);

export default async function Page() {
  const data = await getProjects();

  return (
    <main>
      <header className="flex items-end justify-between">
        <Text tag="h1">Project</Text>

        <Button asChild variant="secondary">
          <Link href="/admin/contents/projects/add">
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
