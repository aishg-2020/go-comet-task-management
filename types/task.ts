export type Task = {
  row_no: number;
  name: string;
  description: string;
  id: string;
  assignee: string;
  status: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  estimationHours: number;
  remarks: string;
  comments: string[]; // Display only
};
