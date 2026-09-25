"use client";

import React from "react";
import { Globe } from "lucide-react";
import { cn } from "../../lib/utils";

export interface AuthorProps {
  name: string;
  title?: string;
  avatar?: string;
  className?: string;
}

export function Author({ name, title, avatar, className }: AuthorProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("flex items-center gap-3 flex-1 min-w-0", className)}>
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-semibold border border-zinc-200 dark:border-zinc-800"
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      {/* Name & Title */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[hsl(var(--acu-foreground,240_10%_3.9%))] truncate">
          {name}
        </p>
        {title && (
          <p className="text-xs text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))] truncate">
            {title}
          </p>
        )}
        <p className="text-xs text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))] flex items-center gap-1">
          <span>Now</span>
          <span>·</span>
          <Globe
            className="w-3 h-3 text-[hsl(var(--acu-muted-foreground,240_3.8%_46.1%))]"
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  );
}
