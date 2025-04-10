import { Task } from "@/types/task";

// Number of unique due dates (e.g., 100 days from today)
const UNIQUE_DAYS = 10;

// Create a list of ISO date strings
const dueDates = Array.from(
  { length: UNIQUE_DAYS },
  (_, i) => new Date(Date.now() + i * 86400000).toISOString().split("T")[0]
);

export const tasks: Task[] = Array.from({ length: 100000 }, (_, i) => {
  // Randomly pick a due date from the pool
  const dueDate = dueDates[Math.floor(Math.random() * UNIQUE_DAYS)];

  return {
    row_no: i + 1,
    id: `task-${i + 1}`,
    name: `Task ${i + 1}`,
    description: `This is the description for task ${i + 1}.`,
    status: ["todo", "in_progress", "done"][i % 3] as Task["status"],
    assignee: ["Alice", "Bob", "Charlie", "Dana"][i % 4],
    priority: ["Low", "Medium", "High"][i % 3] as Task["priority"],
    dueDate,
    estimationHours: Math.floor(Math.random() * 10) + 1,
    remarks: `Remarks for task ${i + 1}`,
    comments: [],
  };
});
