"use client";

import { useCallback, useReducer } from "react";
import type { ComposerStatus, ComposerStage } from "../types";

// ============================================================
// useComposerState — Shared HITL State Machine Hook
// ============================================================

interface ComposerState<T> {
  data: T;
  status: ComposerStatus;
  stages: ComposerStage[];
  isLoading: boolean;
  feedbackPromptOpen: boolean;
}

type ComposerAction<T> =
  | { type: "SET_STATUS"; status: ComposerStatus }
  | { type: "SET_DATA"; data: T }
  | { type: "UPDATE_DATA"; updates: Partial<T> }
  | { type: "SET_STAGE"; stageId: string; stageStatus: ComposerStage["status"] }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "TOGGLE_FEEDBACK_PROMPT"; open: boolean }
  | { type: "RESET"; data: T };

function createReducer<T>() {
  return function composerReducer(
    state: ComposerState<T>,
    action: ComposerAction<T>,
  ): ComposerState<T> {
    switch (action.type) {
      case "SET_STATUS":
        return { ...state, status: action.status, feedbackPromptOpen: false };

      case "SET_DATA":
        return { ...state, data: action.data };

      case "UPDATE_DATA":
        return { ...state, data: { ...state.data, ...action.updates } };

      case "SET_STAGE":
        return {
          ...state,
          stages: state.stages.map((s) =>
            s.id === action.stageId ? { ...s, status: action.stageStatus } : s,
          ),
        };

      case "SET_LOADING":
        return { ...state, isLoading: action.isLoading };

      case "TOGGLE_FEEDBACK_PROMPT":
        return { ...state, feedbackPromptOpen: action.open };

      case "RESET":
        return {
          ...state,
          data: action.data,
          status: "idle",
          isLoading: false,
          feedbackPromptOpen: false,
          stages: state.stages.map((s) => ({ ...s, status: "pending" as const })),
        };

      default:
        return state;
    }
  };
}

export interface UseComposerStateOptions<T> {
  initialData: T;
  initialStatus?: ComposerStatus;
  stages?: ComposerStage[];
  onApprove?: (data: T) => void | Promise<void>;
  onReject?: (feedback: string) => void | Promise<void>;
  onChange?: (data: T) => void;
}

export function useComposerState<T>(options: UseComposerStateOptions<T>) {
  const {
    initialData,
    initialStatus = "idle",
    stages = [],
    onApprove,
    onReject,
    onChange,
  } = options;

  const reducer = createReducer<T>();

  const [state, dispatch] = useReducer(reducer, {
    data: initialData,
    status: initialStatus,
    stages,
    isLoading: false,
    feedbackPromptOpen: false,
  });

  const setStatus = useCallback((status: ComposerStatus) => {
    dispatch({ type: "SET_STATUS", status });
  }, []);

  const setData = useCallback(
    (data: T) => {
      dispatch({ type: "SET_DATA", data });
      onChange?.(data);
    },
    [onChange],
  );

  const updateData = useCallback(
    (updates: Partial<T>) => {
      const newData = { ...state.data, ...updates };
      dispatch({ type: "UPDATE_DATA", updates });
      onChange?.(newData);
    },
    [state.data, onChange],
  );

  const approve = useCallback(async () => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    try {
      await onApprove?.(state.data);
      dispatch({ type: "SET_STATUS", status: "approved" });
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  }, [state.data, onApprove]);

  const reject = useCallback(
    async (feedback: string) => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      dispatch({ type: "TOGGLE_FEEDBACK_PROMPT", open: false });
      try {
        await onReject?.(feedback);
      } finally {
        dispatch({ type: "SET_LOADING", isLoading: false });
      }
    },
    [onReject],
  );

  const openFeedbackPrompt = useCallback(() => {
    dispatch({ type: "TOGGLE_FEEDBACK_PROMPT", open: true });
  }, []);

  const closeFeedbackPrompt = useCallback(() => {
    dispatch({ type: "TOGGLE_FEEDBACK_PROMPT", open: false });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET", data: initialData });
  }, [initialData]);

  return {
    ...state,
    setStatus,
    setData,
    updateData,
    approve,
    reject,
    openFeedbackPrompt,
    closeFeedbackPrompt,
    reset,
  };
}
