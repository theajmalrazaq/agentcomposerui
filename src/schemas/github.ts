import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ============================================================
// GitHub Pull Request & Issue Draft Schema
// ============================================================

export const gitHubChecklistItemSchema = z.object({
  id: z.string().optional().describe("Unique identifier for this checklist item."),
  label: z.string().describe("Checklist description of task completed."),
  completed: z.boolean().default(false).describe("Whether task has been checked as done."),
});

export const gitHubPRSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(120)
    .describe("PR title, following conventional commit style (feat:, fix:, docs:, chore:)."),
  targetBranch: z
    .string()
    .default("main")
    .describe("Target base branch to merge into (e.g. main, staging)."),
  sourceBranch: z
    .string()
    .min(1)
    .describe("Source feature branch name (e.g. feat/agent-composer)."),
  body: z
    .string()
    .min(1)
    .describe("Pull request summary description formatted in GitHub Flavored Markdown."),
  checklist: z
    .array(gitHubChecklistItemSchema)
    .optional()
    .describe("Verification tasks or automated AI test checklists."),
  reviewers: z
    .array(z.string())
    .max(10)
    .optional()
    .describe("GitHub usernames tagged as requested reviewers."),
  labels: z
    .array(z.string())
    .max(10)
    .optional()
    .describe("Issue or PR labels (e.g. 'enhancement', 'ai-agent', 'needs-review')."),
});

/** TypeScript types inferred from the Zod schema */
export type GitHubChecklistItem = z.infer<typeof gitHubChecklistItemSchema>;
export type GitHubPRData = z.infer<typeof gitHubPRSchema>;

/**
 * Standard JSON Schema for OpenAI / Anthropic / Gemini function calling.
 * Pass this directly as `parameters` in your tool definition.
 */
export const gitHubPRJsonSchema = zodToJsonSchema(gitHubPRSchema, {
  target: "openAi",
});
