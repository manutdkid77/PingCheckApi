"use client";
import { useEffect, useState } from "react";
import { PingStatusData } from "../interfaces/PingStatusChartProps";
import Header from "./Header";
import PingStatusChart from "./PingStatusChart";
import getCurrentTimeForGraph from "@/helpers/timeHelper";

export default function Dashboard() {
  const [chartData, setChartData] = useState([
    { time: getCurrentTimeForGraph(), status: 0 },
  ]);

  useEffect(() => {
    setInterval(() => {
      const status = Math.round(Math.random());

      setChartData((prevItem) => [
        ...prevItem,
        { time: getCurrentTimeForGraph(), status: status },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="container px-5 py-5 mx-auto">
      <Header
        title="Dashboard"
        description="Dashboard to check the current status of the internet."
      />
      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 p-5">
        <PingStatusChart data={chartData} />
      </div>
    </div>
  );
}
