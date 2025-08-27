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

const chartData = [
  { brand: "Apple", repairs: 186 },
  { brand: "Samsung", repairs: 305 },
  { brand: "Google", repairs: 237 },
  { brand: "Huawei", repairs: 73 },
  { brand: "OnePlus", repairs: 209 },
]

const chartConfig = {
  repairs: {
    label: "Repairs",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function TopBrandsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Brands Analysis</CardTitle>
        <CardDescription>Top 5 most repaired mobile brands</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey="repairs" fill="var(--color-repairs)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
