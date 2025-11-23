export type User = {
  id: string;
  email: string;
  name: number;
  pack_start: string;
  pack_end: string;
  pack_hours: number;
};

export type Kid = {
  id: string;
  name: string;
  parent: string;
  expand: { parent: User };
};

export type Session = {
  id: string;
  kid: string;
  start: string;
  end: string;
  expand: { kid: Kid };
};
