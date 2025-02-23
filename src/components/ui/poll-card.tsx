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
import { Poll } from "@/types/poll";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";

const chartData = [
  { weekDay: "Monday", affirmative: 252, negative: 123 },
  { weekDay: "Tuesday", affirmative: 325, negative: 200 },
  { weekDay: "Wednesday", affirmative: 237, negative: 120 },
  { weekDay: "Thursday", affirmative: 73, negative: 190 },
  { weekDay: "Friday", affirmative: 209, negative: 130 },
  { weekDay: "Saturday ", affirmative: 214, negative: 140 },
  { weekDay: "Sunday", affirmative: 214, negative: 140 },
];

interface PollCard {
  poll: Poll;
}

export function PollCard({ poll }: PollCard) {
  const { title, description } = poll;
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
    <Link
      href={`${ROUTES.dashboard}/${poll.documentId}`}
      className="flex w-full"
    >
      <Card className="flex w-full justify-between p-[20] h-[200]">
        <div className="flex flex-col justify-between w-3/10">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-medium">{title}</h3>
            <div className="text-muted-foreground text-sm max-h-12 line-clamp-2">
              {description}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="opacity-50 text-xs font-medium">
              {t("inWeek")} 7.05 - 14.05
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
              <Bar
                dataKey="affirmative"
                fill="var(--color-affirmative)"
                radius={4}
              />
              <Bar dataKey="negative" fill="var(--color-negative)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </Link>
  );
}

export const PollCardSkeleton = () => {
  return <Skeleton className="w-full h-[200px] rounded-xl" />;
};
