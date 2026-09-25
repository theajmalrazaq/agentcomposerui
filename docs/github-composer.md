# GitHubPRComposer — Standalone Component Documentation

A GitHub pull request draft composer card for AI coding agents featuring conventional commits linting (`feat:`, `fix:`, `refactor:`), interactive verification checklists, reviewers/labels tagging, and unified diff/markdown preview.

## Installation

```bash
bun add agentcomposerui
# or: npm install agentcomposerui / pnpm add agentcomposerui
```

## Import

```tsx
import { GitHubPRComposer, gitHubPRSchema } from "agentcomposerui";
import type { GitHubPRData } from "agentcomposerui";
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { GitHubPRComposer } from "agentcomposerui";

export function Example() {
  const [status, setStatus] = useState<"reviewing" | "approved" | "rejected">("reviewing");

  return (
    <GitHubPRComposer
      status={status}
      data={{
        title: "feat(core): implement standalone human-in-the-loop review cards",
        baseBranch: "main",
        headBranch: "feat/hitl-composers",
        summary: "Introduces production-ready composer cards with conventional commit linting, interactive verification checklists, and unified diff preview.",
        checklist: [
          { label: "Unit tests written and passing", completed: true },
          { label: "Conventional commit message validated", completed: true },
          { label: "Documentation updated in /docs and public/*.md", completed: true },
          { label: "No breaking schema changes introduced", completed: true },
        ],
        reviewers: ["@octocat", "@theajmalrazaq"],
        labels: ["enhancement", "ai-generated", "ready-for-review"],
        diffSnippet: "+ export function GitHubPRComposer(props: GitHubPRComposerProps)\n+   return <GitHubPRComposer.Root {...props} />\n+ }",
      }}
      onApprove={(data) => {
        setStatus("approved");
        console.log("Approved PR draft:", data);
      }}
      onReject={(feedback, data) => {
        setStatus("rejected");
        console.log("PR revision feedback:", feedback);
      }}
    />
  );
}
```

## Schema & Validation

```typescript
import { z } from "zod";
import { gitHubPRSchema, gitHubChecklistItemSchema } from "agentcomposerui/schemas";

export const gitHubChecklistItemSchema = z.object({
  label: z.string(),
  completed: z.boolean(),
});

export const gitHubPRSchema = z.object({
  title: z.string().min(1),
  baseBranch: z.string().default("main"),
  headBranch: z.string(),
  summary: z.string(),
  checklist: z.array(gitHubChecklistItemSchema).default([]),
  reviewers: z.array(z.string()).default([]),
  labels: z.array(z.string()).default([]),
  diffSnippet: z.string().optional(),
});
```

## Features

- **Conventional Commit Linter**: Automatically recognizes prefix standards like `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, and flags formatting.
- **Interactive Checklists**: Verify passing tests, documentation updates, and breaking changes before submission.
- **Diff & Markdown View**: Inspect the PR description and code diff side-by-side or tabbed.
