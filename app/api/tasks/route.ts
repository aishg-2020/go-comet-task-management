// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { tasks } from "@/lib/dummyTasks";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = parseInt(searchParams.get("skip") || "0");
  const search = searchParams.get("search")?.toLowerCase();
  const sort = searchParams.get("sort");
  const status = searchParams.get("status");
  const assignee = searchParams.get("assignee");
  const priority = searchParams.get("priority");

  let data = [...tasks];

  // Filter
  if (search) {
    data = data.filter(
      (task) =>
        task.name.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
    );
  }

  if (status) data = data.filter((t) => t.status === status);
  if (assignee) data = data.filter((t) => t.assignee === assignee);
  if (priority) data = data.filter((t) => t.priority === priority);

  // Sort (e.g., sort=name_asc or sort=due_date_desc)
  if (sort) {
    const [key, order] = sort.split("_");
    data.sort((a: any, b: any) =>
      order === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key])
    );
  }

  const paginated = data.slice(skip, skip + limit);

  // Delay the response by 1 second
  await delay(1000);

  return NextResponse.json({
    data: paginated,
    total: data.length,
    limit,
    skip,
  });
}
