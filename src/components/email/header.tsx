"use client";

import React from "react";
import { Mail, AlertTriangle, Sparkles } from "lucide-react";
import { useEmailComposer } from "./context";
import { cn } from "../../lib/utils";

export interface HeaderProps {
  className?: string;
  senderName?: string;
}

export function Header({ className, senderName = "Outreach Bot" }: HeaderProps) {
  const { subjectImpact, spamWordsDetected } = useEmailComposer();

  const impactColor =
    subjectImpact.score >= 80
      ? "text-emerald-700 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400"
      : subjectImpact.score >= 50
        ? "text-blue-700 bg-blue-500/10 border-blue-500/20 dark:text-blue-400"
        : "text-amber-700 bg-amber-500/10 border-amber-500/20 dark:text-amber-400";

  return (
    <div
      className={cn(
        "p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      {/* Left: Email icon & identity */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shrink-0 shadow-2xs">
          <Mail className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
            Email Outreach & Newsletter
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Prepared by {senderName}
          </p>
        </div>
      </div>

      {/* Right: Badges */}
      <div className="flex items-center gap-2">
        {/* Spam Alert Badge */}
        {spamWordsDetected.length > 0 && (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
            title={`Spam triggers detected: ${spamWordsDetected.join(", ")}`}
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>{spamWordsDetected.length} spam trigger</span>
          </span>
        )}

        {/* Subject Impact Meter */}
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border",
            impactColor,
          )}
          title={`Subject Line Impact Score: ${subjectImpact.score}/100`}
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>
            {subjectImpact.score}% Impact ({subjectImpact.rating})
          </span>
        </span>
      </div>
    </div>
  );
}
