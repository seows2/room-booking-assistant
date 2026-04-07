import ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { Room } from "../type";

const getRooms = () => ky.get("/api/rooms").json<Room[]>();

export const getRoomsQueryOptions = () =>
  queryOptions({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });
