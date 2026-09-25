"use client";

import React from "react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

const MAX_CHARS = 3000;

export interface CharacterCountProps {
  limit?: number;
  className?: string;
}

export function CharacterCount({ limit = MAX_CHARS, className }: CharacterCountProps) {
  const { data } = useLinkedInComposer();

  const fullText = [data.hook, data.body, data.callToAction].filter(Boolean).join("\n\n");
  const hashtagText = data.hashtags?.length ? "\n\n" + data.hashtags.join(" ") : "";
  const totalChars = (fullText + hashtagText).length;

  const percentage = Math.min((totalChars / limit) * 100, 100);

  const colorClass =
    totalChars > limit
      ? "text-red-500"
      : totalChars > limit * 0.93
        ? "text-amber-500"
        : totalChars > limit * 0.8
          ? "text-yellow-500"
          : "text-zinc-500 dark:text-zinc-400";

  const ringColor =
    totalChars > limit
      ? "stroke-red-500"
      : totalChars > limit * 0.93
        ? "stroke-amber-500"
        : totalChars > limit * 0.8
          ? "stroke-yellow-500"
          : "stroke-zinc-900 dark:stroke-zinc-100";

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={`${totalChars} of ${limit} characters used`}
    >
      {/* Circular progress ring */}
      <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20" aria-hidden="true">
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          strokeWidth="2"
          className="stroke-zinc-200 dark:stroke-zinc-800"
        />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          strokeWidth="2"
          strokeDasharray={`${percentage * 0.5} 50`}
          strokeLinecap="round"
          className={cn("transition-all duration-300", ringColor)}
        />
      </svg>

      <span className={cn("text-xs font-medium tabular-nums", colorClass)}>
        {totalChars.toLocaleString()}/{limit.toLocaleString()}
      </span>
    </div>
  );
}
