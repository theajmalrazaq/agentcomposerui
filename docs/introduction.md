# Introduction — AgentComposerUI

Composer UI Components for AI Agents — React & Tailwind CSS.

## The Problem

Modern AI agents (autonomous coding agents, content generators, outreach assistants, devops bots) often execute high-stakes actions:
- Publishing social media posts and threads
- Sending executive or sales outreach emails
- Creating git branches and opening pull requests
- Deploying configuration changes

Giving agents unconstrained execution leads to hallucinations and brand damage. But forcing human users to review raw JSON or markdown strings is friction-heavy and prone to missed mistakes.

## The Solution: AgentComposerUI

AgentComposerUI provides platform-inspired, domain-specific review cards:
- **LinkedInComposer**: Hook meters, body fold truncation (`...see more`), hashtag chips.
- **TwitterThreadComposer**: Sequential multi-tweet ordering, 280-char SVG countdown rings, hook strength meter.
- **EmailOutreachComposer**: Subject line impact scorer, spam trigger detection, dynamic token chip insertion.
- **GitHubPRComposer**: Conventional commit linting, interactive verification checklists, reviewers/labels tags.

## Core Architecture

Every composer card operates on a standardized Human-in-the-Loop (HITL) state machine:
- `reviewing`: Human inspects and edits the proposed draft.
- `approved`: Human validates the draft; agent executes the action.
- `rejected`: Human rejects with structured feedback; agent iterates on a revision.

## Next Links

- Installation: `/installation.md`
- Quickstart: `/quickstart.md`
- Components:
  - `/linkedin-composer.md`
  - `/twitter-composer.md`
  - `/email-composer.md`
  - `/github-composer.md`
- LLM Index: `/llms.txt`
