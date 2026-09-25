import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ============================================================
// Email Outreach & Newsletter Schema
// ============================================================

export const emailDraftSchema = z.object({
  to: z.string().min(1).describe("Recipient email address or placeholder token (e.g. {{email}})."),
  subject: z
    .string()
    .min(1)
    .max(150)
    .describe("Email subject line. Optimal impact between 35-55 characters."),
  previewText: z
    .string()
    .max(150)
    .optional()
    .describe("Pre-header / preview snippet visible in inbox client feeds."),
  body: z
    .string()
    .min(1)
    .describe("Email body content. Supports dynamic token placeholders like {{firstName}}."),
  signature: z.string().optional().describe("Sender sign-off and contact signature."),
  tokens: z
    .record(z.string())
    .optional()
    .describe("Key-value mapping of token variables for real-time personalization preview."),
  scheduledFor: z
    .string()
    .optional()
    .describe("Optional scheduled send timestamp or delay (e.g. 'In 15 minutes')."),
});

/** TypeScript type inferred from the Zod schema */
export type EmailDraftData = z.infer<typeof emailDraftSchema>;

/**
 * Standard JSON Schema for OpenAI / Anthropic / Gemini function calling.
 * Pass this directly as `parameters` in your tool definition.
 */
export const emailDraftJsonSchema = zodToJsonSchema(emailDraftSchema, {
  target: "openAi",
});
