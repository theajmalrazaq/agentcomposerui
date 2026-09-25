# Anthropic Claude Integration

AgentComposerUI tool schemas can be plugged directly into Anthropic Claude tool calling (`tools` array with `input_schema`).

## Example with Claude 3.5 Sonnet

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { linkedInPostJsonSchema } from "agentcomposerui/schemas";

const anthropic = new Anthropic();

const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  tools: [
    {
      name: "compose_linkedin_post",
      description: "Draft an engaging LinkedIn post with hook, body, and tags.",
      input_schema: linkedInPostJsonSchema,
    },
  ],
  messages: [{ role: "user", content: "Draft a post about AI agent evaluation." }],
});
```
