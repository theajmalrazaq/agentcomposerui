import { describe, it, expect } from "vitest";
import { twitterThreadSchema, twitterThreadJsonSchema } from "../../src/schemas/twitter";

describe("twitterThreadSchema", () => {
  it("validates a sequential twitter thread", () => {
    const validData = {
      topic: "10 Agentic UI Patterns",
      tweets: [
        { id: "1", text: "1/ Why generative UI needs specialized human review cards." },
        { id: "2", text: "2/ Token streaming animations keep users engaged while LLMs draft." },
        { id: "3", text: "3/ Try AgentComposerUI today to speed up your HITL workflows." },
      ],
      hashtags: ["#AI", "#BuildInPublic"],
    };

    const parsed = twitterThreadSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.tweets).toHaveLength(3);
      expect(parsed.data.topic).toBe(validData.topic);
    }
  });

  it("fails if tweets array is empty", () => {
    const emptyThread = {
      tweets: [],
    };
    expect(twitterThreadSchema.safeParse(emptyThread).success).toBe(false);
  });

  it("fails if any tweet exceeds 280 characters", () => {
    const longTweet = {
      tweets: [{ text: "x".repeat(281) }],
    };
    expect(twitterThreadSchema.safeParse(longTweet).success).toBe(false);
  });

  it("allows up to 4 media URLs per tweet", () => {
    const tweetWithMedia = {
      tweets: [
        {
          text: "Check these screenshots!",
          mediaUrls: ["https://example.com/1.png", "https://example.com/2.png"],
        },
      ],
    };
    expect(twitterThreadSchema.safeParse(tweetWithMedia).success).toBe(true);
  });
});

describe("twitterThreadJsonSchema", () => {
  it("exports valid OpenAI JSON schema structure", () => {
    const schema = twitterThreadJsonSchema as {
      type?: string;
      properties?: Record<string, unknown>;
      required?: string[];
    };
    expect(schema.type).toBe("object");
    expect(schema.properties).toHaveProperty("tweets");
    expect(schema.required).toContain("tweets");
  });
});
