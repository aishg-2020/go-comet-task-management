import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import TaskTable from ".";

import { renderWithRedux } from "@/test-utils";
afterEach(cleanup);

function renderWithStore() {
  return renderWithRedux(<TaskTable />);
}
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(callback: any, options?: any) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});

jest.mock("@/utils/localStorage", () => ({
  loadColumnConfig: jest.fn(() => ["name", "assignee", "status"]),
}));

jest.mock("@/components/TaskTable/TaskRow", () => {
  const MockTaskRow = (props: any) => (
    <tr data-testid="task-row" onClick={props.onClick}>
      <td>Mock TaskRow for {props.task.name}</td>
    </tr>
  );
  MockTaskRow.displayName = "MockTaskRow";
  return MockTaskRow;
});

jest.mock("@/components/TaskTable/EditColumnsModal/EditColumnsModal", () => {
  const MockEditColumnsModal = (props: any) =>
    props.open ? (
      <div data-testid="edit-columns-modal">Edit Columns Modal</div>
    ) : null;
  MockEditColumnsModal.displayName = "MockEditColumnsModal";
  return MockEditColumnsModal;
});

jest.mock("@/components/TaskTable/TaskDrawer", () => {
  const MockTaskDrawer = (props: any) =>
    props.taskId ? <div data-testid="task-drawer">Task Drawer</div> : null;
  MockTaskDrawer.displayName = "MockTaskDrawer";
  return MockTaskDrawer;
});

describe("TaskTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task table with headers and rows", () => {
    renderWithStore();

    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByTestId("task-table-header")).toBeInTheDocument();
  });

  it("toggles EditColumnsModal on button click", async () => {
    renderWithStore();
    fireEvent.click(screen.getByRole("button", { name: /columns/i }));
    expect(await screen.findByTestId("edit-columns-modal")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithStore();
    expect(asFragment()).toMatchSnapshot();
  });
});
