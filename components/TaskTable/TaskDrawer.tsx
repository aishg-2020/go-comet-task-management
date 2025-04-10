"use client";

import React from "react";
import { Drawer, Descriptions, Divider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Props = {
  taskId: string | null;
  onClose: () => void;
};

export default function TaskDrawer({ taskId, onClose }: Props) {
  const task = useSelector((state: RootState) =>
    state.tasks.data.find((t) => t.id === taskId)
  );

  return (
    <Drawer
      title={task ? `Task #${task.row_no}: ${task.name}` : "Task Details"}
      placement="right"
      width={480}
      onClose={onClose}
      open={!!taskId}
    >
      {task ? (
        <>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{task.id}</Descriptions.Item>
            <Descriptions.Item label="Assignee">
              {task.assignee}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{task.status}</Descriptions.Item>
            <Descriptions.Item label="Priority">
              {task.priority}
            </Descriptions.Item>
            <Descriptions.Item label="Due Date">
              {task.dueDate}
            </Descriptions.Item>
            <Descriptions.Item label="Estimation">
              {task.estimationHours} hrs
            </Descriptions.Item>
            <Descriptions.Item label="Remarks">
              {task.remarks}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {task.description}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Comments</Divider>
          <div className="space-y-2">
            {task.comments.length > 0 ? (
              task.comments.map((c, i) => (
                <div key={i} className="bg-gray-100 rounded p-2 text-sm">
                  {c}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No comments</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading task...</p>
      )}
    </Drawer>
  );
}
