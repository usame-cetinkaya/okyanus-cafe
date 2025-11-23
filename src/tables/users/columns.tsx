import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/lib/models.ts";
import {
  formatDate,
  formatUsername,
  getExcessHours,
  getRemainingHours,
  hoursToHM,
} from "@/lib/format.ts";
import { sortableHeader } from "@/lib/table.tsx";
import { clsx } from "clsx";

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
    cell: ({ getValue }) => {
      const packEnd = getValue() as string;
      const now = new Date();
      const endDate = new Date(packEnd);
      return (
        <span className={clsx(endDate < now ? "text-red-600 font-bold" : "")}>
          {formatDate(packEnd)}
        </span>
      );
    },
  },
  {
    accessorKey: "pack_hours",
    header: ({ column }) => sortableHeader(column, "Paket Saat"),
    cell: ({ getValue }) => getValue() as number,
  },
  {
    id: "remaining",
    header: ({ column }) => sortableHeader(column, "Paket Kalan"),
    cell: ({ row }) => {
      const remaining = getRemainingHours(row.original);
      return hoursToHM(remaining);
    },
  },
  {
    accessorKey: "excess",
    header: ({ column }) => sortableHeader(column, "Paket Aşım"),
    cell: ({ row }) => {
      const excess = getExcessHours(row.original);
      return (
        <span className={clsx(excess > 0 ? "text-red-600 font-bold" : "")}>
          {hoursToHM(excess)}
        </span>
      );
    },
  },
  {
    id: "filter",
    accessorFn: (row) => `${row.name}|${row.email}`,
  },
];
