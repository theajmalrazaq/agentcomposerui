# Vercel AI SDK Integration

AgentComposerUI Zod schemas integrate seamlessly with Vercel AI SDK tools (`tool()` helper).

```typescript
import { tool } from "ai";
import { linkedInPostSchema, type LinkedInPostData } from "agentcomposerui/schemas";

export const linkedInTool = tool({
  description: "Draft a LinkedIn post with hook, body, and call to action",
  parameters: linkedInPostSchema,
  execute: async (postData: LinkedInPostData) => {
    return { success: true, postData };
  },
});
```

> **Note for Next.js App Router**: Always import schemas from `"agentcomposerui/schemas"` in server-side API routes (`route.ts`) to avoid bundling React client components into your server runtime.
