# useComposerState — Hook Documentation

`useComposerState` is the standard React hook for managing the lifecycle of an AI agent draft.

## Import

```tsx
import { useComposerState } from "agentcomposerui";
```

## Hook Signature

```typescript
const {
  status,
  isReviewing,
  isApproved,
  isRejected,
  revisionHistory,
  approve,
  reject,
  reset,
  setRevisionFeedback,
} = useComposerState<TData>({
  initialStatus?: "reviewing" | "approved" | "rejected",
  onApprove?: (data: TData) => void | Promise<void>,
  onReject?: (feedback: string, data: TData) => void | Promise<void>,
});
```

## Example

```tsx
import React from "react";
import { LinkedInComposer, useComposerState } from "agentcomposerui";
import type { LinkedInPostData } from "agentcomposerui";

export function PostReview() {
  const { status, isApproved, approve, reject } = useComposerState<LinkedInPostData>({
    initialStatus: "reviewing",
    onApprove: async (data) => {
      await fetch("/api/publish-linkedin", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onReject: async (feedback, data) => {
      await fetch("/api/agent-revision", {
        method: "POST",
        body: JSON.stringify({ feedback, draft: data }),
      });
    },
  });

  return (
    <div>
      {isApproved && <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg">Draft Published!</div>}
      <LinkedInComposer
        status={status}
        data={{
          hook: "Empowering developers with Agent UI tools.",
          body: "Human in the loop is not a fallback—it is the modern interface standard.",
          hashtags: ["#AIAgents", "#DevTools"],
        }}
        onApprove={approve}
        onReject={reject}
      />
    </div>
  );
}
```
