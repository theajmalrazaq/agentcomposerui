"use client";

import { createContext, useContext } from "react";
import type { ComposerStatus, ComposerStage } from "../../types";
import type { LinkedInPostData } from "../../schemas/linkedin";

export interface LinkedInComposerContextValue {
  data: LinkedInPostData;
  status: ComposerStatus;
  stages: ComposerStage[];
  isEditable: boolean;
  isLoading: boolean;
  feedbackPromptOpen: boolean;
  previewMode: "desktop" | "mobile";
  onDataChange: (data: LinkedInPostData) => void;
  onFieldChange: (field: keyof LinkedInPostData, value: unknown) => void;
  onApprove: () => void | Promise<void>;
  onReject: (feedback: string) => void | Promise<void>;
  onOpenFeedbackPrompt: () => void;
  onCloseFeedbackPrompt: () => void;
  onTogglePreviewMode: () => void;
}

export const LinkedInComposerContext = createContext<LinkedInComposerContextValue | null>(null);

export function useLinkedInComposer(): LinkedInComposerContextValue {
  const ctx = useContext(LinkedInComposerContext);
  if (!ctx) {
    throw new Error("useLinkedInComposer must be used within a <LinkedInComposer.Root> component.");
  }
  return ctx;
}
