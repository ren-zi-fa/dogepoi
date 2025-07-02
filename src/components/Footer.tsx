"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setCurrentTime(formatted);
  }, []);

  return (
    <footer className="w-full bg-muted text-muted-foreground py-4 mt-10">
      <div className="container mx-auto text-center text-sm">
        <p>Created by Renzi Febriandika</p>
        <p>{currentTime}</p>
      </div>
    </footer>
  );
}
