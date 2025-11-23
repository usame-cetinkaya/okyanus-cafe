import { DataTable } from "@/tables/users/data-table.tsx";
import { columns } from "@/tables/sessions/columns.tsx";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import type { Session } from "@/lib/models.ts";

function Sessions() {
  const [data, setData] = useState<Session[]>([]);

  useEffect(() => {
    pb.collection("sessions")
      .getFullList<Session>({ expand: "kid", sort: "-start" })
      .then((users) => {
        setData(users);
      });
  }, []);

  return <DataTable columns={columns} data={data} />;
}

export default Sessions;
