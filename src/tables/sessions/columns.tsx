import type { ColumnDef } from "@tanstack/react-table";
import type { Session } from "@/lib/models.ts";
import { formatDate } from "@/lib/format.ts";
import { Button } from "@/components/ui/button.tsx";
import { pb } from "@/lib/pocketbase.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SessionForm from "@/dialogs/session-form.tsx";
import { useState } from "react";

function handleEndSession(session: Session) {
  return async () => {
    if (
      !confirm(
        `${session.expand.kid.name} için çıkış yapmak istediğinize emin misiniz?`,
      )
    ) {
      return;
    }

    await pb.collection("sessions").update(session.id, {
      end: new Date().toISOString(),
    });

    alert(`${session.expand.kid.name} için oturum sonlandırıldı.`);
  };
}

function handleDeleteSession(session: Session) {
  if (
    !confirm(
      `${session.expand.kid.name} için bu giriş çıkış kaydını silmek istediğinize emin misiniz?`,
    )
  ) {
    return;
  }

  pb.collection("sessions")
    .delete(session.id)
    .then(() => {
      alert("Giriş çıkış kaydı silindi.");
      window.location.reload();
    });
}

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
    header: "Giriş",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "end",
    header: "Çıkış",
    cell: ({ row, getValue }) =>
      getValue() ? (
        formatDate(getValue() as string)
      ) : pb.authStore.isSuperuser ? (
        <Button variant="outline" onClick={handleEndSession(row.original)}>
          Çıkış Yap
        </Button>
      ) : (
        "—"
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return pb.authStore.isSuperuser ? (
        <SessionActions session={row.original} />
      ) : null;
    },
  },
  {
    id: "filter",
    accessorFn: (row) => `${row.expand.kid.name}`,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
function SessionActions({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">İşlemler</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDeleteSession(session)}>
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SessionForm session={session} open={open} onOpenChange={setOpen} />
    </>
  );
}
