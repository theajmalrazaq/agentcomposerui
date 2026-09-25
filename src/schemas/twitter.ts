import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ============================================================
// Twitter Thread Schema
// ============================================================

export const tweetItemSchema = z.object({
  id: z.string().optional().describe("Unique identifier for this tweet in the thread."),
  text: z
    .string()
    .max(280)
    .describe("The tweet text content, strictly adhering to the 280-character limit."),
  mediaUrls: z
    .array(z.string().url())
    .max(4)
    .optional()
    .describe("Optional image or video URLs attached to this tweet (up to 4)."),
});

export const twitterThreadSchema = z.object({
  topic: z.string().max(120).optional().describe("Overall topic or hook angle of the thread."),
  tweets: z
    .array(tweetItemSchema)
    .min(1)
    .max(25)
    .describe("Ordered list of tweets comprising the sequential thread."),
  hashtags: z
    .array(z.string())
    .max(8)
    .optional()
    .describe("Optional hashtags to tag at the end of the thread."),
});

/** TypeScript types inferred from the Zod schemas */
export type TweetItem = z.infer<typeof tweetItemSchema>;
export type TwitterThreadData = z.infer<typeof twitterThreadSchema>;

/**
 * Standard JSON Schema for OpenAI / Anthropic / Gemini function calling.
 * Pass this directly as `parameters` in your tool definition.
 */
export const twitterThreadJsonSchema = zodToJsonSchema(twitterThreadSchema, {
  target: "openAi",
});
