import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PerformanceStats from "@/components/dashboard/performance-stats"
import SuccessCalendar from "@/components/dashboard/success-calendar"
import TodoList from "@/components/dashboard/todo-list"
import { BookOpen, Sparkles } from "lucide-react"
import { Link } from '@/navigation'
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations('Dashboard');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('welcome')}
          </h1>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/generate">
              <Sparkles className="mr-2 h-4 w-4" />
              {t('generateQuestions')}
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/study">
              <BookOpen className="mr-2 h-4 w-4" />
              {t('startStudying')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6">
          <PerformanceStats />
        </div>
        <div className="lg:col-span-1 grid gap-6">
          <SuccessCalendar />
          <TodoList />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('recentActivityTitle')}</CardTitle>
          <CardDescription>{t('recentActivityDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t('noRecentActivity')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
