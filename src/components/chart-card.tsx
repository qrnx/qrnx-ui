import { Card } from "./ui/card";
import { TimeSwitcher } from "./time-switcher";
import { useMemo, useState } from "react";
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
import { Poll } from "@/types/poll";
import { useQuery } from "@tanstack/react-query";
import { getResponses } from "@/api/responses";
import { convertDatesToMonths, convertDatesToWeekdays } from "@/lib/dates";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  poll: Poll;
  title: string;
  withTrendSection?: boolean;
}

export const ChartCard = ({
  poll,
  title,
  withTrendSection = false,
}: ChartCardProps) => {
  const { documentId, affirmativeResponses, negativeResponses } = poll;
  const [timeInterval, setTimeInterval] = useState(TimeIntervals.WEEK);
  const t = useTranslations("dashboard");
  const dateTranslations = useTranslations("dates");

  const {
    data: responses,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["responses", documentId, timeInterval, "unnormalized"],
    queryFn: () =>
      getResponses({ pollId: documentId, timeInterval: timeInterval }),
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

  const fortmatedResponses = useMemo(() => {
    if (timeInterval === TimeIntervals.WEEK) {
      return convertDatesToWeekdays(responses || [], dateTranslations);
    }

    if (timeInterval === TimeIntervals.YEAR) {
      return convertDatesToMonths(responses || [], dateTranslations);
    }

    if (timeInterval === TimeIntervals.ALL) {
      return convertDatesToMonths(responses || [], dateTranslations);
    }

    return responses;
  }, [responses, timeInterval, dateTranslations]);

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

    let dataKey = "weekday";
    switch (timeInterval) {
      case TimeIntervals.WEEK:
        dataKey = "weekday";
        break;
      case TimeIntervals.MONTH:
        dataKey = "response_date";
        break;
      case TimeIntervals.YEAR:
        dataKey = "month";
        break;
      case TimeIntervals.ALL:
        dataKey = "month";
        break;
    }

    return (
      <ChartContainer config={chartConfig} className={commonClasses}>
        <BarChart accessibilityLayer data={fortmatedResponses || []}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={dataKey}
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
            {affirmativeResponses}
            <TrendingUp className="size-8 text-(--chart-2)" />
          </div>
          <div className="flex gap-2">
            {negativeResponses}
            <TrendingDown className="size-8 text-(--chart-1)" />
          </div>
        </div>
      ) : null}
      {renderChart()}
    </Card>
  );
};
