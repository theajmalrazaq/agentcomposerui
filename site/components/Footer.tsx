import React from "react";
import { Logo } from "./Logo";
import type { SiteView, DocSlug } from "../types";

interface FooterProps {
  onNavigateView: (view: SiteView) => void;
  onNavigateDoc: (slug: DocSlug) => void;
}

export function Footer({ onNavigateView, onNavigateDoc }: FooterProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-auto">
      {/* Floating Rounded Footer Card with margins from all sides */}
      <footer className="rounded-3xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pt-8 sm:pt-12 px-6 sm:px-10 lg:px-12 pb-0 overflow-hidden relative shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Logo showText size={32} />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Open source human-in-the-loop composer cards engineered for autonomous AI agents in
              React & Next.js.
            </p>
          </div>

          {/* Components Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              Components
            </h4>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigateDoc("linkedin-composer")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  LinkedInComposer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("twitter-composer")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  TwitterThreadComposer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("email-composer")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  EmailOutreachComposer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("github-composer")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  GitHubPRComposer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("compound-components")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Compound Components
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView("playground")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Playground
                </button>
              </li>
            </ul>
          </div>

          {/* Documentation Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              Documentation
            </h4>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigateDoc("installation")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Installation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("quickstart")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Quickstart Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("use-composer-state")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  useComposerState Hook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("openai-integration")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  OpenAI Function Calling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateDoc("theming")}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Theming & CSS Variables
                </button>
              </li>
            </ul>
          </div>

          {/* Community Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              Community & Code
            </h4>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="https://github.com/theajmalrazaq/agentcomposerui"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/theajmalrazaq/agentcomposerui/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Issues & Feature Requests
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            Built with React, Tailwind CSS, and TypeScript. Released under the{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 dark:text-zinc-300 underline"
            >
              MIT License
            </a>
            .
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with love by</span>
            <a
              href="https://github.com/theajmalrazaq"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white underline font-medium transition-colors"
            >
              Ajmal Razaq
            </a>
          </div>
        </div>

        {/* ACUI Monumental Typography: Inside footer card, half hide half show */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mt-8 sm:mt-12 flex flex-col items-center justify-end">
          <p className="w-full text-center font-black tracking-tighter text-[19vw] sm:text-[18vw] leading-none whitespace-nowrap text-zinc-200/90 dark:text-[#17171a] select-none transition-colors translate-y-[48%]">
            ACUI
          </p>
        </div>
      </footer>
    </div>
  );
}
