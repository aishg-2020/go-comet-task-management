"use client";

import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetTasks, fetchTasks } from "@/store/taskSlice";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/store";
import styled from "styled-components";

const { Option } = Select;

// const statuses = ["Pending", "In Progress", "Completed"];
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

// Layout container
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Left = Search
const LeftSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

// Right = Filters
const RightSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const StyledSelect = styled(Select)`
  width: 150px;
`;

const StyledSearch = styled(Input.Search)`
  width: 200px;
`;

export default function SearchFilterBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");

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
        <StyledSearch
          placeholder="Search tasks..."
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
