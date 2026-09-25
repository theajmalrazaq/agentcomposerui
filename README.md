# AgentComposerUI

> **Composer UI components for AI Agents — React & Tailwind CSS.**  
> Native human-in-the-loop (HITL) composer cards that agents can stream into and users can review, edit, and approve.

[![npm version](https://img.shields.io/npm/v/agentcomposerui.svg)](https://www.npmjs.com/package/agentcomposerui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## The Problem

When building AI agent workflows (like social media managers, marketing assistants, or outreach bots), the agent creates structured drafts. But developers are left reinventing the wheel:

- Building complex review and editing UIs from scratch
- Implementing live platform-specific preview cards (e.g., LinkedIn feed truncation, character counters)
- Handling human-in-the-loop state machines (streaming → reviewing → revising → approving)
- Converting Zod schemas to tool definitions for OpenAI, Anthropic, and Gemini

## The Solution

**`agentcomposerui`** provides plug-and-play, compound React components purpose-built for AI agent architectures.

- **Drop-in or Compound API**: Use `<LinkedInComposer />` directly or compose `<LinkedInComposer.Root>`, `<Header>`, `<Editor>`, `<Preview>`, `<Actions>`.
- **Universal LLM Schema**: Standard JSON Schema export ready for OpenAI tool calls, Anthropic tools, and Gemini function declarations.
- **Full HITL State Machine**: Built-in states (`idle` → `streaming` → `reviewing` → `approved` / `rejected`) with feedback prompts for agent revision loops.
- **Real-Time Platform Preview**: Dynamic desktop and mobile preview with realistic fold truncation simulation (`...see more`).
- **Tailwind CSS & CSS Variables**: Zero runtime CSS overhead, dark-mode ready, customizable via `--acu-*` design tokens.
- **Ultra Fast**: Linted with `oxlint`, formatted with `oxfmt`, tested with `vitest`.

---

## Installation

```bash
# bun
bun add agentcomposerui

# npm
npm install agentcomposerui

# pnpm
pnpm add agentcomposerui
```

### Peer Dependencies

Ensure you have `react` (>=18), `react-dom` (>=18), and `tailwindcss` (>=3) installed in your project.

---

## Quick Setup

### 1. Import Base Styles

In your root layout or entry file (e.g. `app/layout.tsx` or `src/index.tsx`):

```tsx
import "agentcomposerui/styles.css";
```

### 2. Configure Tailwind CSS

If you are using Tailwind v3, add `agentcomposerui` to your `tailwind.config.js` content list:

```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/agentcomposerui/**/*.{js,cjs}"],
};
```

If using Tailwind v4 in CSS:

```css
@import "tailwindcss";
@source "../node_modules/agentcomposerui";
```

---

## LLM Integration Example

### OpenAI Tool Definition

```ts
import { linkedInPostJsonSchema } from "agentcomposerui";

export const postComposerTool = {
  type: "function",
  function: {
    name: "compose_linkedin_post",
    description: "Draft an engaging LinkedIn post with hook, body, CTA, and hashtags.",
    parameters: linkedInPostJsonSchema,
  },
};
```

### Anthropic Claude Tool Definition

```ts
import { linkedInPostJsonSchema } from "agentcomposerui";

export const postComposerTool = {
  name: "compose_linkedin_post",
  description: "Draft an engaging LinkedIn post with hook, body, CTA, and hashtags.",
  input_schema: linkedInPostJsonSchema,
};
```

---

## React Usage

### Option A: Ready-to-Use Drop-in Component

```tsx
"use client";

import { useState } from "react";
import { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";

export function AgentPostReview({ initialPost }: { initialPost: LinkedInPostData }) {
  const [post, setPost] = useState<LinkedInPostData>(initialPost);
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  const handleApprove = async (finalData: LinkedInPostData) => {
    // Send approved post to your publishing API or queue
    await fetch("/api/publish", {
      method: "POST",
      body: JSON.stringify(finalData),
    });
    setStatus("approved");
  };

  const handleReject = async (feedback: string) => {
    // Send feedback back to your agent for revision
    await fetch("/api/agent/revise", {
      method: "POST",
      body: JSON.stringify({ feedback, currentDraft: post }),
    });
    setStatus("streaming");
  };

  return (
    <LinkedInComposer
      data={post}
      status={status}
      onChange={setPost}
      onApprove={handleApprove}
      onReject={handleReject}
      author={{
        name: "Jane Doe",
        title: "Founder & CEO",
      }}
    />
  );
}
```

### Option B: Compound Components (Total Layout Flexibility)

Need a custom layout or want to swap out pieces? Use the compound components:

```tsx
import { LinkedInComposer } from "agentcomposerui";

export function CustomPostComposer({ post, status, onApprove, onReject }) {
  return (
    <LinkedInComposer.Root data={post} status={status} onApprove={onApprove} onReject={onReject}>
      <LinkedInComposer.Header>
        <LinkedInComposer.Author name="Jane Doe" title="Tech Lead" />
        <LinkedInComposer.StageIndicator />
      </LinkedInComposer.Header>

      <LinkedInComposer.Editor placeholder="Edit post draft..." />
      <LinkedInComposer.HashtagBar />
      <LinkedInComposer.MediaDropzone />
      <LinkedInComposer.Preview />

      <LinkedInComposer.Actions>
        <LinkedInComposer.CharacterCount limit={3000} />
        <div className="flex items-center gap-2">
          <LinkedInComposer.RejectButton label="Request Changes" />
          <LinkedInComposer.ApproveButton label="Schedule & Publish" />
        </div>
      </LinkedInComposer.Actions>
    </LinkedInComposer.Root>
  );
}
```

---

## HITL State Machine (`useComposerState`)

For custom agent coordination or managing state outside of the component:

```tsx
import { useComposerState } from "agentcomposerui";

const { data, status, isLoading, setStatus, updateData, approve, reject } = useComposerState({
  initialData: postDraft,
  initialStatus: "reviewing",
  onApprove: async (data) => {
    /* publish */
  },
  onReject: async (feedback) => {
    /* send feedback to LLM */
  },
});
```

---

## Theming & Design Tokens

AgentComposerUI styles are powered by CSS custom properties. You can easily customize any token in your CSS:

```css
:root {
  --acu-primary: 240 5.9% 10%; /* Brand action (pure black in light mode) */
  --acu-radius: 0.75rem; /* Corner radius */
  --acu-background: 0 0% 100%; /* Surface background */
  --acu-foreground: 240 10% 3.9%; /* Main text */
  --acu-border: 240 5.9% 90%; /* Borders */
}

.dark {
  --acu-background: 240 10% 3.9%;
  --acu-foreground: 0 0% 98%;
  --acu-primary: 0 0% 98%; /* Pure crisp white in dark mode */
  --acu-border: 240 3.7% 15.9%;
}
```

---

## Development & Testing

This project uses modern tooling for maximum speed:

```bash
# Typecheck
bun run typecheck

# Lint (oxlint)
bun run lint
bun run lint:fix

# Format (oxfmt)
bun run format
bun run format:check

# Run Vitest test suite
bun run test

# Build package bundle
bun run build
```

---

## License

MIT © [theajmalrazaq](https://github.com/theajmalrazaq)
