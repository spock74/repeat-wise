"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Review Chemistry flashcards", completed: true },
  { id: 2, text: "Generate questions for History chapter 5", completed: false },
  { id: 3, text: "Complete 20-minute study session on Physics", completed: false },
];

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study To-Do List</CardTitle>
        <CardDescription>Your goals for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center space-x-2 mb-4">
          <Input 
            type="text" 
            placeholder="New study goal..." 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button type="button" size="icon" onClick={handleAddTask}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center space-x-3 group">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.text}
              </label>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemoveTask(task.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center pt-4">No goals yet. Add one!</p>}
        </div>
      </CardContent>
    </Card>
  )
}
