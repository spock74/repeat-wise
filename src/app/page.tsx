import { Button } from "@/components/ui/button"
import Link from "next/link"
import PerformanceStats from "@/components/dashboard/performance-stats"
import SuccessCalendar from "@/components/dashboard/success-calendar"
import TodoList from "@/components/dashboard/todo-list"
import { Sparkles, BookOpen } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground">
            Here's your study dashboard for today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/generate">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Questions
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/study">
              <BookOpen className="mr-2 h-4 w-4" />
              Start Studying
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
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Review your recent study sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent activity. Start a new study session!</p>
        </CardContent>
      </Card>
    </div>
  )
}
