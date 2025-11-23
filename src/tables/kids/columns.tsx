import type { ColumnDef } from "@tanstack/react-table";
import type { Kid } from "@/lib/models.ts";

export const columns: ColumnDef<Kid>[] = [
  {
    accessorKey: "name",
    header: "Ad Soyad",
    cell: ({ row, getValue }) => (
      <a href={`/cocuklar/${row.original.id}`} className="underline">
        {getValue() as string}
      </a>
    ),
  },
  {
    accessorKey: "expand.parent.name",
    header: "Veli",
    cell: ({ row, getValue }) => (
      <a
        href={`/veliler/${row.original.expand.parent.id}`}
        className="underline"
      >
        {getValue() as string}
      </a>
    ),
  },
  {
    id: "filter",
    accessorFn: (row) =>
      `${row.name}|${row.expand.parent.name}|${row.expand.parent.email}`,
  },
];
