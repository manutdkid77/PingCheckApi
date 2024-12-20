import { PingStatusData } from "../interfaces/PingStatusChartProps";
import Header from "./Header";
import PingStatusChart from "./PingStatusChart";

const chartData: PingStatusData[] = [
  { time: "10:00", status: 1 },
  { time: "10:05", status: 1 },
  { time: "10:10", status: 1 },
  { time: "10:20", status: 0 },
];

export default function Dashboard() {
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
