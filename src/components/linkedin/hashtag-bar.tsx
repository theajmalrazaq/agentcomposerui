"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface HashtagBarProps {
  maxTags?: number;
  className?: string;
  placeholder?: string;
}

export function HashtagBar({
  maxTags = 10,
  className,
  placeholder = "Add hashtag (press Enter)...",
}: HashtagBarProps) {
  const { data, isEditable, onFieldChange } = useLinkedInComposer();
  const [newTag, setNewTag] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);

  const hashtags = data.hashtags || [];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = newTag.trim();
      if (!trimmed) return;
      const formatted = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;

      if (!hashtags.includes(formatted) && hashtags.length < maxTags) {
        onFieldChange("hashtags", [...hashtags, formatted]);
      }
      setNewTag("");
      setIsInputOpen(false);
    } else if (e.key === "Escape") {
      setIsInputOpen(false);
      setNewTag("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    if (!isEditable) return;
    const updated = hashtags.filter((_, i) => i !== indexToRemove);
    onFieldChange("hashtags", updated);
  };

  if (!isEditable && hashtags.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 px-4 py-2 border-t border-zinc-200 dark:border-zinc-800",
        className,
      )}
      role="region"
      aria-label="Hashtags"
    >
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-1">Tags:</span>

      {hashtags.map((tag, idx) => (
        <span
          key={`${tag}-${idx}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          <span>{tag.startsWith("#") ? tag : `#${tag}`}</span>
          {isEditable && (
            <button
              type="button"
              onClick={() => handleRemoveTag(idx)}
              className="text-zinc-400 hover:text-red-500 focus:outline-none ml-0.5 rounded cursor-pointer"
              aria-label={`Remove hashtag ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </span>
      ))}

      {isEditable &&
        hashtags.length < maxTags &&
        (isInputOpen ? (
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            onBlur={() => {
              if (!newTag.trim()) setIsInputOpen(false);
            }}
            placeholder={placeholder}
            autoFocus
            className="text-xs px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 outline-none w-36"
            aria-label="New hashtag input"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsInputOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-1.5 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer"
            aria-label="Add hashtag"
          >
            <Plus className="w-3 h-3" />
            <span>Add tag</span>
          </button>
        ))}
    </div>
  );
}
