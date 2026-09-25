import { describe, it, expect } from "vitest";
import { linkedInPostSchema, linkedInPostJsonSchema } from "../../src/schemas/linkedin";

describe("linkedInPostSchema", () => {
  it("validates a complete and valid LinkedIn post", () => {
    const validData = {
      hook: "AI agents are changing software development forever.",
      body: "Here is what we learned building agentic UI composers over the past 6 months...",
      callToAction: "What are your thoughts on agent-generated UI?",
      hashtags: ["#AI", "#WebDev", "#React"],
      mediaUrls: ["https://example.com/demo.png"],
    };

    const parsed = linkedInPostSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.hook).toBe(validData.hook);
      expect(parsed.data.hashtags).toHaveLength(3);
    }
  });

  it("validates a minimal post with only hook and body", () => {
    const minimalData = {
      hook: "Short hook",
      body: "Main body content.",
    };

    const parsed = linkedInPostSchema.safeParse(minimalData);
    expect(parsed.success).toBe(true);
  });

  it("fails if hook is missing or exceeds max length", () => {
    const missingHook = {
      body: "Only body",
    };
    expect(linkedInPostSchema.safeParse(missingHook).success).toBe(false);

    const longHook = {
      hook: "a".repeat(301),
      body: "Valid body",
    };
    expect(linkedInPostSchema.safeParse(longHook).success).toBe(false);
  });

  it("fails if body is missing or exceeds 2700 chars", () => {
    const missingBody = {
      hook: "Valid hook",
    };
    expect(linkedInPostSchema.safeParse(missingBody).success).toBe(false);

    const longBody = {
      hook: "Valid hook",
      body: "b".repeat(2701),
    };
    expect(linkedInPostSchema.safeParse(longBody).success).toBe(false);
  });

  it("fails if mediaUrls has invalid URL", () => {
    const invalidUrlData = {
      hook: "Valid hook",
      body: "Valid body",
      mediaUrls: ["not-a-valid-url"],
    };
    expect(linkedInPostSchema.safeParse(invalidUrlData).success).toBe(false);
  });
});

describe("linkedInPostJsonSchema", () => {
  it("generates standard JSON Schema compatible with OpenAI / Anthropic tools", () => {
    expect(linkedInPostJsonSchema).toBeDefined();
    const schema = linkedInPostJsonSchema as {
      type?: string;
      properties?: Record<string, unknown>;
      required?: string[];
    };
    expect(schema.type).toBe("object");
    expect(schema.properties).toHaveProperty("hook");
    expect(schema.properties).toHaveProperty("body");
    expect(schema.properties).toHaveProperty("callToAction");
    expect(schema.properties).toHaveProperty("hashtags");
    expect(schema.properties).toHaveProperty("mediaUrls");
    expect(schema.required).toContain("hook");
    expect(schema.required).toContain("body");
  });
});
