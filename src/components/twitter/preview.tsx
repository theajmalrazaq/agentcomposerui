"use client";

import React from "react";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  Monitor,
  Smartphone,
  Eye,
} from "lucide-react";
import { useTwitterComposer } from "./context";
import { cn } from "../../lib/utils";

export interface PreviewProps {
  className?: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
}

export function Preview({
  className,
  authorName = "AI Creator",
  authorHandle = "aicreator",
  authorAvatar,
}: PreviewProps) {
  const { data, previewMode, onTogglePreviewMode } = useTwitterComposer();

  const formattedHandle = authorHandle.startsWith("@") ? authorHandle : `@${authorHandle}`;
  const isMobile = previewMode === "mobile";

  return (
    <div
      className={cn(
        "border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-950/40",
        className,
      )}
    >
      {/* Header bar with Desktop/Mobile toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span>Live Thread Feed Preview</span>
        </div>

        <button
          type="button"
          onClick={onTogglePreviewMode}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
        >
          {isMobile ? (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Feed Container */}
      <div className="flex justify-center">
        <div
          className={cn(
            "w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-all overflow-hidden shadow-xs",
            isMobile ? "max-w-sm" : "max-w-xl",
          )}
        >
          {data.tweets.map((tweet, idx) => {
            const isLast = idx === data.tweets.length - 1;

            return (
              <div
                key={tweet.id || idx}
                className={cn(
                  "p-4 flex gap-3 relative",
                  !isLast && "border-b border-zinc-100 dark:border-zinc-900",
                )}
              >
                {/* Left Column: Avatar + Vertical Thread Spine Line */}
                <div className="flex flex-col items-center shrink-0">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold flex items-center justify-center">
                      {authorName.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-zinc-200 dark:bg-zinc-800 my-1 rounded-full min-h-[30px]" />
                  )}
                </div>

                {/* Right Column: Tweet Content */}
                <div className="flex-1 min-w-0">
                  {/* Tweet Author Metadata */}
                  <div className="flex items-center gap-1.5 text-xs leading-none mb-1">
                    <span className="font-bold text-zinc-900 dark:text-white truncate">
                      {authorName}
                    </span>
                    <span className="text-zinc-500 font-mono truncate">{formattedHandle}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-400 font-mono">1m</span>
                    <span className="ml-auto font-mono text-[10px] text-zinc-400">
                      {idx + 1}/{data.tweets.length}
                    </span>
                  </div>

                  {/* Tweet Text */}
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed break-words">
                    {tweet.text || (
                      <span className="text-zinc-400 italic">Empty tweet draft...</span>
                    )}
                  </p>

                  {/* Hashtags (if first or last tweet) */}
                  {isLast && data.hashtags && data.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {data.hashtags.map((h, hIdx) => (
                        <span key={hIdx} className="text-xs text-blue-500 hover:underline">
                          {h.startsWith("#") ? h : `#${h}`}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social Interactions Bar */}
                  <div className="flex items-center justify-between mt-3 text-zinc-400 dark:text-zinc-500 text-xs max-w-sm">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>12</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
                    >
                      <Repeat2 className="w-3.5 h-3.5" />
                      <span>34</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>189</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                      <Share className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
