import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EmailOutreachComposer } from "../../src/components/email/email-composer";
import type { EmailDraftData } from "../../src/schemas/email";

const mockEmail: EmailDraftData = {
  to: "alex@acme.ai",
  subject: "Quick question on {{company}}'s agent infrastructure",
  previewText: "Loved your work on AI agents",
  body: "Hi {{firstName}},\n\nI was impressed by {{company}}'s launch this week.",
  signature: "Best,\nJohn Doe\nFounder",
  tokens: {
    firstName: "Alex",
    company: "Acme AI",
  },
  scheduledFor: "In 15 minutes",
};

describe("EmailOutreachComposer", () => {
  it("renders email fields, impact meter, and actions", () => {
    render(<EmailOutreachComposer data={mockEmail} status="reviewing" senderName="Outreach Bot" />);

    expect(screen.getByText("Email Outreach & Newsletter")).toBeInTheDocument();
    expect(screen.getByLabelText("To:")).toHaveValue("alex@acme.ai");
    expect(screen.getByLabelText("Subject:")).toHaveValue(
      "Quick question on {{company}}'s agent infrastructure",
    );
    expect(screen.getByText("Approve & Schedule Send")).toBeInTheDocument();
    expect(screen.getByText("Request Changes")).toBeInTheDocument();
  });

  it("triggers onApprove when approve button is clicked", async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined);
    render(<EmailOutreachComposer data={mockEmail} status="reviewing" onApprove={onApprove} />);

    const approveBtn = screen.getByRole("button", { name: /approve/i });
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalled();
    });
  });

  it("opens feedback input and triggers onReject with feedback", async () => {
    const onReject = vi.fn().mockResolvedValue(undefined);
    render(<EmailOutreachComposer data={mockEmail} status="reviewing" onReject={onReject} />);

    const rejectBtn = screen.getByRole("button", { name: /request changes/i });
    fireEvent.click(rejectBtn);

    const feedbackInput = screen.getByLabelText("Feedback for email revision");
    expect(feedbackInput).toBeInTheDocument();

    fireEvent.change(feedbackInput, { target: { value: "Make the tone more casual" } });

    const sendBtn = screen.getByRole("button", { name: /^send$/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(onReject).toHaveBeenCalledWith("Make the tone more casual");
    });
  });

  it("inserts token into email body when token chip is clicked", () => {
    const onChange = vi.fn();
    render(<EmailOutreachComposer data={mockEmail} status="reviewing" onChange={onChange} />);

    const tokenBtn = screen.getByTitle("Click to insert {{role}} into body");
    fireEvent.click(tokenBtn);

    expect(onChange).toHaveBeenCalled();
  });
});
