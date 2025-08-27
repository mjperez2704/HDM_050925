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
  { category: "Parts", amount: 2750, fill: "var(--color-parts)" },
  { category: "Salaries", amount: 2000, fill: "var(--color-salaries)" },
  { category: "Rent", amount: 1870, fill: "var(--color-rent)" },
  { category: "Marketing", amount: 1530, fill: "var(--color-marketing)" },
  { category: "Utilities", amount: 350, fill: "var(--color-utilities)" },
]

const chartConfig = {
  amount: {
    label: "Amount",
  },
  parts: {
    label: "Parts",
    color: "hsl(var(--chart-1))",
  },
  salaries: {
    label: "Salaries",
    color: "hsl(var(--chart-2))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ExpenseChart() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Understanding spending patterns</CardDescription>
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
