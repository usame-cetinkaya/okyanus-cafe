export const formatUsername = (email: string) => email.split("@").at(0);

export const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("tr-TR");
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

export function hoursToHMS(hours: number) {
  const totalSeconds = Math.round(hours * 3600);

  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}
