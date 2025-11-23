import type { ColumnDef } from "@tanstack/react-table";
import type { Kid } from "@/lib/models.ts";
import { Button } from "@/components/ui/button.tsx";
import { pb } from "@/lib/pocketbase.ts";

async function handleStartSession(kid: Kid) {
  const ongoingSessions = await pb.collection("sessions").getFullList({
    filter: `kid="${kid.id}" && end=""`,
  });

  if (ongoingSessions.length > 0) {
    alert(`${kid.name} için zaten devam eden bir giriş var.`);
    return;
  }

  await pb.collection("sessions").create({
    kid: kid.id,
    start: new Date().toISOString(),
    end: "",
  });

  alert(`${kid.name} için giriş başlatıldı.`);

  window.location.reload();
}

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
    id: "parentName",
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
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="outline"
        onClick={() => handleStartSession(row.original)}
      >
        Giriş Başlat
      </Button>
    ),
  },
  {
    id: "filter",
    accessorFn: (row) =>
      `${row.name}|${row.expand.parent.name}|${row.expand.parent.email}`,
  },
];
