"use client";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { PingStatusChartProps } from "../interfaces/PingStatusChartProps";

const PingStatusChart: React.FC<PingStatusChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((x) => x.time),
    datasets: [
      {
        label: "Ping Status",
        data: data.map((x) => x.status == 1),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value === 1 ? "On" : "Off";
          },
          stepSize: 1,
          max: 1,
          min: 0,
        },
      },
    },
    aspectRatio: 1 | 3,
    responsive: true,
  };

  return <Line data={chartData} options={options} />;
};

export default PingStatusChart;
