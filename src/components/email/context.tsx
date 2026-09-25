"use client";

import { createContext, useContext } from "react";
import type { ComposerStatus, ComposerStage } from "../../types";
import type { EmailDraftData } from "../../schemas/email";

export interface EmailComposerContextValue {
  data: EmailDraftData;
  status: ComposerStatus;
  stages: ComposerStage[];
  isEditable: boolean;
  isLoading: boolean;
  previewMode: "inbox" | "split";
  feedbackPromptOpen: boolean;
  spamWordsDetected: string[];
  subjectImpact: {
    score: number;
    rating: "Excellent" | "Good" | "Needs Punch";
    tips: string[];
  };
  onDataChange: (data: EmailDraftData) => void;
  onFieldChange: (field: keyof EmailDraftData, value: unknown) => void;
  onInsertToken: (tokenKey: string) => void;
  onApprove: () => void | Promise<void>;
  onReject: (feedback: string) => void | Promise<void>;
  onOpenFeedbackPrompt: () => void;
  onCloseFeedbackPrompt: () => void;
  onTogglePreviewMode: () => void;
}

export const EmailComposerContext = createContext<EmailComposerContextValue | null>(null);

export function useEmailComposer(): EmailComposerContextValue {
  const ctx = useContext(EmailComposerContext);
  if (!ctx) {
    throw new Error(
      "useEmailComposer must be used within an <EmailOutreachComposer.Root> component.",
    );
  }
  return ctx;
}
