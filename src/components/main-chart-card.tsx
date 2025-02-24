import { Card } from "./ui/card";
import { TimeSwitcher } from "./ui/time-switcher";
import { useState } from "react";
import { TimeIntervals } from "@/types/timeIntervals";
import { TrendingDown, TrendingUp } from "lucide-react";

export const MainChartCard = () => {
  const [timeInterval, setTimeInterval] = useState(TimeIntervals.WEEK);
  console.log("timeLine", timeInterval);

  return (
    <Card className="flex h-full flex-col justify-between p-[20]">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Main Chart</div>
          <TimeSwitcher
            initialInterval={timeInterval}
            onChange={setTimeInterval}
          />
        </div>
        <div className="flex gap-6 text-2xl font-medium">
          <div className="flex gap-2">
            324
            <TrendingUp className="size-8 text-(--chart-2)" />
          </div>
          <div className="flex gap-2">
            54
            <TrendingDown className="size-8 text-(--chart-1)" />
          </div>
        </div>
      </div>
      <div>График {timeInterval}</div>
    </Card>
  );
};
