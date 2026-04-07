import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import z from "zod";

const parseAsArrayOf = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => {
    if (typeof val === "string") return val.length > 0 ? val.split(",") : undefined;
    if (Array.isArray(val)) return val.length > 0 ? val : undefined;
    return val;
  }, schema.array());

export const EquipmentEnum = z.enum(["tv", "whiteboard", "video", "speaker"]);
export const EquipmentsSchema = z.array(EquipmentEnum);

const BookingSearchParamsSchema = z
  .object({
    date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
    capacity: z.coerce.number().min(1, "참석 인원은 1 이상이어야 합니다.").optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    floor: z
      .union([z.coerce.number(), z.literal("all")])
      .default("all")
      .catch("all"),
    equipments: parseAsArrayOf(EquipmentEnum).optional().catch([]),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "종료 시간은 시작 시간보다 늦어야 합니다.",
      path: ["endTime"],
    },
  );

export type BookingSearchParams = z.infer<typeof BookingSearchParamsSchema>;

export const useBookingSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const bookingSearchParams = BookingSearchParamsSchema.parse(Object.fromEntries(searchParams));

  const updateBookingSearchParams = (newParams: Partial<BookingSearchParams>) => {
    setSearchParams((prev) => {
      Object.entries(newParams).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) {
          prev.delete(k);
        } else if (Array.isArray(v)) {
          prev.set(k, v.join(","));
        } else {
          prev.set(k, String(v));
        }
      });
      return prev;
    });
  };

  return {
    bookingSearchParams,
    updateBookingSearchParams,
  };
};
