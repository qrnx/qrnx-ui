import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "./card";
import { TimeIntervals } from "@/types/timeIntervals";
import { useTranslations } from "next-intl";

const TIME_INTERVALS = [
  TimeIntervals.WEEK,
  TimeIntervals.MONTH,
  TimeIntervals.YEAR,
  TimeIntervals.ALL,
];

interface TimeSwitcherProps {
  initialInterval: TimeIntervals;
  onChange: (value: TimeIntervals) => void;
}

export const TimeSwitcher = ({
  initialInterval,
  onChange,
}: TimeSwitcherProps) => {
  const [timeInterval, setTimeInterval] = useState(initialInterval);
  const t = useTranslations("poll.timeIntervals");
  console.log(timeInterval);

  return (
    <Card>
      <ToggleGroup
        type="single"
        value={timeInterval}
        onValueChange={(value) => {
          if (!TIME_INTERVALS.includes(value as TimeIntervals)) {
            return;
          }
          setTimeInterval(value as TimeIntervals);
          onChange(value as TimeIntervals);
        }}
        className="p-1 rounded-lg shadow-sm"
      >
        {TIME_INTERVALS.map((item) => {
          return (
            <ToggleGroupItem
              value={item}
              key={item}
              className={`px-4 py-2 rounded-md ${
                timeInterval === item ? "bg-accent text-primary" : ""
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
