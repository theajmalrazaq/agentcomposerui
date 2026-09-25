"use client";

import React, { useCallback, useMemo, useState } from "react";
import { GitHubPRComposerContext } from "./context";
import type { GitHubPRData } from "../../schemas/github";
import type { ComposerStatus, ComposerStage } from "../../types";
import { cn } from "../../lib/utils";

const CONVENTIONAL_REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9_-]+\))?:\s*(.+)$/i;

export interface GitHubPRComposerRootProps {
  data: GitHubPRData;
  status: ComposerStatus;
  stages?: ComposerStage[];
  onApprove?: (data: GitHubPRData) => void | Promise<void>;
  onReject?: (feedback: string) => void | Promise<void>;
  onChange?: (data: GitHubPRData) => void;
  className?: string;
  children: React.ReactNode;
}

export function Root({
  data,
  status,
  stages = [],
  onApprove,
  onReject,
  onChange,
  className,
  children,
}: GitHubPRComposerRootProps) {
  const [internalData, setInternalData] = useState<GitHubPRData>(data);
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "diff">("write");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackPromptOpen, setFeedbackPromptOpen] = useState(false);

  React.useEffect(() => {
    setInternalData(data);
  }, [data]);

  const isEditable = status === "reviewing";

  const handleDataChange = useCallback(
    (newData: GitHubPRData) => {
      setInternalData(newData);
      onChange?.(newData);
    },
    [onChange],
  );

  const handleFieldChange = useCallback(
    (field: keyof GitHubPRData, value: unknown) => {
      const updated = { ...internalData, [field]: value };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleToggleChecklistItem = useCallback(
    (index: number) => {
      if (!internalData.checklist) return;
      const updatedChecklist = [...internalData.checklist];
      if (updatedChecklist[index]) {
        updatedChecklist[index] = {
          ...updatedChecklist[index],
          completed: !updatedChecklist[index].completed,
        };
        const updated = { ...internalData, checklist: updatedChecklist };
        setInternalData(updated);
        onChange?.(updated);
      }
    },
    [internalData, onChange],
  );

  const handleAddReviewer = useCallback(
    (username: string) => {
      const trimmed = username.trim().replace(/^@/, "");
      if (!trimmed) return;
      const current = internalData.reviewers || [];
      if (!current.includes(trimmed)) {
        const updated = { ...internalData, reviewers: [...current, trimmed] };
        setInternalData(updated);
        onChange?.(updated);
      }
    },
    [internalData, onChange],
  );

  const handleRemoveReviewer = useCallback(
    (username: string) => {
      const current = internalData.reviewers || [];
      const updated = {
        ...internalData,
        reviewers: current.filter((r) => r !== username),
      };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleAddLabel = useCallback(
    (label: string) => {
      const trimmed = label.trim();
      if (!trimmed) return;
      const current = internalData.labels || [];
      if (!current.includes(trimmed)) {
        const updated = { ...internalData, labels: [...current, trimmed] };
        setInternalData(updated);
        onChange?.(updated);
      }
    },
    [internalData, onChange],
  );

  const handleRemoveLabel = useCallback(
    (label: string) => {
      const current = internalData.labels || [];
      const updated = {
        ...internalData,
        labels: current.filter((l) => l !== label),
      };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  // Conventional commit detector
  const conventionalCommit = useMemo(() => {
    const match = (internalData.title || "").match(CONVENTIONAL_REGEX);
    if (match) {
      return {
        isConventional: true,
        type: match[1].toLowerCase(),
      };
    }
    return { isConventional: false, type: null };
  }, [internalData.title]);

  const handleApprove = useCallback(async () => {
    setIsLoading(true);
    try {
      await onApprove?.(internalData);
    } finally {
      setIsLoading(false);
    }
  }, [internalData, onApprove]);

  const handleReject = useCallback(
    async (feedback: string) => {
      setIsLoading(true);
      setFeedbackPromptOpen(false);
      try {
        await onReject?.(feedback);
      } finally {
        setIsLoading(false);
      }
    },
    [onReject],
  );

  const contextValue = useMemo(
    () => ({
      data: internalData,
      status,
      stages,
      isEditable,
      isLoading,
      activeTab,
      feedbackPromptOpen,
      conventionalCommit,
      onDataChange: handleDataChange,
      onFieldChange: handleFieldChange,
      onToggleChecklistItem: handleToggleChecklistItem,
      onAddReviewer: handleAddReviewer,
      onRemoveReviewer: handleRemoveReviewer,
      onAddLabel: handleAddLabel,
      onRemoveLabel: handleRemoveLabel,
      setActiveTab,
      onApprove: handleApprove,
      onReject: handleReject,
      onOpenFeedbackPrompt: () => setFeedbackPromptOpen(true),
      onCloseFeedbackPrompt: () => setFeedbackPromptOpen(false),
    }),
    [
      internalData,
      status,
      stages,
      isEditable,
      isLoading,
      activeTab,
      feedbackPromptOpen,
      conventionalCommit,
      handleDataChange,
      handleFieldChange,
      handleToggleChecklistItem,
      handleAddReviewer,
      handleRemoveReviewer,
      handleAddLabel,
      handleRemoveLabel,
      handleApprove,
      handleReject,
    ],
  );

  return (
    <GitHubPRComposerContext.Provider value={contextValue}>
      <div
        className={cn(
          "rounded-[var(--acu-radius,0.75rem)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm overflow-hidden",
          className,
        )}
        role="region"
        aria-label="GitHub pull request composer"
      >
        {children}
      </div>
    </GitHubPRComposerContext.Provider>
  );
}
