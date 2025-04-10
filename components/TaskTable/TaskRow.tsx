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
}) {
  return (
    <Row onClick={onClick}>
      {visibleColumns.map((col) => (
        <Cell key={col}>
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
