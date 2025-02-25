import { Card } from "./ui/card";
import { TimeSwitcher } from "./time-switcher";
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
  { weekDay: "Monday", affirmative: 952, negative: 523 },
  { weekDay: "Tuesday", affirmative: 325, negative: 200 },
  { weekDay: "Wednesday", affirmative: 2237, negative: 1120 },
  { weekDay: "Thursday", affirmative: 173, negative: 190 },
  { weekDay: "Friday", affirmative: 1209, negative: 130 },
  { weekDay: "Saturday ", affirmative: 214, negative: 140 },
  { weekDay: "Sunday", affirmative: 214, negative: 140 },
];

interface ChartCardProps {
  title: string;
  withTrendSection?: boolean;
}

export const ChartCard = ({
  title,
  withTrendSection = false,
}: ChartCardProps) => {
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
        <div className="text-xl sm:text-2xl font-semibold">{title}</div>
        <TimeSwitcher
          initialInterval={timeInterval}
          onChange={setTimeInterval}
        />
      </div>
      {withTrendSection === true ? (
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
      ) : null}
      <ChartContainer
        config={chartConfig}
        className={`w-full ml-auto ${
          withTrendSection ? " h-40 sm:h-40 lg:h-30" : "h-50"
        }`}
      >
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
