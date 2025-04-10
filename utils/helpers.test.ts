import { getSortArrow } from "./helpers";

describe("getSortArrow", () => {
  it("should return '↕' when currentSort is undefined", () => {
    expect(getSortArrow(undefined, "name")).toBe("↕");
  });

  it("should return '↕' when currentSort does not start with column", () => {
    expect(getSortArrow("date-asc", "name")).toBe("↕");
  });

  it("should return '↑' when currentSort starts with column and ends with 'asc'", () => {
    expect(getSortArrow("name-asc", "name")).toBe("↑");
  });

  it("should return '↓' when currentSort starts with column and ends with 'desc'", () => {
    expect(getSortArrow("name-desc", "name")).toBe("↓");
  });

  it("should return '↕' when currentSort is partially matching the column", () => {
    expect(getSortArrow("username-asc", "name")).toBe("↕");
  });

  it("should return '↕' when currentSort starts with column but doesn't end with 'asc' or 'desc'", () => {
    expect(getSortArrow("name-somethingelse", "name")).toBe("↓");
  });
});
