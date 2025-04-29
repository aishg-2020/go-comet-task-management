import React from "react";
import { Task } from "@/types/task";
import { Cell, Row } from "./styles";

type Props = {
  task: Task;
  onClick: () => void;
};

export default function TaskRow({
  task,
  onClick,
  visibleColumns,
}: {
  task: Task;
  onClick: () => void;
  visibleColumns: string[];
  style?: any;
}) {
  const handleRowKeyPress = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    item: Task
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Row
      onClick={onClick}
      tabIndex={0}
      role="row"
      onKeyDown={(e) => handleRowKeyPress(e, task)}
      aria-label={`View details for ${task?.name}`}
      aria-describedby={`${task?.id}`}
    >
      {visibleColumns.map((col) => (
        <Cell key={col} role="cell">
          {(() => {
            switch (col) {
              case "row_no":
                return task.id;
              case "name":
                return task.name;
              case "description":
                return task.description;
              case "id":
                return task.id;
              case "assignee":
                return task.assignee;
              case "status":
                return task.status;
              case "priority":
                return task.priority;
              case "dueDate":
                return task.dueDate;
              case "estimationHours":
                return task.estimationHours;
              case "remarks":
                return task.remarks;
              default:
                return null;
            }
          })()}
        </Cell>
      ))}
    </Row>
  );
}
