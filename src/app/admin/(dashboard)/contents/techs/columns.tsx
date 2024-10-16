'use client';

import type { Media, Tech } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import dayjs from 'dayjs';
import Link from 'next/link';
import { MdDeleteForever } from 'react-icons/md';

import * as AlertDialog from '@/components/shadcn-ui/alert-dialog';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';

import { deleteTech } from '@/app/api/tech/action';
import { useToast } from '@/hooks/use-toast';

export type TechColumn = Tech & { media: Media };

export const columns: ColumnDef<TechColumn>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Button variant="link" className="p-0" asChild>
        <Link href={`/admin/contents/techs/${row.getValue('id')}`}>
          {row.getValue('name')}
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'media',
    header: 'Image',
    cell: ({ row }) => {
      const name = row.getValue('name');
      const { url }: Media = row.getValue('media');

      return (
        <div className="size-10 rounded-full bg-white p-1.5">
          <img
            src={url}
            alt={`${name}'s logo`}
            className="h-full w-full object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Last update',
    cell: ({ row }) => dayjs(row.getValue('updated_at')).format('MMMM D, YYYY'),
  },
  {
    accessorKey: 'delete',
    header: 'Delete',
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      const id: string = row.getValue('id');
      const { toast } = useToast();

      async function deleteTechHandler() {
        const response = await deleteTech(id);

        if (response.error) {
          toast({
            title: 'Error ❌',
            description: response.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success ✅',
            description: `Tech with id ${response.payload!.tech.id} has been deleted`,
          });
        }
      }

      return (
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button variant="destructive" size="icon">
              <MdDeleteForever className="text-lg" />
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content className="flex items-center justify-between gap-3">
            <Text tag="p" styling="lead">
              Are you sure you want to delete {name}?
            </Text>

            <AlertDialog.Cancel className="ml-auto">No</AlertDialog.Cancel>

            <AlertDialog.Action onClick={deleteTechHandler}>
              Sure
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Root>
      );
    },
  },
];
