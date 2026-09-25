import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GitHubPRComposer } from "../../src/components/github/github-composer";
import type { GitHubPRData } from "../../src/schemas/github";

const mockPR: GitHubPRData = {
  title: "feat(composers): add Twitter, Email, and GitHub PR composers",
  targetBranch: "main",
  sourceBranch: "feat/new-composers",
  body: "## Proposed Changes\n\n- Adds TwitterThreadComposer\n- Adds EmailOutreachComposer\n- Adds GitHubPRComposer",
  checklist: [
    { label: "Unit tests added", completed: true },
    { label: "Documentation updated", completed: false },
  ],
  reviewers: ["theajmalrazaq"],
  labels: ["enhancement", "ai-agent"],
};

describe("GitHubPRComposer", () => {
  it("renders PR title, conventional commit badge, branches, and actions", () => {
    render(<GitHubPRComposer data={mockPR} status="reviewing" />);

    expect(screen.getByText("Pull Request Draft")).toBeInTheDocument();
    expect(screen.getByText("feat")).toBeInTheDocument();
    expect(screen.getByLabelText("Pull Request Title:")).toHaveValue(mockPR.title);
    expect(screen.getByText("Create Pull Request")).toBeInTheDocument();
    expect(screen.getByText("Request Changes")).toBeInTheDocument();
  });

  it("triggers onApprove when create PR button is clicked", async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined);
    render(<GitHubPRComposer data={mockPR} status="reviewing" onApprove={onApprove} />);

    const approveBtn = screen.getByRole("button", { name: /create pull request/i });
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalled();
    });
  });

  it("opens feedback input and triggers onReject with feedback", async () => {
    const onReject = vi.fn().mockResolvedValue(undefined);
    render(<GitHubPRComposer data={mockPR} status="reviewing" onReject={onReject} />);

    const rejectBtn = screen.getByRole("button", { name: /request changes/i });
    fireEvent.click(rejectBtn);

    const feedbackInput = screen.getByLabelText("Feedback for pull request revision");
    expect(feedbackInput).toBeInTheDocument();

    fireEvent.change(feedbackInput, { target: { value: "Update the checklist" } });

    const sendBtn = screen.getByRole("button", { name: /^send$/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(onReject).toHaveBeenCalledWith("Update the checklist");
    });
  });

  it("toggles checklist items when clicked in reviewing mode", () => {
    const onChange = vi.fn();
    render(<GitHubPRComposer data={mockPR} status="reviewing" onChange={onChange} />);

    const uncheckedItem = screen.getByText("Documentation updated");
    fireEvent.click(uncheckedItem);

    expect(onChange).toHaveBeenCalled();
  });
});
