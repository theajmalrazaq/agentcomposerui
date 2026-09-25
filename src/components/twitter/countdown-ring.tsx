"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface CountdownRingProps {
  current: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showCount?: boolean;
}

export function CountdownRing({
  current,
  max = 280,
  size = 28,
  strokeWidth = 2.5,
  className,
  showCount = false,
}: CountdownRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const remaining = max - current;
  const isOver = remaining < 0;
  const isWarning = remaining <= 20 && !isOver;

  // Clamped ratio for circle stroke
  const ratio = Math.min(Math.max(current / max, 0), 1);
  const strokeDashoffset = circumference - ratio * circumference;

  const strokeColor = isOver
    ? "text-red-500"
    : isWarning
      ? "text-amber-500"
      : "text-blue-500 dark:text-blue-400";

  return (
    <div
      className={cn("inline-flex items-center gap-1.5 font-mono text-xs select-none", className)}
      title={`${current}/${max} characters (${remaining} remaining)`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="stroke-zinc-200 dark:stroke-zinc-800"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-150", strokeColor, "stroke-current")}
          />
        </svg>

        {isOver && <span className="absolute text-[10px] font-bold text-red-500">{remaining}</span>}
      </div>

      {(showCount || isWarning || isOver) && (
        <span
          className={cn(
            "text-[11px] font-mono",
            isOver
              ? "text-red-500 font-bold"
              : isWarning
                ? "text-amber-600 dark:text-amber-400 font-semibold"
                : "text-zinc-500 dark:text-zinc-400",
          )}
        >
          {remaining}
        </span>
      )}
    </div>
  );
}
