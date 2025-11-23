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
