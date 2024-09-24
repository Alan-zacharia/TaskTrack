import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Loading from "../shared/Loading";
import { getTaskStatsApi } from "@/app/utils/api";
import { StatisticsData } from "@/app/types/types";

interface StatisticPropsType {
  statistics: StatisticsData | null;
}
const Statistics: React.FC<StatisticPropsType> = ({ statistics }) => {
  if (!statistics) return <Loading />;

  const barData = [
    { name: "Total Tasks", value: statistics.totalTasks },
    { name: "Completed Tasks", value: statistics.completedTasks },
    { name: "Overdue Tasks", value: statistics.overdueTasks },
  ];

  const pieData = [
    { name: "Completed Tasks", value: statistics.completedTasks },
    { name: "Overdue Tasks", value: statistics.overdueTasks },
  ];

  const COLORS = ["#7FFF00", "#FF6347"];

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Task Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#7FFF00" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Task Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
