"use client";

import { useEffect, useState } from "react";

/** Live "office open now" badge — 9:00–20:00 IST, every day. */
export function OpenNow({ openLabel, closedLabel }: { openLabel: string; closedLabel: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const istHour = Number(
        new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date()),
      );
      setOpen(istHour >= 9 && istHour < 20);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        open ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-700"
      }`}
    >
      <span className={`relative flex h-2 w-2 ${open ? "" : "opacity-50"}`}>
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-ink-400"}`} />
      </span>
      {open ? openLabel : closedLabel}
    </span>
  );
}
