# CopilotKit Integration

Render AgentComposerUI cards inside CopilotKit generative UI threads using `useCopilotAction`.

```typescript
import { useCopilotAction } from "@copilotkit/react-core";
import { LinkedInComposer, linkedInPostSchema } from "agentcomposerui";

useCopilotAction({
  name: "draftLinkedInPost",
  description: "Drafts a post on LinkedIn for user approval",
  parameters: [
    { name: "hook", type: "string" },
    { name: "body", type: "string" },
    { name: "callToAction", type: "string" },
    { name: "hashtags", type: "string[]" },
  ],
  render: ({ status, args }) => {
    return <LinkedInComposer status={status === "complete" ? "approved" : "reviewing"} data={args} />;
  },
});
```
