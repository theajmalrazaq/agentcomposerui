import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, Menu, X, Sparkles, Layers, BookOpen, FlaskConical } from "lucide-react";
import { Logo } from "./Logo";
import type { SiteView } from "../types";

interface NavbarProps {
  currentView: SiteView;
  onViewChange: (view: SiteView) => void;
  onOpenSearch: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Navbar({
  currentView,
  onViewChange,
  onOpenSearch,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-4 transition-all">
      {/* Floating Squircle Navbar Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-xs px-4 sm:px-6 h-14 flex items-center justify-between gap-4 transition-colors">
        {/* Left: ReUI-style Brand & Nav */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onViewChange("overview")}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            {/* Logo */}
            <Logo showText size={32} />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              v0.1.3
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-1 text-sm font-medium">
            <button
              onClick={() => onViewChange("overview")}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${currentView === "overview"
                ? "text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => onViewChange("docs")}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${currentView === "docs"
                ? "text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
            >
              Docs
            </button>
            <button
              onClick={() => onViewChange("components")}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${currentView === "components"
                ? "text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
            >
              Components
            </button>
            <button
              onClick={() => onViewChange("playground")}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${currentView === "playground"
                ? "text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
            >
              Playground
            </button>
          </nav>
        </div>

        {/* Right: Search, GitHub, Theme Toggle, CTA */}
        <div className="flex items-center gap-2">
          {/* ReUI-Style Search Input Bar */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors w-32 sm:w-48 justify-between cursor-pointer"
            aria-label="Search documentation"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Search docs...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Repo Button (No Stars) */}
          <a
            href="https://github.com/theajmalrazaq/agentcomposerui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600 hover:text-zinc-900" />
            )}
          </button>

          {/* ReUI CTA Button */}
          <button
            onClick={() => onViewChange("docs")}
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 font-medium text-xs shadow-xs transition-colors cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="md:hidden mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex flex-col gap-1.5 shadow-xl"
          >
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400" />
                <span>Search docs...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => {
                onViewChange("overview");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Layers className="w-4 h-4" /> Overview
            </button>
            <button
              onClick={() => {
                onViewChange("docs");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Documentation
            </button>
            <button
              onClick={() => {
                onViewChange("components");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Components
            </button>
            <button
              onClick={() => {
                onViewChange("playground");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <FlaskConical className="w-4 h-4" /> Playground
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
