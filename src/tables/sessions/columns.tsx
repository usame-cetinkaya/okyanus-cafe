import type { ColumnDef } from "@tanstack/react-table";
import type { Session } from "@/lib/models.ts";
import { formatDate } from "@/lib/format.ts";

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "expand.kid.name",
    header: "Ad Soyad",
    cell: ({ row, getValue }) => (
      <a href={`/cocuklar/${row.original.expand.kid.id}`} className="underline">
        {getValue() as string}
      </a>
    ),
  },
  {
    accessorKey: "start",
    header: "Başlangıç",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "end",
    header: "Bitiş",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    id: "filter",
    accessorFn: (row) => `${row.expand.kid.name}`,
  },
];
