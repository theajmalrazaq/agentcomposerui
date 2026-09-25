import React, { useState } from "react";
import { Sliders, Terminal, Share2, MessageSquare, Mail, GitPullRequest } from "lucide-react";
import { LinkedInComposer } from "../../src/components/linkedin/linkedin-composer";
import { TwitterThreadComposer } from "../../src/components/twitter/twitter-composer";
import { EmailOutreachComposer } from "../../src/components/email/email-composer";
import { GitHubPRComposer } from "../../src/components/github/github-composer";
import type { LinkedInPostData } from "../../src/schemas/linkedin";
import type { TwitterThreadData } from "../../src/schemas/twitter";
import type { EmailDraftData } from "../../src/schemas/email";
import type { GitHubPRData } from "../../src/schemas/github";
import type { ComposerStatus } from "../../src/types";

type SelectedComposer = "linkedin" | "twitter" | "email" | "github";

export function PlaygroundView() {
  const [selectedComposer, setSelectedComposer] = useState<SelectedComposer>("linkedin");
  const [status, setStatus] = useState<ComposerStatus>("reviewing");

  // Sample data states
  const [linkedInData, setLinkedInData] = useState<LinkedInPostData>({
    hook: "AI agents are transforming how modern software interfaces are designed.",
    body: "Instead of clicking static forms, users now collaborate directly with specialized generative agents.\n\nAgentComposerUI provides the missing visual layer that turns raw model tokens into human-approved actions.",
    callToAction: "What composers would you like to see next? Let us know below!",
    hashtags: ["#ArtificialIntelligence", "#UXDesign", "#React", "#TailwindCSS"],
  });

  const [twitterData, setTwitterData] = useState<TwitterThreadData>({
    topic: "Building Agentic Interfaces",
    tweets: [
      {
        id: "1",
        text: "1/ Why generative UI needs specialized human review cards.\n\nRaw token streaming without structured controls creates user friction and accidental dispatch.",
      },
      {
        id: "2",
        text: "2/ Drop-in platform cards provide the missing visual layer between LLMs and end users, giving humans the confidence to approve or request changes.",
      },
      {
        id: "3",
        text: "3/ AgentComposerUI is 100% open source and works out of the box with OpenAI, Claude, and Gemini schemas.\n\nTry it today: bun add agentcomposerui",
      },
    ],
    hashtags: ["#AI", "#OpenSource", "#React"],
  });

  const [emailData, setEmailData] = useState<EmailDraftData>({
    to: "sarah.chen@techventures.co",
    subject: "Quick question on {{company}}'s autonomous agent architecture",
    previewText: "Loved your team's keynote on human-in-the-loop workflows",
    body: "Hi {{firstName}},\n\nI caught your talk on scaling LLM agent reliability at {{company}}.\n\nWe recently released AgentComposerUI — native React components that give agents structured human approval cards before taking actions.\n\nWould you be open to a 10-minute chat next Tuesday?",
    signature: "Best regards,\nJohn Doe\nFounder, AgentComposerUI\nexample@gmail.com",
    tokens: {
      firstName: "Sarah",
      company: "TechVentures",
    },
    scheduledFor: "In 15 minutes",
  });

  const [githubData, setGithubData] = useState<GitHubPRData>({
    title: "feat(composers): add Twitter, Email, and GitHub PR components",
    targetBranch: "main",
    sourceBranch: "feat/multi-platform-composers",
    body: "## Summary of Changes\n\n- Implemented `TwitterThreadComposer` with 280-char progress ring and sentence splitter\n- Implemented `EmailOutreachComposer` with subject impact analyzer and token insertion\n- Implemented `GitHubPRComposer` with conventional commit linting and checklist verification",
    checklist: [
      { label: "Added Vitest unit tests for schemas and UI", completed: true },
      { label: "Verified zero runtime CSS dependencies", completed: true },
      { label: "Updated component directory and documentation", completed: true },
    ],
    reviewers: ["theajmalrazaq", "agent-reviewer"],
    labels: ["enhancement", "composers", "v0.1.3"],
  });

  const [authorName, setAuthorName] = useState("John Doe");
  const [authorTitle, setAuthorTitle] = useState("VP of Product AI • NextGen Labs");
  const [events, setEvents] = useState<string[]>([
    "[System] Playground initialized with default state.",
  ]);

  const addEvent = (msg: string) => {
    setEvents((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const handleApprove = () => {
    setStatus("approved");
    addEvent(`[${selectedComposer}] onApprove() fired successfully!`);
  };

  const handleReject = (feedback: string) => {
    setStatus("streaming");
    addEvent(
      `[${selectedComposer}] onReject() with feedback: "${feedback}". Simulating AI revision...`,
    );
    setTimeout(() => {
      setStatus("reviewing");
      addEvent(`[${selectedComposer}] AI agent completed revision cycle.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Composer Playground
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Test prop variations, live event handlers, and simulation cycles across all 4 production
          composers.
        </p>
      </div>

      {/* Composer Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-2xl">
        <button
          onClick={() => {
            setSelectedComposer("linkedin");
            addEvent("Switched to LinkedInComposer");
          }}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedComposer === "linkedin"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </button>

        <button
          onClick={() => {
            setSelectedComposer("twitter");
            addEvent("Switched to TwitterThreadComposer");
          }}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedComposer === "twitter"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Twitter Thread</span>
        </button>

        <button
          onClick={() => {
            setSelectedComposer("email");
            addEvent("Switched to EmailOutreachComposer");
          }}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedComposer === "email"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Outreach</span>
        </button>

        <button
          onClick={() => {
            setSelectedComposer("github");
            addEvent("Switched to GitHubPRComposer");
          }}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedComposer === "github"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>GitHub PR</span>
        </button>
      </div>

      {/* Main Grid: Controls on Left, Component on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-4">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Composer Props</span>
            </h2>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                Status State:
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(["idle", "streaming", "reviewing", "approved"] as ComposerStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatus(s);
                      addEvent(`Status manually set to "${s}"`);
                    }}
                    className={`py-1.5 px-2 rounded-lg font-medium capitalize border transition-colors cursor-pointer ${
                      status === s
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Inputs */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Author / Sender:
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Headline / Title:
              </label>
              <input
                type="text"
                value={authorTitle}
                onChange={(e) => setAuthorTitle(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* Reset Defaults */}
            <button
              onClick={() => {
                setStatus("reviewing");
                addEvent("Reset playground to defaults.");
              }}
              className="w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Reset Status to Reviewing
            </button>
          </div>

          {/* Event Log Console */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400 pb-2 mb-2 border-b border-zinc-800">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Event Stream Log</span>
              </span>
              <button
                onClick={() => setEvents(["[Console cleared]"])}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto text-[11px] text-zinc-300">
              {events.map((ev, i) => (
                <div key={i} className="leading-snug">
                  {ev}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Panel (8 cols) */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="w-full max-w-2xl">
            {selectedComposer === "linkedin" && (
              <LinkedInComposer
                data={linkedInData}
                status={status}
                onChange={(updated) => {
                  setLinkedInData(updated);
                  addEvent("[LinkedIn] onChange() triggered.");
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                author={{
                  name: authorName,
                  title: authorTitle,
                }}
              />
            )}

            {selectedComposer === "twitter" && (
              <TwitterThreadComposer
                data={twitterData}
                status={status}
                onChange={(updated) => {
                  setTwitterData(updated);
                  addEvent("[Twitter] onChange() triggered.");
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                author={{
                  name: authorName,
                  handle: "johndoe",
                }}
              />
            )}

            {selectedComposer === "email" && (
              <EmailOutreachComposer
                data={emailData}
                status={status}
                onChange={(updated) => {
                  setEmailData(updated);
                  addEvent("[Email] onChange() triggered.");
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                senderName={authorName}
                senderEmail="example@gmail.com"
              />
            )}

            {selectedComposer === "github" && (
              <GitHubPRComposer
                data={githubData}
                status={status}
                onChange={(updated) => {
                  setGithubData(updated);
                  addEvent("[GitHub] onChange() triggered.");
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                repoName="theajmalrazaq/agentcomposerui"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
