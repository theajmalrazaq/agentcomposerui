"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TwitterAuthorProps {
  name: string;
  handle: string;
  avatar?: string;
  verified?: boolean;
  className?: string;
}

export function Author({ name, handle, avatar, verified = true, className }: TwitterAuthorProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formattedHandle = handle.startsWith("@") ? handle : `@${handle}`;

  return (
    <div className={cn("flex items-center gap-2.5 flex-1 min-w-0", className)}>
      {avatar ? (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold border border-zinc-200 dark:border-zinc-800"
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{name}</p>
          {verified && (
            <span
              className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0"
              title="Verified"
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate font-mono">
          {formattedHandle}
        </p>
      </div>
    </div>
  );
}
