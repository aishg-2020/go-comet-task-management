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
import { Button, Alert, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { columnsMap } from "@/utils/columnsMap";
import EditColumnsModal from "./EditColumnsModal/EditColumnsModal";
import {
  LoadTrigger,
  ScrollContainer,
  Table,
  TableHeaderActions,
  TableWrapper,
  Th,
  Thead,
} from "./styles";
const SORTABLE = [
  "name",
  "assignee",
  "status",
  "priority",
  "dueDate",
  "estimationHours",
];

const getNextSort = (current: string, column: string) => {
  if (!current || !current.startsWith(column)) return `${column}_asc`;
  return current.endsWith("asc") ? `${column}_desc` : "";
};

export default function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();
  const fetchedSkips = useRef<Set<number>>(new Set());
  const { data, loading, total, filters, error } = useSelector(
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
        if (
          isBottom &&
          data.length < total &&
          !loading &&
          !fetchedSkips.current.has(skip)
        ) {
          fetchedSkips.current.add(skip);
          dispatch(fetchTasks({ skip }));
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [data.length, total, skip, loading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetTasks());
    };
  }, []);

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
      {error && (
        <div
          style={{
            margin: "16px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button onClick={() => dispatch(fetchTasks({ skip }))} type="primary">
            Retry
          </Button>
        </div>
      )}
      <ScrollContainer>
        <Table role="table">
          <Thead>
            <tr data-testid="task-table-header" role="row">
              {visibleColumns.map((column) => (
                <Th
                  role="columnheader"
                  scope="col"
                  key={column}
                  $sortable={SORTABLE.includes(column)}
                  onClick={() =>
                    SORTABLE.includes(column) && handleSort(column)
                  }
                >
                  {columnsMap[column]}{" "}
                  {SORTABLE.includes(column) && renderSortArrow(column)}
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
      </ScrollContainer>

      <LoadTrigger ref={observerRef}>
        {loading && <Spin size="large" />}
      </LoadTrigger>

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
