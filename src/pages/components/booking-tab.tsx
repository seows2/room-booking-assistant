import { Tv, Presentation, Video, Volume2, Building2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { InputField } from "@/components/input-field";
import { SubCard, SubCardContent, SubCardHeader } from "@/components/ui/sub-card";
import { SelectField } from "@/components/select-field";
import { DateField } from "@/components/date-field";
import { RoomSelect } from "./room-select";
import { SuspenseQueries, SuspenseQuery } from "@suspensive/react-query";
import { getRoomsQueryOptions } from "@/src/apis/rooms";
import { getReservationsQueryOptions } from "@/src/apis/reservation";
import { useBookingSearchParams, EquipmentsSchema } from "../hooks/useBookingSearchParams";
import { EQUIPMENT_SELECT_OPTIONS, TIME_SELECT_OPTIONS } from "../constant";
import { groupBy } from "@/src/utils";

export function BookingTab() {
  const { bookingSearchParams, updateBookingSearchParams } = useBookingSearchParams()

  const filteredStartTimeOptions = bookingSearchParams.endTime
    ? TIME_SELECT_OPTIONS.filter((opt) => opt.value < bookingSearchParams.endTime!)
    : TIME_SELECT_OPTIONS;

  const filteredEndTimeOptions = bookingSearchParams.startTime
    ? TIME_SELECT_OPTIONS.filter((opt) => opt.value > bookingSearchParams.startTime!)
    : TIME_SELECT_OPTIONS;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>예약 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <DateField value={new Date(bookingSearchParams.date)} onSelect={(date) => updateBookingSearchParams({ date: format(date ?? new Date(), "yyyy-MM-dd") })} />
          <SuspenseQueries queries={[getRoomsQueryOptions(), getReservationsQueryOptions(bookingSearchParams.date)]}>
            {([{ data: rooms }, { data: reservations }]) =>
              <>
                {rooms.map((room) => {
                  const roomReservations = reservations.filter((reservation) => reservation.roomId === room.id)
                  return (
                    <SubCard key={room.id}>
                      <SubCardHeader>{room.name}</SubCardHeader>
                      <SubCardContent>
                        {roomReservations.length > 0 ? roomReservations.map(rr => (
                          <Badge key={rr.id} variant="outline">{rr.start} - {rr.end}</Badge>
                        )) : <p className="text-muted-foreground text-sm">예약 없음</p>}
                      </SubCardContent>
                    </SubCard>
                  )
                })
                }
              </>
            }
          </SuspenseQueries>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>예약 조건</CardTitle>
        </CardHeader>
        <CardContent>
          <DateField
            value={new Date(bookingSearchParams.date)}
            onSelect={(date) => updateBookingSearchParams({ date: format(date ?? new Date(), "yyyy-MM-dd") })}
          />
          <InputField
            value={bookingSearchParams.capacity ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                updateBookingSearchParams({ capacity: undefined });
                return;
              }
              const nextCapacity = parseInt(e.target.value);
              if (isNaN(nextCapacity) || nextCapacity < 1) {
                alert("참석 인원은 1명 이상이어야 합니다.");
                return;
              }

              updateBookingSearchParams({ capacity: nextCapacity })
            }}
            label="참석 인원"

            type="number"
            min={1}
          />
          <SelectField
            value={bookingSearchParams.startTime ?? ""}
            onValueChange={(value) => {
              if (bookingSearchParams.endTime && value >= bookingSearchParams.endTime) {
                alert("시작 시간은 종료 시간보다 빨라야 합니다.");
                return;
              }
              updateBookingSearchParams({ startTime: value })
            }}
            label="시작 시간"
            options={filteredStartTimeOptions}
          />
          <SelectField
            value={bookingSearchParams.endTime ?? ""}
            onValueChange={(value) => {
              if (bookingSearchParams.startTime && value <= bookingSearchParams.startTime) {
                alert("종료 시간은 시작 시간보다 늦어야 합니다.");
                return;
              }
              updateBookingSearchParams({ endTime: value })
            }}
            label="종료 시간"
            options={filteredEndTimeOptions}
          />
          <SuspenseQuery {...getRoomsQueryOptions()}>
            {({ data: rooms }) =>
              <SelectField
                value={String(bookingSearchParams.floor)}
                onValueChange={(value) => {
                  if (value === "all") {
                    updateBookingSearchParams({ floor: "all" });
                    return;
                  }

                  const nextFloor = parseInt(value);
                  if (isNaN(nextFloor)) return

                  updateBookingSearchParams({ floor: nextFloor })
                }}
                label="선호 층 (선택)"
                options={[
                  { label: "전체", value: "all" },
                  ...Object.keys(groupBy(rooms, (room) => String(room.floor)))
                    .map((floor) => ({ label: `${floor}층`, value: floor })),
                ]}
              />
            }
          </SuspenseQuery>
          <div className="space-y-2">
            <Label>필요 장비</Label>
            <ToggleGroup
              value={bookingSearchParams.equipments}
              onValueChange={(value) => {
                const parsed = EquipmentsSchema.safeParse(value);
                if (parsed.success) {
                  updateBookingSearchParams({ equipments: parsed.data });
                }
              }}
              type="multiple"
              variant="outline"
              spacing={2}
              size="sm"
            >
              {EQUIPMENT_SELECT_OPTIONS.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.icon}
                  {option.label}
                </ToggleGroupItem>
              ))}

            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>예약 가능한 회의실</CardTitle>
        </CardHeader>
        <CardContent>
          <RoomSelect selected name="회의실 1" floor={1} capacity={4} equipments={["tv", "whiteboard"]} />
          <RoomSelect name="회의실 2" floor={1} capacity={4} equipments={["tv", "whiteboard"]} />
          <Button size="lg">예약하기</Button>
        </CardContent>
      </Card>
    </div >
  );
}
