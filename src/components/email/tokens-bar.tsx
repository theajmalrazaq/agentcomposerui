"use client";

import React from "react";
import { Plus, Tag } from "lucide-react";
import { useEmailComposer } from "./context";
import { cn } from "../../lib/utils";

export interface TokensBarProps {
  className?: string;
  defaultTokens?: string[];
}

export function TokensBar({
  className,
  defaultTokens = ["firstName", "company", "role", "city"],
}: TokensBarProps) {
  const { data, isEditable, onInsertToken } = useEmailComposer();

  // Combine tokens defined in data with defaults
  const availableTokens = React.useMemo(() => {
    const fromData = data.tokens ? Object.keys(data.tokens) : [];
    return Array.from(new Set([...fromData, ...defaultTokens]));
  }, [data.tokens, defaultTokens]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-zinc-500 font-medium mr-1 shrink-0">
        <Tag className="w-3.5 h-3.5" />
        <span>Insert Tokens:</span>
      </div>

      {availableTokens.map((token) => (
        <button
          key={token}
          type="button"
          disabled={!isEditable}
          onClick={() => onInsertToken(token)}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          title={`Click to insert {{${token}}} into body`}
        >
          <Plus className="w-3 h-3 text-zinc-400" />
          <span>{`{{${token}}}`}</span>
        </button>
      ))}
    </div>
  );
}
