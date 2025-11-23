import { DataTable } from "@/tables/users/data-table.tsx";
import { columns } from "@/tables/users/columns.tsx";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import { routeId } from "@/lib/nav.ts";
import UserDetail from "@/pages/user-detail.tsx";
import type { User } from "@/lib/models.ts";

function Route() {
  const id = routeId();

  return id ? <UserDetail id={id} /> : <Users />;
}

function Users() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    pb.collection("usage")
      .getFullList<User>()
      .then((users: User[]) => {
        setData(users);
      });
  }, []);

  return <DataTable columns={columns} data={data} />;
}

export default Route;
