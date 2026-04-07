import ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { Reservation } from "../type";
import { MakeReservationReq } from "./type";

const getReservations = (date: string) => ky.get("/api/reservations", { searchParams: { date } }).json<Reservation[]>();

export const getReservationsQueryOptions = (date: string) =>
  queryOptions({
    queryKey: ["reservations", date],
    queryFn: () => getReservations(date),
  });

const getMyReservations = () => ky.get("/api/my-reservations").json<Reservation[]>();

export const getMyReservationsQueryOptions = () =>
  queryOptions({
    queryKey: ["my-reservations"],
    queryFn: () => getMyReservations(),
  });

export const makeReservation = (req: MakeReservationReq) =>
  ky.post("/api/reservations", { json: req }).json<{ ok: boolean; reservation: Reservation }>();

export const cancleReservation = (reservationId: string) =>
  ky.delete(`/api/reservations/${reservationId}`).json<{ ok: boolean }>();
