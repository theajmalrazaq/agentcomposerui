"use client";

import React from "react";
import { useLinkedInComposer } from "./context";
import { cn } from "../../lib/utils";

export interface EditorProps {
  placeholder?: string;
  className?: string;
}

export function Editor({
  placeholder = "Your post content will appear here...",
  className,
}: EditorProps) {
  const { data, status, isEditable, onFieldChange } = useLinkedInComposer();

  const fullContent = [data.hook, data.body, data.callToAction].filter(Boolean).join("\n\n");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Split back into hook/body — first paragraph is hook, rest is body
    const parts = value.split("\n\n");
    const hook = parts[0] || "";
    const body = parts.slice(1).join("\n\n");
    onFieldChange("hook", hook);
    onFieldChange("body", body);
  };

  return (
    <div className={cn("px-4 py-2", className)}>
      <textarea
        value={fullContent}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={!isEditable}
        aria-label="Post content editor"
        className={cn(
          "w-full min-h-[160px] resize-none bg-transparent text-sm leading-relaxed text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none border-none",
          status === "streaming" && "animate-pulse",
          !isEditable && "cursor-default",
        )}
        rows={8}
      />

      {/* Hashtags */}
      {data.hashtags && data.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2" role="list" aria-label="Hashtags">
          {data.hashtags.map((tag, i) => (
            <span
              key={i}
              role="listitem"
              className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline cursor-default"
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
