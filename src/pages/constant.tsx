import { Presentation, Tv, Video, Volume2 } from "lucide-react";
import type { Equipment } from "../apis/type";

export const TIME_SELECT_OPTIONS = [
  {
    label: "09:00",
    value: "09:00",
  },
  {
    label: "09:30",
    value: "09:30",
  },
  {
    label: "10:00",
    value: "10:00",
  },
  {
    label: "10:30",
    value: "10:30",
  },
  {
    label: "11:00",
    value: "11:00",
  },

  {
    label: "11:30",
    value: "11:30",
  },
  {
    label: "12:00",
    value: "12:00",
  },
  {
    label: "12:30",
    value: "12:30",
  },
  {
    label: "13:00",
    value: "13:00",
  },
  {
    label: "13:30",
    value: "13:30",
  },
  {
    label: "14:00",
    value: "14:00",
  },
  {
    label: "14:30",
    value: "14:30",
  },
  {
    label: "15:00",
    value: "15:00",
  },
  {
    label: "15:30",
    value: "15:30",
  },
  {
    label: "16:00",
    value: "16:00",
  },
  {
    label: "16:30",
    value: "16:30",
  },
  {
    label: "17:00",
    value: "17:00",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
  {
    label: "18:30",
    value: "18:30",
  },
  {
    label: "19:00",
    value: "19:00",
  },
  {
    label: "19:30",
    value: "19:30",
  },
  {
    label: "20:00",
    value: "20:00",
  },
];

export const EQUIPMENT_SELECT_OPTIONS: { label: string; value: Equipment, icon?: React.ReactElement }[] = [
  {
    label: "TV",
    value: "tv",
    icon: <Tv className="h-4 w-4" />
  },
  {
    label: "화이트보드",
    value: "whiteboard",
    icon: <Presentation className="h-4 w-4" />
  },
  {
    label: "화상회의",
    value: "video",
    icon: <Video className="h-4 w-4" />
  },
  {
    label: "스피커",
    value: "speaker",
    icon: <Volume2 className="h-4 w-4" />
  },
];
