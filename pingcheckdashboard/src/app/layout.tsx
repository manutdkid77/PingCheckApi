import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ping Status",
  description:
    "An application to view if the internet is working or not using ping status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
