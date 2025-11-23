import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import type { Kid, User } from "@/lib/models.ts";
import { formatUsername, toDatetimeLocal } from "@/lib/format.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

interface UserDetailProps {
  id: string;
}

function UserDetail({ id }: UserDetailProps) {
  const [user, setUser] = useState<User>();
  const [kids, setKids] = useState<Kid[]>([]);

  useEffect(() => {
    pb.collection("users")
      .getOne<User>(id)
      .then((user) => {
        setUser(user);
      });

    pb.collection("kids")
      .getFullList<Kid>({ filter: `parent="${id}"` })
      .then((kids: Kid[]) => {
        setKids(kids);
      });
  }, [id]);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {user && <UserCard user={user} />}
      {user && kids && <KidsCard user={user} kids={kids} />}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  function handleResetPassword() {
    if (
      confirm("Kullanıcının şifresini sıfırlamak istediğinize emin misiniz?")
    ) {
      pb.collection("users")
        .update<User>(user.id, {
          password: "okyanus1",
          passwordConfirm: "okyanus1",
        })
        .then(() => {
          alert("Şifre başarıyla sıfırlandı.");
        });
    }
  }

  function handleDeletePack() {
    if (confirm("Paketi silmek istediğinize emin misiniz?")) {
      pb.collection("users")
        .update<User>(user.id, {
          pack_start: null,
          pack_end: null,
          pack_hours: 0,
        })
        .then(() => {
          window.location.reload();
        });
    }
  }

  function handleUpdatePack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pack_hours = Number(formData.get("pack_hours"));
    let pack_start = formData.get("pack_start") as string;
    let pack_end = formData.get("pack_end") as string;

    if (pack_start) {
      pack_start = new Date(pack_start).toISOString().replace("T", " ");
    }
    if (pack_end) {
      pack_end = new Date(pack_end).toISOString().replace("T", " ");
    }

    pb.collection("users")
      .update<User>(user.id, {
        pack_hours,
        pack_start: pack_start || null,
        pack_end: pack_end || null,
      })
      .then(() => {
        window.location.reload();
      });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{formatUsername(user.email)}</CardDescription>
        <CardAction>
          <Button variant="outline" onClick={handleResetPassword}>
            Şifreyi Sıfırla
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="pack-form" onSubmit={handleUpdatePack}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="pack-hours">Paket Saat</Label>
              <Input
                id="pack-hours"
                name="pack_hours"
                type="number"
                required
                defaultValue={user.pack_hours}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pack-start">Paket Başlangıç</Label>
              <Input
                id="pack-start"
                name="pack_start"
                type="datetime-local"
                defaultValue={toDatetimeLocal(user.pack_start)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pack-end">Paket Bitiş</Label>
              <Input
                id="pack-end"
                name="pack_end"
                type="datetime-local"
                defaultValue={toDatetimeLocal(user.pack_end)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 md:flex-row md:justify-end">
        <Button type="submit" form="pack-form" className="w-full md:w-auto">
          Paketi Güncelle
        </Button>
        <Button
          variant="outline"
          onClick={handleDeletePack}
          className="w-full md:w-auto"
        >
          Paketi Sil
        </Button>
      </CardFooter>
    </Card>
  );
}

function KidsCard({ user, kids }: { user: User; kids: Kid[] }) {
  function handleAddChild() {
    const name = prompt("Çocuğun adını girin:");
    if (!name) return;

    pb.collection("kids")
      .create<{ name: string; parent: string }>({
        name,
        parent: user.id,
      })
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Çocuklar</CardTitle>
        <CardAction>
          <Button variant="outline" onClick={handleAddChild}>
            Çocuk Ekle
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {kids.map((kid) => (
            <span key={kid.id}>{kid.name}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
