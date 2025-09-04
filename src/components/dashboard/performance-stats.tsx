"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", retention: 86, new: 50 },
  { month: "February", retention: 88, new: 60 },
  { month: "March", retention: 90, new: 75 },
  { month: "April", retention: 92, new: 80 },
  { month: "May", retention: 91, new: 70 },
  { month: "June", retention: 93, new: 85 },
];

const chartConfig = {
  retention: {
    label: "Retention",
    color: "hsl(var(--primary))",
  },
  new: {
    label: "New Questions",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function PerformanceStats() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
        <CardDescription>Your retention and new questions learned over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                unit="%"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 100]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="retention" fill="var(--color-retention)" radius={4} />
              <Bar dataKey="new" fill="var(--color-new)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
