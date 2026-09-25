import { describe, it, expect } from "vitest";
import { gitHubPRSchema, gitHubPRJsonSchema } from "../../src/schemas/github";

describe("gitHubPRSchema", () => {
  it("validates a complete GitHub pull request draft", () => {
    const pr = {
      title: "feat(composers): add Twitter and Email outreach components",
      targetBranch: "main",
      sourceBranch: "feat/multi-platform-composers",
      body: "## Summary\n\n- Adds TwitterThreadComposer\n- Adds EmailOutreachComposer",
      checklist: [
        { label: "Unit tests added", completed: true },
        { label: "Documentation updated", completed: false },
      ],
      reviewers: ["theajmalrazaq"],
      labels: ["enhancement", "ai-agent"],
    };

    const parsed = gitHubPRSchema.safeParse(pr);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.targetBranch).toBe("main");
      expect(parsed.data.checklist).toHaveLength(2);
    }
  });

  it("fails if title or sourceBranch is missing", () => {
    const missingTitle = {
      sourceBranch: "feat/test",
      body: "Description",
    };
    expect(gitHubPRSchema.safeParse(missingTitle).success).toBe(false);

    const missingSource = {
      title: "feat: something",
      body: "Description",
    };
    expect(gitHubPRSchema.safeParse(missingSource).success).toBe(false);
  });
});

describe("gitHubPRJsonSchema", () => {
  it("exports valid OpenAI JSON schema structure", () => {
    const schema = gitHubPRJsonSchema as {
      type?: string;
      properties?: Record<string, unknown>;
      required?: string[];
    };
    expect(schema.type).toBe("object");
    expect(schema.properties).toHaveProperty("title");
    expect(schema.properties).toHaveProperty("sourceBranch");
    expect(schema.properties).toHaveProperty("body");
    expect(schema.required).toContain("title");
    expect(schema.required).toContain("sourceBranch");
  });
});
