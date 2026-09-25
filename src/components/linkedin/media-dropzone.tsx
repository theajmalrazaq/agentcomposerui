"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface MediaDropzoneProps {
  maxItems?: number;
  className?: string;
}

export function MediaDropzone({ maxItems = 9, className }: MediaDropzoneProps) {
  const { data, isEditable, onFieldChange } = useLinkedInComposer();
  const [urlInput, setUrlInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const mediaUrls = data.mediaUrls || [];

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    try {
      new URL(trimmed); // validate URL format
      if (!mediaUrls.includes(trimmed) && mediaUrls.length < maxItems) {
        onFieldChange("mediaUrls", [...mediaUrls, trimmed]);
      }
      setUrlInput("");
      setIsAdding(false);
    } catch {
      // Invalid URL - simple feedback
    }
  };

  const handleRemoveMedia = (index: number) => {
    if (!isEditable) return;
    const updated = mediaUrls.filter((_, i) => i !== index);
    onFieldChange("mediaUrls", updated);
  };

  if (!isEditable && mediaUrls.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("px-4 py-3 border-t border-zinc-200 dark:border-zinc-800", className)}
      role="region"
      aria-label="Attached media"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Media Attachments ({mediaUrls.length}/{maxItems})
        </span>
        {isEditable && mediaUrls.length < maxItems && !isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            aria-label="Add media URL"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add URL</span>
          </button>
        )}
      </div>

      {/* Add URL form */}
      {isAdding && (
        <form onSubmit={handleAddUrl} className="flex items-center gap-2 mb-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            autoFocus
            className="flex-1 text-xs px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            aria-label="Media URL"
          />
          <button
            type="submit"
            className="text-xs font-medium px-2.5 py-1.5 rounded bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAdding(false);
              setUrlInput("");
            }}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-1 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Media grid */}
      {mediaUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mediaUrls.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative group rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-video flex items-center justify-center"
            >
              <img
                src={url}
                alt={`Attachment ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for broken/non-image URLs
                  (e.currentTarget as HTMLElement).style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector(".url-fallback")) {
                    const fallback = document.createElement("span");
                    fallback.className =
                      "url-fallback text-[10px] p-2 text-center break-all text-zinc-500";
                    fallback.textContent = url;
                    parent.appendChild(fallback);
                  }
                }}
              />
              {isEditable && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-black text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 cursor-pointer"
                  aria-label={`Remove media item ${i + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
