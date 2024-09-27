import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';

import Text from '@/components/Text';
import { Button } from '@/components/shadcn-ui/button';

import prisma from '@/app/api/database';
import MediaCard from './MediaCard';

export default async function Page() {
  try {
    const data = await prisma.media.findMany();

    return (
      <main>
        <header className="flex items-end justify-between">
          <Text tag="h1">Media</Text>
  
          <Button asChild variant="secondary">
            <Link href="/admin/media/add">
              <IoMdAdd className="mr-2" />
              Add
            </Link>
          </Button>
        </header>
  
        <section className="mt-8">
          <ul className="grid auto-rows-auto grid-cols-4 gap-4">
            {data.map((data) => <MediaCard key={data.id} data={data} />)}
          </ul>
        </section>
      </main>
    );
  } catch {
    return (
      <main>
        <Text tag="h1">Error</Text>
        <Text tag="p">Please check application log to see more detail!</Text>
      </main>
    )
  }
}
