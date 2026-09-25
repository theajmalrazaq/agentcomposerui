"use client";

import { createContext, useContext } from "react";
import type { ComposerStatus, ComposerStage } from "../../types";
import type { TwitterThreadData } from "../../schemas/twitter";

export interface TwitterComposerContextValue {
  data: TwitterThreadData;
  status: ComposerStatus;
  stages: ComposerStage[];
  isEditable: boolean;
  isLoading: boolean;
  activeTweetIndex: number;
  setActiveTweetIndex: (index: number) => void;
  feedbackPromptOpen: boolean;
  previewMode: "desktop" | "mobile";
  onDataChange: (data: TwitterThreadData) => void;
  onTweetChange: (index: number, text: string) => void;
  onAddTweet: (afterIndex?: number) => void;
  onRemoveTweet: (index: number) => void;
  onSplitTweetBySentence: (index: number) => void;
  onReorderTweet: (fromIndex: number, toIndex: number) => void;
  onApprove: () => void | Promise<void>;
  onReject: (feedback: string) => void | Promise<void>;
  onOpenFeedbackPrompt: () => void;
  onCloseFeedbackPrompt: () => void;
  onTogglePreviewMode: () => void;
}

export const TwitterComposerContext = createContext<TwitterComposerContextValue | null>(null);

export function useTwitterComposer(): TwitterComposerContextValue {
  const ctx = useContext(TwitterComposerContext);
  if (!ctx) {
    throw new Error(
      "useTwitterComposer must be used within a <TwitterThreadComposer.Root> component.",
    );
  }
  return ctx;
}
