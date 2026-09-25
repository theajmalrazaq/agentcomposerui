# Installation Guide — AgentComposerUI

AgentComposerUI is a production-ready UI component library for AI agents with human-in-the-loop review cards, character meters, fold truncation, and JSON schema validators.

## Package Manager Detection

Before installing, check the active package manager in your repository:
- `bun.lock` or `bun.lockb` &rarr; use **Bun**
- `pnpm-lock.yaml` &rarr; use **pnpm**
- `yarn.lock` &rarr; use **Yarn**
- `package-lock.json` &rarr; use **npm**

---

## 1. Install `agentcomposerui`

### Bun
```bash
bun add agentcomposerui
```

### pnpm
```bash
pnpm add agentcomposerui
```

### npm
```bash
npm install agentcomposerui
```

### Yarn
```bash
yarn add agentcomposerui
```

---

## 2. Peer Dependencies

AgentComposerUI depends on React 18 or 19, Lucide React icons, and Zod:

```bash
# If not already present in your project:
bun add react react-dom lucide-react zod
# or
npm install react react-dom lucide-react zod
```

---

## 3. Tailwind CSS Setup

Ensure Tailwind CSS (v3 or v4) is configured in your project.

### Tailwind CSS v4
In your main CSS entry point (`src/index.css` or `src/globals.css`):
```css
@import "tailwindcss";
```

### Tailwind CSS v3
In your `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/agentcomposerui/**/*.{js,mjs,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 4. Standalone Composers Available

Import only what you need:

```tsx
// UI Components (Client-side)
import {
  LinkedInComposer,
  TwitterThreadComposer,
  EmailOutreachComposer,
  GitHubPRComposer,
  useComposerState,
} from "agentcomposerui";

// Pure Zod Schemas (Server-side API routes & LLM Tools)
import {
  linkedInPostSchema,
  twitterThreadSchema,
  emailDraftSchema,
  gitHubPRSchema,
} from "agentcomposerui/schemas";
```

---

## 5. Next Steps

- Quickstart: `/quickstart.md`
- LinkedIn Composer: `/linkedin-composer.md`
- Twitter Thread Composer: `/twitter-composer.md`
- Email Outreach Composer: `/email-composer.md`
- GitHub PR Composer: `/github-composer.md`
- LLM Index: `/llms.txt`
