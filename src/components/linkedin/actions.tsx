"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface ActionsProps {
  className?: string;
  children: React.ReactNode;
}

export function Actions({ className, children }: ActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
