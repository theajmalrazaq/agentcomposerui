"use client";

import React, { useMemo } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, Smartphone, Monitor } from "lucide-react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface PreviewProps {
  className?: string;
}

const MOBILE_TRUNCATION = 140;
const DESKTOP_TRUNCATION = 210;

export function Preview({ className }: PreviewProps) {
  const { data, previewMode, onTogglePreviewMode } = useLinkedInComposer();

  const fullText = [data.hook, data.body, data.callToAction].filter(Boolean).join("\n\n");

  const hashtagText = data.hashtags?.length
    ? "\n\n" + data.hashtags.map((t) => (t.startsWith("#") ? t : `#${t}`)).join(" ")
    : "";

  const completeText = fullText + hashtagText;

  const truncationLimit = previewMode === "mobile" ? MOBILE_TRUNCATION : DESKTOP_TRUNCATION;
  const isTruncated = fullText.length > truncationLimit;

  const visibleText = useMemo(() => {
    if (!isTruncated) return completeText;
    return fullText.slice(0, truncationLimit) + "...";
  }, [completeText, fullText, isTruncated, truncationLimit]);

  return (
    <div className={cn("border-t border-[hsl(var(--acu-border,240_5.9%_90%))]", className)}>
      {/* Toggle bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--acu-muted,240_4.8%_95.9%))]">
        <span className="text-xs font-medium text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))]">
          Feed Preview
        </span>
        <button
          onClick={onTogglePreviewMode}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[hsl(var(--acu-foreground,240_10%_3.9%))] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--acu-ring,240_5.9%_10%))] rounded px-1.5 py-0.5 cursor-pointer"
          aria-label={`Switch to ${previewMode === "desktop" ? "mobile" : "desktop"} preview`}
        >
          {previewMode === "desktop" ? (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </>
          )}
        </button>
      </div>

      {/* Preview card */}
      <div
        className={cn(
          "mx-4 my-3 rounded-lg border border-[hsl(var(--acu-border,240_5.9%_90%))] bg-[hsl(var(--acu-background,0_0%_100%))] overflow-hidden transition-all duration-300",
          previewMode === "mobile" ? "max-w-[375px] mx-auto" : "max-w-full",
        )}
      >
        {/* Post content */}
        <div className="p-4">
          <p className="text-sm leading-relaxed text-[hsl(var(--acu-foreground,240_10%_3.9%))] whitespace-pre-wrap">
            {visibleText}
          </p>
          {isTruncated && (
            <button
              className="text-sm text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))] hover:text-[hsl(var(--acu-foreground,240_10%_3.9%))] mt-0.5 font-medium cursor-pointer"
              aria-label="See more content"
              onClick={() => {}} // Preview only — no action
            >
              ...see more
            </button>
          )}
        </div>

        {/* Engagement bar with Lucide icons (Zero emojis) */}
        <div className="flex items-center justify-around px-4 py-2.5 border-t border-[hsl(var(--acu-border,240_5.9%_90%))]">
          {[
            { icon: <ThumbsUp className="w-3.5 h-3.5" />, label: "Like" },
            { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Comment" },
            { icon: <Repeat2 className="w-3.5 h-3.5" />, label: "Repost" },
            { icon: <Send className="w-3.5 h-3.5" />, label: "Send" },
          ].map((action) => (
            <span
              key={action.label}
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))] font-medium"
              aria-hidden="true"
            >
              {action.icon}
              <span>{action.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Truncation info */}
      <div className="px-4 pb-3">
        <p className="text-xs text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))] flex items-center gap-1.5">
          {previewMode === "mobile" ? (
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Monitor className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>
            {isTruncated
              ? `Hook truncated at ~${truncationLimit} chars on ${previewMode}. Users must tap "see more" to read the rest.`
              : `Full post visible on ${previewMode} (${fullText.length} chars).`}
          </span>
        </p>
      </div>
    </div>
  );
}
