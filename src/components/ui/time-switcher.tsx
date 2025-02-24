import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "./card";
import { Console } from "console";
import { TimeIntervals } from "@/types/timeIntervals";
import { useTranslations } from "next-intl";

const TIME_INTERVALS = [
  TimeIntervals.WEEK,
  TimeIntervals.MONTH,
  TimeIntervals.YEAR,
  TimeIntervals.ALL,
];

export const TimeSwitcher = () => {
  const [selectedTime, setSelectedTime] = useState("1W");
  const t = useTranslations("poll.timeIntervals");
  console.log(selectedTime);

  return (
    <Card>
      <ToggleGroup
        type="single"
        value={selectedTime}
        onValueChange={(value) => {
          if (TIME_INTERVALS.includes(value)) {
            setSelectedTime(value);
          }
        }}
        className="p-1 rounded-lg shadow-sm"
      >
        {TIME_INTERVALS.map((item) => {
          return (
            <ToggleGroupItem
              value={item}
              key={item}
              className={`px-4 py-2 rounded-md ${
                selectedTime === item ? "bg-accent text-primary" : ""
              }`}
            >
              {t(item)}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Card>
  );
};
