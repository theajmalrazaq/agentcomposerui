"use client";

import React, { useCallback, useMemo, useState } from "react";
import { EmailComposerContext } from "./context";
import type { EmailDraftData } from "../../schemas/email";
import type { ComposerStatus, ComposerStage } from "../../types";
import { cn } from "../../lib/utils";

const SPAM_TRIGGERS = [
  "free",
  "guarantee",
  "guaranteed",
  "100%",
  "act now",
  "urgent",
  "risk-free",
  "winner",
  "cash",
  "credit",
  "no catch",
  "buy now",
  "order now",
  "double your",
  "make money",
];

export interface EmailComposerRootProps {
  data: EmailDraftData;
  status: ComposerStatus;
  stages?: ComposerStage[];
  onApprove?: (data: EmailDraftData) => void | Promise<void>;
  onReject?: (feedback: string) => void | Promise<void>;
  onChange?: (data: EmailDraftData) => void;
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
}: EmailComposerRootProps) {
  const [internalData, setInternalData] = useState<EmailDraftData>(data);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackPromptOpen, setFeedbackPromptOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"inbox" | "split">("split");

  React.useEffect(() => {
    setInternalData(data);
  }, [data]);

  const isEditable = status === "reviewing";

  const handleDataChange = useCallback(
    (newData: EmailDraftData) => {
      setInternalData(newData);
      onChange?.(newData);
    },
    [onChange],
  );

  const handleFieldChange = useCallback(
    (field: keyof EmailDraftData, value: unknown) => {
      const updated = { ...internalData, [field]: value };
      setInternalData(updated);
      onChange?.(updated);
    },
    [internalData, onChange],
  );

  const handleInsertToken = useCallback(
    (tokenKey: string) => {
      const placeholder = `{{${tokenKey}}}`;
      const newBody = `${internalData.body} ${placeholder}`;
      handleFieldChange("body", newBody);
    },
    [internalData.body, handleFieldChange],
  );

  // Detect spam trigger words
  const spamWordsDetected = useMemo(() => {
    const combined = `${internalData.subject} ${internalData.body}`.toLowerCase();
    return SPAM_TRIGGERS.filter((trigger) => combined.includes(trigger));
  }, [internalData.subject, internalData.body]);

  // Subject line impact analyzer
  const subjectImpact = useMemo(() => {
    const subj = internalData.subject || "";
    let score = 50;
    const tips: string[] = [];

    // Length check
    if (subj.length >= 30 && subj.length <= 60) {
      score += 25;
    } else if (subj.length < 20) {
      tips.push("Subject might be too brief to explain value.");
      score -= 15;
    } else if (subj.length > 70) {
      tips.push("Subject risks truncation on mobile devices (over 60 chars).");
      score -= 15;
    }

    // Personalization check
    if (/\{\{\w+\}\}/.test(subj)) {
      score += 20;
    } else {
      tips.push("Add a {{token}} (e.g. {{company}} or {{firstName}}) to boost open rates.");
    }

    // Spam words check
    const subjSpam = SPAM_TRIGGERS.filter((t) => subj.toLowerCase().includes(t));
    if (subjSpam.length > 0) {
      score -= 25;
      tips.push(`Remove promotional trigger words: "${subjSpam.join(", ")}".`);
    }

    const clampedScore = Math.min(Math.max(score, 10), 100);
    const rating: "Excellent" | "Good" | "Needs Punch" =
      clampedScore >= 80 ? "Excellent" : clampedScore >= 50 ? "Good" : "Needs Punch";

    return { score: clampedScore, rating, tips };
  }, [internalData.subject]);

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
      previewMode,
      feedbackPromptOpen,
      spamWordsDetected,
      subjectImpact,
      onDataChange: handleDataChange,
      onFieldChange: handleFieldChange,
      onInsertToken: handleInsertToken,
      onApprove: handleApprove,
      onReject: handleReject,
      onOpenFeedbackPrompt: () => setFeedbackPromptOpen(true),
      onCloseFeedbackPrompt: () => setFeedbackPromptOpen(false),
      onTogglePreviewMode: () => setPreviewMode((m) => (m === "inbox" ? "split" : "inbox")),
    }),
    [
      internalData,
      status,
      stages,
      isEditable,
      isLoading,
      previewMode,
      feedbackPromptOpen,
      spamWordsDetected,
      subjectImpact,
      handleDataChange,
      handleFieldChange,
      handleInsertToken,
      handleApprove,
      handleReject,
    ],
  );

  return (
    <EmailComposerContext.Provider value={contextValue}>
      <div
        className={cn(
          "rounded-[var(--acu-radius,0.75rem)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm overflow-hidden",
          className,
        )}
        role="region"
        aria-label="Email outreach composer"
      >
        {children}
      </div>
    </EmailComposerContext.Provider>
  );
}
