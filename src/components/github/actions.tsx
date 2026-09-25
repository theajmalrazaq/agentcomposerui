"use client";

import React from "react";
import { Check } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { cn } from "../../lib/utils";

export interface ActionsProps {
  className?: string;
  children?: React.ReactNode;
}

export function Actions({ className, children }: ActionsProps) {
  const { data } = useGitHubPRComposer();

  const completedTasks = (data.checklist || []).filter((i) => i.completed).length;
  const totalTasks = (data.checklist || []).length;

  return (
    <div
      className={cn(
        "p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
        {totalTasks > 0 && (
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {completedTasks}/{totalTasks} checks
            </span>
          </span>
        )}
        {(data.reviewers || []).length > 0 && (
          <span>{(data.reviewers || []).length} reviewers</span>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">{children}</div>
    </div>
  );
}
