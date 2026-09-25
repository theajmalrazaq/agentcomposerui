"use client";

import React from "react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface StreamingTextProps {
  text?: string;
  className?: string;
  showCursor?: boolean;
}

export function StreamingText({ text, className, showCursor = true }: StreamingTextProps) {
  const { data, status } = useLinkedInComposer();

  const isStreaming = status === "streaming";
  const content = text ?? [data.hook, data.body, data.callToAction].filter(Boolean).join("\n\n");

  if (!isStreaming && !content) {
    return null;
  }

  // If streaming and content is still completely empty, render ghost skeleton placeholders
  if (isStreaming && !content) {
    return (
      <div
        className={cn("space-y-2.5 py-2 px-4 animate-pulse", className)}
        role="status"
        aria-label="AI is drafting post"
      >
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mt-3" />
        <span className="sr-only">AI is generating post...</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-sm leading-relaxed text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap",
        className,
      )}
      aria-live="polite"
    >
      <span>{content}</span>
      {isStreaming && showCursor && (
        <span
          className="inline-block w-1.5 h-4 ml-0.5 bg-zinc-900 dark:bg-zinc-100 animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
