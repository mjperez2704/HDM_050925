"use client"

import { Pie, PieChart } from "recharts"

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
  { category: "Refacciones", amount: 2750, fill: "var(--color-parts)" },
  { category: "Salarios", amount: 2000, fill: "var(--color-salaries)" },
  { category: "Renta", amount: 1870, fill: "var(--color-rent)" },
  { category: "Marketing", amount: 1530, fill: "var(--color-marketing)" },
  { category: "Servicios", amount: 350, fill: "var(--color-utilities)" },
]

const chartConfig = {
  amount: {
    label: "Monto",
  },
  parts: {
    label: "Refacciones",
    color: "hsl(var(--chart-1))",
  },
  salaries: {
    label: "Salarios",
    color: "hsl(var(--chart-2))",
  },
  rent: {
    label: "Renta",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  utilities: {
    label: "Servicios",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ExpenseChart() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Desglose de Gastos</CardTitle>
        <CardDescription>Entendiendo los patrones de gasto</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
