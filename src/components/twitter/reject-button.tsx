"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useTwitterComposer } from "./context";
import { cn } from "../../lib/utils";

export interface RejectButtonProps {
  label?: string;
  feedbackPlaceholder?: string;
  className?: string;
}

export function RejectButton({
  label = "Request Changes",
  feedbackPlaceholder = "What should the AI revise in this thread?",
  className,
}: RejectButtonProps) {
  const {
    status,
    isLoading,
    feedbackPromptOpen,
    onReject,
    onOpenFeedbackPrompt,
    onCloseFeedbackPrompt,
  } = useTwitterComposer();
  const [feedback, setFeedback] = useState("");

  const isDisabled = status !== "reviewing" || isLoading;

  const handleSubmit = () => {
    if (feedback.trim()) {
      onReject(feedback.trim());
      setFeedback("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      onCloseFeedbackPrompt();
    }
  };

  if (feedbackPromptOpen) {
    return (
      <div className={cn("flex items-center gap-2 flex-1", className)}>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={feedbackPlaceholder}
          autoFocus
          aria-label="Feedback for thread revision"
          className="flex-1 px-3 py-1.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300"
        />
        <button
          onClick={handleSubmit}
          disabled={!feedback.trim()}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-opacity cursor-pointer"
        >
          Send
        </button>
        <button
          onClick={onCloseFeedbackPrompt}
          className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          aria-label="Cancel feedback"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onOpenFeedbackPrompt}
      disabled={isDisabled}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 cursor-pointer",
        className,
      )}
      aria-label={label}
    >
      {label}
    </button>
  );
}
