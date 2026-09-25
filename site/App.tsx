import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { BentoFeatures } from "./components/BentoFeatures";
import { ComponentCatalog } from "./components/ComponentCatalog";
import { DocsView } from "./components/DocsView";
import { PlaygroundView } from "./components/PlaygroundView";
import { SearchModal } from "./components/SearchModal";
import { Footer } from "./components/Footer";
import type { SiteView, DocSlug } from "./types";

const ALL_DOC_SLUGS: DocSlug[] = [
  "introduction",
  "installation",
  "quickstart",
  "linkedin-composer",
  "twitter-composer",
  "email-composer",
  "github-composer",
  "compound-components",
  "use-composer-state",
  "openai-integration",
  "anthropic-integration",
  "gemini-integration",
  "vercel-ai-sdk",
  "copilotkit",
  "theming",
];

function parseCurrentRoute(): { view: SiteView; slug: DocSlug } {
  if (typeof window === "undefined") {
    return { view: "overview", slug: "introduction" };
  }
  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

  if (!rawPath || rawPath === "overview") {
    return { view: "overview", slug: "introduction" };
  }
  if (rawPath === "components") {
    return { view: "components", slug: "introduction" };
  }
  if (rawPath === "playground") {
    return { view: "playground", slug: "introduction" };
  }
  if (rawPath === "docs") {
    return { view: "docs", slug: "introduction" };
  }

  // Handle /installation, /docs/installation
  const cleanDoc = rawPath.replace(/^docs\//, "");
  if (ALL_DOC_SLUGS.includes(cleanDoc as DocSlug)) {
    return { view: "docs", slug: cleanDoc as DocSlug };
  }

  return { view: "overview", slug: "introduction" };
}

export function App() {
  const initialRoute = parseCurrentRoute();
  const [currentView, setCurrentView] = useState<SiteView>(initialRoute.view);
  const [activeDocSlug, setActiveDocSlug] = useState<DocSlug>(initialRoute.slug);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const legacy = localStorage.getItem("acu-theme");
      if (legacy === "dark") {
        localStorage.removeItem("acu-theme");
      }
      const stored = localStorage.getItem("agentcomposerui-theme");
      if (stored === "dark") return "dark";
    }
    return "light";
  });

  // URL sync via popstate
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      setCurrentView(route.view);
      setActiveDocSlug(route.slug);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to toggle Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Theme Sync
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("agentcomposerui-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("agentcomposerui-theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("agentcomposerui-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("agentcomposerui-theme", "light");
    }
  };

  const handleSelectDoc = (slug: DocSlug, updateHistory = true) => {
    setActiveDocSlug(slug);
    setCurrentView("docs");
    if (updateHistory && typeof window !== "undefined") {
      window.history.pushState({}, "", `/${slug}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateView = (view: SiteView, updateHistory = true) => {
    setCurrentView(view);
    if (updateHistory && typeof window !== "undefined") {
      if (view === "overview") window.history.pushState({}, "", "/");
      else if (view === "components") window.history.pushState({}, "", "/components");
      else if (view === "playground") window.history.pushState({}, "", "/playground");
      else if (view === "docs") window.history.pushState({}, "", `/${activeDocSlug}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={handleNavigateView}
        onOpenSearch={() => setSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main View Router with Framer Motion Page Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentView === "overview" && (
              <div>
                <HeroSection onNavigate={handleNavigateView} />
                <InteractiveShowcase />
                <BentoFeatures />
                <ComponentCatalog
                  onSelectDoc={handleSelectDoc}
                  onOpenPlayground={() => handleNavigateView("playground")}
                />
              </div>
            )}

            {currentView === "components" && (
              <div className="py-6">
                <ComponentCatalog
                  onSelectDoc={handleSelectDoc}
                  onOpenPlayground={() => handleNavigateView("playground")}
                />
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      Live LinkedInComposer Sandbox
                    </h3>
                  </div>
                  <InteractiveShowcase />
                </div>
              </div>
            )}

            {currentView === "docs" && (
              <div>
                <DocsView activeSlug={activeDocSlug} onSelectSlug={handleSelectDoc} />
              </div>
            )}

            {currentView === "playground" && (
              <div>
                <PlaygroundView />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigateView={handleNavigateView} onNavigateDoc={handleSelectDoc} />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateDoc={handleSelectDoc}
        onNavigateView={handleNavigateView}
      />
    </div>
  );
}
