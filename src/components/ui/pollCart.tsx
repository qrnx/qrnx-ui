import { PanelBottom } from "lucide-react";
import { Card, CardHeader, CardDescription } from "./card";
import { Button } from "./button";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

const chartData = [
    { weekDay: "Monday", desktop: 186, mobile: 80 },
    { weekDay: "Tuesday", desktop: 305, mobile: 200 },
    { weekDay: "Wednesday", desktop: 237, mobile: 120 },
    { weekDay: "Thursday", desktop: 73, mobile: 190 },
    { weekDay: "Friday", desktop: 209, mobile: 130 },
    { weekDay: "Saturday ", desktop: 214, mobile: 140 },
    { weekDay: "Sunday", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-2)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

export function PollCart ({poll}) {
    // console.log(poll, "PollCart")
    return (
        <Link href="test" className="flex w-full">
            <Card className="flex w-full justify-between p-[20]">
                <div className="flex flex-col justify-between">
                    <div className="mb-[52]"> 
                        <h3>{poll.title}</h3>
                        <div>{poll.description}</div>
                    </div>
                    <div>
                        <div className="text-gray-800 opacity-50">In 7 days (7.05 - 14.05)</div>
                        <div className="flex">
                            2 263
                            <TrendingUp className="text-(--chart-2)"/>
                            176
                            <TrendingDown className="text-(--chart-1)"/>
                        </div>
                    </div>
                </div>
                    <ChartContainer config={chartConfig} className="w-full max-w-lg ml-auto">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="weekDay"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                <div className="flex flex-col">
                    <ChevronRight className="ml-auto"/>
                </div>
            </Card>
         </Link>
    );
};

