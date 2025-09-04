"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function SuccessCalendar() {
  const [studyDays, setStudyDays] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // This logic runs only on the client to avoid hydration mismatch
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    setStudyDays([
      new Date(year, month, 2),
      new Date(year, month, 5),
      new Date(year, month, 8),
      new Date(year, month, 12),
      new Date(year, month, 13),
      new Date(year, month, 18),
      new Date(year, month, 21),
      today
    ]);
    setCurrentMonth(today);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Calendar</CardTitle>
        <CardDescription>Your study streak visualized.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={studyDays}
          onSelect={() => {}} // Disabling selection
          month={currentMonth}
          className="rounded-md"
          modifiers={{
            highlighted: studyDays,
          }}
          modifiersClassNames={{
            highlighted: "bg-accent text-accent-foreground rounded-md",
          }}
        />
      </CardContent>
    </Card>
  );
}
