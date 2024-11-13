'use client';

import type { ColumnDef } from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TfiLayoutColumn3Alt } from 'react-icons/tfi';

import { Button } from '@/components/shadcn-ui/button';
import * as DropdownMenu from '@/components/shadcn-ui/dropdown-menu';
import * as Table from '@/components/shadcn-ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: Readonly<DataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" className="gap-3">
              Column <TfiLayoutColumn3Alt />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenu.CheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(value)}
                >
                  {column.columnDef.header?.toString()}
                </DropdownMenu.CheckboxItem>
              ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div className="rounded-md border border-zinc-800">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} className="border-b-zinc-800">
                {headerGroup.headers.map((header) => (
                  <Table.Head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel()?.rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b-zinc-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
