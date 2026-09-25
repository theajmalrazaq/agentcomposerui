"use client";

import React, { useState } from "react";
import { Eye, User, Sparkles } from "lucide-react";
import { useEmailComposer } from "./context";
import { cn } from "../../lib/utils";

export interface PreviewProps {
  className?: string;
  senderEmail?: string;
  senderName?: string;
}

export function Preview({
  className,
  senderEmail = "alex@acme.ai",
  senderName = "Alex at Acme",
}: PreviewProps) {
  const { data } = useEmailComposer();
  const [replaceTokens, setReplaceTokens] = useState(true);

  // Substitute {{token}} with mapped values in data.tokens or fallback mock values
  const renderedBody = React.useMemo(() => {
    let text = data.body || "";
    if (!replaceTokens) return text;

    const tokensMap: Record<string, string> = {
      firstName: "Sarah",
      company: "Stripe",
      role: "VP of Product",
      city: "San Francisco",
      ...data.tokens,
    };

    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => tokensMap[key] || `{{${key}}}`);
  }, [data.body, data.tokens, replaceTokens]);

  const renderedSubject = React.useMemo(() => {
    let subj = data.subject || "";
    if (!replaceTokens) return subj;

    const tokensMap: Record<string, string> = {
      firstName: "Sarah",
      company: "Stripe",
      role: "VP of Product",
      city: "San Francisco",
      ...data.tokens,
    };

    return subj.replace(/\{\{(\w+)\}\}/g, (_, key) => tokensMap[key] || `{{${key}}}`);
  }, [data.subject, data.tokens, replaceTokens]);

  return (
    <div
      className={cn(
        "border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-950/40",
        className,
      )}
    >
      {/* Bar Header */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span>Client Reading Pane Preview</span>
        </div>

        {/* Token replacement toggle */}
        <button
          type="button"
          onClick={() => setReplaceTokens(!replaceTokens)}
          className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{replaceTokens ? "Simulating Values" : "Raw {{Tokens}}"}</span>
        </button>
      </div>

      {/* Simulated Email Envelope */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
        {/* Envelope Metadata Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
              {renderedSubject || <span className="text-zinc-400 italic">No subject</span>}
            </h4>
            <span className="text-[11px] font-mono text-zinc-400 shrink-0">10:42 AM</span>
          </div>

          {data.previewText && (
            <p className="text-xs text-zinc-500 font-sans italic truncate">
              Snippet: {data.previewText}
            </p>
          )}

          <div className="flex items-center gap-2 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-700 dark:text-zinc-300 shrink-0">
              <User className="w-3 h-3" />
            </div>
            <div className="truncate">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{senderName}</span>{" "}
              <span className="text-zinc-400">&lt;{senderEmail}&gt;</span>
              <span className="text-zinc-400 mx-1">to</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {data.to || "recipient"}
              </span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
          {renderedBody || <span className="text-zinc-400 italic">Message body preview...</span>}
        </div>

        {/* Sender Signature */}
        {data.signature && (
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 whitespace-pre-wrap leading-relaxed font-sans">
            {data.signature}
          </div>
        )}
      </div>
    </div>
  );
}
