import React from "react";
import { screen } from "@testing-library/react";
import TaskPage from "./page";
import { renderWithRedux } from "@/test-utils";

jest.mock("@/components/TaskTable/SearchFilterBar", () => ({
  __esModule: true,
  default: () => <div data-testid="search-filter-bar">SearchFilterBar</div>,
}));

jest.mock("@/components/TaskTable", () => ({
  __esModule: true,
  default: () => <div data-testid="task-table">TaskTable</div>,
}));

describe("TaskPage", () => {
  it("renders without crashing", () => {
    renderWithRedux(<TaskPage />);
    expect(screen.getByTestId("search-filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("task-table")).toBeInTheDocument();
  });
});
