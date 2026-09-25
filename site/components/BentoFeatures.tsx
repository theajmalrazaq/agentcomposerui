import React from "react";
import { motion } from "framer-motion";
import { Bot, Layers, Palette, CheckCircle2, Workflow, Eye, FileCode } from "lucide-react";

export function BentoFeatures() {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Workflow className="w-3.5 h-3.5" />
          <span>Core Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          Everything AI Agents Need for Human Approval
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Agent frameworks give you the routing; generic UI libraries give you plain buttons.
          AgentComposerUI delivers the domain-specific composer cards that put humans safely in the
          loop.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Card 1: HITL State Machine (Col span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-5">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Full Human-in-the-Loop State Machine
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Comes with the built-in{" "}
              <code className="text-zinc-900 dark:text-zinc-100 font-mono">useComposerState</code>{" "}
              hook. Handles multi-step agent transitions from token streaming to human inspection,
              with a structured feedback modal to prompt your AI agent for targeted revisions.
            </p>
          </div>

          {/* Visual State diagram */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between min-w-[420px] gap-2">
              <div className="flex flex-col items-center">
                <span className="px-3 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  idle
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">Prompted</span>
              </div>
              <span className="text-zinc-400">──►</span>
              <div className="flex flex-col items-center">
                <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold">
                  streaming
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">LLM Chunking</span>
              </div>
              <span className="text-zinc-400">──►</span>
              <div className="flex flex-col items-center">
                <span className="px-3 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold">
                  reviewing
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">User Editing</span>
              </div>
              <span className="text-zinc-400">──►</span>
              <div className="flex flex-col items-center">
                <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                  approved
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">Dispatched</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Universal Tool Schemas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-5">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Universal Tool Schemas
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Exported as both <strong>Zod</strong> schemas and standard{" "}
              <strong>JSON Schemas</strong>. Ready to register directly into OpenAI Function
              Calling, Anthropic Claude Tools, and Gemini Declarations.
            </p>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <div className="text-zinc-900 dark:text-zinc-100 font-semibold mb-1">
              import &#123; linkedInPostJsonSchema &#125;
            </div>
            <div className="text-[11px] text-zinc-400">
              tools: [&#123; type: "function", parameters: ... &#125;]
            </div>
          </div>
        </motion.div>

        {/* Card 3: Platform Truncation & Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Realistic Fold Simulation
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Simulates platform feed truncation (
              <code className="font-mono text-xs">...see more</code>) across desktop and mobile
              viewports so authors see exactly what hooks get cut off.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 3,000 char live countdown meter
          </div>
        </motion.div>

        {/* Card 4: Compound Component Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Compound Component API
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Use the simple all-in-one{" "}
              <code className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">
                &lt;LinkedInComposer /&gt;
              </code>{" "}
              or compose subcomponents: <code className="font-mono text-xs">.Root</code>,{" "}
              <code className="font-mono text-xs">.Header</code>,{" "}
              <code className="font-mono text-xs">.Editor</code>,{" "}
              <code className="font-mono text-xs">.Actions</code>.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Total layout and styling freedom
          </div>
        </motion.div>

        {/* Card 5: CSS Variables & Tailwind Native */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-5">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              CSS Custom Properties
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Styled using utility classes and themeable with clean{" "}
              <code className="font-mono text-xs">--acu-*</code> design tokens. Fully compatible
              with Tailwind v3 and v4 with dark mode built-in.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero runtime style injection
          </div>
        </motion.div>
      </div>
    </section>
  );
}
