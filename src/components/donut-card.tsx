"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";

interface DonutChartProps {
  totalResponses: number;
  affirmativeResponses: number;
  negativeResponses: number;
}

export const DonutChart = (props: DonutChartProps) => {
  const { totalResponses, affirmativeResponses, negativeResponses } = props;
  const t = useTranslations("poll.donutChart");

  const chartData = [
    {
      responseType: t("affirmative"),
      total: affirmativeResponses,
      fill: "var(--chart-2)",
    },
    {
      responseType: t("negative"),
      total: negativeResponses,
      fill: "var(--chart-1)",
    },
  ];

  const chartConfig = {
    total: {
      label: "total",
    },
    affirmative: {
      label: t("affirmative") + " ",
      color: "var(--chart-2)",
    },
    negative: {
      label: t("negative") + " ",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-full p-4">
      <div className="flex items-center pb-0 text-xl sm:text-2xl font-semibold">
        {t("total")}
      </div>

      <div className="flex w-full h-full">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="responseType"
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalResponses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground font-medium"
                        >
                          {t("polled")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  );
};
