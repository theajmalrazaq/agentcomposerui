"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface StageIndicatorProps {
  className?: string;
}

export function StageIndicator({ className }: StageIndicatorProps) {
  const { stages, status } = useLinkedInComposer();

  if (stages.length === 0 || status === "idle") return null;

  return (
    <div
      className={cn("flex items-center gap-1.5 flex-wrap px-4 pb-2", className)}
      role="progressbar"
      aria-label="Generation progress"
    >
      {stages.map((stage) => (
        <span
          key={stage.id}
          className={cn(
            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300",
            stage.status === "done" &&
              "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
            stage.status === "active" &&
              "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 animate-pulse",
            stage.status === "pending" &&
              "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700",
          )}
        >
          {stage.status === "done" && <Check className="w-3 h-3 stroke-[3]" />}
          {stage.status === "active" && <Loader2 className="w-3 h-3 animate-spin" />}
          {stage.label}
        </span>
      ))}
    </div>
  );
}
