export interface PingStatusData {
  time: string;
  status: boolean;
}

export interface PingStatusChartProps {
  data: PingStatusData[];
}
