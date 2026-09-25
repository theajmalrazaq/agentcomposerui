# LinkedInComposer — Standalone Component Documentation

A platform-accurate LinkedIn post composer card designed for AI agents with human-in-the-loop review, hook character gauge, body fold truncation preview (`...see more`), and hashtag management.

## Installation

```bash
bun add agentcomposerui
# or: npm install agentcomposerui / pnpm add agentcomposerui
```

## Import

```tsx
import { LinkedInComposer, linkedInPostSchema } from "agentcomposerui";
import type { LinkedInPostData } from "agentcomposerui";
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { LinkedInComposer } from "agentcomposerui";

export function Example() {
  const [status, setStatus] = useState<"reviewing" | "approved" | "rejected">("reviewing");

  return (
    <LinkedInComposer
      status={status}
      data={{
        hook: "Autonomous agents need structured guardrails, not just chat bubbles.",
        body: "When an agent proposes external communication or high-stakes actions, presenting a formatted post preview with one-click approve/reject safeguards your brand.",
        callToAction: "How is your team handling agent reviews?",
        hashtags: ["#AIAgents", "#GenerativeAI", "#FullStack"],
      }}
      author={{
        name: "Devon Vance",
        title: "Principal Agent Architect",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      }}
      onApprove={(data) => {
        setStatus("approved");
        console.log("Approved payload:", data);
      }}
      onReject={(feedback, data) => {
        setStatus("rejected");
        console.log("Agent revision feedback:", feedback);
      }}
    />
  );
}
```

## Schema & Validation

```typescript
import { z } from "zod";
import { linkedInPostSchema } from "agentcomposerui/schemas";

// Schema definition:
export const linkedInPostSchema = z.object({
  hook: z.string().min(1).max(210),
  body: z.string().min(1).max(2800),
  callToAction: z.string().max(300).optional(),
  hashtags: z.array(z.string()).default([]),
});
```

## Compound Component Usage

For full visual and layout control:

```tsx
<LinkedInComposer.Root data={data} status={status} onApprove={onApprove} onReject={onReject}>
  <LinkedInComposer.Header />
  <LinkedInComposer.Author />
  <LinkedInComposer.Editor />
  <LinkedInComposer.Preview />
  <LinkedInComposer.Actions>
    <LinkedInComposer.RejectButton />
    <LinkedInComposer.ApproveButton />
  </LinkedInComposer.Actions>
</LinkedInComposer.Root>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `LinkedInPostData` | **Required** | The structured post draft from the AI agent |
| `status` | `"reviewing" \| "approved" \| "rejected"` | `"reviewing"` | Current HITL state |
| `author` | `{ name: string; title?: string; avatarUrl?: string }` | Optional | Author card metadata |
| `onApprove` | `(data: LinkedInPostData) => void` | Optional | Approval handler |
| `onReject` | `(feedback: string, data: LinkedInPostData) => void` | Optional | Rejection handler with feedback |
| `className` | `string` | Optional | Custom container styling |
