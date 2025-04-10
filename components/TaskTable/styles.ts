import { Input, Select } from "antd";
import styled from "styled-components";

export const FilterBar = styled.div`
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

export const LeftSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const StyledSelect = styled(Select)`
  width: 150px;
`;

export const StyledSearch = styled(Input.Search)`
  width: 200px;
`;
export const TableWrapper = styled.div`
  width: 100%;
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  background-color: #fff;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

export const Thead = styled.thead`
  background-color: #f3f4f6;
`;

export const Th = styled.th<{ $sortable?: boolean }>`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #e5e7eb;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 600;
  text-align: left;
  user-select: none;
  white-space: nowrap;

  ${(props) =>
    props.$sortable &&
    `
    cursor: pointer;
    &:hover {
      background-color: #f9fafb;
    }
  `}

  span.sort-arrow {
    margin-left: 4px;
  }
`;

export const LoadTrigger = styled.div`
  height: 2.5rem;
  padding: 40px;
  display: flex;
  justify-content: center;
`;
export const TableHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
export const Row = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f7fafc;
  }
`;

export const Cell = styled.td`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  word-break: break-word;
  color: rgba(0, 0, 0, 0.87);

  @media (max-width: 600px) {
    padding: 0.4rem 0.3rem;
    font-size: 0.875rem;
  }
`;
