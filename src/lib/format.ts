import type { User } from "@/lib/models.ts";

export const formatUsername = (email: string) => email.split("@").at(0);

export const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const toDatetimeLocal = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export function hoursToHM(hours: number) {
  if (!hours) hours = 0;

  const totalMinutes = Math.round(hours * 60);

  const hh = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const mm = String(totalMinutes % 60).padStart(2, "0");

  return `${hh}:${mm}`;
}

export const getRemainingHours = (user: User) => {
  const packHours = user.pack_hours;
  const usage = user.usage || 0;
  return Math.max(0, packHours - usage);
};

export function getExcessHours(user: User) {
  const packHours = user.pack_hours;
  const usage = user.usage || 0;
  const extra = Math.max(0, usage - packHours);
  const excess = user.excess || 0;
  return excess + extra;
}

export function nameToUsername(name: string) {
  const map = {
    ı: "i",
    İ: "i",
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };

  return (
    name
      .trim()
      .toLowerCase()
      .split("")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map((ch) => map[ch] || ch)
      .join("")
      .replace(/\s+/g, ".")
  );
}
