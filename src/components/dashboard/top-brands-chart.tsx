"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { TopBrandsData } from "@/actions/dashboard-actions"

const chartConfig = {
  sales: {
    label: "Ventas",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

type TopBrandsChartProps = {
    data: TopBrandsData;
};

export function TopBrandsChart({ data }: TopBrandsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Marcas Populares</CardTitle>
        <CardDescription>Top 5 de marcas con más productos vendidos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="brand"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
