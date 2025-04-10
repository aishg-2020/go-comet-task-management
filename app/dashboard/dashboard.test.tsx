import React from "react";
import { render, screen } from "@testing-library/react";

import DashboardPage from "./page";
import { renderWithRedux } from "@/test-utils";

describe("DashboardPage", () => {
  it("renders without crashing", () => {
    renderWithRedux(<DashboardPage />);
    expect(screen.getByTestId("search-filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });
});
