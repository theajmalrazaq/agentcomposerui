"use client";

import React from "react";
import { GitPullRequest, GitBranch, ArrowLeft } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { cn } from "../../lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { data, conventionalCommit } = useGitHubPRComposer();

  const commitTypeColors: Record<string, string> = {
    feat: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400",
    fix: "text-rose-700 bg-rose-500/10 border-rose-500/20 dark:text-rose-400",
    docs: "text-blue-700 bg-blue-500/10 border-blue-500/20 dark:text-blue-400",
    refactor: "text-purple-700 bg-purple-500/10 border-purple-500/20 dark:text-purple-400",
    chore: "text-zinc-700 bg-zinc-500/10 border-zinc-500/20 dark:text-zinc-400",
  };

  const badgeColor = conventionalCommit.type
    ? commitTypeColors[conventionalCommit.type] ||
      "text-zinc-700 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
    : null;

  return (
    <div
      className={cn(
        "p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30",
        className,
      )}
    >
      {/* Title & Icon */}
      <div className="flex items-center gap-2.5 min-w-[200px]">
        <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs">
          <GitPullRequest className="w-4 h-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
            Pull Request Draft
          </p>
          {/* Branch Merge Pill */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mt-1">
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
              <GitBranch className="w-3 h-3 text-zinc-400" />
              <span>{data.targetBranch || "main"}</span>
            </span>
            <ArrowLeft className="w-3 h-3 text-zinc-400" />
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
              <span>{data.sourceBranch || "feature-branch"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Conventional Commit Pill */}
      {conventionalCommit.isConventional && conventionalCommit.type && (
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border",
            badgeColor,
          )}
          title="Conventional commit prefix detected"
        >
          <span>{conventionalCommit.type}</span>
        </span>
      )}
    </div>
  );
}
