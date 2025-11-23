import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/lib/models.ts";
import { formatDate, formatUsername } from "@/lib/format.ts";
import { sortableHeader } from "@/lib/table.tsx";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => sortableHeader(column, "Ad Soyad"),
    cell: ({ row, getValue }) => (
      <a href={`/veliler/${row.original.id}`} className="underline">
        {getValue() as string}
      </a>
    ),
  },
  {
    accessorKey: "email",
    header: "Kullanıcı Adı",
    cell: ({ getValue }) => formatUsername(getValue() as string),
  },
  {
    accessorKey: "pack_start",
    header: ({ column }) => sortableHeader(column, "Paket Başlangıç"),
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "pack_end",
    header: ({ column }) => sortableHeader(column, "Paket Bitiş"),
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "pack_hours",
    header: ({ column }) => sortableHeader(column, "Paket Saat"),
    cell: ({ getValue }) => getValue() as number,
  },
  {
    id: "filter",
    accessorFn: (row) => `${row.name}|${row.email}`,
  },
];
