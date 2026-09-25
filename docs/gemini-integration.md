# Google Gemini Integration

Use AgentComposerUI schemas with Google Gemini 2.5 and Function Declarations.

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { linkedInPostJsonSchema } from "agentcomposerui";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  tools: [{ functionDeclarations: [{ name: "compose_linkedin_post", parameters: linkedInPostJsonSchema }] }],
});
```
