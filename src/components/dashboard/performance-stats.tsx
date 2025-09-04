"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", retention: 86, new: 50 },
  { month: "February", retention: 88, new: 60 },
  { month: "March", retention: 90, new: 75 },
  { month: "April", retention: 92, new: 80 },
  { month: "May", retention: 91, new: 70 },
  { month: "June", retention: 93, new: 85 },
];

export default function PerformanceStats() {
  const t = useTranslations('PerformanceStats');

  const chartConfig = {
    retention: {
      label: t('retention'),
      color: "hsl(var(--primary))",
    },
    new: {
      label: t('newQuestions'),
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig;
  
  const monthT = (key: string) => t(key.toLowerCase());

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
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
                tickFormatter={(value) => monthT(value).slice(0, 3)}
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
