"use client";

import React from "react";
import { Clock } from "lucide-react";
import { useEmailComposer } from "./context";
import { cn } from "../../lib/utils";

export interface ActionsProps {
  className?: string;
  children?: React.ReactNode;
}

export function Actions({ className, children }: ActionsProps) {
  const { data } = useEmailComposer();

  const wordsCount = React.useMemo(() => {
    return (data.body || "").trim().split(/\s+/).filter(Boolean).length;
  }, [data.body]);

  return (
    <div
      className={cn(
        "p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
        <span>{wordsCount} words</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span>{data.scheduledFor || "Immediate dispatch"}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto">{children}</div>
    </div>
  );
}
