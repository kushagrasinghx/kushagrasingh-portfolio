"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { ClockIcon } from "./Icons";

/** Live local time in Kushagra's timezone. Renders blank until mounted to avoid hydration drift. */
export default function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const time = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: site.timeZone,
      }).format(new Date());
      setNow(`${time} GMT+5:30`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mono inline-flex shrink-0 items-center gap-1.5 tabular-nums">
      <ClockIcon className="size-3 shrink-0" />
      <span className="min-w-[6.75rem] whitespace-nowrap text-right sm:min-w-[7.5rem]">
        {now ?? "--:--:-- GMT+5:30"}
      </span>
    </span>
  );
}
