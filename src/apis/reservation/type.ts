import { Equipment } from "../type";

export type MakeReservationReq = {
  roomId: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  attendees: number;
  equipment: Equipment[];
};
