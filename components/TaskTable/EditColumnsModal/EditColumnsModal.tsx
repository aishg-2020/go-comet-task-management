"use client";

import { Modal, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { loadColumnConfig, saveColumnConfig } from "@/utils/localStorage";
import { columnsMap } from "@/utils/columnsMap";
import { Reorder } from "framer-motion";
import { Container, ReorderItem, Section } from "./styles";
const allColumns = Object.keys(columnsMap);

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditColumnsModal({ open, onClose }: Props) {
  const [selectedCols, setSelectedCols] = useState<string[]>([]);

  useEffect(() => {
    const saved = loadColumnConfig();
    setSelectedCols(saved.length ? saved : allColumns);
  }, []);

  const handleCheckboxChange = (vals: any[]) => {
    setSelectedCols(vals as string[]);
  };

  const handleSave = () => {
    saveColumnConfig(selectedCols);
    onClose();
  };

  return (
    <Modal
      title="Edit Columns"
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      width={700}
    >
      <Container>
        <Section>
          <h3 style={{ marginBottom: "0.5rem" }}>Select Columns</h3>
          <Checkbox.Group
            className="checkbox-group"
            value={selectedCols}
            onChange={handleCheckboxChange}
          >
            {allColumns.map((col) => (
              <Checkbox key={col} value={col}>
                {columnsMap[col]}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Section>

        <Section>
          <h3 style={{ marginBottom: "0.5rem" }}>Reorder Columns</h3>
          <Reorder.Group
            axis="y"
            values={selectedCols}
            onReorder={setSelectedCols}
          >
            {selectedCols.map((col) => (
              <ReorderItem key={col} value={col}>
                {columnsMap[col]}
              </ReorderItem>
            ))}
          </Reorder.Group>
        </Section>
      </Container>
    </Modal>
  );
}
