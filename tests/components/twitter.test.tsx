import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TwitterThreadComposer } from "../../src/components/twitter/twitter-composer";
import type { TwitterThreadData } from "../../src/schemas/twitter";

const mockThread: TwitterThreadData = {
  topic: "Agentic UI Patterns",
  tweets: [
    { id: "1", text: "1/ Why generative UI needs specialized human review cards." },
    { id: "2", text: "2/ Token streaming keeps users informed." },
  ],
  hashtags: ["#AI", "#OpenSource"],
};

describe("TwitterThreadComposer", () => {
  it("renders thread with sequential tweets and author details", () => {
    render(
      <TwitterThreadComposer
        data={mockThread}
        status="reviewing"
        author={{ name: "John Doe", handle: "johndoe" }}
      />,
    );

    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("@johndoe").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Tweet 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Tweet 2")).toBeInTheDocument();
    expect(screen.getByText("Publish Thread")).toBeInTheDocument();
    expect(screen.getByText("Request Changes")).toBeInTheDocument();
  });

  it("triggers onApprove when publish button is clicked", async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined);
    render(<TwitterThreadComposer data={mockThread} status="reviewing" onApprove={onApprove} />);

    const approveBtn = screen.getByRole("button", { name: /publish/i });
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalled();
    });
  });

  it("opens feedback input and triggers onReject with feedback", async () => {
    const onReject = vi.fn().mockResolvedValue(undefined);
    render(<TwitterThreadComposer data={mockThread} status="reviewing" onReject={onReject} />);

    const rejectBtn = screen.getByRole("button", { name: /request changes/i });
    fireEvent.click(rejectBtn);

    const feedbackInput = screen.getByLabelText("Feedback for thread revision");
    expect(feedbackInput).toBeInTheDocument();

    fireEvent.change(feedbackInput, { target: { value: "Add a tweet about React state" } });

    const sendBtn = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(onReject).toHaveBeenCalledWith("Add a tweet about React state");
    });
  });

  it("allows adding a new tweet to thread in reviewing mode", () => {
    render(<TwitterThreadComposer data={mockThread} status="reviewing" />);

    const addBtn = screen.getByText("Add Another Tweet to Thread");
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    expect(screen.getByLabelText("Tweet 3")).toBeInTheDocument();
  });
});
