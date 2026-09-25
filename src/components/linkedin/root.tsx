"use client";

import React, { useCallback, useMemo, useState } from "react";
import { LinkedInComposerContext } from "./context";
import type { LinkedInPostData } from "../../schemas/linkedin";
import type { ComposerStatus, ComposerStage } from "../../types";
import { cn } from "../../lib/utils";

export interface LinkedInComposerRootProps {
  data: LinkedInPostData;
  status: ComposerStatus;
  stages?: ComposerStage[];
  onApprove?: (data: LinkedInPostData) => void | Promise<void>;
  onReject?: (feedback: string) => void | Promise<void>;
  onChange?: (data: LinkedInPostData) => void;
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
}: LinkedInComposerRootProps) {
  const [internalData, setInternalData] = useState<LinkedInPostData>(data);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackPromptOpen, setFeedbackPromptOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  // Sync external data changes
  React.useEffect(() => {
    setInternalData(data);
  }, [data]);

  const isEditable = status === "reviewing";

  const handleDataChange = useCallback(
    (newData: LinkedInPostData) => {
      setInternalData(newData);
      onChange?.(newData);
    },
    [onChange],
  );

  const handleFieldChange = useCallback(
    (field: keyof LinkedInPostData, value: unknown) => {
      const updated = { ...internalData, [field]: value };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

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
      feedbackPromptOpen,
      previewMode,
      onDataChange: handleDataChange,
      onFieldChange: handleFieldChange,
      onApprove: handleApprove,
      onReject: handleReject,
      onOpenFeedbackPrompt: () => setFeedbackPromptOpen(true),
      onCloseFeedbackPrompt: () => setFeedbackPromptOpen(false),
      onTogglePreviewMode: () => setPreviewMode((m) => (m === "desktop" ? "mobile" : "desktop")),
    }),
    [
      internalData,
      status,
      stages,
      isEditable,
      isLoading,
      feedbackPromptOpen,
      previewMode,
      handleDataChange,
      handleFieldChange,
      handleApprove,
      handleReject,
    ],
  );

  return (
    <LinkedInComposerContext.Provider value={contextValue}>
      <div
        className={cn(
          "rounded-[var(--acu-radius,0.75rem)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm overflow-hidden",
          className,
        )}
        role="region"
        aria-label="LinkedIn post composer"
      >
        {children}
      </div>
    </LinkedInComposerContext.Provider>
  );
}
