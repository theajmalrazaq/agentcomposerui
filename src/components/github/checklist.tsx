"use client";

import React from "react";
import { CheckSquare, Square, ListChecks } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { cn } from "../../lib/utils";

export interface ChecklistProps {
  className?: string;
}

export function Checklist({ className }: ChecklistProps) {
  const { data, isEditable, onToggleChecklistItem } = useGitHubPRComposer();

  if (!data.checklist || data.checklist.length === 0) return null;

  const completedCount = data.checklist.filter((i) => i.completed).length;
  const totalCount = data.checklist.length;

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-3 text-xs space-y-2.5",
        className,
      )}
    >
      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 font-medium">
        <div className="flex items-center gap-1.5">
          <ListChecks className="w-3.5 h-3.5 text-zinc-500" />
          <span>Verification Checklist</span>
        </div>
        <span className="font-mono text-[11px]">
          {completedCount}/{totalCount} tasks completed
        </span>
      </div>

      <div className="space-y-1.5">
        {data.checklist.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => isEditable && onToggleChecklistItem(idx)}
            className={cn(
              "flex items-center gap-2 p-1.5 rounded-lg transition-colors select-none",
              isEditable
                ? "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer"
                : "cursor-default",
            )}
          >
            {item.completed ? (
              <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-zinc-400 shrink-0" />
            )}
            <span
              className={cn(
                "text-xs leading-none",
                item.completed
                  ? "line-through text-zinc-400 dark:text-zinc-500"
                  : "text-zinc-800 dark:text-zinc-200",
              )}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
