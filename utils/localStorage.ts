import { columnsMap } from "./columnsMap";

// utils/localStorage.ts
export function saveColumnConfig(config: string[]) {
  localStorage.setItem("task_column_config", JSON.stringify(config));
}

export function loadColumnConfig(): string[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("task_column_config");
  return saved ? JSON.parse(saved) : Object.keys(columnsMap);
}
