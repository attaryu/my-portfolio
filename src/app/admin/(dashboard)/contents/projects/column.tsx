'use client';

import type { Project, ProjectLabel, Status, Tech } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import dayjs from 'dayjs';
import Link from 'next/link';
import { MdDeleteForever } from 'react-icons/md';

import * as AlertDialog from '@/components/shadcn-ui/alert-dialog';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';

import { deleteProject } from '@/app/api/project/action';
import { useToast } from '@/hooks/use-toast';

export type ProjectColumn = Project & {
  techStacks: Tech[];
};

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <Button variant="link" className="p-0" asChild>
        <Link href={`/admin/contents/projects/${row.getValue('id')}`}>
          {row.getValue('title')}
        </Link>
      </Button>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'subtitle',
    header: 'Subtitle',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'techStacks',
    header: 'Stacks',
    cell: ({ row }) => {
      const stacks: Tech[] = row.getValue('techStacks');

      return (
        <ul>
          {stacks.map((stack, index) => (
            <li key={stack.id} className="inline">
              {stack.name}
              {index !== stacks.length - 1 && ', '}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value: Status = row.getValue('status');
      let className: string = 'px-2 py-1.5 border rounded-sm';

      if (value === 'published') {
        className += ' border-emerald-400 text-emerald-400 bg-emerald-950/50';
      } else if (value === 'draft') {
        className += ' border-sky-400 text-sky-400 bg-sky-950/50';
      } else {
        className += ' border-zinc-400 text-zinc-400 bg-zinc-900';
      }

      return (
        <span className={className}>
          {value === 'draft'
            ? 'Drafted'
            : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: 'label',
    header: 'Label',
    cell: ({ row }) => {
      const value: ProjectLabel = row.getValue('label');
      let className: string = 'px-2 py-1.5 border rounded-sm';

      if (value === 'paid') {
        className += ' border-yellow-500 text-yellow-500 bg-yellow-900/50';
      } else {
        className += ' border-indigo-400 text-indigo-400 bg-indigo-900/50';
      }

      return (
        <span className={className}>
          {value.charAt(0).toUpperCase() + value.slice(1) + ' Project'}
        </span>
      );
    },
  },
  {
    accessorKey: 'finished_at',
    header: 'Finish at',
    cell: ({ row }) =>
      dayjs(row.getValue('finished_at')).format('MMMM D, YYYY'),
  },
  {
    accessorKey: 'update_at',
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
        const response = await deleteProject(parseInt(id));

        if (response.error) {
          toast({
            title: 'Error ❌',
            description: response.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success ✅',
            description: `Project with id ${response.payload!.project.id} has been deleted`,
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
