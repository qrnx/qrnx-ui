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

export const DonutChart = () => {
  const t = useTranslations("dashboard");

  const chartData = [
    { responseType: t("affirmative"), total: 275, fill: "var(--chart-2)" },
    { responseType: t("negative"), total: 222, fill: "var(--chart-1)" },
  ];

  const chartConfig = {
    total: {
      label: "total",
    },
    affirmative: {
      label: t("affirmative"),
      color: "var(--chart-2)",
    },
    negative: {
      label: t("negative"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <Card className="flex flex-col h-full p-4">
      <div className="flex items-center pb-0 text-xl sm:text-2xl font-semibold">
        {t("donutChart.total")}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground font-medium"
                        >
                          {t("donutChart.polled")}
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
