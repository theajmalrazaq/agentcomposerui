import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ============================================================
// LinkedIn Post Schema
// ============================================================

export const linkedInPostSchema = z.object({
  hook: z
    .string()
    .max(300)
    .describe(
      'The opening hook line that appears before "see more". Keep under 140 chars for mobile visibility.',
    ),
  body: z.string().max(2700).describe("The main body content of the post."),
  callToAction: z.string().max(200).optional().describe("Optional closing call-to-action line."),
  hashtags: z
    .array(z.string())
    .max(10)
    .optional()
    .describe('Array of hashtags (e.g. "#AI", "#WebDev").'),
  mediaUrls: z
    .array(z.string().url())
    .max(9)
    .optional()
    .describe("Optional array of image or document URLs to attach."),
});

/** TypeScript type inferred from the Zod schema */
export type LinkedInPostData = z.infer<typeof linkedInPostSchema>;

/**
 * Standard JSON Schema for OpenAI / Anthropic / Gemini function calling.
 * Pass this directly as `parameters` in your tool definition.
 */
export const linkedInPostJsonSchema = zodToJsonSchema(linkedInPostSchema, {
  target: "openAi",
});
