"use client";

import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetTasks, fetchTasks } from "@/store/taskSlice";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/store";

import {
  FilterBar,
  LeftSection,
  RightSection,
  StyledSearch,
  StyledSelect,
} from "./styles";

const { Option } = Select;

const statuses = [
  {
    label: "Done",
    value: "done",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "To Do",
    value: "todo",
  },
];
const priorities = ["Low", "Medium", "High"];
const assignees = ["Alice", "Bob", "Charlie"];

export default function SearchFilterBar({
  isSearchable = true,
}: {
  isSearchable?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.tasks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(resetTasks());
      dispatch(
        setFilters({
          search: searchTerm,
          status,
          priority,
          assignee,
          sort: filters.sort,
        })
      );
      dispatch(fetchTasks({ skip: 0 }));
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm, status, priority, assignee, filters.sort]);

  return (
    <FilterBar>
      <LeftSection>
        {isSearchable && (
          <StyledSearch
            placeholder="Search tasks..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </LeftSection>

      <RightSection>
        <StyledSelect
          placeholder="Status"
          allowClear
          value={status || undefined}
          onChange={(val) => setStatus((val as string | null) || "")}
        >
          {statuses.map((s) => (
            <Option key={s.value} value={s.value}>
              {s.label}
            </Option>
          ))}
        </StyledSelect>

        <StyledSelect
          placeholder="Priority"
          allowClear
          value={priority || undefined}
          onChange={(val) => setPriority((val as string | null) || "")}
        >
          {priorities.map((p) => (
            <Option key={p} value={p}>
              {p}
            </Option>
          ))}
        </StyledSelect>

        <StyledSelect
          placeholder="Assignee"
          allowClear
          value={assignee || undefined}
          onChange={(val) => setAssignee((val as string | null) || "")}
        >
          {assignees.map((a) => (
            <Option key={a} value={a}>
              {a}
            </Option>
          ))}
        </StyledSelect>
      </RightSection>
    </FilterBar>
  );
}
