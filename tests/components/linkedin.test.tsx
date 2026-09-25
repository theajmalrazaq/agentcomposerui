import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LinkedInComposer } from "../../src/components/linkedin/linkedin-composer";
import type { LinkedInPostData } from "../../src/schemas/linkedin";

const mockData: LinkedInPostData = {
  hook: "Excited to announce our open source project!",
  body: "AgentComposerUI allows AI agents to stream and present native interactive composers.",
  callToAction: "Check out the repo on GitHub!",
  hashtags: ["#AI", "#OpenSource", "#React"],
};

describe("LinkedInComposer", () => {
  it("renders all sections in reviewing mode", () => {
    render(
      <LinkedInComposer
        data={mockData}
        status="reviewing"
        author={{ name: "Alex Johnson", title: "AI Engineer" }}
      />,
    );

    expect(screen.getByText("Alex Johnson")).toBeInTheDocument();
    expect(screen.getByText("AI Engineer")).toBeInTheDocument();
    expect(screen.getByLabelText("Post content editor")).toBeInTheDocument();
    expect(screen.getAllByText("#AI").length).toBeGreaterThan(0);
    expect(screen.getByText("Approve & Publish")).toBeInTheDocument();
    expect(screen.getByText("Request Changes")).toBeInTheDocument();
  });

  it("triggers onApprove when approve button is clicked", async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined);
    render(<LinkedInComposer data={mockData} status="reviewing" onApprove={onApprove} />);

    const approveBtn = screen.getByRole("button", { name: /approve/i });
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalled();
    });
  });

  it("opens feedback prompt and triggers onReject with entered feedback", async () => {
    const onReject = vi.fn().mockResolvedValue(undefined);
    render(<LinkedInComposer data={mockData} status="reviewing" onReject={onReject} />);

    const rejectBtn = screen.getByRole("button", { name: /request changes/i });
    fireEvent.click(rejectBtn);

    // Feedback input should now be visible
    const feedbackInput = screen.getByLabelText("Feedback for AI revision");
    expect(feedbackInput).toBeInTheDocument();

    fireEvent.change(feedbackInput, { target: { value: "Make the hook shorter and bolder" } });

    const submitFeedbackBtn = screen.getByRole("button", { name: /send/i });
    fireEvent.click(submitFeedbackBtn);

    await waitFor(() => {
      expect(onReject).toHaveBeenCalledWith("Make the hook shorter and bolder");
    });
  });

  it("disables approve button when status is streaming", () => {
    render(<LinkedInComposer data={mockData} status="streaming" />);

    const approveBtn = screen.getByRole("button", { name: /approve/i });
    expect(approveBtn).toBeDisabled();
  });

  it("toggles feed preview between desktop and mobile modes", () => {
    render(<LinkedInComposer data={mockData} status="reviewing" />);

    const toggleBtn = screen.getByRole("button", { name: /switch to mobile preview/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /switch to desktop preview/i })).toBeInTheDocument();
  });

  it("supports compound components composition directly", () => {
    const onApprove = vi.fn();
    render(
      <LinkedInComposer.Root data={mockData} status="reviewing" onApprove={onApprove}>
        <LinkedInComposer.Header>
          <LinkedInComposer.Author name="Custom Author" />
        </LinkedInComposer.Header>
        <LinkedInComposer.Editor />
        <LinkedInComposer.Actions>
          <LinkedInComposer.ApproveButton label="Confirm Post" />
        </LinkedInComposer.Actions>
      </LinkedInComposer.Root>,
    );

    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm Post" })).toBeInTheDocument();
  });
});
