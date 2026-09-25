"use client";

import React, { useState } from "react";
import { Users, Tag, Plus, X } from "lucide-react";
import { useGitHubPRComposer } from "./context";
import { cn } from "../../lib/utils";

export interface MetaSidebarProps {
  className?: string;
}

export function MetaSidebar({ className }: MetaSidebarProps) {
  const { data, isEditable, onAddReviewer, onRemoveReviewer, onAddLabel, onRemoveLabel } =
    useGitHubPRComposer();

  const [newReviewer, setNewReviewer] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [showAddReviewer, setShowAddReviewer] = useState(false);
  const [showAddLabel, setShowAddLabel] = useState(false);

  const handleReviewerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewer.trim()) {
      onAddReviewer(newReviewer.trim());
      setNewReviewer("");
      setShowAddReviewer(false);
    }
  };

  const handleLabelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabel.trim()) {
      onAddLabel(newLabel.trim());
      setNewLabel("");
      setShowAddLabel(false);
    }
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs", className)}>
      {/* Reviewers Section */}
      <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>Reviewers:</span>
          </div>
          {isEditable && !showAddReviewer && (
            <button
              type="button"
              onClick={() => setShowAddReviewer(true)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(data.reviewers || []).map((reviewer) => (
            <span
              key={reviewer}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
            >
              <span>@{reviewer}</span>
              {isEditable && (
                <button
                  type="button"
                  onClick={() => onRemoveReviewer(reviewer)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {(!data.reviewers || data.reviewers.length === 0) && !showAddReviewer && (
            <span className="text-zinc-400 italic">No reviewers assigned</span>
          )}
        </div>

        {showAddReviewer && (
          <form onSubmit={handleReviewerSubmit} className="mt-2 flex items-center gap-1.5">
            <input
              type="text"
              value={newReviewer}
              onChange={(e) => setNewReviewer(e.target.value)}
              placeholder="Username"
              autoFocus
              className="flex-1 px-2 py-1 text-xs rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-2 py-1 text-[11px] rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              Add
            </button>
          </form>
        )}
      </div>

      {/* Labels Section */}
      <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
            <Tag className="w-3.5 h-3.5 text-zinc-500" />
            <span>Labels:</span>
          </div>
          {isEditable && !showAddLabel && (
            <button
              type="button"
              onClick={() => setShowAddLabel(true)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(data.labels || []).map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
            >
              <span>{label}</span>
              {isEditable && (
                <button
                  type="button"
                  onClick={() => onRemoveLabel(label)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {(!data.labels || data.labels.length === 0) && !showAddLabel && (
            <span className="text-zinc-400 italic">No labels attached</span>
          )}
        </div>

        {showAddLabel && (
          <form onSubmit={handleLabelSubmit} className="mt-2 flex items-center gap-1.5">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label name"
              autoFocus
              className="flex-1 px-2 py-1 text-xs rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-2 py-1 text-[11px] rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
