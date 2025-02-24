import { Card } from "./ui/card";
import { TimeSwitcher } from "./ui/time-switcher";
import { useState } from "react";
import { TimeIntervals } from "@/types/timeIntervals";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";

const chartData = [
  { weekDay: "Monday", affirmative: 252, negative: 123 },
  { weekDay: "Tuesday", affirmative: 325, negative: 200 },
  { weekDay: "Wednesday", affirmative: 237, negative: 120 },
  { weekDay: "Thursday", affirmative: 73, negative: 190 },
  { weekDay: "Friday", affirmative: 209, negative: 130 },
  { weekDay: "Saturday ", affirmative: 214, negative: 140 },
  { weekDay: "Sunday", affirmative: 214, negative: 140 },
];

export const MainChartCard = () => {
  const [timeInterval, setTimeInterval] = useState(TimeIntervals.WEEK);
  const t = useTranslations("dashboard");

  const chartConfig = {
    affirmative: {
      label: t("affirmative"),
      color: "var(--chart-2)",
    },
    negative: {
      label: t("negative"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex h-full flex-col justify-between p-4">
      <div className="flex justify-between items-center">
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
      <ChartContainer config={chartConfig} className="w-full h-30 ml-auto">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="weekDay"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey="affirmative"
            fill="var(--color-affirmative)"
            radius={4}
          />
          <Bar dataKey="negative" fill="var(--color-negative)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};
