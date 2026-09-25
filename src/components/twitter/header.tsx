"use client";

import React from "react";
import { Sparkles, Layers } from "lucide-react";
import { useTwitterComposer } from "./context";
import { cn } from "../../lib/utils";

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  const { data } = useTwitterComposer();

  // Evaluate hook strength based on first tweet
  const hookTweet = data.tweets[0]?.text || "";
  const hookScore = React.useMemo(() => {
    if (!hookTweet) return { label: "Empty", color: "text-zinc-400 bg-zinc-100 dark:bg-zinc-800" };
    let score = 0;
    if (hookTweet.length >= 40 && hookTweet.length <= 180) score += 40;
    if (/[0-9]/.test(hookTweet)) score += 20; // contains statistics / numbered list
    if (/[?!]/.test(hookTweet)) score += 20; // engaging punctuation
    if (/(how to|why|here is|here's|thread|learn|secret|stop|start)/i.test(hookTweet)) score += 20;

    if (score >= 70) {
      return {
        label: "High Hook Strength",
        color: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400",
      };
    }
    if (score >= 40) {
      return {
        label: "Moderate Hook",
        color: "text-amber-700 bg-amber-500/10 border-amber-500/20 dark:text-amber-400",
      };
    }
    return {
      label: "Weak Hook",
      color: "text-zinc-600 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
    };
  }, [hookTweet]);

  return (
    <div
      className={cn(
        "p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-[200px]">{children}</div>

      <div className="flex items-center gap-2">
        {/* Hook Strength Indicator */}
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border",
            hookScore.color,
          )}
          title="Hook strength evaluated for Twitter feed retention"
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>{hookScore.label}</span>
        </span>

        {/* Thread Count Pill */}
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
          <Layers className="w-3 h-3" />
          <span>
            {data.tweets.length} {data.tweets.length === 1 ? "tweet" : "tweets"}
          </span>
        </span>
      </div>
    </div>
  );
}
