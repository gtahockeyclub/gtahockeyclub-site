export type Player = {
  id: string;
  firstName: string;
  lastInitial: string;
  phone: string;
  email: string;
  paid: boolean;
  role: "Skater" | "Goalie";
};

export type Game = {
  id: string;
  arena: string;
  address: string;
  city: string;
  date: string;
  time: string;
  cost: number;
  maxSkaters: number;
  maxGoalies: number;
  skill: string;
  organizer: string;
  etransferEmail: string;
  notes: string;
  lat: number;
  lng: number;
  roster: Player[];
  waitlist: Player[];
};
