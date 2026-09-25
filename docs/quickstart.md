# Quickstart — AgentComposerUI

Get your first Human-in-the-Loop AI composer running in under 5 minutes.

## 1. Install Library

```bash
bun add agentcomposerui
# or npm install agentcomposerui / pnpm add agentcomposerui
```

## 2. Minimal Working Example

```tsx
import React from "react";
import { LinkedInComposer, useComposerState } from "agentcomposerui";

export function AgentReviewCard() {
  const { status, approve, reject } = useComposerState({
    initialStatus: "reviewing",
    onApprove: (data) => {
      console.log("Approved for publishing:", data);
      // Call publishing API or resume agent execution
    },
    onReject: (feedback, data) => {
      console.log("Agent revision feedback:", feedback, data);
      // Send feedback back to LLM to re-generate draft
    },
  });

  return (
    <LinkedInComposer
      status={status}
      data={{
        hook: "AI agents are transforming how we build software.",
        body: "Instead of raw chat responses, modern workflows use structured Human-in-the-Loop review surfaces.",
        callToAction: "What agents are you running today?",
        hashtags: ["#AIAgents", "#React", "#TailwindCSS"],
      }}
      author={{
        name: "Alex Rivera",
        title: "Staff AI Engineer @ OpenAgent",
      }}
      onApprove={approve}
      onReject={reject}
    />
  );
}
```

## 3. Key Concepts

1. **`status`**: `"reviewing"` (editable review mode), `"approved"` (locked success mode), or `"rejected"` (feedback mode).
2. **`data`**: Strongly-typed payload conforming to Zod / JSON Schema.
3. **`onApprove(data)`**: Triggered when human verifies the draft.
4. **`onReject(feedback, data)`**: Triggered when human rejects with feedback so the AI can iterate.

## 4. More Composers

- LinkedIn Post: `/linkedin-composer.md`
- Twitter Thread: `/twitter-composer.md`
- Email Outreach: `/email-composer.md`
- GitHub PR: `/github-composer.md`
