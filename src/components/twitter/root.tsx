"use client";

import React, { useCallback, useMemo, useState } from "react";
import { TwitterComposerContext } from "./context";
import type { TwitterThreadData } from "../../schemas/twitter";
import type { ComposerStatus, ComposerStage } from "../../types";
import { cn } from "../../lib/utils";

export interface TwitterComposerRootProps {
  data: TwitterThreadData;
  status: ComposerStatus;
  stages?: ComposerStage[];
  onApprove?: (data: TwitterThreadData) => void | Promise<void>;
  onReject?: (feedback: string) => void | Promise<void>;
  onChange?: (data: TwitterThreadData) => void;
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
}: TwitterComposerRootProps) {
  const [internalData, setInternalData] = useState<TwitterThreadData>(data);
  const [activeTweetIndex, setActiveTweetIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackPromptOpen, setFeedbackPromptOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  React.useEffect(() => {
    setInternalData(data);
  }, [data]);

  const isEditable = status === "reviewing";

  const handleDataChange = useCallback(
    (newData: TwitterThreadData) => {
      setInternalData(newData);
      onChange?.(newData);
    },
    [onChange],
  );

  const handleTweetChange = useCallback(
    (index: number, text: string) => {
      const updatedTweets = [...internalData.tweets];
      if (updatedTweets[index]) {
        updatedTweets[index] = { ...updatedTweets[index], text };
        const updated = { ...internalData, tweets: updatedTweets };
        setInternalData(updated);
        onChange?.(updated);
      }
    },
    [internalData, onChange],
  );

  const handleAddTweet = useCallback(
    (afterIndex?: number) => {
      const insertAt = afterIndex !== undefined ? afterIndex + 1 : internalData.tweets.length;
      const newTweets = [...internalData.tweets];
      newTweets.splice(insertAt, 0, {
        id: String(Date.now()),
        text: "",
      });
      const updated = { ...internalData, tweets: newTweets };
      setInternalData(updated);
      setActiveTweetIndex(insertAt);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleRemoveTweet = useCallback(
    (index: number) => {
      if (internalData.tweets.length <= 1) return; // Must keep at least 1 tweet
      const newTweets = internalData.tweets.filter((_, i) => i !== index);
      const updated = { ...internalData, tweets: newTweets };
      setInternalData(updated);
      setActiveTweetIndex(Math.max(0, index - 1));
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleSplitTweetBySentence = useCallback(
    (index: number) => {
      const tweet = internalData.tweets[index];
      if (!tweet || !tweet.text) return;

      // Split by sentence terminators (. ! ?)
      const sentences = tweet.text
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (sentences.length <= 1) return;

      const newTweets = [...internalData.tweets];
      const replacementTweets = sentences.map((s, idx) => ({
        id: `${Date.now()}-${idx}`,
        text: s,
      }));

      newTweets.splice(index, 1, ...replacementTweets);
      const updated = { ...internalData, tweets: newTweets };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleReorderTweet = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= internalData.tweets.length ||
        toIndex >= internalData.tweets.length
      ) {
        return;
      }
      const newTweets = [...internalData.tweets];
      const [moved] = newTweets.splice(fromIndex, 1);
      newTweets.splice(toIndex, 0, moved);
      const updated = { ...internalData, tweets: newTweets };
      setInternalData(updated);
      setActiveTweetIndex(toIndex);
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
      activeTweetIndex,
      setActiveTweetIndex,
      feedbackPromptOpen,
      previewMode,
      onDataChange: handleDataChange,
      onTweetChange: handleTweetChange,
      onAddTweet: handleAddTweet,
      onRemoveTweet: handleRemoveTweet,
      onSplitTweetBySentence: handleSplitTweetBySentence,
      onReorderTweet: handleReorderTweet,
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
      activeTweetIndex,
      feedbackPromptOpen,
      previewMode,
      handleDataChange,
      handleTweetChange,
      handleAddTweet,
      handleRemoveTweet,
      handleSplitTweetBySentence,
      handleReorderTweet,
      handleApprove,
      handleReject,
    ],
  );

  return (
    <TwitterComposerContext.Provider value={contextValue}>
      <div
        className={cn(
          "rounded-[var(--acu-radius,0.75rem)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm overflow-hidden",
          className,
        )}
        role="region"
        aria-label="Twitter thread composer"
      >
        {children}
      </div>
    </TwitterComposerContext.Provider>
  );
}
