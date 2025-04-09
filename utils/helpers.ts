export function getSortArrow(
  currentSort: string | undefined,
  column: string
): string {
  if (!currentSort || !currentSort.startsWith(column)) return "↕"; // unsorted
  return currentSort.endsWith("asc") ? "↑" : "↓";
}
