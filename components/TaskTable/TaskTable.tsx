"use client";
const ROW_HEIGHT = 56;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, resetTasks, setFilters } from "@/store/taskSlice";
import { RootState, AppDispatch } from "@/store";
import TaskRow from "./TaskRow";
import { getSortArrow } from "@/utils/helpers";
import { loadColumnConfig } from "@/utils/localStorage";
import { Button, Alert, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { columnsMap } from "@/utils/columnsMap";

import {
  LoadTrigger,
  ScrollContainer,
  Table,
  TableHeaderActions,
  TableWrapper,
  Th,
  Thead,
} from "./styles";
import dynamic from "next/dynamic";
const SORTABLE = [
  "name",
  "assignee",
  "status",
  "priority",
  "dueDate",
  "estimationHours",
];
const TaskDrawer = dynamic(() => import("./TaskDrawer"));
const EditColumnsModal = dynamic(
  () => import("./EditColumnsModal/EditColumnsModal")
);
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
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHeight, setVisibleHeight] = useState(0);

  const totalHeight = data.length * ROW_HEIGHT;
  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const visibleCount = Math.ceil(visibleHeight / ROW_HEIGHT);
  const endIndex = Math.min(data.length, startIndex + visibleCount + 5);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

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
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setVisibleHeight(containerRef.current.clientHeight);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetTasks());
    };
  }, [dispatch]);

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
      <ScrollContainer
        ref={containerRef}
        onScroll={handleScroll}
        style={{ maxHeight: visibleHeight, overflowY: "auto" }}
      >
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

          <tbody style={{ position: "relative", height: totalHeight }}>
            <tr style={{ height: startIndex * ROW_HEIGHT }} />
            {data.slice(startIndex, endIndex).map((task, index) => (
              <TaskRow
                key={`${task.id}-${startIndex + index}`}
                task={task}
                visibleColumns={visibleColumns}
                onClick={() => setSelected(task.id)}
                style={{
                  position: "absolute",
                  top: (startIndex + index) * ROW_HEIGHT,
                  left: 0,
                  right: 0,
                  height: ROW_HEIGHT,
                }}
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
