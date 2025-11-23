import { DataTable } from "@/tables/users/data-table.tsx";
import { columns as sessionColumns } from "@/tables/sessions/columns.tsx";
import { columns as kidsColumns } from "@/tables/kids/columns.tsx";
import { useEffect, useState } from "react";
import type { Kid, Session } from "@/lib/models.ts";
import { pb } from "@/lib/pocketbase.ts";

function AdminDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);

  useEffect(() => {
    pb.collection("sessions")
      .getFullList<Session>({
        expand: "kid",
        sort: "-start",
        filter: 'end=""',
      })
      .then((sessions) => {
        setSessions(sessions);
      });

    pb.collection("kids")
      .getFullList<Kid>({ expand: "parent" })
      .then((kids: Kid[]) => {
        setKids(kids);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={sessionColumns}
        data={sessions}
        filterEnabled={false}
      />
      <h2 className="text-xl">Çocuklar</h2>
      <DataTable columns={kidsColumns} data={kids} />
    </div>
  );
}

export default AdminDashboard;
