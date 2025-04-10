"use client";

import SearchFilterBar from "@/components/TaskTable/SearchFilterBar";
import styled from "styled-components";
import Dashboard from "@/components/Dashboard";

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

export default function DashboardPage() {
  return (
    <PageContainer data-testid="dashboard-page">
      <SearchFilterBar isSearchable={false} />
      <Dashboard />
    </PageContainer>
  );
}
