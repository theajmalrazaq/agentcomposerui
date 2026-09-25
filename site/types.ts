export type SiteView = "overview" | "components" | "docs" | "playground";

export type DocSlug =
  | "introduction"
  | "installation"
  | "quickstart"
  | "linkedin-composer"
  | "twitter-composer"
  | "email-composer"
  | "github-composer"
  | "compound-components"
  | "use-composer-state"
  | "openai-integration"
  | "anthropic-integration"
  | "gemini-integration"
  | "vercel-ai-sdk"
  | "copilotkit"
  | "theming";

export interface DocSection {
  title: string;
  items: {
    slug: DocSlug;
    title: string;
    badge?: string;
  }[];
}

export interface SearchItem {
  id: string;
  title: string;
  category: "Documentation" | "Component" | "Schema" | "Guide";
  description: string;
  action: () => void;
}
