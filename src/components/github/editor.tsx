"use client";

import React from "react";
import { Sparkles, Edit3, Eye, FileCode2 } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { Checklist } from "./checklist";
import { MetaSidebar } from "./meta-sidebar";
import { cn } from "../../lib/utils";

export interface EditorProps {
  className?: string;
  showChecklist?: boolean;
  showMetaSidebar?: boolean;
}

export function Editor({ className, showChecklist = true, showMetaSidebar = true }: EditorProps) {
  const { data, status, isEditable, onFieldChange, activeTab, setActiveTab } =
    useGitHubPRComposer();

  const isStreaming = status === "streaming";

  return (
    <div className={cn("p-4 space-y-4", className)}>
      {isStreaming && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs animate-pulse">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Agent is drafting PR summary and changelog...</span>
        </div>
      )}

      {/* PR Title */}
      <div className="space-y-1">
        <label
          htmlFor="pr-title"
          className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400"
        >
          Pull Request Title:
        </label>
        <input
          id="pr-title"
          type="text"
          value={data.title}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("title", e.target.value)}
          placeholder="feat(ui): add new composer cards"
          className={cn(
            "w-full px-3 py-2 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>

      {/* Branches Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label htmlFor="target-branch" className="block font-medium text-zinc-500 mb-1">
            Base branch (merge into):
          </label>
          <input
            id="target-branch"
            type="text"
            value={data.targetBranch || "main"}
            disabled={!isEditable}
            onChange={(e) => onFieldChange("targetBranch", e.target.value)}
            className="w-full font-mono text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200"
          />
        </div>
        <div>
          <label htmlFor="source-branch" className="block font-medium text-zinc-500 mb-1">
            Compare branch (head):
          </label>
          <input
            id="source-branch"
            type="text"
            value={data.sourceBranch}
            disabled={!isEditable}
            onChange={(e) => onFieldChange("sourceBranch", e.target.value)}
            className="w-full font-mono text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* Tab Switcher: Write vs Preview */}
      <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer",
            activeTab === "write"
              ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300",
          )}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Write Description</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer",
            activeTab === "preview"
              ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300",
          )}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Rendered Markdown</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("diff")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer",
            activeTab === "diff"
              ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300",
          )}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Files Changed Diff</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "write" && (
        <div className="space-y-1">
          <textarea
            id="pr-body"
            value={data.body}
            disabled={!isEditable}
            onChange={(e) => onFieldChange("body", e.target.value)}
            placeholder="Write PR description, motivation, and changelog..."
            rows={8}
            className={cn(
              "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-3 text-xs font-mono leading-relaxed text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 resize-y",
              !isEditable && "cursor-not-allowed opacity-90",
            )}
            aria-label="PR description markdown editor"
          />
        </div>
      )}

      {activeTab === "preview" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans min-h-[160px]">
          {data.body || <span className="text-zinc-400 italic">No description provided</span>}
        </div>
      )}

      {activeTab === "diff" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 p-3.5 text-xs font-mono overflow-x-auto space-y-1">
          <div className="text-zinc-400 font-bold mb-2">
            diff --git a/components/agent-composer.tsx b/components/agent-composer.tsx
          </div>
          <div className="text-zinc-500">@@ -1,5 +1,8 @@</div>
          <div className="text-emerald-400">
            + import &#123; GitHubPRComposer &#125; from "agentcomposerui";
          </div>
          <div className="text-emerald-400">
            + import &#123; TwitterThreadComposer &#125; from "agentcomposerui";
          </div>
          <div className="text-emerald-400">
            + import &#123; EmailOutreachComposer &#125; from "agentcomposerui";
          </div>
          <div className="text-zinc-300"> export function Workflow() &#123;</div>
          <div className="text-rose-400">- return &lt;div&gt;Legacy Form&lt;/div&gt;;</div>
          <div className="text-emerald-400">
            + return &lt;GitHubPRComposer data=&#123;prData&#125; status="reviewing" /&gt;;
          </div>
          <div className="text-zinc-300"> &#125;</div>
        </div>
      )}

      {showChecklist && <Checklist />}
      {showMetaSidebar && <MetaSidebar />}
    </div>
  );
}
