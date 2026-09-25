# EmailOutreachComposer — Standalone Component Documentation

An email and newsletter composer card for AI agents featuring real-time subject line impact scoring, variable token chip insertion (`{{firstName}}`), spam trigger detection, and recipient management.

## Installation

```bash
bun add agentcomposerui
# or: npm install agentcomposerui / pnpm add agentcomposerui
```

## Import

```tsx
import { EmailOutreachComposer, emailDraftSchema } from "agentcomposerui";
import type { EmailDraftData } from "agentcomposerui";
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { EmailOutreachComposer } from "agentcomposerui";

export function Example() {
  const [status, setStatus] = useState<"reviewing" | "approved" | "rejected">("reviewing");

  return (
    <EmailOutreachComposer
      status={status}
      data={{
        to: "example@gmail.com",
        cc: "sales-ops@company.io",
        subject: "Quick question regarding your Q3 pipeline automation",
        preheader: "Loved your recent blog post on agent architectures",
        body: "Hi {{firstName}},\n\nI noticed {{company}} has been expanding its AI engineering team. We recently helped a similar platform cut customer response times by 68% using structured human-in-the-loop review cards.\n\nWould you be open to a 10-minute briefing next {{meetingDay}}?\n\nBest regards,\nJordan",
        templateVariables: {
          firstName: "John",
          company: "Enterprise Corp",
          meetingDay: "Thursday",
        },
      }}
      availableTokens={["{{firstName}}", "{{company}}", "{{meetingDay}}", "{{title}}"]}
      onApprove={(data) => {
        setStatus("approved");
        console.log("Approved email draft:", data);
      }}
      onReject={(feedback, data) => {
        setStatus("rejected");
        console.log("Email revision feedback:", feedback);
      }}
    />
  );
}
```

## Schema & Validation

```typescript
import { z } from "zod";
import { emailDraftSchema } from "agentcomposerui/schemas";

export const emailDraftSchema = z.object({
  to: z.string().email(),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().min(1).max(120),
  preheader: z.string().max(160).optional(),
  body: z.string().min(1),
  templateVariables: z.record(z.string()).optional(),
});
```

## Features

- **Subject Impact Analyzer**: Evaluates character length against optimal email benchmarks (35–60 characters) and warns against spam triggers like "free", "urgent", or "guarantee".
- **Dynamic Token Chips**: Click any available token (`{{firstName}}`, `{{company}}`) to inject it at the cursor position.
- **Preview & Test Sending**: Switch between interactive markdown rendering and editor view.
