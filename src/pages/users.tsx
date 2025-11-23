import { DataTable } from "@/tables/users/data-table.tsx";
import { columns } from "@/tables/users/columns.tsx";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import { routeId } from "@/lib/nav.ts";
import UserDetail from "@/pages/user-detail.tsx";
import type { User } from "@/lib/models.ts";
import { Button } from "@/components/ui/button.tsx";
import { nameToUsername } from "@/lib/format.ts";

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

  const handleAddUser = () => {
    const name = prompt("Veli adını girin:");
    if (!name) return;

    const password = prompt(
      "Veli için şifre girin: (En az 8 karakter olmalıdır)",
    );
    if (!password) return;

    const username = nameToUsername(name);
    const email = `${username}@okyanus.cafe`;

    pb.collection("users")
      .create<User>({
        name,
        email,
        password,
        passwordConfirm: password,
      })
      .then((newUser: User) => {
        alert(
          `Veli başarıyla oluşturuldu.\nKullanıcı Adı: ${username}\nŞifre: okyanus1`,
        );
        window.location.href = `/veliler/${newUser.id}`;
      })
      .catch((error) => {
        alert(`Bir hata oluştu:\n${JSON.stringify(error.response, null, 2)}`);
      });
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleAddUser}>Veli Ekle</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default Route;
