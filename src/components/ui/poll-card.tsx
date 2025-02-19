import { Card } from "./card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/string";
import { TPoll } from "@/types/poll";

const chartData = [
  { weekDay: "Monday", desktop: 252, mobile: 123 },
  { weekDay: "Tuesday", desktop: 325, mobile: 200 },
  { weekDay: "Wednesday", desktop: 237, mobile: 120 },
  { weekDay: "Thursday", desktop: 73, mobile: 190 },
  { weekDay: "Friday", desktop: 209, mobile: 130 },
  { weekDay: "Saturday ", desktop: 214, mobile: 140 },
  { weekDay: "Sunday", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Affirmative",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Negative",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface PollCard {
  poll: TPoll;
}

export function PollCard({ poll }: PollCard) {
  const { title, description } = poll;

  return (
    <Link href="test" className="flex w-full">
      <Card className="flex w-full justify-between  p-[20] h-[200]">
        <div className="flex flex-col justify-between w-3/10">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-medium">{capitalize(title)}</h3>
            <div className="text-sm max-h-12 line-clamp-2">{description}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="opacity-50 text-xs font-medium">
              In 7 days (7.05 - 14.05)
            </div>
            <div className="flex gap-6 text-2xl font-medium">
              <div className="flex gap-2">
                2263
                <TrendingUp className="size-8 text-(--chart-2)" />
              </div>
              <div className="flex gap-2">
                176
                <TrendingDown className="size-8 text-(--chart-1)" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-6/10">
          <div className="flex justify-end ">
            <ChevronRight className="text-gray-400" />
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
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </Link>
  );
}
