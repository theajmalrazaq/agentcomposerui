import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ChevronRight,
  Search,
  ArrowLeft,
  ArrowRight,
  Info,
  Eye,
  Code2,
  Terminal,
  BookOpen,
  Layers,
  Sliders,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  ExternalLink,
  Mail,
} from "lucide-react";
import {
  OpenAIIcon,
  ClaudeIcon,
  GeminiIcon,
  VercelIcon,
  CopilotKitIcon,
  LinkedInIcon,
  XTwitterIcon,
  GitHubIcon,
} from "./BrandIcons";
import { LinkedInComposer } from "../../src/components/linkedin/linkedin-composer";
import { TwitterThreadComposer } from "../../src/components/twitter/twitter-composer";
import { EmailOutreachComposer } from "../../src/components/email/email-composer";
import { GitHubPRComposer } from "../../src/components/github/github-composer";
import type { LinkedInPostData } from "../../src/schemas/linkedin";
import type { TwitterThreadData } from "../../src/schemas/twitter";
import type { EmailDraftData } from "../../src/schemas/email";
import type { GitHubPRData } from "../../src/schemas/github";
import type { ComposerStatus } from "../../src/types";
import type { DocSlug, DocSection } from "../types";

interface DocsViewProps {
  activeSlug: DocSlug;
  onSelectSlug: (slug: DocSlug) => void;
}

const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "installation", title: "Installation" },
      { slug: "quickstart", title: "Quickstart" },
    ],
  },
  {
    title: "Components",
    items: [
      { slug: "linkedin-composer", title: "LinkedInComposer", badge: "v0.1.0" },
      { slug: "twitter-composer", title: "TwitterThreadComposer", badge: "v0.1.0" },
      { slug: "email-composer", title: "EmailOutreachComposer", badge: "v0.1.0" },
      { slug: "github-composer", title: "GitHubPRComposer", badge: "v0.1.0" },
      { slug: "compound-components", title: "Compound Components" },
    ],
  },
  {
    title: "State Management",
    items: [{ slug: "use-composer-state", title: "useComposerState" }],
  },
  {
    title: "LLM Integrations",
    items: [
      { slug: "openai-integration", title: "OpenAI Function Calling" },
      { slug: "anthropic-integration", title: "Anthropic Claude Tools" },
      { slug: "gemini-integration", title: "Google Gemini Tools" },
      { slug: "vercel-ai-sdk", title: "Vercel AI SDK Bridge" },
      { slug: "copilotkit", title: "CopilotKit Integration" },
    ],
  },
  {
    title: "Customization",
    items: [{ slug: "theming", title: "Theming & CSS Variables" }],
  },
];

