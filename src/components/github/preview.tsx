"use client";

import React from "react";
import { GitPullRequest, CheckCircle2, Eye, MessageSquare } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { cn } from "../../lib/utils";

export interface PreviewProps {
  className?: string;
  repoName?: string;
}

export function Preview({ className, repoName = "org/agent-platform" }: PreviewProps) {
  const { data } = useGitHubPRComposer();

  return (
    <div
      className={cn(
        "border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-950/40",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span>GitHub PR Feed Preview</span>
        </div>
        <span className="font-mono text-zinc-400 text-[11px]">{repoName}</span>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs space-y-4">
        {/* PR Status & Title Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-xs">
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>Open</span>
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-white truncate">
              {data.title || "Untitled Pull Request"}
            </span>
            <span className="text-zinc-400 font-mono text-xs">#42</span>
          </div>

          <p className="text-xs text-zinc-500 font-mono">
            wants to merge into{" "}
            <code className="text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
              {data.targetBranch || "main"}
            </code>{" "}
            from{" "}
            <code className="text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
              {data.sourceBranch || "feature-branch"}
            </code>
          </p>
        </div>

        {/* PR Description Box */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-xs">
          <div className="bg-zinc-50 dark:bg-zinc-800/60 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-300">
              <span className="font-bold">agent-bot</span>
              <span className="text-zinc-400">commented just now</span>
            </div>
            <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
          </div>

          <div className="p-3 text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
            {data.body || (
              <span className="text-zinc-400 italic">No summary description provided</span>
            )}
          </div>
        </div>

        {/* Simulated CI / Checks Status Box */}
        <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold">All automated agent checks have passed</span>
          </div>
          <span className="text-zinc-500 text-[11px] font-mono">3 / 3 checks successful</span>
        </div>
      </div>
    </div>
  );
}
