export type Task = {
  row_no: number;
  name: string;
  description: string;
  id: string;
  assignee: string;
  status: string;
  priority: "Low" | "Medium" | "High";
  duedate: string;
  estimation_hours: number;
  remarks: string;
  comments: string[]; // Display only
};
