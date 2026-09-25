"use client";

import React from "react";
import { useTwitterComposer } from "./context";
import { cn } from "../../lib/utils";

export interface ApproveButtonProps {
  label?: string;
  loadingLabel?: string;
  className?: string;
}

export function ApproveButton({
  label = "Publish Thread",
  loadingLabel = "Publishing Thread...",
  className,
}: ApproveButtonProps) {
  const { status, isLoading, onApprove } = useTwitterComposer();

  const isDisabled = (status !== "reviewing" && status !== "approved") || isLoading;

  return (
    <button
      onClick={() => onApprove()}
      disabled={isDisabled}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:ring-offset-2 cursor-pointer",
        className,
      )}
      aria-label={isLoading ? loadingLabel : label}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path
              d="M12 2a10 10 0 019.95 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
