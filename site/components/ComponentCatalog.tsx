import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  ArrowRight,
  Play,
  Check,
  Mail,
  GitBranch,
} from "lucide-react";
import { LinkedInIcon, XTwitterIcon, GitHubIcon } from "./BrandIcons";
import type { ComposerStatus } from "../../src/types";
import type { DocSlug } from "../types";

interface ComponentCatalogProps {
  onSelectDoc: (slug: DocSlug) => void;
  onOpenPlayground: () => void;
}

type CategoryFilter = "all" | "social" | "email" | "dev";

export function ComponentCatalog({ onSelectDoc, onOpenPlayground }: ComponentCatalogProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [miniStatus, setMiniStatus] = useState<Record<string, ComposerStatus>>({
    linkedin: "reviewing",
    twitter: "reviewing",
    email: "reviewing",
    github: "reviewing",
  });

  const handleMiniAction = (id: string, status: ComposerStatus) => {
    setMiniStatus((prev) => ({ ...prev, [id]: status }));
    setTimeout(() => {
      setMiniStatus((prev) => ({ ...prev, [id]: "reviewing" }));
    }, 2200);
  };

  const components = [
    {
      id: "linkedin",
      title: "LinkedInComposer",
      category: "social",
      categoryLabel: "Social Media",
      status: "ready",
      version: "v0.1.3",
      description:
        "Full-featured post composer with 2-line hook extraction, live fold truncation simulation (...see more), hashtag tag editor, 3,000 char countdown gauge, and human-in-the-loop revision prompts.",
      features: [
        "Structured Hook & Body editing",
        "Realistic Desktop/Mobile Feed preview",
        "Interactive Hashtag pill adder",
        "Media Dropzone simulator",
        "OpenAI, Claude, Gemini Schemas",
      ],
      docSlug: "linkedin-composer" as DocSlug,
      isInteractive: true,
    },
    {
      id: "twitter",
      title: "TwitterThreadComposer",
      category: "social",
      categoryLabel: "Social Media",
      status: "ready",
      version: "v0.1.3",
      description:
        "Sequential multi-tweet thread composer with 280-character circular progress rings, drag-and-drop tweet reordering, media attachment chips, and thread break markers.",
      features: [
        "Multi-card thread visualization",
        "280-character SVG countdown ring",
        "Thread hook hook-strength indicator",
        "One-click thread split by sentence",
        "OpenAI & Claude JSON Tool Schemas",
      ],
      docSlug: "twitter-composer" as DocSlug,
      isInteractive: true,
    },
    {
      id: "email",
      title: "EmailOutreachComposer",
      category: "email",
      categoryLabel: "Email & Outreach",
      status: "ready",
      version: "v0.1.3",
      description:
        "Cold outreach and newsletter review card with subject line impact analyzer, token variable insertions ({{firstName}}), spam word highlights, and schedule delay controls.",
      features: [
        "Subject line A/B test variations",
        "Dynamic template token chips",
        "Spam trigger word detection",
        "Sender signature preview",
        "Inbox reading pane preview",
      ],
      docSlug: "email-composer" as DocSlug,
      isInteractive: true,
    },
    {
      id: "github",
      title: "GitHubPRComposer",
      category: "dev",
      categoryLabel: "Developer Agents",
      status: "ready",
      version: "v0.1.3",
      description:
        "Automated pull request and issue draft reviewer with markdown diff preview, AI change summary checklist, reviewers assigner, and branch target selector.",
      features: [
        "Markdown change checklist",
        "PR template section validation",
        "Reviewer tagging interface",
        "Conventional commit type detector",
        "Files changed diff inspection",
      ],
      docSlug: "github-composer" as DocSlug,
      isInteractive: true,
    },
  ];

  const filtered = filter === "all" ? components : components.filter((c) => c.category === filter);

  const renderPreview = (id: string) => {
    const currentStatus = miniStatus[id];

    if (id === "linkedin") {
      return (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-3.5 text-xs select-none transition-all">
          {/* Top bar with avatar & status */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-[#0a66c2] flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-blue-500/30">
                <LinkedInIcon className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                  <span>Autonomous Content Agent</span>
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-normal">· 1st</span>
                </div>
                <div className="text-[10px] text-zinc-600 dark:text-zinc-400 truncate">
                  AI Growth Copilot • 2m ago
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${currentStatus === "approved"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : currentStatus === "streaming"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse border border-amber-500/30"
                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                }`}
            >
              {currentStatus === "approved"
                ? "✓ Scheduled"
                : currentStatus === "streaming"
                  ? "Revising..."
                  : "Reviewing"}
            </span>
          </div>

          {/* Post hook & content preview */}
          <div className="space-y-1 mb-2.5 text-zinc-800 dark:text-zinc-200 leading-snug">
            <p className="font-semibold text-zinc-950 dark:text-zinc-100">
              Why 90% of autonomous AI agents fail in production 👇
            </p>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2">
              It is rarely model intelligence. It is the absence of reliable human-in-the-loop review
              checkpoints before execution...{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">see more</span>
            </p>
            <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-blue-600 dark:text-blue-400 font-mono">
              <span>#agenticAI</span>
              <span>#typescript</span>
              <span>#generativeUI</span>
            </div>
          </div>

          {/* Action bar inside preview */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
              {currentStatus === "approved" ? "Queued for 09:00 AM" : "3,000 char quota"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("linkedin", "streaming");
                }}
                className="px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("linkedin", "approved");
                }}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#0a66c2] hover:bg-[#004182] text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>{currentStatus === "approved" ? "Approved" : "Approve"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (id === "twitter") {
      return (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-3.5 text-xs select-none transition-all">
          {/* Top bar with X logo */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-zinc-300 dark:ring-zinc-700">
                <XTwitterIcon className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                  <span>DevRel Agent</span>
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-normal">@agent_dev</span>
                </div>
                <div className="text-[10px] text-zinc-600 dark:text-zinc-400">Thread · 3 Tweets</div>
              </div>
            </div>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${currentStatus === "approved"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : currentStatus === "streaming"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse border border-amber-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                }`}
            >
              {currentStatus === "approved"
                ? "✓ Published"
                : currentStatus === "streaming"
                  ? "Re-splitting..."
                  : "Reviewing"}
            </span>
          </div>

          {/* Thread visual items with connector line */}
          <div className="space-y-1.5 relative mb-2.5 pl-3">
            <div className="absolute left-[3px] top-1.5 bottom-1.5 w-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="text-[11px] text-zinc-800 dark:text-zinc-200 leading-snug">
              <span className="font-semibold text-zinc-900 dark:text-white">1/3</span> Building
              human-in-the-loop AI interfaces is the single highest leverage skill right now. 🧵
            </div>
            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug truncate">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">2/3</span> Give agents
              structured schema outputs, but let humans approve the final trigger...
            </div>
          </div>

          {/* Action bar inside preview */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>280 chars / tweet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("twitter", "streaming");
                }}
                className="px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("twitter", "approved");
                }}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 flex items-center gap-1 shadow-xs transition-opacity cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>{currentStatus === "approved" ? "Posted" : "Post Thread"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (id === "email") {
      return (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-3.5 text-xs select-none transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-rose-500/30">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">Outreach Agent</div>
                <div className="text-[10px] text-zinc-600 dark:text-zinc-400 truncate">
                  To: sarah.chen@enterprise.io
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${currentStatus === "approved"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : currentStatus === "streaming"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse border border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                }`}
            >
              {currentStatus === "approved"
                ? "✓ Dispatched"
                : currentStatus === "streaming"
                  ? "Re-scoring..."
                  : "Spam: 0/10"}
            </span>
          </div>

          {/* Email Subject & Body Snippet */}
          <div className="space-y-1 mb-2.5">
            <div className="text-[11px] font-semibold text-zinc-900 dark:text-white truncate">
              Subject: Scaling agent UI workflows at {"{{company}}"}
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-snug">
              Hi Sarah, noticed your team recently started scaling multi-agent orchestrations. We built
              a high-performance React composer to keep humans in control...
            </p>
            <div className="flex items-center gap-1 pt-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                {"{{firstName}}"}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                {"{{company}}"}
              </span>
            </div>
          </div>

          {/* Action bar inside preview */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
              {currentStatus === "approved" ? "Sent via Resend" : "Personalized draft"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("email", "streaming");
                }}
                className="px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Revise
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMiniAction("email", "approved");
                }}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>{currentStatus === "approved" ? "Sent" : "Send Email"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // GitHub PR Composer
    return (
      <div className="w-full max-w-sm rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-3.5 text-xs select-none transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-purple-500/30">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>PR Review Agent</span>
                <GitHubIcon className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                main ← feat/agent-loop
              </div>
            </div>
          </div>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${currentStatus === "approved"
              ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
              : currentStatus === "streaming"
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse border border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              }`}
          >
            {currentStatus === "approved"
              ? "✓ Merged"
              : currentStatus === "streaming"
                ? "Re-running CI..."
                : "CI Passing (42/42)"}
          </span>
        </div>

        {/* PR Title & Diff Stats */}
        <div className="space-y-1 mb-2.5">
          <div className="text-[11px] font-semibold text-zinc-900 dark:text-white truncate">
            feat(core): add human-in-the-loop review card #142
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">+128</span>
            <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">-24</span>
            <span className="text-zinc-600 dark:text-zinc-400">4 files changed</span>
          </div>
          <div className="space-y-0.5 pt-0.5 text-[10px] text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Automated tests and schemas validated</span>
            </div>
          </div>
        </div>

        {/* Action bar inside preview */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
          <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
            {currentStatus === "approved" ? "Merged into main" : "Ready to merge"}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleMiniAction("github", "streaming");
              }}
              className="px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Changes
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleMiniAction("github", "approved");
              }}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>{currentStatus === "approved" ? "Merged" : "Merge PR"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Production Composer Cards
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 max-w-xl">
            Pre-built, platform-inspired composers with native state management and standard LLM
            schemas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "all"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
          >
            All Components ({components.length})
          </button>
          <button
            onClick={() => setFilter("social")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "social"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setFilter("email")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "email"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
          >
            Outreach & Email
          </button>
          <button
            onClick={() => setFilter("dev")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "dev"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
          >
            Developer Agents
          </button>
        </div>
      </motion.div>

      {/* Grid of Components with top visual preview canvas (matches reference style) */}
      <div key={filter} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: idx * 0.05, ease: "easeOut" }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs hover:shadow-md group"
          >
            {/* Dedicated Top Preview Canvas (matches reference style) */}
            <div className="relative p-5 sm:p-7 bg-zinc-50/90 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 min-h-[220px] flex items-center justify-center overflow-hidden bg-reui-dots">
              {renderPreview(item.id)}
            </div>

            {/* Bottom Details Section */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.categoryLabel}
                    </span>
                    {item.status === "ready" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        <span>{item.version} Ready</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        <Clock className="w-3 h-3" />
                        <span>Coming in {item.version}</span>
                      </span>
                    )}
                  </div>

                  {item.isInteractive && (
                    <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                      Interactive Preview
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-mono flex items-center gap-2">
                  <span>&lt;{item.title} /&gt;</span>
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2 mb-6">
                  {item.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                {item.isInteractive ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onSelectDoc(item.docSlug)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer"
                    >
                      <span>Read Documentation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onOpenPlayground}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Open Playground</span>
                    </button>
                  </>
                ) : (
                  <div className="text-xs text-zinc-400 italic">
                    In active development — stay tuned for updates!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
