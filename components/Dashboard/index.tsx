"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks, resetTasks } from "@/store/taskSlice";
import { Typography } from "antd";
import dayjs from "dayjs";
const Spin = dynamic(() => import("antd/lib/spin"));
const Alert = dynamic(() => import("antd/lib/alert"));
const Button = dynamic(() => import("antd/lib/button"));

const ResponsiveContainer = dynamic(() =>
  import("recharts").then((mod) => mod.ResponsiveContainer)
);
const AreaChart = dynamic(() =>
  import("recharts").then((mod) => mod.AreaChart)
);
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ChartCard,
  EmptyState,
  FullWidthCard,
  Grid,
  SpinnerWrapper,
} from "./styles";
import dynamic from "next/dynamic";

const { Title } = Typography;
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch<AppDispatch>();

  const [completedData, setCompletedData] = useState<any[]>([]);
  const [dueDateData, setDueDateData] = useState<any[]>([]);
  const [estimationPie, setEstimationPie] = useState<any[]>([]);

  useEffect(() => {
    const completedMap: Record<string, number> = {};
    const dueDateMap: Record<string, number> = {};
    const estimationMap: Record<string, number> = {
      "0-4": 0,
      "5-8": 0,
      "9+": 0,
    };

    data.forEach((task) => {
      const dueDate = new Date(task.dueDate).toLocaleDateString();

      if (task.status === "done") {
        completedMap[dueDate] = (completedMap[dueDate] || 0) + 1;
      }
      dueDateMap[dueDate] = (dueDateMap[dueDate] || 0) + 1;

      const est = Number(task.estimationHours);
      if (est <= 4) estimationMap["0-4"]++;
      else if (est <= 8) estimationMap["5-8"]++;
      else estimationMap["9+"]++;
    });

    setCompletedData(
      Object.entries(completedMap).map(([date, count]) => ({
        date: dayjs(date).format("DD MMM"),
        count,
      }))
    );

    setDueDateData(
      Object.entries(dueDateMap).map(([date, count]) => ({
        date: dayjs(date).format("DD MMM"),
        count,
      }))
    );

    setEstimationPie(
      Object.entries(estimationMap).map(([range, value]) => ({
        name: range,
        value,
      }))
    );
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(resetTasks());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      ) : (
        <>
          {error && (
            <div
              style={{
                margin: "16px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button onClick={() => dispatch(fetchTasks({}))} type="primary">
                Retry
              </Button>
            </div>
          )}

          <Grid>
            <ChartCard>
              <Title level={5}>Completed per Day</Title>
              {completedData.length === 0 ? (
                <EmptyState>No data to display</EmptyState>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={completedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard>
              <Title level={5}>Due Date per Day</Title>
              {dueDateData.length === 0 ? (
                <EmptyState>No data to display</EmptyState>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dueDateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <FullWidthCard>
              <Title level={5}>Estimation Hours</Title>
              {estimationPie.every((d) => d.value === 0) ? (
                <EmptyState>No data to display</EmptyState>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={estimationPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {estimationPie.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </FullWidthCard>
          </Grid>
        </>
      )}
    </>
  );
}
