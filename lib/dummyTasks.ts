import { Task } from "@/types/task";

export const tasks: Task[] = Array.from({ length: 100000 }, (_, i) => ({
  row_no: i + 1,
  id: `task-${i + 1}`,
  name: `Task ${i + 1}`,
  description: `This is the description for task ${i + 1}.`,
  status: ["todo", "in_progress", "done"][i % 3] as Task["status"],
  assignee: ["Alice", "Bob", "Charlie", "Dana"][i % 4],
  priority: ["Low", "Medium", "High"][i % 3] as Task["priority"],
  duedate: new Date(Date.now() + i * 86400000).toISOString().split("T")[0], // due in i days
  estimation_hours: Math.floor(Math.random() * 10) + 1, // Random estimation between 1 and 10 hours
  remarks: `Remarks for task ${i + 1}`,
  comments: [], // Empty comments array
}));
