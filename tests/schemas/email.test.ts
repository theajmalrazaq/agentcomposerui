import { describe, it, expect } from "vitest";
import { emailDraftSchema, emailDraftJsonSchema } from "../../src/schemas/email";

describe("emailDraftSchema", () => {
  it("validates a complete email outreach draft", () => {
    const draft = {
      to: "alex@acme.ai",
      subject: "Quick question regarding {{company}}'s agent workflow",
      previewText: "Loved your recent article on autonomous agents",
      body: "Hi {{firstName}},\n\nI noticed {{company}} is scaling agent features...",
      signature: "Best,\nJohn Doe\nFounder, AgentComposerUI",
      tokens: {
        firstName: "Alex",
        company: "Acme AI",
      },
      scheduledFor: "In 10 minutes",
    };

    const parsed = emailDraftSchema.safeParse(draft);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.to).toBe("alex@acme.ai");
      expect(parsed.data.tokens?.firstName).toBe("Alex");
    }
  });

  it("fails if subject is missing or too long", () => {
    const missingSubject = {
      to: "alex@acme.ai",
      body: "Hello",
    };
    expect(emailDraftSchema.safeParse(missingSubject).success).toBe(false);

    const longSubject = {
      to: "alex@acme.ai",
      subject: "s".repeat(151),
      body: "Hello",
    };
    expect(emailDraftSchema.safeParse(longSubject).success).toBe(false);
  });
});

describe("emailDraftJsonSchema", () => {
  it("exports valid OpenAI JSON schema structure", () => {
    const schema = emailDraftJsonSchema as {
      type?: string;
      properties?: Record<string, unknown>;
      required?: string[];
    };
    expect(schema.type).toBe("object");
    expect(schema.properties).toHaveProperty("to");
    expect(schema.properties).toHaveProperty("subject");
    expect(schema.properties).toHaveProperty("body");
    expect(schema.required).toContain("to");
    expect(schema.required).toContain("subject");
    expect(schema.required).toContain("body");
  });
});
