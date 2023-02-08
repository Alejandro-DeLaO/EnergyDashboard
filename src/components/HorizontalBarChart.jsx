// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

export default function HorizontalBarChart({ chartData }) {
  return (
    <Bar
      data={chartData}
      options={{
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}