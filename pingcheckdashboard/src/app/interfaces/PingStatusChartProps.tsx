export interface PingStatusData {
  time: string;
  status: number;
}

export interface PingStatusChartProps {
  data: PingStatusData[];
}
