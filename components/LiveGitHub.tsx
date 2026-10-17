"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getGitHubData,
  mergeGitHubData,
  type GitHubData,
} from "@/lib/github";

const LiveGitHubContext = createContext<GitHubData | null>(null);

/**
 * The site ships as a static export, so the numbers in the HTML are as old as
 * the last deploy. This refetches them once on mount and hands the fresher set
 * to every consumer; until that resolves (or if it fails) the build-time data
 * stands, so there's no spinner and no layout shift.
 */
export default function LiveGitHub({
  initial,
  children,
}: {
  initial: GitHubData;
  children: React.ReactNode;
}) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let active = true;
    getGitHubData().then((fresh) => {
      if (active) setData((prev) => mergeGitHubData(prev, fresh));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <LiveGitHubContext.Provider value={data}>
      {children}
    </LiveGitHubContext.Provider>
  );
}

export function useLiveGitHub(): GitHubData {
  const data = useContext(LiveGitHubContext);
  if (!data) {
    throw new Error("useLiveGitHub must be used inside <LiveGitHub>");
  }
  return data;
}
