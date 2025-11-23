import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pb } from "@/lib/pocketbase";
import type { Session } from "@/lib/models.ts";
import { Label } from "@/components/ui/label.tsx";
import { toDatetimeLocal } from "@/lib/format.ts";

function SessionForm({
  session,
  open,
  onOpenChange,
}: {
  session: Session;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let start = formData.get("start") as string;
    let end = formData.get("end") as string;

    if (start) {
      start = new Date(start).toISOString().replace("T", " ");
    }
    if (end) {
      end = new Date(end).toISOString().replace("T", " ");
    }

    await pb.collection("sessions").update(session.id, {
      start: new Date(start).toISOString(),
      end: end ? new Date(end).toISOString() : "",
    });

    alert("Giriş çıkış kaydı güncellendi.");
    onOpenChange(false);
    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Giriş Çıkış Kaydı Düzenle</DialogTitle>
        </DialogHeader>

        <form id="session-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="start">Giriş</Label>
              <Input
                id="start"
                name="start"
                type="datetime-local"
                defaultValue={toDatetimeLocal(session.start)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">Çıkış</Label>
              <Input
                id="end"
                name="end"
                type="datetime-local"
                defaultValue={toDatetimeLocal(session.end)}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button type="submit" form="session-form">
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SessionForm;
