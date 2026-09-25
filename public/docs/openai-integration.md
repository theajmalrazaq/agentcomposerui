# OpenAI Function Calling Integration

AgentComposerUI exports ready-to-use JSON Schema representations conforming to the OpenAI Function Calling and Structured Outputs specifications.

## Installation

```bash
bun add agentcomposerui openai
# or: npm install agentcomposerui openai
```

## Example with GPT-4o

```typescript
import OpenAI from "openai";
import { linkedInPostJsonSchema } from "agentcomposerui";

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Draft a LinkedIn post announcing our open source launch." }],
  tools: [
    {
      type: "function",
      function: {
        name: "compose_linkedin_post",
        description: "Draft a structured LinkedIn post.",
        parameters: linkedInPostJsonSchema,
      },
    },
  ],
});
```
