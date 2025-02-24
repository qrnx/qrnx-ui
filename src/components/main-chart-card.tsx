import { Card } from "./ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TimeSwitcher } from "./ui/time-switcher";

export const MainChartCard = () => {
  return (
    <Card className="flex h-full flex-col justify-between p-[20]">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Main Chart</div>
          <TimeSwitcher />
        </div>
        <div>ЧИСЛА И СТРЕЛОЧКИ</div>
      </div>
      <div>График</div>
    </Card>
  );
};
