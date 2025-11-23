import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.ts";
import type { Kid, Session } from "@/lib/models.ts";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "@/tables/sessions/columns.tsx";
import { DataTable } from "@/tables/users/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";

interface UserDetailProps {
  id: string;
}

function KidDetail({ id }: UserDetailProps) {
  const [kid, setKid] = useState<Kid>();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    pb.collection("kids")
      .getOne<Kid>(id, { expand: "parent" })
      .then((kid) => {
        setKid(kid);
      });

    pb.collection("sessions")
      .getFullList<Session>({
        filter: `kid="${id}"`,
        expand: "kid",
        sort: "-start",
      })
      .then((sessions: Session[]) => {
        setSessions(sessions);
      });
  }, [id]);

  return (
    <div className="flex flex-col gap-6">
      {kid && <KidCard kid={kid} />}
      {sessions && <DataTable columns={columns} data={sessions} />}
    </div>
  );
}

function KidCard({ kid }: { kid: Kid }) {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{kid.name}</CardTitle>
        <CardAction>
          <Button onClick={() => handleStartSession(kid)}>Giriş Başlat</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <table>
          <tbody>
            <tr>
              <td className="font-medium pr-4">Veli:</td>
              <td>
                <a
                  href={`/veliler/${kid.expand.parent.id}`}
                  className="underline"
                >
                  {kid.expand.parent.name}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default KidDetail;
