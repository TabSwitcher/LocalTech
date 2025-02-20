import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Local Tech Events",
  description: "Search, display, create, and edit local tech events",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Local Tech Events</title>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
