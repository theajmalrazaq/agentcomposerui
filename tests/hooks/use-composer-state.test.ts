import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useComposerState } from "../../src/hooks/use-composer-state";

describe("useComposerState", () => {
  const initialData = {
    hook: "Initial Hook",
    body: "Initial Body",
  };

  it("initializes with default idle state and provided data", () => {
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
      }),
    );

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toEqual(initialData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.feedbackPromptOpen).toBe(false);
  });

  it("handles status transitions", () => {
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        initialStatus: "idle",
      }),
    );

    act(() => {
      result.current.setStatus("streaming");
    });
    expect(result.current.status).toBe("streaming");

    act(() => {
      result.current.setStatus("reviewing");
    });
    expect(result.current.status).toBe("reviewing");
  });

  it("updates data and triggers onChange callback", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        onChange,
      }),
    );

    const updatedData = {
      hook: "New Hook",
      body: "New Body",
    };

    act(() => {
      result.current.setData(updatedData);
    });

    expect(result.current.data).toEqual(updatedData);
    expect(onChange).toHaveBeenCalledWith(updatedData);
  });

  it("updates partial data via updateData", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        onChange,
      }),
    );

    act(() => {
      result.current.updateData({ hook: "Updated Hook Only" });
    });

    expect(result.current.data).toEqual({
      hook: "Updated Hook Only",
      body: "Initial Body",
    });
    expect(onChange).toHaveBeenCalledWith({
      hook: "Updated Hook Only",
      body: "Initial Body",
    });
  });

  it("triggers onApprove and transitions status to approved", async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        initialStatus: "reviewing",
        onApprove,
      }),
    );

    await act(async () => {
      await result.current.approve();
    });

    expect(onApprove).toHaveBeenCalledWith(initialData);
    expect(result.current.status).toBe("approved");
    expect(result.current.isLoading).toBe(false);
  });

  it("manages feedback prompt and calls onReject with feedback", async () => {
    const onReject = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        initialStatus: "reviewing",
        onReject,
      }),
    );

    act(() => {
      result.current.openFeedbackPrompt();
    });
    expect(result.current.feedbackPromptOpen).toBe(true);

    act(() => {
      result.current.closeFeedbackPrompt();
    });
    expect(result.current.feedbackPromptOpen).toBe(false);

    await act(async () => {
      await result.current.reject("Make it punchier");
    });

    expect(onReject).toHaveBeenCalledWith("Make it punchier");
    expect(result.current.isLoading).toBe(false);
  });

  it("resets state to initial idle state", () => {
    const { result } = renderHook(() =>
      useComposerState({
        initialData,
        initialStatus: "reviewing",
      }),
    );

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toEqual(initialData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.feedbackPromptOpen).toBe(false);
  });
});
