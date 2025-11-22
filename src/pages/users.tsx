import { DataTable } from "@/tables/users/data-table.tsx";
import { columns, type User } from "@/tables/users/columns.tsx";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";

function Users() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    pb.collection("users")
      .getFullList<User>()
      .then((users: User[]) => {
        setData(users);
      });
  }, []);

  return <DataTable columns={columns} data={data} />;
}

export default Users;
