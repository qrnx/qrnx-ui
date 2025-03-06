import { Card } from "./ui/card";
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
import { convertDatesToWeekdays, getLastWeekRange } from "@/lib/dates";
import { getResponses } from "@/api/responses";
import { TimeIntervals } from "@/types/timeIntervals";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface PollCard {
  poll: Poll;
}

export function PollCard({ poll }: PollCard) {
  const {
    title,
    description,
    affirmativeResponses,
    negativeResponses,
    documentId,
  } = poll;
  const t = useTranslations("dashboard");
  const dateTranslations = useTranslations("dates");

  const {
    data: responses,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["responses", documentId, TimeIntervals.WEEK, "unnormalized"],
    queryFn: () =>
      getResponses({
        pollId: documentId,
        timeInterval: TimeIntervals.WEEK,
      }),
    enabled: !!documentId,
  });

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

  const dateRange = getLastWeekRange();

  const formated = useMemo(() => {
    return convertDatesToWeekdays(responses || [], dateTranslations);
  }, [responses, dateTranslations]);

  const renderChart = () => {
    const commonClasses = "w-full h-30";

    if (isFetching) {
      return <Skeleton className={commonClasses} />;
    }

    if (error) {
      return (
        <div
          className={cn(
            commonClasses,
            "flex flex-col items-center justify-center gap-4"
          )}
        >
          <h2 className="text-2xl">{t("chartFetchingErrorTitle")}</h2>
          <p>{t("chartFetchingErrorDescription")}</p>
        </div>
      );
    }

    return (
      <ChartContainer config={chartConfig} className={commonClasses}>
        <BarChart accessibilityLayer data={formated || []}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="weekday"
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
    );
  };

  return (
    <Link
      href={`${ROUTES.dashboard}/${poll.documentId}`}
      className="flex w-full"
    >
      <Card className="flex flex-col sm:flex-row w-full gap-4 justify-between p-[20] sm:h-[200]">
        <div className="flex flex-col justify-between gap-2 sm:w-3/10">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-xl sm:text-3xl font-semibold">{title}</h3>
              <div className="flex sm:hidden justify-end">
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
            {description && (
              <div className="text-muted-foreground text-sm max-h-12 line-clamp-2">
                {description}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="opacity-50 text-xs font-medium">
              {t("inWeek")} {dateRange}
            </div>
            <div className="flex gap-6 text-lg md:text-2xl font-medium">
              <div className="flex gap-2">
                {affirmativeResponses}
                <TrendingUp className="size-8 text-(--chart-2)" />
              </div>
              <div className="flex gap-2">
                {negativeResponses}
                <TrendingDown className="size-8 text-(--chart-1)" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full md:w-6/10">
          <div className="hidden sm:flex justify-end">
            <ChevronRight className="text-gray-400" />
          </div>
          {renderChart()}
        </div>
      </Card>
    </Link>
  );
}

export const PollCardSkeleton = () => {
  return <Skeleton className="w-full h-[200px] rounded-xl" />;
};
