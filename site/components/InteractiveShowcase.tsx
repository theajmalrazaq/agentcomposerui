import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  RotateCcw,
  Code2,
  Eye,
  Braces,
  Activity,
  Copy,
  Check,
  Smartphone,
  Monitor,
} from "lucide-react";
import { LinkedInComposer } from "../../src/components/linkedin/linkedin-composer";
import type { LinkedInPostData } from "../../src/schemas/linkedin";
import type { ComposerStatus } from "../../src/types";

const PRESETS: Record<string, LinkedInPostData> = {
  "Open Source Launch": {
    hook: "We just open-sourced AgentComposerUI: Native, platform-inspired composers for AI agents!",
    body: "When building autonomous marketing or outreach agents, users need a fast, intuitive way to review drafts, inspect live platform fold truncation, and trigger revisions.\n\nToday, we're releasing the full library with zero vendor lock-in.",
    callToAction: "Check out the repository and drop your thoughts below!",
    hashtags: ["#OpenSource", "#AIagents", "#React", "#TailwindCSS"],
  },
  "Series A Milestone": {
    hook: "Excited to share that our team has closed a $12M Series A led by Apex Capital!",
    body: "Over the past 18 months, our platform has powered millions of human-in-the-loop agent workflows. This round will fuel our engineering expansion and support our upcoming multi-modal composer formats.",
    callToAction: "We are hiring across engineering and product. Link in comments!",
    hashtags: ["#Funding", "#Startup", "#TechNews", "#Leadership"],
  },
  "Product Engineering": {
    hook: "Stop hand-rolling social card previews and streaming state machines in your Next.js apps.",
    body: "AgentComposerUI ships standard Zod schemas that match OpenAI, Anthropic, and Gemini function signatures.\n\nDrop in `<LinkedInComposer />` or customize layouts with Compound Components (`.Root`, `.Header`, `.Editor`, `.Preview`, `.Actions`).",
    callToAction: "Run `bun add agentcomposerui` to get started today.",
    hashtags: ["#WebDev", "#Nextjs", "#TypeScript", "#DeveloperTools"],
  },
};

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "schema" | "state">("preview");
  const [activePreset, setActivePreset] = useState<string>("Open Source Launch");
  const [postData, setPostData] = useState<LinkedInPostData>(PRESETS["Open Source Launch"]);
  const [status, setStatus] = useState<ComposerStatus>("reviewing");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const streamIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const handleSelectPreset = (name: string) => {
    setActivePreset(name);
    setPostData(PRESETS[name]);
    setStatus("reviewing");
    setLastEvent(`Loaded preset: "${name}"`);
  };

  const handleSimulateStream = () => {
    const target = PRESETS[activePreset];
    const fullText = target.body;
    setStatus("streaming");
    setIsStreaming(true);
    setPostData({
      hook: target.hook,
      body: "",
      callToAction: "",
      hashtags: [],
    });
    setLastEvent("AI agent started streaming draft tokens...");

    let index = 0;
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    streamIntervalRef.current = window.setInterval(() => {
      index += 5;
      if (index >= fullText.length) {
        clearInterval(streamIntervalRef.current!);
        setPostData({ ...target });
        setStatus("reviewing");
        setIsStreaming(false);
        setLastEvent("Agent stream complete. Ready for human review.");
      } else {
        setPostData((prev) => ({
          ...prev,
          body: fullText.slice(0, index),
        }));
      }
    }, 25);
  };

  const handleApprove = async (_approved: LinkedInPostData) => {
    setStatus("approved");
    setLastEvent(`Approved & Dispatched! Payload ready for publish webhook.`);
  };

  const handleReject = async (feedback: string) => {
    setStatus("streaming");
    setLastEvent(`Changes requested: "${feedback}". Simulating agent revision...`);
    setTimeout(() => {
      setPostData((prev) => ({
        ...prev,
        hook: `[Revised] ${prev.hook}`,
        body: `${prev.body}\n\n(AI Revision: Incorporated feedback "${feedback}")`,
      }));
      setStatus("reviewing");
      setLastEvent("Agent updated draft and returned for second review.");
    }, 1200);
  };

  const reactCodeSnippet = `import { useState } from "react";
import { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";
import "agentcomposerui/styles.css";

export function SocialAgentReview() {
  const [data, setData] = useState<LinkedInPostData>(${JSON.stringify(postData, null, 2)});
  const [status, setStatus] = useState<ComposerStatus>("${status}");

  const handleApprove = async (finalPost: LinkedInPostData) => {
    await fetch("/api/publish", { method: "POST", body: JSON.stringify(finalPost) });
    setStatus("approved");
  };

  const handleReject = async (feedback: string) => {
    await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });
    setStatus("streaming");
  };

  return (
    <LinkedInComposer
      data={data}
      status={status}
      onChange={setData}
      onApprove={handleApprove}
      onReject={handleReject}
      author={{
        name: "John Doe",
        title: "Staff AI Engineer",
      }}
    />
  );
}`;

  const jsonSchemaSnippet = `{
  "name": "compose_linkedin_post",
  "description": "Draft an engaging LinkedIn post with structured hook, body, CTA, and hashtags.",
  "parameters": {
    "type": "object",
    "properties": {
      "hook": {
        "type": "string",
        "description": "1-2 sentence opening line before the feed fold truncation"
      },
      "body": {
        "type": "string",
        "description": "Main post content, storytelling, and key insights"
      },
      "callToAction": {
        "type": "string",
        "description": "Closing action prompt (e.g. comment, link in bio)"
      },
      "hashtags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "3-5 relevant industry hashtags starting with #"
      }
    },
    "required": ["hook", "body"]
  }
}`;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ReUI Style Frame Container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="reui-frame shadow-xl overflow-hidden"
      >
        {/* ReUI Style Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 gap-3 bg-zinc-50/80 dark:bg-zinc-900/80">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              &lt;LinkedInComposer /&gt;
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              component
            </span>
          </div>

          {/* Center Tabs: Segmented Control like ReUI */}
          <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "preview"
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "code"
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "schema"
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Braces className="w-3.5 h-3.5" />
              <span>Schema</span>
            </button>
            <button
              onClick={() => setActiveTab("state")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "state"
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>State</span>
            </button>
          </div>

          {/* Right Controls: Viewport, Simulate, Reset */}
          <div className="flex items-center gap-2">
            {/* Viewport switch */}
            <div className="hidden sm:flex items-center bg-zinc-200/60 dark:bg-zinc-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setViewport("desktop")}
                title="Desktop Viewport"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewport === "desktop"
                    ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                title="Mobile Viewport"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewport === "mobile"
                    ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulate Stream Button */}
            <button
              onClick={handleSimulateStream}
              disabled={isStreaming}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isStreaming ? "Streaming..." : "Simulate Stream"}</span>
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setPostData(PRESETS[activePreset]);
                setStatus("reviewing");
                setLastEvent("Reset state to initial draft.");
              }}
              title="Reset state"
              className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Area with ReUI Dots */}
        <div className="p-4 sm:p-8 min-h-[560px] flex items-center justify-center bg-reui-dots bg-zinc-50/40 dark:bg-zinc-950/40">
          {activeTab === "preview" && (
            <div
              className={`transition-all duration-300 w-full ${
                viewport === "mobile" ? "max-w-sm" : "max-w-2xl"
              }`}
            >
              <LinkedInComposer
                data={postData}
                status={status}
                onChange={setPostData}
                onApprove={handleApprove}
                onReject={handleReject}
                author={{
                  name: "John Doe",
                  title: "Staff AI Engineer • Multi-Agent Workflows",
                }}
              />
            </div>
          )}

          {activeTab === "code" && (
            <div className="w-full max-w-3xl relative">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 text-zinc-300 text-xs rounded-t-xl border border-zinc-800 border-b-0 font-mono">
                <span>components/agent-composer.tsx</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(reactCodeSnippet);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 bg-zinc-950 text-zinc-100 rounded-b-xl border border-zinc-800 text-xs font-mono overflow-x-auto leading-relaxed max-h-[460px]">
                <code>{reactCodeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === "schema" && (
            <div className="w-full max-w-3xl relative">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 text-zinc-300 text-xs rounded-t-xl border border-zinc-800 border-b-0 font-mono">
                <span>openai-tool-definition.json</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(jsonSchemaSnippet);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedSchema ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSchema ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 bg-zinc-950 text-zinc-100 rounded-b-xl border border-zinc-800 text-xs font-mono overflow-x-auto leading-relaxed max-h-[460px]">
                <code>{jsonSchemaSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === "state" && (
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Composer State Inspector
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${
                    status === "approved"
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : status === "streaming"
                        ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  Status: {status}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Live Event Log:
                </p>
                <div className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800/80">
                  {lastEvent ||
                    "Ready. Click 'Approve & Publish' or 'Request Changes' on the preview card."}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Current Draft Payload (JSON):
                </p>
                <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-[11px] font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800/80 max-h-48 overflow-y-auto">
                  {JSON.stringify(postData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* ReUI Style Preset Bar & Feedback */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50/70 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-medium">Sample Drafts:</span>
            <div className="flex items-center gap-1.5">
              {Object.keys(PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activePreset === key
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs"
                      : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-zinc-500 text-[11px] font-mono">
            <span>Desktop & Mobile Truncation</span>
            <span>•</span>
            <span>3,000 Char Gauge</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
