'use client';

import { Media, Tech } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';
import { MdDeleteForever } from 'react-icons/md';

import { deleteTech } from '@/app/api/tech/action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/shadcn-ui/alert-dialog';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import { useToast } from '@/hooks/use-toast';

export type TechColumn = Omit<
  Tech & { media: Media },
  'created_at' | 'logoId' | 'projects'
>;

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
      const { title, extension }: Media = row.getValue('media');

      return (
        <div className="size-10 rounded-full bg-white p-1.5">
          <img
            src={`/images/${extension}/${title}.${extension}`}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <MdDeleteForever className="text-lg" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex items-center justify-between gap-3">
            <Text tag="p" styling="lead">
              Are you sure you want to delete {name}?
            </Text>

            <AlertDialogCancel className="ml-auto">No</AlertDialogCancel>

            <AlertDialogAction onClick={deleteTechHandler}>
              Sure
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
