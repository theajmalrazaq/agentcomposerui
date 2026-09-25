"use client";

import React from "react";
import { useTwitterComposer } from "./context";
import { cn } from "../../lib/utils";

export interface ActionsProps {
  className?: string;
  children?: React.ReactNode;
}

export function Actions({ className, children }: ActionsProps) {
  const { data } = useTwitterComposer();

  const totalChars = data.tweets.reduce((acc, t) => acc + (t.text?.length || 0), 0);

  return (
    <div
      className={cn(
        "p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
        <span>
          {data.tweets.length} {data.tweets.length === 1 ? "tweet" : "tweets"}
        </span>
        <span>·</span>
        <span>{totalChars} total chars</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">{children}</div>
    </div>
  );
}
