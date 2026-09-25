import React, { useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import type { SiteView } from "../types";

interface AnnouncementBannerProps {
  onExplore: (view: SiteView) => void;
}

export function AnnouncementBanner({ onExplore }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative isolate flex items-center justify-between gap-x-4 overflow-hidden bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-xs border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-x-3 mx-auto">
        <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
          <Sparkles className="w-3 h-3" />
          <span>v0.1.3 Released</span>
        </span>
        <span className="text-zinc-700 dark:text-zinc-300 hidden sm:inline">
          AgentComposerUI: Drop-in Human-in-the-Loop composers for AI agents with OpenAI, Claude &
          Gemini.
        </span>
        <button
          onClick={() => onExplore("components")}
          className="inline-flex items-center gap-1 font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-2 transition-colors cursor-pointer"
        >
          <span>Explore Live Components</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
