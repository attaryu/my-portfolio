'use client';

import { Media } from '@prisma/client';
import Link from 'next/link';
import { LuMoreHorizontal } from 'react-icons/lu';

import { Button } from '@/components/shadcn-ui/button';
import * as DropdownMenu from '@/components/shadcn-ui/dropdown-menu';

import { useToast } from '@/hooks/use-toast';
import { deleteMedia } from '@/app/api/media/action';

type Props = {
  data: Media;
};

export default function MediaCard({ data }: Readonly<Props>) {
  const { toast } = useToast();

  const deleteMediaHandler = async () => {
    const response = await deleteMedia(data.id);

    if (response.error) {
      toast({
        title: 'Error ❌',
        description: response.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success ✅',
        description: `Media with id ${data.id} has been deleted`,
      });
    }
  };

  return (
    <li className="group relative aspect-[6/4] overflow-hidden rounded-lg outline outline-1 outline-offset-2 outline-transparent transition-all duration-300 hover:outline-zinc-500 bg-zinc-100">
      <div className="flex h-full w-full items-end justify-between gap-6 bg-gradient-to-t from-zinc-950 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 z-10 absolute inset-x-0 top-0">
        <Link
          href={`/admin/media/${data.id}`}
          className="inline-block w-full truncate text-sm underline-offset-4 hover:underline"
          title={`${data.title}.${data.extension}`}
        >
          {data.title}.{data.extension}
        </Link>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button size="icon" className="rounded-full">
              <LuMoreHorizontal />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={deleteMediaHandler}>
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <img
        src={data.url}
        alt={data.title}
        className="w-full h-full object-cover"
      />
    </li>
  );
}
