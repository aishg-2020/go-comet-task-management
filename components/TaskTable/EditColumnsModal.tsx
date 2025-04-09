"use client";

import { Modal, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import { loadColumnConfig, saveColumnConfig } from "@/utils/localStorage";
import { columnsMap } from "@/utils/columnsMap";

const allColumns = Object.keys(columnsMap);
export default function EditColumnsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedCols, setSelectedCols] = useState<string[]>([]);

  useEffect(() => {
    const saved = loadColumnConfig();
    setSelectedCols(saved.length ? saved : allColumns);
  }, []);

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
    >
      <Checkbox.Group
        className="flex flex-col gap-2"
        value={selectedCols}
        onChange={(vals) => setSelectedCols(vals as string[])}
      >
        {allColumns.map((col) => (
          <Checkbox key={col} value={col}>
            {col}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Modal>
  );
}
