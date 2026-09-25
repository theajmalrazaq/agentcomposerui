"use client";

import React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Split, Sparkles } from "lucide-react";
import { useTwitterComposer } from "./context";
import { CountdownRing } from "./countdown-ring";
import { cn } from "../../lib/utils";

export interface EditorProps {
  className?: string;
  placeholder?: string;
}

export function Editor({
  className,
  placeholder = "What's happening in this tweet?",
}: EditorProps) {
  const {
    data,
    status,
    isEditable,
    onTweetChange,
    onAddTweet,
    onRemoveTweet,
    onSplitTweetBySentence,
    onReorderTweet,
    activeTweetIndex,
    setActiveTweetIndex,
  } = useTwitterComposer();

  const isStreaming = status === "streaming";

  return (
    <div className={cn("p-4 space-y-4", className)}>
      {isStreaming && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs animate-pulse">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Agent is drafting tweet thread chunks...</span>
        </div>
      )}

      {/* Sequential Tweet Cards with Connecting Line */}
      <div className="space-y-3 relative">
        {data.tweets.map((tweet, idx) => {
          const charCount = tweet.text.length;
          const isFirst = idx === 0;
          const isLast = idx === data.tweets.length - 1;

          return (
            <div
              key={tweet.id || idx}
              onClick={() => setActiveTweetIndex(idx)}
              className={cn(
                "group relative rounded-xl border p-3.5 transition-all bg-white dark:bg-zinc-900/60 shadow-2xs",
                activeTweetIndex === idx
                  ? "border-blue-500/60 ring-2 ring-blue-500/10"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
              )}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {idx + 1}/{data.tweets.length}
                  </span>
                  {isFirst && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Thread Hook
                    </span>
                  )}
                </div>

                {/* Card Controls */}
                {isEditable && (
                  <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {/* Split by sentence button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSplitTweetBySentence(idx);
                      }}
                      title="Split this tweet into multiple by sentences"
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Split className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderTweet(idx, idx - 1);
                      }}
                      title="Move tweet up"
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderTweet(idx, idx + 1);
                      }}
                      title="Move tweet down"
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Tweet */}
                    {data.tweets.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveTweet(idx);
                        }}
                        title="Delete tweet"
                        className="p-1 rounded-md text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Textarea */}
              <textarea
                value={tweet.text}
                disabled={!isEditable}
                onChange={(e) => onTweetChange(idx, e.target.value)}
                placeholder={placeholder}
                rows={3}
                className={cn(
                  "w-full resize-y text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden",
                  !isEditable && "cursor-not-allowed opacity-90",
                )}
                aria-label={`Tweet ${idx + 1}`}
              />

              {/* Card Footer: Progress ring & add tweet button */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
                <div className="flex items-center gap-2">
                  {isEditable && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddTweet(idx);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add tweet below</span>
                    </button>
                  )}
                </div>

                <CountdownRing current={charCount} max={280} showCount />
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Add Tweet button */}
      {isEditable && (
        <button
          type="button"
          onClick={() => onAddTweet()}
          className="w-full py-2.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Another Tweet to Thread</span>
        </button>
      )}
    </div>
  );
}
