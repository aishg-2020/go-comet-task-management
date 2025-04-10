import React from "react";
import { screen, cleanup } from "@testing-library/react";
import Dashboard from ".";

import { renderWithRedux } from "@/test-utils";

afterEach(cleanup);

function renderWithStore() {
  return renderWithRedux(<Dashboard />);
}

describe("Dashboard Component", () => {
  it("shows empty states when no data is available", () => {
    renderWithStore();
    expect(screen.getAllByText(/no data to display/i)).toHaveLength(3);
  });

  it("renders charts when valid data is provided", () => {
    renderWithStore();

    expect(screen.getByText(/completed per day/i)).toBeInTheDocument();
    expect(screen.getByText(/due date per day/i)).toBeInTheDocument();
    expect(screen.getByText(/estimation hours/i)).toBeInTheDocument();
  });
});
