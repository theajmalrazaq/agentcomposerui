// ============================================================
// AgentComposerUI — Core Library Exports
// ============================================================

// Schemas & Types
export * from "./schemas";
export * from "./types";

// State Machine Hook
export * from "./hooks/use-composer-state";

// LinkedIn Composer (Drop-in & Compound Components)
export * from "./components/linkedin";

// Twitter Thread Composer
export {
  TwitterThreadComposer,
  type TwitterThreadComposerProps,
  useTwitterComposer,
  TwitterComposerContext,
  type TwitterComposerContextValue,
  CountdownRing as TwitterCountdownRing,
  type CountdownRingProps as TwitterCountdownRingProps,
  type TwitterAuthorProps,
} from "./components/twitter";

// Email Outreach & Newsletter Composer
export {
  EmailOutreachComposer,
  type EmailOutreachComposerProps,
  useEmailComposer,
  EmailComposerContext,
  type EmailComposerContextValue,
  SubjectAnalyzer as EmailSubjectAnalyzer,
  type SubjectAnalyzerProps as EmailSubjectAnalyzerProps,
  TokensBar as EmailTokensBar,
  type TokensBarProps as EmailTokensBarProps,
} from "./components/email";

// GitHub Pull Request Composer
export {
  GitHubPRComposer,
  type GitHubPRComposerProps,
  useGitHubPRComposer,
  GitHubPRComposerContext,
  type GitHubPRComposerContextValue,
  Checklist as GitHubPRChecklist,
  type ChecklistProps as GitHubPRChecklistProps,
  MetaSidebar as GitHubPRMetaSidebar,
  type MetaSidebarProps as GitHubPRMetaSidebarProps,
} from "./components/github";

// Utilities
export { cn } from "./lib/utils";