export function DocsView({ activeSlug, onSelectSlug }: DocsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const activeSidebarBtnRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll the active doc item in the sidebar into view
  useEffect(() => {
    activeSidebarBtnRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeSlug]);

  // Live Doc Preview Sandbox State for <LinkedInComposer />
  const [docPreviewData, setDocPreviewData] = useState<LinkedInPostData>({
    hook: "AgentComposerUI brings native Human-in-the-Loop review to AI agent workflows.",
    body: "Instead of raw JSON outputs, your agents can now stream structured drafts directly into platform-accurate review cards with real-time fold truncation and character gauges.",
    callToAction: "What agents are you building with this? Share below!",
    hashtags: ["#AIAgents", "#React", "#TailwindCSS", "#OpenSource"],
  });
  const [docPreviewStatus, setDocPreviewStatus] = useState<ComposerStatus>("reviewing");
  const [docTab, setDocTab] = useState<"preview" | "code">("preview");
  const [docViewport, setDocViewport] = useState<"desktop" | "mobile">("desktop");

  // Twitter Sandbox State
  const [docTwitterData, setDocTwitterData] = useState<TwitterThreadData>({
    topic: "AI Agent Design Systems",
    tweets: [
      {
        id: "1",
        text: "1/ Why AI agents need specialized Human-in-the-Loop composers.\n\nWithout native review cards, developers spend hundreds of hours hand-coding custom feed truncation and gauges.",
      },
      {
        id: "2",
        text: "2/ Drop-in platform composers provide the missing visual layer between LLMs and end users, giving humans the confidence to approve or revise.",
      },
      {
        id: "3",
        text: "3/ AgentComposerUI is 100% open source and works out of the box with OpenAI, Claude, and Gemini schemas.\n\nRun `bun add agentcomposerui` to get started.",
      },
    ],
    hashtags: ["#AI", "#OpenSource", "#React"],
  });
  const [docTwitterStatus, setDocTwitterStatus] = useState<ComposerStatus>("reviewing");

  // Email Sandbox State
  const [docEmailData, setDocEmailData] = useState<EmailDraftData>({
    to: "alex@enterprise-agent.com",
    subject: "Scaling {{company}}'s human-in-the-loop agent workflows",
    previewText: "Quick question on your autonomous agent architecture",
    body: "Hi {{firstName}},\n\nI noticed {{company}} is rapidly deploying generative agent features across your product suite.\n\nWe open-sourced AgentComposerUI: plug-and-play composer review cards with built-in subject analyzers, token replacement, and zero runtime CSS dependencies.\n\nWould you have 10 minutes for a quick demo this week?",
    signature: "Best regards,\nJohn Doe\nFounder, AgentComposerUI\nexample@gmail.com",
    tokens: {
      firstName: "Alex",
      company: "EnterpriseAgent",
    },
    scheduledFor: "In 15 minutes",
  });
  const [docEmailStatus, setDocEmailStatus] = useState<ComposerStatus>("reviewing");

  // GitHub PR Sandbox State
  const [docGithubData, setDocGithubData] = useState<GitHubPRData>({
    title: "feat(composers): add Twitter, Email, and GitHub PR review cards",
    targetBranch: "main",
    sourceBranch: "feat/multi-composers",
    body: "## Summary of Changes\n\n- Adds `TwitterThreadComposer` with 280-char progress ring and sentence splitter\n- Adds `EmailOutreachComposer` with subject impact analyzer and token insertion\n- Adds `GitHubPRComposer` with conventional commit linting and checklist verification",
    checklist: [
      { label: "Unit tests covering schemas and components", completed: true },
      { label: "Documentation with interactive sandboxes", completed: true },
      { label: "Zero runtime dependencies verified", completed: true },
    ],
    reviewers: ["theajmalrazaq", "agent-reviewer"],
    labels: ["enhancement", "composers", "v0.1.0"],
  });
  const [docGithubStatus, setDocGithubStatus] = useState<ComposerStatus>("reviewing");

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Find previous and next pages for pagination
  const allItems = DOC_SECTIONS.flatMap((s) => s.items);
  const currentIndex = allItems.findIndex((item) => item.slug === activeSlug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "preview", label: "Interactive Preview" },
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Code Example" },
    { id: "props", label: "Props Reference" },
  ];

  const getDocIcon = (slug: DocSlug) => {
    switch (slug) {
      case "introduction":
        return <BookOpen className="w-3.5 h-3.5 shrink-0" />;
      case "installation":
        return <Terminal className="w-3.5 h-3.5 shrink-0" />;
      case "quickstart":
        return <Zap className="w-3.5 h-3.5 shrink-0" />;
      case "linkedin-composer":
        return <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />;
      case "twitter-composer":
        return <XTwitterIcon className="w-3.5 h-3.5 shrink-0" />;
      case "email-composer":
        return <Mail className="w-3.5 h-3.5 shrink-0" />;
      case "github-composer":
        return <GitHubIcon className="w-3.5 h-3.5 shrink-0" />;
      case "compound-components":
        return <Layers className="w-3.5 h-3.5 shrink-0" />;
      case "use-composer-state":
        return <Sliders className="w-3.5 h-3.5 shrink-0" />;
      case "openai-integration":
        return <OpenAIIcon className="w-3.5 h-3.5 shrink-0" />;
      case "anthropic-integration":
        return <ClaudeIcon className="w-3.5 h-3.5 shrink-0" />;
      case "gemini-integration":
        return <GeminiIcon className="w-3.5 h-3.5 shrink-0" />;
      case "vercel-ai-sdk":
        return <VercelIcon className="w-3.5 h-3.5 shrink-0" />;
      case "copilotkit":
        return <CopilotKitIcon className="w-3.5 h-3.5 shrink-0" />;
      case "theming":
        return <Palette className="w-3.5 h-3.5 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* ReUI Style Left Sidebar Navigation */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 pr-6 space-y-6 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
        {/* Sidebar Search Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
        </div>

        {/* Grouped Section Links */}
        <div className="space-y-6">
          {DOC_SECTIONS.map((section) => {
            const filteredItems = section.items.filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={section.title}>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 font-semibold">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {filteredItems.map((item) => (
                    <li key={item.slug}>
                      <button
                        ref={activeSlug === item.slug ? activeSidebarBtnRef : undefined}
                        onClick={() => onSelectSlug(item.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${activeSlug === item.slug
                          ? "reui-nav-active shadow-2xs rounded-lg"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50"
                          }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {getDocIcon(item.slug)}
                          <span className="truncate">{item.title}</span>
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 pb-16">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-6 font-mono">
          <span>Docs</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 dark:text-zinc-200 font-sans font-medium">
            {allItems.find((i) => i.slug === activeSlug)?.title || activeSlug}
          </span>
        </div>

        {/* Dynamic Section Contents with Framer Motion Cross-fade */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSlug === "introduction" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Introduction to AgentComposerUI
                  </h1>
                  <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    AgentComposerUI is the specialized component library engineered to go inside modern
                    AI agent architectures. It provides drop-in, platform-inspired composer cards that
                    allow AI agents to stream drafts directly into interactive UI for human review,
                    in-place editing, and approval.
                  </p>
                </div>

                {/* Motivation Callout */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex gap-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <Info className="w-4 h-4 text-zinc-900 dark:text-zinc-100 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Why does this exist?
                    </strong>
                    <p className="mt-1">
                      AI agent frameworks (like CopilotKit, Vercel AI SDK, and assistant-ui) solve agent
                      routing and tool execution, but they ship <strong>zero actual composers</strong>.
                      Developers are left writing hundreds of lines of bespoke social media cards,
                      character limit gauges, and streaming text loops. AgentComposerUI solves this
                      bottleneck.
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                    Core Principles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">
                        Universal LLM Schemas
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Pre-packaged Zod and standard JSON Schemas ready for OpenAI, Claude, and Gemini
                        tools.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">
                        Native HITL State Machine
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Built-in status cycle (`idle` → `streaming` → `reviewing` → `approved`) with
                        feedback loops.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">
                        Compound Component API
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Use simple 1-line presets or assemble custom layouts using granular
                        sub-components.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">
                        Zero Proprietary Lock-in
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Pure React and Tailwind CSS. Works anywhere standard React components run.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "installation" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Installation
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Install{" "}
                    <code className="text-zinc-900 dark:text-zinc-100 font-mono">agentcomposerui</code>{" "}
                    into your project using your preferred package manager.
                  </p>
                </div>

                {/* Install Tabs */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center justify-between">
                    <span>bun add agentcomposerui</span>
                    <button
                      onClick={() => handleCopy("inst-bun", "bun add agentcomposerui")}
                      className="hover:text-zinc-400"
                    >
                      {copiedKey === "inst-bun" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center justify-between">
                    <span>npm install agentcomposerui</span>
                    <button
                      onClick={() => handleCopy("inst-npm", "npm install agentcomposerui")}
                      className="hover:text-zinc-400"
                    >
                      {copiedKey === "inst-npm" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Peer Dependencies */}
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    Peer Dependencies
                  </h2>
                  <p className="text-xs text-zinc-500 mb-3">
                    Ensure you have React (&gt;=18) and Tailwind CSS configured in your repository:
                  </p>
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono">
                    "peerDependencies": &#123; "react": "&gt;=18", "react-dom": "&gt;=18" &#125;
                  </div>
                </div>

                {/* Import Base Styles */}
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    Import Base Styles
                  </h2>
                  <p className="text-xs text-zinc-500 mb-3">
                    Import the stylesheet once at your app root (e.g.{" "}
                    <code className="font-mono">app/layout.tsx</code>):
                  </p>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center justify-between">
                    <span>import "agentcomposerui/styles.css";</span>
                    <button
                      onClick={() => handleCopy("css-import", 'import "agentcomposerui/styles.css";')}
                      className="hover:text-zinc-400"
                    >
                      {copiedKey === "css-import" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "quickstart" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Quickstart Guide
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Add an interactive LinkedIn post review card to your agent pipeline in less than 5
                    minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    Step 1: Import and render the component
                  </h2>
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <button
                      onClick={() =>
                        handleCopy(
                          "qs-code",
                          `import { useState } from "react";\nimport { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";\n\nexport function SocialAgentReview() {\n  const [post, setPost] = useState<LinkedInPostData>({\n    hook: "Excited to introduce our new AI agent architecture!",\n    body: "AgentComposerUI delivers interactive human-in-the-loop cards.",\n    callToAction: "Try it today!",\n    hashtags: ["#AI", "#OpenSource"]\n  });\n  const [status, setStatus] = useState<ComposerStatus>("reviewing");\n\n  return (\n    <LinkedInComposer\n      data={post}\n      status={status}\n      onChange={setPost}\n      onApprove={async (finalData) => {\n        await fetch("/api/publish", { method: "POST", body: JSON.stringify(finalData) });\n        setStatus("approved");\n      }}\n      onReject={async (feedback) => {\n        await fetch("/api/revise", { method: "POST", body: JSON.stringify({ feedback }) });\n        setStatus("streaming");\n      }}\n    />\n  );\n}`,
                        )
                      }
                      className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedKey === "qs-code" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre>{`import { useState } from "react";
import { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";

export function SocialAgentReview() {
  const [post, setPost] = useState<LinkedInPostData>({
    hook: "Excited to introduce our new AI agent architecture!",
    body: "AgentComposerUI delivers interactive human-in-the-loop cards.",
    callToAction: "Try it today!",
    hashtags: ["#AI", "#OpenSource"]
  });
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  return (
    <LinkedInComposer
      data={post}
      status={status}
      onChange={setPost}
      onApprove={async (finalData) => {
        await fetch("/api/publish", { method: "POST", body: JSON.stringify(finalData) });
        setStatus("approved");
      }}
      onReject={async (feedback) => {
        await fetch("/api/revise", { method: "POST", body: JSON.stringify({ feedback }) });
        setStatus("streaming");
      }}
    />
  );
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "linkedin-composer" && (
              <div className="space-y-8 animate-fade-in" id="overview">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Ready in v0.1.0
                    </span>
                    <span className="text-xs text-zinc-400">Social Media Component</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    &lt;LinkedInComposer /&gt;
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    Production-ready, platform-inspired composer with 2-line hook extraction, live fold
                    truncation (...see more), hashtag tag editor, 3,000 char countdown gauge, and
                    human-in-the-loop revision prompts.
                  </p>
                </div>

                {/* ReUI Style Embedded Live Component Preview Frame */}
                <div
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
                  id="preview"
                >
                  {/* Frame Toolbar */}
                  <div className="h-11 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between">
                    {/* Left: Tab Switcher */}
                    <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-lg text-xs">
                      <button
                        onClick={() => setDocTab("preview")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "preview"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => setDocTab("code")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "code"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </button>
                    </div>

                    {/* Right: Viewport Toggles & Copy */}
                    <div className="flex items-center gap-2">
                      {docTab === "preview" && (
                        <div className="hidden sm:flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-lg text-xs">
                          <button
                            onClick={() => setDocViewport("desktop")}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${docViewport === "desktop"
                              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                              }`}
                            title="Desktop View"
                          >
                            <Monitor className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDocViewport("mobile")}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${docViewport === "mobile"
                              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                              }`}
                            title="Mobile View"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() =>
                          handleCopy(
                            "comp-doc-code",
                            `import { useState } from "react";\nimport { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";\n\nexport function SocialReviewCard() {\n  const [draft, setDraft] = useState<LinkedInPostData>({\n    hook: "AgentComposerUI brings native Human-in-the-Loop review to AI agent workflows.",\n    body: "Instead of raw JSON outputs, your agents can now stream structured drafts directly into platform-accurate review cards.",\n    callToAction: "Try it in your stack today!",\n    hashtags: ["#AIAgents", "#React", "#TailwindCSS"]\n  });\n  const [status, setStatus] = useState<ComposerStatus>("reviewing");\n\n  return (\n    <LinkedInComposer\n      data={draft}\n      status={status}\n      onChange={setDraft}\n      onApprove={async (approvedData) => {\n        setStatus("approved");\n        await fetch("/api/publish/linkedin", { method: "POST", body: JSON.stringify(approvedData) });\n      }}\n      onReject={async (feedback) => {\n        setStatus("streaming");\n        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });\n      }}\n    />\n  );\n}`,
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
                      >
                        {copiedKey === "comp-doc-code" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {/* Frame Body */}
                  {docTab === "preview" ? (
                    <div className="p-4 sm:p-8 bg-reui-dots flex justify-center">
                      <div
                        className={`w-full transition-all duration-300 ${docViewport === "mobile" ? "max-w-sm" : "max-w-2xl"
                          }`}
                      >
                        <LinkedInComposer
                          data={docPreviewData}
                          status={docPreviewStatus}
                          onChange={setDocPreviewData}
                          onApprove={async () => {
                            setDocPreviewStatus("approved");
                          }}
                          onReject={async () => {
                            setDocPreviewStatus("streaming");
                            setTimeout(() => setDocPreviewStatus("reviewing"), 1000);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <pre>{`import { useState } from "react";
import { LinkedInComposer, type LinkedInPostData, type ComposerStatus } from "agentcomposerui";

export function SocialReviewCard() {
  const [draft, setDraft] = useState<LinkedInPostData>({
    hook: "AgentComposerUI brings native Human-in-the-Loop review to AI agent workflows.",
    body: "Instead of raw JSON outputs, your agents can now stream structured drafts directly into platform-accurate review cards.",
    callToAction: "Try it in your stack today!",
    hashtags: ["#AIAgents", "#React", "#TailwindCSS"]
  });
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  return (
    <LinkedInComposer
      data={draft}
      status={status}
      onChange={setDraft}
      onApprove={async (approvedData) => {
        setStatus("approved");
        await fetch("/api/publish/linkedin", { method: "POST", body: JSON.stringify(approvedData) });
      }}
      onReject={async (feedback) => {
        setStatus("streaming");
        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });
      }}
    />
  );
}`}</pre>
                    </div>
                  )}
                </div>

                {/* Quick Install */}
                <div id="installation">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    Installation
                  </h2>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center justify-between">
                    <span>bun add agentcomposerui</span>
                    <button
                      onClick={() => handleCopy("comp-inst", "bun add agentcomposerui")}
                      className="hover:text-zinc-400"
                    >
                      {copiedKey === "comp-inst" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Props Table */}
                <div id="props">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                    Props Reference
                  </h2>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px]">
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">data</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">LinkedInPostData</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Object containing hook, body, callToAction, and hashtags.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">status</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">ComposerStatus</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            "idle" | "streaming" | "reviewing" | "approved" | "rejected"
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onApprove
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">(data) =&gt; void</td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when the user clicks Approve & Publish.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onReject
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">
                            (feedback) =&gt; void
                          </td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when the user submits changes with revision feedback.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            showPreview
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">boolean</td>
                          <td className="p-3 text-zinc-400">true</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Toggles the live simulated platform feed preview card.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TwitterThreadComposer Documentation */}
            {/* ============================================================ */}
            {activeSlug === "twitter-composer" && (
              <div className="space-y-8 animate-fade-in" id="overview">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Ready in v0.1.0
                    </span>
                    <span className="text-xs text-zinc-400">Social Media Component</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    &lt;TwitterThreadComposer /&gt;
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    Sequential multi-tweet thread composer with 280-character circular countdown rings,
                    drag-and-drop reordering, one-click sentence splitting, thread hook evaluation, and
                    human-in-the-loop revision prompts.
                  </p>
                </div>

                {/* Embedded Live Component Preview Frame */}
                <div
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
                  id="preview"
                >
                  <div className="h-11 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-lg text-xs">
                      <button
                        onClick={() => setDocTab("preview")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "preview"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => setDocTab("code")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "code"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(
                            "twitter-doc-code",
                            `import { useState } from "react";\nimport { TwitterThreadComposer, type TwitterThreadData, type ComposerStatus } from "agentcomposerui";\n\nexport function TwitterAgentReview() {\n  const [thread, setThread] = useState<TwitterThreadData>({\n    topic: "AI Agents",\n    tweets: [\n      { id: "1", text: "1/ Why AI agents need Human-in-the-Loop review." },\n      { id: "2", text: "2/ Drop-in platform cards provide the missing visual layer." }\n    ],\n    hashtags: ["#AI", "#OpenSource"]\n  });\n  const [status, setStatus] = useState<ComposerStatus>("reviewing");\n\n  return (\n    <TwitterThreadComposer\n      data={thread}\n      status={status}\n      onChange={setThread}\n      onApprove={async (data) => {\n        await fetch("/api/publish/twitter", { method: "POST", body: JSON.stringify(data) });\n        setStatus("approved");\n      }}\n      onReject={async (feedback) => {\n        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });\n        setStatus("streaming");\n      }}\n    />\n  );\n}`,
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
                      >
                        {copiedKey === "twitter-doc-code" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {docTab === "preview" ? (
                    <div className="p-4 sm:p-8 bg-zinc-100/50 dark:bg-zinc-900/40 flex justify-center">
                      <div className="w-full max-w-2xl">
                        <TwitterThreadComposer
                          data={docTwitterData}
                          status={docTwitterStatus}
                          onChange={setDocTwitterData}
                          onApprove={async () => {
                            setDocTwitterStatus("approved");
                          }}
                          onReject={async () => {
                            setDocTwitterStatus("streaming");
                            setTimeout(() => setDocTwitterStatus("reviewing"), 1200);
                          }}
                          author={{
                            name: "John Doe",
                            handle: "johndoe",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <pre>{`import { useState } from "react";
import { TwitterThreadComposer, type TwitterThreadData, type ComposerStatus } from "agentcomposerui";

export function TwitterAgentReview() {
  const [thread, setThread] = useState<TwitterThreadData>({
    topic: "AI Agents",
    tweets: [
      { id: "1", text: "1/ Why AI agents need Human-in-the-Loop review." },
      { id: "2", text: "2/ Drop-in platform cards provide the missing visual layer." }
    ],
    hashtags: ["#AI", "#OpenSource"]
  });
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  return (
    <TwitterThreadComposer
      data={thread}
      status={status}
      onChange={setThread}
      onApprove={async (data) => {
        await fetch("/api/publish/twitter", { method: "POST", body: JSON.stringify(data) });
        setStatus("approved");
      }}
      onReject={async (feedback) => {
        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });
        setStatus("streaming");
      }}
    />
  );
}`}</pre>
                    </div>
                  )}
                </div>

                {/* LLM Tool Schema */}
                <div id="llm-tools">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    OpenAI & Claude Tool Schema
                  </h2>
                  <p className="text-xs text-zinc-500 mb-3">
                    Register{" "}
                    <code className="text-zinc-900 dark:text-zinc-100 font-mono">
                      twitterThreadJsonSchema
                    </code>{" "}
                    with your LLM tools:
                  </p>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <pre>{`import { twitterThreadJsonSchema } from "agentcomposerui";

export const twitterTool = {
  type: "function",
  function: {
    name: "compose_twitter_thread",
    description: "Generate a multi-tweet thread adhering to 280-char limits per tweet.",
    parameters: twitterThreadJsonSchema,
  },
};`}</pre>
                  </div>
                </div>

                {/* Props Table */}
                <div id="props">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
                    Props Reference
                  </h2>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px]">
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">data</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">TwitterThreadData</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Object containing tweets array (max 280 chars each), topic, and hashtags.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">status</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">ComposerStatus</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            "idle" | "streaming" | "reviewing" | "approved" | "rejected"
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onApprove
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">(data) =&gt; void</td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when the user clicks Publish Thread.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onReject
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">
                            (feedback) =&gt; void
                          </td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when user requests revisions with targeted instructions.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">author</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">TwitterAuthorProps</td>
                          <td className="p-3 text-zinc-400">default</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Twitter user details: name, handle, avatar URL, and verified badge.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* EmailOutreachComposer Documentation */}
            {/* ============================================================ */}
            {activeSlug === "email-composer" && (
              <div className="space-y-8 animate-fade-in" id="overview">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Ready in v0.1.0
                    </span>
                    <span className="text-xs text-zinc-400">Outreach & Newsletter Component</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    &lt;EmailOutreachComposer /&gt;
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    Cold outreach and newsletter review card with subject line impact analyzer, token
                    variable insertions (&#123;&#123;firstName&#125;&#125;), spam trigger word
                    detection, reading pane simulation, and schedule delay controls.
                  </p>
                </div>

                {/* Embedded Live Component Preview Frame */}
                <div
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
                  id="preview"
                >
                  <div className="h-11 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-lg text-xs">
                      <button
                        onClick={() => setDocTab("preview")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "preview"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => setDocTab("code")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "code"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(
                            "email-doc-code",
                            `import { useState } from "react";\nimport { EmailOutreachComposer, type EmailDraftData, type ComposerStatus } from "agentcomposerui";\n\nexport function EmailAgentReview() {\n  const [email, setEmail] = useState<EmailDraftData>({\n    to: "founder@startup.com",\n    subject: "Scaling {{company}}'s AI workflows",\n    body: "Hi {{firstName}},\\n\\nLoved your recent launch at {{company}}.",\n    signature: "Best,\\nAlex",\n    tokens: { firstName: "Sarah", company: "Acme" }\n  });\n  const [status, setStatus] = useState<ComposerStatus>("reviewing");\n\n  return (\n    <EmailOutreachComposer\n      data={email}\n      status={status}\n      onChange={setEmail}\n      onApprove={async (data) => {\n        await fetch("/api/email/send", { method: "POST", body: JSON.stringify(data) });\n        setStatus("approved");\n      }}\n      onReject={async (feedback) => {\n        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });\n        setStatus("streaming");\n      }}\n    />\n  );\n}`,
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
                      >
                        {copiedKey === "email-doc-code" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {docTab === "preview" ? (
                    <div className="p-4 sm:p-8 bg-zinc-100/50 dark:bg-zinc-900/40 flex justify-center">
                      <div className="w-full max-w-2xl">
                        <EmailOutreachComposer
                          data={docEmailData}
                          status={docEmailStatus}
                          onChange={setDocEmailData}
                          onApprove={async () => {
                            setDocEmailStatus("approved");
                          }}
                          onReject={async () => {
                            setDocEmailStatus("streaming");
                            setTimeout(() => setDocEmailStatus("reviewing"), 1200);
                          }}
                          senderName="John Doe"
                          senderEmail="example@gmail.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <pre>{`import { useState } from "react";
import { EmailOutreachComposer, type EmailDraftData, type ComposerStatus } from "agentcomposerui";

export function EmailAgentReview() {
  const [email, setEmail] = useState<EmailDraftData>({
    to: "founder@startup.com",
    subject: "Scaling {{company}}'s AI workflows",
    body: "Hi {{firstName}},\\n\\nLoved your recent launch at {{company}}.",
    signature: "Best,\\nAlex",
    tokens: { firstName: "Sarah", company: "Acme" }
  });
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  return (
    <EmailOutreachComposer
      data={email}
      status={status}
      onChange={setEmail}
      onApprove={async (data) => {
        await fetch("/api/email/send", { method: "POST", body: JSON.stringify(data) });
        setStatus("approved");
      }}
      onReject={async (feedback) => {
        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });
        setStatus("streaming");
      }}
    />
  );
}`}</pre>
                    </div>
                  )}
                </div>

                {/* LLM Tool Schema */}
                <div id="llm-tools">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    OpenAI & Claude Tool Schema
                  </h2>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <pre>{`import { emailDraftJsonSchema } from "agentcomposerui";

export const emailOutreachTool = {
  type: "function",
  function: {
    name: "compose_email_outreach",
    description: "Draft personalized cold outreach or newsletter message.",
    parameters: emailDraftJsonSchema,
  },
};`}</pre>
                  </div>
                </div>

                {/* Props Table */}
                <div id="props">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
                    Props Reference
                  </h2>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px]">
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">data</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">EmailDraftData</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Object containing to, subject, previewText, body, signature, tokens.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">status</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">ComposerStatus</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            "idle" | "streaming" | "reviewing" | "approved" | "rejected"
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onApprove
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">(data) =&gt; void</td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when user schedules or sends the approved email.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            showSubjectAnalyzer
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">boolean</td>
                          <td className="p-3 text-zinc-400">true</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Toggles subject line impact meter and spam trigger alert box.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* GitHubPRComposer Documentation */}
            {/* ============================================================ */}
            {activeSlug === "github-composer" && (
              <div className="space-y-8 animate-fade-in" id="overview">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Ready in v0.1.0
                    </span>
                    <span className="text-xs text-zinc-400">Developer Agent Component</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    &lt;GitHubPRComposer /&gt;
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    Automated pull request and issue draft reviewer with markdown diff preview, AI
                    change summary checklist, reviewer assigner, conventional commit linting, and branch
                    target selector.
                  </p>
                </div>

                {/* Embedded Live Component Preview Frame */}
                <div
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
                  id="preview"
                >
                  <div className="h-11 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-lg text-xs">
                      <button
                        onClick={() => setDocTab("preview")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "preview"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => setDocTab("code")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${docTab === "code"
                          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(
                            "github-doc-code",
                            `import { useState } from "react";\nimport { GitHubPRComposer, type GitHubPRData, type ComposerStatus } from "agentcomposerui";\n\nexport function PRAgentReview() {\n  const [pr, setPr] = useState<GitHubPRData>({\n    title: "feat(auth): add OAuth2 provider support",\n    targetBranch: "main",\n    sourceBranch: "feat/oauth2",\n    body: "## Summary\\n\\nImplements Google and GitHub OAuth providers.",\n    checklist: [{ label: "Unit tests added", completed: true }],\n    reviewers: ["octocat"]\n  });\n  const [status, setStatus] = useState<ComposerStatus>("reviewing");\n\n  return (\n    <GitHubPRComposer\n      data={pr}\n      status={status}\n      onChange={setPr}\n      onApprove={async (data) => {\n        await fetch("/api/github/pr", { method: "POST", body: JSON.stringify(data) });\n        setStatus("approved");\n      }}\n      onReject={async (feedback) => {\n        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });\n        setStatus("streaming");\n      }}\n    />\n  );\n}`,
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
                      >
                        {copiedKey === "github-doc-code" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {docTab === "preview" ? (
                    <div className="p-4 sm:p-8 bg-zinc-100/50 dark:bg-zinc-900/40 flex justify-center">
                      <div className="w-full max-w-2xl">
                        <GitHubPRComposer
                          data={docGithubData}
                          status={docGithubStatus}
                          onChange={setDocGithubData}
                          onApprove={async () => {
                            setDocGithubStatus("approved");
                          }}
                          onReject={async () => {
                            setDocGithubStatus("streaming");
                            setTimeout(() => setDocGithubStatus("reviewing"), 1200);
                          }}
                          repoName="theajmalrazaq/agentcomposerui"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <pre>{`import { useState } from "react";
import { GitHubPRComposer, type GitHubPRData, type ComposerStatus } from "agentcomposerui";

export function PRAgentReview() {
  const [pr, setPr] = useState<GitHubPRData>({
    title: "feat(auth): add OAuth2 provider support",
    targetBranch: "main",
    sourceBranch: "feat/oauth2",
    body: "## Summary\\n\\nImplements Google and GitHub OAuth providers.",
    checklist: [{ label: "Unit tests added", completed: true }],
    reviewers: ["octocat"]
  });
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  return (
    <GitHubPRComposer
      data={pr}
      status={status}
      onChange={setPr}
      onApprove={async (data) => {
        await fetch("/api/github/pr", { method: "POST", body: JSON.stringify(data) });
        setStatus("approved");
      }}
      onReject={async (feedback) => {
        await fetch("/api/agent/revise", { method: "POST", body: JSON.stringify({ feedback }) });
        setStatus("streaming");
      }}
    />
  );
}`}</pre>
                    </div>
                  )}
                </div>

                {/* LLM Tool Schema */}
                <div id="llm-tools">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    OpenAI & Claude Tool Schema
                  </h2>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <pre>{`import { gitHubPRJsonSchema } from "agentcomposerui";

export const gitHubPRTool = {
  type: "function",
  function: {
    name: "compose_github_pr",
    description: "Create an automated pull request with title, checklist, and markdown diff.",
    parameters: gitHubPRJsonSchema,
  },
};`}</pre>
                  </div>
                </div>

                {/* Props Table */}
                <div id="props">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
                    Props Reference
                  </h2>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px]">
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">data</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">GitHubPRData</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Object containing title, targetBranch, sourceBranch, body, checklist,
                            reviewers.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">status</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">ComposerStatus</td>
                          <td className="p-3 text-zinc-400">required</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            "idle" | "streaming" | "reviewing" | "approved" | "rejected"
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            onApprove
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">(data) =&gt; void</td>
                          <td className="p-3 text-zinc-400">undefined</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Callback fired when user approves and dispatches the pull request.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-zinc-900 dark:text-zinc-100 font-semibold">
                            showChecklist
                          </td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">boolean</td>
                          <td className="p-3 text-zinc-400">true</td>
                          <td className="p-3 font-sans text-zinc-600 dark:text-zinc-300">
                            Toggles interactive verification checklist.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "compound-components" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Compound Components Architecture
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Need to customize the layout, reorder sections, or inject your own custom buttons?
                    Use the Compound Component API.
                  </p>
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                  <button
                    onClick={() =>
                      handleCopy(
                        "compound-code",
                        `<LinkedInComposer.Root data={post} status={status} onApprove={handleApprove}>\n  <LinkedInComposer.Header>\n    <LinkedInComposer.Author name="Jane Doe" title="Tech Founder" />\n    <LinkedInComposer.StageIndicator />\n  </LinkedInComposer.Header>\n\n  <LinkedInComposer.Editor />\n  <LinkedInComposer.HashtagBar />\n  <LinkedInComposer.MediaDropzone />\n  <LinkedInComposer.Preview />\n\n  <LinkedInComposer.Actions>\n    <LinkedInComposer.CharacterCount limit={3000} />\n    <div className="flex gap-2">\n      <LinkedInComposer.RejectButton />\n      <LinkedInComposer.ApproveButton />\n    </div>\n  </LinkedInComposer.Actions>\n</LinkedInComposer.Root>`,
                      )
                    }
                    className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "compound-code" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre>{`<LinkedInComposer.Root data={post} status={status} onApprove={handleApprove}>
  <LinkedInComposer.Header>
    <LinkedInComposer.Author name="Jane Doe" title="Tech Founder" />
    <LinkedInComposer.StageIndicator />
  </LinkedInComposer.Header>

  <LinkedInComposer.Editor />
  <LinkedInComposer.HashtagBar />
  <LinkedInComposer.MediaDropzone />
  <LinkedInComposer.Preview />

  <LinkedInComposer.Actions>
    <LinkedInComposer.CharacterCount limit={3000} />
    <div className="flex gap-2">
      <LinkedInComposer.RejectButton />
      <LinkedInComposer.ApproveButton />
    </div>
  </LinkedInComposer.Actions>
</LinkedInComposer.Root>`}</pre>
                </div>
              </div>
            )}

            {activeSlug === "use-composer-state" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    useComposerState Hook
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    The native state machine hook powering AgentComposerUI. Manages transition guards,
                    loading state, and revision callbacks.
                  </p>
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                  <pre>{`const {
  data,
  status,
  isLoading,
  feedbackPromptOpen,
  setStatus,
  updateData,
  updateField,
  approve,
  reject,
  openFeedbackPrompt,
  closeFeedbackPrompt,
} = useComposerState({
  initialData: postDraft,
  initialStatus: "reviewing",
  onApprove: async (finalData) => {
    // Dispatch approved post
  },
  onReject: async (feedback) => {
    // Send revision instructions to agent
  },
});`}</pre>
                </div>
              </div>
            )}

            {activeSlug === "openai-integration" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    OpenAI Function Calling
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Register the pre-built tool schema directly in your OpenAI API calls.
                  </p>
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                  <pre>{`import OpenAI from "openai";
import { linkedInPostJsonSchema } from "agentcomposerui";

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Draft a LinkedIn post announcing our open source launch." }],
  tools: [
    {
      type: "function",
      function: {
        name: "compose_linkedin_post",
        description: "Draft a structured LinkedIn post.",
        parameters: linkedInPostJsonSchema,
      },
    },
  ],
});`}</pre>
                </div>
              </div>
            )}

            {activeSlug === "anthropic-integration" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Anthropic Claude Tools
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Use Claude 3.5 Sonnet to draft posts using the exported input_schema.
                  </p>
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                  <button
                    onClick={() =>
                      handleCopy(
                        "anthropic-code",
                        `import Anthropic from "@anthropic-ai/sdk";\nimport { linkedInPostJsonSchema } from "agentcomposerui";\n\nconst anthropic = new Anthropic();\n\nconst response = await anthropic.messages.create({\n  model: "claude-3-5-sonnet-20241022",\n  max_tokens: 1024,\n  tools: [\n    {\n      name: "compose_linkedin_post",\n      description: "Draft an engaging LinkedIn post with hook, body, and tags.",\n      input_schema: linkedInPostJsonSchema,\n    },\n  ],\n  messages: [{ role: "user", content: "Draft a post about AI agent evaluation." }],\n});`,
                      )
                    }
                    className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "anthropic-code" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre>{`import Anthropic from "@anthropic-ai/sdk";
import { linkedInPostJsonSchema } from "agentcomposerui";

const anthropic = new Anthropic();

const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  tools: [
    {
      name: "compose_linkedin_post",
      description: "Draft an engaging LinkedIn post with hook, body, and tags.",
      input_schema: linkedInPostJsonSchema,
    },
  ],
  messages: [{ role: "user", content: "Draft a post about AI agent evaluation." }],
});`}</pre>
                </div>
              </div>
            )}

            {activeSlug === "gemini-integration" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Google Gen AI SDK
                    </span>
                    <span className="text-xs text-zinc-400">Function Calling</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Google Gemini Tools
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Connect Gemini 2.5 Flash or Pro models to AgentComposerUI using structured function
                    declarations.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex gap-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <Info className="w-4 h-4 text-zinc-900 dark:text-zinc-100 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Gemini Function Declaration
                    </strong>
                    <p className="mt-1">
                      Gemini expects a OpenAPI-compatible schema under{" "}
                      <code className="font-mono">functionDeclarations</code>. You can pass{" "}
                      <code className="font-mono">linkedInPostJsonSchema</code> directly into your model
                      configuration.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    Example: Gemini API with Google GenAI SDK
                  </h2>
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <button
                      onClick={() =>
                        handleCopy(
                          "gemini-code",
                          `import { GoogleGenAI, Type } from "@google/genai";\nimport { linkedInPostJsonSchema } from "agentcomposerui";\n\nconst ai = new GoogleGenAI();\n\nconst response = await ai.models.generateContent({\n  model: "gemini-2.5-flash",\n  contents: "Write a high-engagement LinkedIn post about our new agent framework.",\n  config: {\n    tools: [\n      {\n        functionDeclarations: [\n          {\n            name: "compose_linkedin_post",\n            description: "Draft an engaging LinkedIn post with hook, body, and tags.",\n            parameters: linkedInPostJsonSchema,\n          },\n        ],\n      },\n    ],\n  },\n});\n\n// Extract the structured post data\nconst functionCall = response.functionCalls?.[0];\nif (functionCall && functionCall.name === "compose_linkedin_post") {\n  const postData = functionCall.args; // Passes directly to <LinkedInComposer data={postData} />\n}`,
                        )
                      }
                      className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedKey === "gemini-code" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre>{`import { GoogleGenAI, Type } from "@google/genai";
import { linkedInPostJsonSchema } from "agentcomposerui";

const ai = new GoogleGenAI();

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Write a high-engagement LinkedIn post about our new agent framework.",
  config: {
    tools: [
      {
        functionDeclarations: [
          {
            name: "compose_linkedin_post",
            description: "Draft an engaging LinkedIn post with hook, body, and tags.",
            parameters: linkedInPostJsonSchema,
          },
        ],
      },
    ],
  },
});

// Extract the structured post data
const functionCall = response.functionCalls?.[0];
if (functionCall && functionCall.name === "compose_linkedin_post") {
  const postData = functionCall.args;
  // Feed into your UI state:
  // setDraft(postData);
  // setStatus("reviewing");
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "vercel-ai-sdk" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      Generative UI
                    </span>
                    <span className="text-xs text-zinc-400">Framework Adapter</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Vercel AI SDK Bridge
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Stream generative UI components directly into your chat streams using Vercel AI
                    SDK's <code className="font-mono">tool</code> definitions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1. Server Action / Route Handler with Zod Schema
                  </h2>
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <button
                      onClick={() =>
                        handleCopy(
                          "ai-sdk-server",
                          `import { streamText, tool } from "ai";\nimport { openai } from "@ai-sdk/openai";\nimport { linkedInPostSchema } from "agentcomposerui";\n\nexport async function POST(req: Request) {\n  const { messages } = await req.json();\n\n  const result = streamText({\n    model: openai("gpt-4o"),\n    messages,\n    tools: {\n      composeLinkedInPost: tool({\n        description: "Draft a structured LinkedIn post.",\n        parameters: linkedInPostSchema,\n        execute: async (postData) => {\n          // Return draft to client for human review\n          return { status: "ready_for_review", draft: postData };\n        },\n      }),\n    },\n  });\n\n  return result.toDataStreamResponse();\n}`,
                        )
                      }
                      className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedKey === "ai-sdk-server" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre>{`import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { linkedInPostSchema } from "agentcomposerui";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      composeLinkedInPost: tool({
        description: "Draft a structured LinkedIn post with hook, body, and tags.",
        parameters: linkedInPostSchema,
        execute: async (postData) => {
          return { status: "ready_for_review", draft: postData };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}`}</pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    2. Client Chat Component with &lt;LinkedInComposer /&gt;
                  </h2>
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <button
                      onClick={() =>
                        handleCopy(
                          "ai-sdk-client",
                          `"use client";\n\nimport { useChat } from "ai/react";\nimport { LinkedInComposer } from "agentcomposerui";\n\nexport function AgentChat() {\n  const { messages, addToolResult } = useChat();\n\n  return (\n    <div className="space-y-4">\n      {messages.map((message) => (\n        <div key={message.id}>\n          {message.content}\n          {message.toolInvocations?.map((toolInvocation) => {\n            if (toolInvocation.toolName === "composeLinkedInPost") {\n              const isCompleted = "result" in toolInvocation;\n              const draft = isCompleted ? toolInvocation.result.draft : toolInvocation.args;\n\n              return (\n                <div key={toolInvocation.toolCallId} className="my-4">\n                  <LinkedInComposer\n                    data={draft}\n                    status={isCompleted ? "reviewing" : "streaming"}\n                    onApprove={async (approvedData) => {\n                      addToolResult({\n                        toolCallId: toolInvocation.toolCallId,\n                        result: { approved: true, post: approvedData },\n                      });\n                    }}\n                    onReject={async (feedback) => {\n                      addToolResult({\n                        toolCallId: toolInvocation.toolCallId,\n                        result: { approved: false, revisionFeedback: feedback },\n                      });\n                    }}\n                  />\n                </div>\n              );\n            }\n            return null;\n          })}\n        </div>\n      ))}\n    </div>\n  );\n}`,
                        )
                      }
                      className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedKey === "ai-sdk-client" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre>{`"use client";

import { useChat } from "ai/react";
import { LinkedInComposer } from "agentcomposerui";

export function AgentChat() {
  const { messages, addToolResult } = useChat();

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id}>
          {m.toolInvocations?.map((inv) => {
            if (inv.toolName === "composeLinkedInPost") {
              const draft = "result" in inv ? inv.result.draft : inv.args;

              return (
                <div key={inv.toolCallId} className="my-4">
                  <LinkedInComposer
                    data={draft}
                    status={"result" in inv ? "reviewing" : "streaming"}
                    onApprove={async (approvedData) => {
                      addToolResult({
                        toolCallId: inv.toolCallId,
                        result: { approved: true, post: approvedData },
                      });
                    }}
                    onReject={async (feedback) => {
                      addToolResult({
                        toolCallId: inv.toolCallId,
                        result: { approved: false, revisionFeedback: feedback },
                      });
                    }}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "copilotkit" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                      CopilotKit Action
                    </span>
                    <span className="text-xs text-zinc-400">Render Bridge</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    CopilotKit Integration
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Render interactive, human-in-the-loop composer cards directly in CopilotKit copilot
                    sidebars and popups using <code className="font-mono">useCopilotAction</code>.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    Example: useCopilotAction with &lt;LinkedInComposer /&gt;
                  </h2>
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                    <button
                      onClick={() =>
                        handleCopy(
                          "copilot-code",
                          `import { useCopilotAction } from "@copilotkit/react-core";\nimport { LinkedInComposer, type LinkedInPostData } from "agentcomposerui";\n\nexport function SocialAgentCopilot() {\n  useCopilotAction({\n    name: "composeLinkedInPost",\n    description: "Generate a drafted LinkedIn post for user review.",\n    parameters: [\n      { name: "hook", type: "string", description: "Catchy opening line.", required: true },\n      { name: "body", type: "string", description: "Body of the post.", required: true },\n      { name: "callToAction", type: "string", description: "CTA line.", required: false },\n      { name: "hashtags", type: "string[]", description: "List of hashtags.", required: false },\n    ],\n    render: ({ status, args, handler }) => {\n      const postData: LinkedInPostData = {\n        hook: args.hook || "",\n        body: args.body || "",\n        callToAction: args.callToAction,\n        hashtags: args.hashtags || [],\n      };\n\n      return (\n        <div className="p-2">\n          <LinkedInComposer\n            data={postData}\n            status={status === "executing" ? "streaming" : "reviewing"}\n            onApprove={async (finalData) => {\n              await handler({ approved: true, post: finalData });\n            }}\n            onReject={async (feedback) => {\n              await handler({ approved: false, feedback });\n            }}\n          />\n        </div>\n      );\n    },\n  });\n\n  return <div>Your application content...</div>;\n}`,
                        )
                      }
                      className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedKey === "copilot-code" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre>{`import { useCopilotAction } from "@copilotkit/react-core";
import { LinkedInComposer, type LinkedInPostData } from "agentcomposerui";

export function SocialAgentCopilot() {
  useCopilotAction({
    name: "composeLinkedInPost",
    description: "Generate a drafted LinkedIn post for user review.",
    parameters: [
      { name: "hook", type: "string", description: "Catchy opening line.", required: true },
      { name: "body", type: "string", description: "Body of the post.", required: true },
      { name: "callToAction", type: "string", description: "CTA line.", required: false },
      { name: "hashtags", type: "string[]", description: "List of hashtags.", required: false },
    ],
    render: ({ status, args, handler }) => {
      const postData: LinkedInPostData = {
        hook: args.hook || "",
        body: args.body || "",
        callToAction: args.callToAction,
        hashtags: args.hashtags || [],
      };

      return (
        <div className="p-2">
          <LinkedInComposer
            data={postData}
            status={status === "executing" ? "streaming" : "reviewing"}
            onApprove={async (finalData) => {
              await handler({ approved: true, post: finalData });
            }}
            onReject={async (feedback) => {
              await handler({ approved: false, feedback });
            }}
          />
        </div>
      );
    },
  });

  return <div>Your application content...</div>;
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeSlug === "theming" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                    Theming & CSS Variables
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    AgentComposerUI uses clean CSS custom properties that you can override in your CSS:
                  </p>
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
                  <pre>{`:root {
  --acu-primary: 240 5.9% 10%;       /* Brand action (crisp black in light mode) */
  --acu-radius: 0.75rem;             /* Corner radius */
  --acu-background: 0 0% 100%;       /* Surface background */
  --acu-foreground: 240 10% 3.9%;    /* Main text */
  --acu-border: 240 5.9% 90%;        /* Borders */
}

.dark {
  --acu-background: 240 10% 3.9%;
  --acu-foreground: 0 0% 98%;
  --acu-primary: 0 0% 98%;           /* Pure crisp white in dark mode */
  --acu-border: 240 3.7% 15.9%;
}`}</pre>
                </div>
              </div>
            )}

            {/* Next / Previous ReUI Style Pagination Cards */}
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevItem ? (
                <button
                  onClick={() => {
                    onSelectSlug(prevItem.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous</span>
                  </div>
                  <div className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {prevItem.title}
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextItem && (
                <button
                  onClick={() => {
                    onSelectSlug(nextItem.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 text-right transition-all group sm:col-start-2 cursor-pointer"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {nextItem.title}
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ReUI Right Sidebar: Table of Contents & Community */}
      <aside className="hidden xl:block w-56 shrink-0 sticky top-20 self-start space-y-6">
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 font-semibold">
            On this page
          </h4>
          <ul className="space-y-2 text-xs">
            {tocItems.map((toc) => (
              <li key={toc.id}>
                <a
                  href={`#${toc.id}`}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {toc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <h5 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
            Community
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://github.com/theajmalrazaq/agentcomposerui"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>Edit on GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/theajmalrazaq/agentcomposerui/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>Report an issue</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/theajmalrazaq/agentcomposerui"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>Star repository</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
