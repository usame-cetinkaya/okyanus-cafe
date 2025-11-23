import { DataTable } from "@/tables/users/data-table.tsx";
import { columns } from "@/tables/kids/columns.tsx";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import { routeId } from "@/lib/nav.ts";
import KidDetail from "@/pages/kid-detail.tsx";
import type { Kid } from "@/lib/models.ts";

function Route() {
  const id = routeId();

  return id ? <KidDetail id={id} /> : <Kids />;
}

function Kids() {
  const [data, setData] = useState<Kid[]>([]);

  useEffect(() => {
    pb.collection("kids")
      .getFullList<Kid>({ expand: "parent" })
      .then((kids: Kid[]) => {
        setData(kids);
      });
  }, []);

  return <DataTable columns={columns} data={data} />;
}

export default Route;
