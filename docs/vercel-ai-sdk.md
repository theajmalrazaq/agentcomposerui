# Vercel AI SDK Integration

AgentComposerUI Zod schemas integrate seamlessly with Vercel AI SDK tools (`tool()` helper).

```typescript
import { tool } from "ai";
import { linkedInPostSchema } from "agentcomposerui";

export const linkedInTool = tool({
  description: "Draft a LinkedIn post with hook, body, and call to action",
  parameters: linkedInPostSchema,
  execute: async (postData) => {
    return { success: true, postData };
  },
});
```
