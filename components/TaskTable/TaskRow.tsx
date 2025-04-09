import React from "react";
import styled from "styled-components";
import { Task } from "@/types/task";

type Props = {
  task: Task;
  onClick: () => void;
};

const Row = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f7fafc;
  }
`;

const Cell = styled.td`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  word-break: break-word;
  color: rgba(0, 0, 0, 0.87);

  @media (max-width: 600px) {
    padding: 0.4rem 0.3rem;
    font-size: 0.875rem;
  }
`;

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
              case "duedate":
                return task.duedate;
              case "estimation_hours":
                return task.estimation_hours;
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
