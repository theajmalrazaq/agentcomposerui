"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { useEmailComposer } from "./context";
import { cn } from "../../lib/utils";

export interface SubjectAnalyzerProps {
  className?: string;
}

export function SubjectAnalyzer({ className }: SubjectAnalyzerProps) {
  const { subjectImpact, spamWordsDetected } = useEmailComposer();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-3 text-xs",
        className,
      )}
    >
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            Subject Line Impact Analysis:
          </span>
          <span className="font-mono text-zinc-600 dark:text-zinc-400">
            {subjectImpact.score}/100 ({subjectImpact.rating})
          </span>
        </div>

        <button
          type="button"
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label={expanded ? "Collapse analysis" : "Expand analysis"}
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 space-y-2 animate-fade-in">
          {/* Spam warning */}
          {spamWordsDetected.length > 0 ? (
            <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Detected spam trigger keywords:{" "}
                <strong>{spamWordsDetected.map((w) => `"${w}"`).join(", ")}</strong>. High risk of
                landing in spam folder.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Zero high-risk spam trigger words detected.</span>
            </div>
          )}

          {/* Improvement tips */}
          {subjectImpact.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-zinc-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0 mt-1.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
