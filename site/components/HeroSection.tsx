import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import {
  OpenAIIcon,
  ClaudeIcon,
  GeminiIcon,
  CopilotKitIcon,
  VercelIcon,
} from "./BrandIcons";
import heroBg from "../assets/hero-bg.jpg";
import type { SiteView } from "../types";

interface HeroSectionProps {
  onNavigate: (view: SiteView) => void;
}

type PackageManager = "bun" | "pnpm" | "npm" | "yarn";

const AI_SETUP_PROMPT = `Inspect this repository to detect the active package manager (check for bun.lock / bun.lockb, pnpm-lock.yaml, yarn.lock, or package-lock.json). Based on the detected package manager, install \`agentcomposerui\` (e.g. \`bun add agentcomposerui\` or equivalent).

Then set up an AgentComposerUI component (such as LinkedInComposer, TwitterThreadComposer, EmailOutreachComposer, or GitHubPRComposer) with human-in-the-loop reviewing and approval handlers.

GitHub Documentation & Markdown Guides:
- Overview: https://github.com/theajmalrazaq/agentcomposerui#readme
- All Markdown Docs: https://github.com/theajmalrazaq/agentcomposerui/tree/main/docs
- Installation: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/installation.md
- Quickstart: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/quickstart.md
- LinkedIn Composer: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/linkedin-composer.md
- Twitter Thread Composer: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/twitter-composer.md
- Email Outreach Composer: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/email-composer.md
- GitHub PR Composer: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/github-composer.md
- Compound Components: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/compound-components.md
- useComposerState Hook: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/use-composer-state.md
- Theming & Design Tokens: https://github.com/theajmalrazaq/agentcomposerui/blob/main/docs/theming.md`;

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [pkgManager, setPkgManager] = useState<PackageManager>("bun");
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const installCommands: Record<PackageManager, string> = {
    bun: "bun add agentcomposerui",
    pnpm: "pnpm add agentcomposerui",
    npm: "npm install agentcomposerui",
    yarn: "yarn add agentcomposerui",
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(installCommands[pkgManager]);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_SETUP_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 isolate">
      {/* Minimalist Landscape Hero Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={heroBg}
          alt="Minimalist landscape hero background with rocky mountain peaks and moon"
          className="w-full h-full object-cover object-[center_40%] dark:brightness-[0.38] dark:contrast-[1.12] dark:saturate-[0.8] transition-all duration-500"
          loading="eager"
        />

        {/* Readability Overlay Gradient - Tuned for crystal-clear typography in both light and dark mode */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white dark:from-zinc-950/70 dark:via-zinc-950/30 dark:to-zinc-950"
          aria-hidden="true"
        />
      </div>

      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-sky-400/10 via-amber-300/10 to-emerald-400/10 blur-3xl pointer-events-none z-0 rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-zinc-900 dark:text-white">v0.1.0 Released</span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>Human-in-the-Loop AI Composers</span>
          <ArrowRight className="w-3 h-3 text-zinc-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-6 max-w-4xl mx-auto"
        >
          Composer UI Components{" "}
          <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            for AI Agents.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Pre-built, platform-inspired React & Tailwind cards that allow AI agents to stream
          structured drafts into interactive review surfaces with live fold truncation, character
          meters, and approval state machines.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-8"
        >
          <button
            onClick={() => onNavigate("components")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Components</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("docs")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-300/80 dark:border-zinc-700/80 hover:bg-white dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-zinc-500" />
            <span>Documentation</span>
          </button>
        </motion.div>

        {/* ReUI / Tailkits Style CLI Install Box with AI Prompt Copy */}
        <div className="max-w-md mx-auto mb-9">
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-xs">
            {/* Package Manager Tabs */}
            <div className="flex items-center gap-0.5 bg-zinc-100/90 dark:bg-zinc-950 p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
              {(["bun", "pnpm", "npm", "yarn"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPkgManager(pm)}
                  className={`px-2 py-1 text-[11px] font-mono font-medium rounded-md transition-colors cursor-pointer ${pkgManager === pm
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Install string */}
            <div className="flex items-center gap-2 px-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap">
              <Terminal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{installCommands[pkgManager]}</span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyCommand}
              aria-label="Copy install command"
              title="Copy install command"
              className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copiedCommand ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Quick AI Setup Prompt Action */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <span>Using an AI agent?</span>
            <button
              onClick={handleCopyPrompt}
              className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-white font-medium cursor-pointer"
            >
              {copiedPrompt ? "Copied AI Prompt!" : "Copy setup prompt for Cursor / Claude"}
            </button>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-700 dark:text-zinc-300 mb-10"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-800 dark:text-white" />
            <span>Human-in-the-Loop Guardrail</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs">
            <Zap className="w-3.5 h-3.5 text-zinc-800 dark:text-white" />
            <span>Live Character & Fold Meters</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs">
            <Layers className="w-3.5 h-3.5 text-zinc-800 dark:text-white" />
            <span>Structured Zod Schemas</span>
          </div>
        </motion.div>

        {/* Ecosystem Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-zinc-200/70 dark:border-zinc-800/70 max-w-4xl mx-auto"
        >
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
            Built for modern AI stacks & agent architectures
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {[
              { name: "OpenAI GPT-4o", icon: OpenAIIcon },
              { name: "Claude 3.5 Sonnet", icon: ClaudeIcon },
              { name: "Gemini 2.5", icon: GeminiIcon },
              { name: "CopilotKit", icon: CopilotKitIcon },
              { name: "Vercel AI SDK", icon: VercelIcon },
              { name: "Next.js App Router", icon: null },
              { name: "Tailwind CSS v4", icon: null },
            ].map(({ name, icon: Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs shadow-2xs"
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-zinc-700 dark:text-white" />}
                <span>{name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
