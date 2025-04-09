"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import TaskTable from "@/components/TaskTable";
import SearchFilterBar from "@/components/TaskTable/SearchFilterBar";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
    gap: 1.5rem;
  }
`;

export default function TaskPage() {
  return (
    <Provider store={store}>
      <PageContainer>
        <SearchFilterBar />
        <TaskTable />
      </PageContainer>
    </Provider>
  );
}
