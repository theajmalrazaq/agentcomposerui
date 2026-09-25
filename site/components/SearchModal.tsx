import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Component, Bot, Sparkles, ArrowRight, Mail } from "lucide-react";
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
import type { SiteView, DocSlug } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateDoc: (slug: DocSlug) => void;
  onNavigateView: (view: SiteView) => void;
}

interface SearchEntry {
  title: string;
  category: "Documentation" | "Component" | "Integration" | "Action";
  description: string;
  keywords?: string[];
  icon?: React.ReactNode;
  action: () => void;
}

export function SearchModal({ isOpen, onClose, onNavigateDoc, onNavigateView }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isMouseNavRef = useRef(false);

  const searchEntries: SearchEntry[] = [
    {
      title: "Introduction",
      category: "Documentation",
      description: "Overview of AgentComposerUI architecture, HITL workflows, and motivation.",
      keywords: ["overview", "hitl", "architecture", "concepts", "start"],
      action: () => {
        onNavigateDoc("introduction");
        onClose();
      },
    },
    {
      title: "Installation & Setup",
      category: "Documentation",
      description: "Install via bun, npm, or pnpm with Tailwind CSS v3 and v4 setup.",
      keywords: ["install", "npm", "bun", "pnpm", "yarn", "tailwind", "setup"],
      action: () => {
        onNavigateDoc("installation");
        onClose();
      },
    },
    {
      title: "Quickstart Guide",
      category: "Documentation",
      description: "Render your first AI agent composer card in under 5 minutes.",
      keywords: ["guide", "quick", "tutorial", "first", "get started"],
      action: () => {
        onNavigateDoc("quickstart");
        onClose();
      },
    },
    {
      title: "LinkedInComposer",
      category: "Component",
      icon: <LinkedInIcon className="w-3.5 h-3.5" />,
      description:
        "Ready-to-use drop-in LinkedIn composer with fold simulation and character counters.",
      keywords: ["linkedin", "social", "post", "hook", "hashtags", "component"],
      action: () => {
        onNavigateDoc("linkedin-composer");
        onClose();
      },
    },
    {
      title: "TwitterThreadComposer",
      category: "Component",
      icon: <XTwitterIcon className="w-3.5 h-3.5" />,
      description: "Sequential tweet thread composer with 280-char countdown rings.",
      keywords: ["twitter", "x", "thread", "tweet", "countdown", "social"],
      action: () => {
        onNavigateDoc("twitter-composer");
        onClose();
      },
    },
    {
      title: "EmailOutreachComposer",
      category: "Component",
      icon: <Mail className="w-3.5 h-3.5" />,
      description: "Cold outreach reviewer with subject line analyzer and dynamic token insertion.",
      keywords: ["email", "outreach", "cold", "marketing", "subject", "tokens"],
      action: () => {
        onNavigateDoc("email-composer");
        onClose();
      },
    },
    {
      title: "GitHubPRComposer",
      category: "Component",
      icon: <GitHubIcon className="w-3.5 h-3.5" />,
      description: "Automated PR draft reviewer with markdown diff, checklist, and reviewers.",
      keywords: ["github", "pr", "pull request", "diff", "code review", "git"],
      action: () => {
        onNavigateDoc("github-composer");
        onClose();
      },
    },
    {
      title: "Compound Components API",
      category: "Component",
      description: "Build flexible custom layouts using .Root, .Header, .Editor, and .Actions.",
      keywords: ["compound", "custom", "root", "editor", "header", "actions"],
      action: () => {
        onNavigateDoc("compound-components");
        onClose();
      },
    },
    {
      title: "useComposerState Hook",
      category: "Documentation",
      description: "Built-in state machine for streaming, review, revise, and feedback loops.",
      keywords: ["hook", "state", "machine", "streaming", "approve", "reject", "feedback"],
      action: () => {
        onNavigateDoc("use-composer-state");
        onClose();
      },
    },
    {
      title: "OpenAI Function Calling",
      category: "Integration",
      icon: <OpenAIIcon className="w-3.5 h-3.5" />,
      description: "Use linkedInPostJsonSchema with GPT-4o and OpenAI tool definitions.",
      keywords: ["openai", "gpt", "gpt-4", "tool", "function", "schema", "json"],
      action: () => {
        onNavigateDoc("openai-integration");
        onClose();
      },
    },
    {
      title: "Anthropic Claude Tools",
      category: "Integration",
      icon: <ClaudeIcon className="w-3.5 h-3.5" />,
      description: "Tool definitions with input_schema for Claude 3.5 Sonnet and Haiku.",
      keywords: ["anthropic", "claude", "sonnet", "haiku", "tool", "input_schema"],
      action: () => {
        onNavigateDoc("anthropic-integration");
        onClose();
      },
    },
    {
      title: "Google Gemini Function Calling",
      category: "Integration",
      icon: <GeminiIcon className="w-3.5 h-3.5" />,
      description: "Gemini function declarations for Flash and Pro models.",
      keywords: ["gemini", "google", "flash", "pro", "function declaration"],
      action: () => {
        onNavigateDoc("gemini-integration");
        onClose();
      },
    },
    {
      title: "Vercel AI SDK Integration",
      category: "Integration",
      icon: <VercelIcon className="w-3.5 h-3.5" />,
      description: "Streaming UI cards and toolCall integration with Vercel AI SDK.",
      keywords: ["vercel", "ai sdk", "useChat", "stream", "toolCall"],
      action: () => {
        onNavigateDoc("vercel-ai-sdk");
        onClose();
      },
    },
    {
      title: "CopilotKit Integration",
      category: "Integration",
      icon: <CopilotKitIcon className="w-3.5 h-3.5" />,
      description: "Use CopilotKit useMakeCopilotActionable to stream into composer cards.",
      keywords: ["copilotkit", "actionable", "copilot", "chat"],
      action: () => {
        onNavigateDoc("copilotkit");
        onClose();
      },
    },
    {
      title: "Theming & Design Tokens",
      category: "Documentation",
      description: "Customize design tokens using --acu-* variables and Tailwind CSS.",
      keywords: ["theme", "css", "tokens", "variables", "dark mode", "colors", "style"],
      action: () => {
        onNavigateDoc("theming");
        onClose();
      },
    },
    {
      title: "Open Live Playground",
      category: "Action",
      description: "Jump straight into the interactive testing sandbox.",
      keywords: ["playground", "sandbox", "test", "demo", "try"],
      action: () => {
        onNavigateView("playground");
        onClose();
      },
    },
    {
      title: "View All Components",
      category: "Action",
      description: "Browse the component catalog and feature matrices.",
      keywords: ["components", "catalog", "cards", "list"],
      action: () => {
        onNavigateView("components");
        onClose();
      },
    },
    {
      title: "Return to Overview",
      category: "Action",
      description: "Go back to the homepage and showcase.",
      keywords: ["home", "overview", "landing"],
      action: () => {
        onNavigateView("overview");
        onClose();
      },
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? searchEntries.filter((item) => {
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inCat = item.category.toLowerCase().includes(q);
        const inKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
        return inTitle || inDesc || inCat || inKeywords;
      })
    : searchEntries;

  // Auto-scroll the selected item into view inside the scrollable container
  useEffect(() => {
    const container = listRef.current;
    const activeEl = itemRefs.current[selectedIndex];
    if (!container || !activeEl) return;

    if (selectedIndex === 0) {
      container.scrollTop = 0;
      return;
    }

    if (selectedIndex === filtered.length - 1) {
      container.scrollTop = container.scrollHeight;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    if (itemRect.bottom > containerRect.bottom) {
      container.scrollTop += itemRect.bottom - containerRect.bottom + 8;
    } else if (itemRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - itemRect.top + 8;
    }
  }, [selectedIndex, filtered.length]);

  // Keyboard navigation & closing when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (filtered.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex((i) => (i + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Home") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex(0);
        } else if (e.key === "End") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex(filtered.length - 1);
        } else if (e.key === "PageDown") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex((i) => Math.min(i + 5, filtered.length - 1));
        } else if (e.key === "PageUp") {
          e.preventDefault();
          isMouseNavRef.current = false;
          setSelectedIndex((i) => Math.max(i - 5, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          filtered[selectedIndex]?.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Focus input and reset scroll position when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      isMouseNavRef.current = false;
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNavigateUp = () => {
    isMouseNavRef.current = false;
    if (filtered.length > 0) {
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }
  };

  const handleNavigateDown = () => {
    isMouseNavRef.current = false;
    if (filtered.length > 0) {
      setSelectedIndex((i) => (i + 1) % filtered.length);
    }
  };

  const handleSelectCurrent = () => {
    if (filtered.length > 0 && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search documentation..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              if (listRef.current) {
                listRef.current.scrollTop = 0;
              }
            }}
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
                if (listRef.current) {
                  listRef.current.scrollTop = 0;
                }
                inputRef.current?.focus();
              }}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          onMouseMove={() => {
            isMouseNavRef.current = true;
          }}
          className="relative max-h-80 overflow-y-auto p-2 space-y-1"
        >
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-zinc-500">
              No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={item.action}
                  onMouseEnter={() => {
                    if (isMouseNavRef.current) {
                      setSelectedIndex(idx);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                      {item.icon ? (
                        item.icon
                      ) : item.category === "Component" ? (
                        <Component className="w-3.5 h-3.5" />
                      ) : item.category === "Integration" ? (
                        <Bot className="w-3.5 h-3.5" />
                      ) : item.category === "Action" ? (
                        <Sparkles className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <div className="min-w-0 truncate">
                      <div className="font-semibold truncate">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 truncate">{item.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3 h-3 text-zinc-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts & interactive navigation buttons */}
        <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between text-[11px] text-zinc-400 select-none">
          <div className="flex items-center gap-1.5">
            <span className="mr-0.5">Navigate:</span>
            <button
              type="button"
              onClick={handleNavigateUp}
              title="Previous item (Up arrow)"
              aria-label="Previous item"
              className="px-2 py-0.5 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={handleNavigateDown}
              title="Next item (Down arrow)"
              aria-label="Next item"
              className="px-2 py-0.5 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={handleSelectCurrent}
              title="Select item (Enter)"
              aria-label="Select item"
              className="px-2 py-0.5 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
            >
              ↵
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              title="Close modal (Escape)"
              aria-label="Close modal"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
            >
              ESC
            </button>{" "}
            <span>to close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
