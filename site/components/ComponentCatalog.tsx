import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight, Play } from "lucide-react";
import type { DocSlug } from "../types";

interface ComponentCatalogProps {
  onSelectDoc: (slug: DocSlug) => void;
  onOpenPlayground: () => void;
}

type CategoryFilter = "all" | "social" | "email" | "dev";

export function ComponentCatalog({ onSelectDoc, onOpenPlayground }: ComponentCatalogProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const components = [
    {
      id: "linkedin",
      title: "LinkedInComposer",
      category: "social",
      categoryLabel: "Social Media",
      status: "ready",
      version: "v0.1.0",
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
      version: "v0.1.0",
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
      version: "v0.1.0",
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
      version: "v0.1.0",
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

      {/* Grid of Components with pure fade-up animation (no jiggle) */}
      <div key={filter} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: idx * 0.05, ease: "easeOut" }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-xs group"
          >
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
                      Live Demo
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
                  {item.features.map((feat, idx) => (
                    <div
                      key={idx}
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
                      onClick={() => onSelectDoc(item.docSlug)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer"
                    >
                      <span>Read Documentation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onOpenPlayground}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
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
            </motion.div>
          ))}
      </div>
    </section>
  );
}
