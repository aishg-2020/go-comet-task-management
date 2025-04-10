import styled from "styled-components";

export const SpinnerWrapper = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ChartCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 16px;
`;

export const FullWidthCard = styled(ChartCard)`
  grid-column: span 1;

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;
export const EmptyState = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
`;
