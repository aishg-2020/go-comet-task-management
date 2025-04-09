"use client";

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, resetTasks, setFilters } from "@/store/taskSlice";
import { RootState, AppDispatch } from "@/store";
import TaskRow from "./TaskRow";
import TaskDrawer from "./TaskDrawer";
import { getSortArrow } from "@/utils/helpers";
import { loadColumnConfig } from "@/utils/localStorage";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { columnsMap } from "@/utils/columnsMap";
import EditColumnsModal from "./EditColumnsModal";
const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px; // Forces horizontal scroll when needed
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  background-color: #fff;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const Thead = styled.thead`
  background-color: #f3f4f6;
`;

const Th = styled.th<{ $sortable?: boolean }>`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #e5e7eb;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 600;
  text-align: left;
  user-select: none;
  white-space: nowrap;

  ${(props) =>
    props.$sortable &&
    `
    cursor: pointer;
    &:hover {
      background-color: #f9fafb;
    }
  `}

  span.sort-arrow {
    margin-left: 4px;
  }
`;

const LoadTrigger = styled.div`
  height: 2.5rem;
`;
const TableHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const getNextSort = (current: string, column: string) => {
  if (!current || !current.startsWith(column)) return `${column}_asc`;
  return current.endsWith("asc") ? `${column}_desc` : "";
};

export default function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, total, filters } = useSelector(
    (state: RootState) => state.tasks
  );

  const [selected, setSelected] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const skip = data.length;

  useEffect(() => {
    const savedCols = loadColumnConfig();
    setVisibleColumns(savedCols.length ? savedCols : Object.keys(columnsMap));
  }, []);

  const handleSort = (column: string) => {
    const newSort = getNextSort(filters.sort || "", column);
    dispatch(resetTasks());
    dispatch(setFilters({ ...filters, sort: newSort }));
  };

  const renderSortArrow = (column: string) => (
    <span style={{ marginLeft: 4 }}>{getSortArrow(filters.sort, column)}</span>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isBottom = entries[0].isIntersecting;
        if (isBottom && data.length < total && !loading && skip > 0) {
          dispatch(fetchTasks({ skip }));
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [data.length, total, skip, loading]);

  return (
    <TableWrapper>
      <TableHeaderActions>
        <div style={{ fontWeight: 600 }}>Tasks</div>
        <Button
          icon={<SettingOutlined />}
          onClick={() => setShowEditModal(true)}
        >
          Columns
        </Button>
      </TableHeaderActions>

      <Table>
        <Thead>
          <tr>
            {visibleColumns.map((column) => (
              <Th
                key={column}
                $sortable={[
                  "name",
                  "assignee",
                  "status",
                  "priority",
                  "duedate",
                  "estimation_hours",
                ].includes(column)}
                onClick={() =>
                  [
                    "name",
                    "assignee",
                    "status",
                    "priority",
                    "duedate",
                    "estimation_hours",
                  ].includes(column) && handleSort(column)
                }
              >
                {columnsMap[column]}{" "}
                {[
                  "name",
                  "assignee",
                  "status",
                  "priority",
                  "duedate",
                  "estimation_hours",
                ].includes(column) && renderSortArrow(column)}
              </Th>
            ))}
          </tr>
        </Thead>

        <tbody>
          {data.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              visibleColumns={visibleColumns}
              onClick={() => setSelected(task.id)}
            />
          ))}
        </tbody>
      </Table>

      <LoadTrigger ref={observerRef} />

      <TaskDrawer taskId={selected} onClose={() => setSelected(null)} />
      <EditColumnsModal
        open={showEditModal}
        onClose={() => {
          setVisibleColumns(loadColumnConfig());
          setShowEditModal(false);
        }}
      />
    </TableWrapper>
  );
}
