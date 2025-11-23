import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import type { Kid, Session, User } from "@/lib/models.ts";
import { formatDate, formatUsername, hoursToHM } from "@/lib/format.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label.tsx";
import { DataTable } from "@/tables/users/data-table.tsx";
import { columns } from "@/tables/sessions/columns.tsx";

function UserDashboard() {
  const id = pb.authStore?.record?.id as string;

  const [user, setUser] = useState<User>();
  const [kids, setKids] = useState<Kid[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    pb.collection("usage")
      .getOne<User>(id)
      .then((user) => {
        setUser(user);
      });

    pb.collection("kids")
      .getFullList<Kid>()
      .then((kids) => {
        setKids(kids);
      });

    pb.collection("sessions")
      .getFullList<Session>({
        sort: "-start",
        expand: "kid",
      })
      .then((sessions: Session[]) => {
        setSessions(sessions);
      });
  }, [id]);

  if (!id) return null;

  return (
    <div className="flex flex-col gap-6 md:flex-row p-4">
      {user && <UserCard user={user} />}
      {kids && <KidsCard kids={kids} />}
      {sessions && <DataTable columns={columns} data={sessions} />}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{formatUsername(user.email)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="pack-start">Paket Başlangıç</Label>
            <span id="pack-start">{formatDate(user.pack_start)}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pack-end">Paket Bitiş</Label>
            <span id="pack-end">{formatDate(user.pack_end)}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pack-hours">Paket Saat</Label>
            <span id="pack-end">{user.pack_hours}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pack-remaining">Paket Kalan</Label>
            <span id="pack-remaining">
              {hoursToHM(user.pack_hours - (user?.usage || 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KidsCard({ kids }: { kids: Kid[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Çocuklarım</CardTitle>
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

export default UserDashboard;
