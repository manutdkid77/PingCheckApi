"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import PingStatusChart from "./PingStatusChart";
import getCurrentTimeForGraph from "@/helpers/timeHelper";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";

export default function Dashboard() {
  const [chartData, setChartData] = useState([
    { time: getCurrentTimeForGraph(), status: false },
  ]);

  const [connection, setConnection] = useState<HubConnection | null>(null);

  const setFavIcon = (iconName: string) => {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']");

    if (link) link.href = `${iconName}`;
  };

  useEffect(() => {
    const connectToHub = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7150/pinghub")
          .withAutomaticReconnect()
          .build();

        connection.on("ReceiveStatus", (isOnline: boolean) => {
          if (isOnline) {
            setFavIcon("online.svg");
            document.title = `🟢`;
          } else {
            setFavIcon("offline.svg");
            document.title = `🔴`;
          }

          setChartData((prevItem) => [
            ...prevItem,
            { time: getCurrentTimeForGraph(), status: isOnline },
          ]);
        });

        await connection.start();
        setConnection(connection);
      } catch (err) {
       // console.error("Error connecting to SignalR hub:", err);
      }
    };

    connectToHub();

    return () => {
      if (connection && connection.state === HubConnectionState.Connected)
        connection.stop();
    };
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
