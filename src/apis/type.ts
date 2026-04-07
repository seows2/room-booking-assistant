export type Equipment = "tv" | "whiteboard" | "video" | "speaker";

export type Reservation = {
  id: string;
  roomId: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  attendees: number;
  equipment: Equipment[];
};

export type Room = {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  equipments: Equipment[];
};
