"use client";

import { createContext, useContext } from "react";
import type { ComposerStatus, ComposerStage } from "../../types";
import type { GitHubPRData } from "../../schemas/github";

export interface GitHubPRComposerContextValue {
  data: GitHubPRData;
  status: ComposerStatus;
  stages: ComposerStage[];
  isEditable: boolean;
  isLoading: boolean;
  activeTab: "write" | "preview" | "diff";
  feedbackPromptOpen: boolean;
  conventionalCommit: {
    type: string | null;
    isConventional: boolean;
  };
  onDataChange: (data: GitHubPRData) => void;
  onFieldChange: (field: keyof GitHubPRData, value: unknown) => void;
  onToggleChecklistItem: (index: number) => void;
  onAddReviewer: (username: string) => void;
  onRemoveReviewer: (username: string) => void;
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
  setActiveTab: (tab: "write" | "preview" | "diff") => void;
  onApprove: () => void | Promise<void>;
  onReject: (feedback: string) => void | Promise<void>;
  onOpenFeedbackPrompt: () => void;
  onCloseFeedbackPrompt: () => void;
}

export const GitHubPRComposerContext = createContext<GitHubPRComposerContextValue | null>(null);

export function useGitHubPRComposer(): GitHubPRComposerContextValue {
  const ctx = useContext(GitHubPRComposerContext);
  if (!ctx) {
    throw new Error("useGitHubPRComposer must be used within a <GitHubPRComposer.Root> component.");
  }
  return ctx;
}
