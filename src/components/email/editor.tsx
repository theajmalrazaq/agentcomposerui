"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useEmailComposer } from "./context";
import { TokensBar } from "./tokens-bar";
import { SubjectAnalyzer } from "./subject-analyzer";
import { cn } from "../../lib/utils";

export interface EditorProps {
  className?: string;
  showTokens?: boolean;
  showSubjectAnalyzer?: boolean;
}

export function Editor({ className, showTokens = true, showSubjectAnalyzer = true }: EditorProps) {
  const { data, status, isEditable, onFieldChange } = useEmailComposer();
  const isStreaming = status === "streaming";

  return (
    <div className={cn("p-4 space-y-3.5", className)}>
      {isStreaming && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs animate-pulse">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Agent is drafting personalized email outreach...</span>
        </div>
      )}

      {/* Recipient To */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 pb-2 gap-3 text-sm">
        <label htmlFor="email-to" className="w-16 font-medium text-xs text-zinc-500 shrink-0">
          To:
        </label>
        <input
          id="email-to"
          type="text"
          value={data.to}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("to", e.target.value)}
          placeholder="recipient@example.com or {{email}}"
          className={cn(
            "flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>

      {/* Subject Line */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 pb-2 gap-3 text-sm">
        <label htmlFor="email-subject" className="w-16 font-medium text-xs text-zinc-500 shrink-0">
          Subject:
        </label>
        <input
          id="email-subject"
          type="text"
          value={data.subject}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("subject", e.target.value)}
          placeholder="Subject line with high impact..."
          className={cn(
            "flex-1 bg-transparent text-sm font-semibold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>

      {/* Optional Preview Text / Pre-header */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 pb-2 gap-3 text-sm">
        <label
          htmlFor="email-preview-text"
          className="w-16 font-medium text-xs text-zinc-500 shrink-0"
        >
          Preview:
        </label>
        <input
          id="email-preview-text"
          type="text"
          value={data.previewText || ""}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("previewText", e.target.value)}
          placeholder="Snippet preview visible in inbox feed..."
          className={cn(
            "flex-1 bg-transparent text-xs text-zinc-600 dark:text-zinc-400 placeholder-zinc-400 focus:outline-hidden",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>

      {showSubjectAnalyzer && <SubjectAnalyzer />}
      {showTokens && <TokensBar />}

      {/* Main Email Body Textarea */}
      <div className="space-y-1">
        <label htmlFor="email-body" className="block text-xs font-medium text-zinc-500">
          Message Body:
        </label>
        <textarea
          id="email-body"
          value={data.body}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("body", e.target.value)}
          placeholder="Write your email draft with optional {{tokens}}..."
          rows={7}
          className={cn(
            "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 resize-y",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>

      {/* Optional Signature Editor */}
      <div className="space-y-1">
        <label htmlFor="email-signature" className="block text-xs font-medium text-zinc-500">
          Signature & Sign-off:
        </label>
        <textarea
          id="email-signature"
          value={data.signature || ""}
          disabled={!isEditable}
          onChange={(e) => onFieldChange("signature", e.target.value)}
          placeholder="Best regards,\nYour Name\nTitle"
          rows={2}
          className={cn(
            "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-3 text-xs text-zinc-700 dark:text-zinc-300 placeholder-zinc-400 focus:outline-hidden resize-y",
            !isEditable && "cursor-not-allowed opacity-90",
          )}
        />
      </div>
    </div>
  );
}
