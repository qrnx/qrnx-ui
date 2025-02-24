import { Card } from "./ui/card";
import { TimeSwitcher } from "./ui/time-switcher";
import { useState } from "react";
import { TimeIntervals } from "@/types/timeIntervals";

export const MainChartCard = () => {
  const [timeInterval, setTimeInterval] = useState(TimeIntervals.WEEK);
  console.log("timeLine", timeInterval);

  return (
    <Card className="flex h-full flex-col justify-between p-[20]">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Main Chart</div>
          <TimeSwitcher
            initialInterval={timeInterval}
            onChange={setTimeInterval}
          />
        </div>
        <div>ЧИСЛА И СТРЕЛОЧКИ</div>
      </div>
      <div>График {timeInterval}</div>
    </Card>
  );
};
