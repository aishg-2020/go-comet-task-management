import { Reorder } from "motion/react";
import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

export const Section = styled.div`
  flex: 1;
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

export const ReorderItem = styled(Reorder.Item)`
  padding: 8px 12px;
  margin-bottom: 8px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: grab;
  user-select: none;
`;
