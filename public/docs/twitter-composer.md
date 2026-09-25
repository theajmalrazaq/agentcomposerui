# TwitterThreadComposer — Standalone Component Documentation

A multi-tweet thread composer card for AI agents featuring sequential tweet ordering, 280-character SVG countdown rings, thread hook strength gauge, and sentence splitters.

## Installation

```bash
bun add agentcomposerui
# or: npm install agentcomposerui / pnpm add agentcomposerui
```

## Import

```tsx
import { TwitterThreadComposer, twitterThreadSchema } from "agentcomposerui";
import type { TwitterThreadData } from "agentcomposerui";
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { TwitterThreadComposer } from "agentcomposerui";

export function Example() {
  const [status, setStatus] = useState<"reviewing" | "approved" | "rejected">("reviewing");

  return (
    <TwitterThreadComposer
      status={status}
      data={{
        topic: "The Future of AI Agents in Production",
        tweets: [
          {
            id: "1",
            text: "1/7 Most teams fail with AI agents because they treat LLMs as chatbots instead of autonomous systems with human checkpoints.",
          },
          {
            id: "2",
            text: "2/7 Generative UI gives your agents the ability to render domain-specific review cards before triggering irreversible actions.",
          },
          {
            id: "3",
            text: "3/7 Character limits and fold truncation matter just as much as model intelligence when publishing to production channels.",
          },
        ],
      }}
      author={{
        name: "John Doe",
        handle: "johndoe",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      }}
      onApprove={(data) => {
        setStatus("approved");
        console.log("Approved thread:", data);
      }}
      onReject={(feedback, data) => {
        setStatus("rejected");
        console.log("Thread revision feedback:", feedback);
      }}
    />
  );
}
```

## Schema & Validation

```typescript
import { z } from "zod";
import { twitterThreadSchema, tweetItemSchema } from "agentcomposerui";

export const tweetItemSchema = z.object({
  id: z.string(),
  text: z.string().min(1).max(280),
  mediaUrls: z.array(z.string()).optional(),
});

export const twitterThreadSchema = z.object({
  topic: z.string().optional(),
  tweets: z.array(tweetItemSchema).min(1).max(25),
});
```

## Compound Component Usage

```tsx
<TwitterThreadComposer.Root data={data} status={status} onApprove={onApprove} onReject={onReject}>
  <TwitterThreadComposer.Header />
  <TwitterThreadComposer.Author />
  <TwitterThreadComposer.Editor />
  <TwitterThreadComposer.Preview />
  <TwitterThreadComposer.Actions>
    <TwitterThreadComposer.RejectButton />
    <TwitterThreadComposer.ApproveButton />
  </TwitterThreadComposer.Actions>
</TwitterThreadComposer.Root>
```

## Features

- **280-Character SVG Countdown Rings**: Dynamic color transition from green to amber and red as tweet length approaches 280 characters.
- **Hook Strength Meter**: Automatically evaluates the opening tweet's clarity and curiosity score.
- **Sentence Splitter**: Breaks long paragraphs into clean numbered thread items with one click.
