import React, { useState, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import { Copy, Check } from "lucide-react";

export type CodeLanguage =
  | "tsx"
  | "typescript"
  | "javascript"
  | "json"
  | "bash"
  | "css"
  | "html";

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  filename?: string;
  className?: string;
  maxHeight?: string;
  showCopy?: boolean;
  onCopy?: () => void;
  wrap?: boolean;
}

export function highlightCode(code: string, language: CodeLanguage = "tsx"): string {
  const grammar = Prism.languages[language] || Prism.languages.tsx || Prism.languages.javascript;
  try {
    return Prism.highlight(code, grammar, language);
  } catch {
    return code;
  }
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className = "",
  maxHeight,
  showCopy = true,
  onCopy,
  wrap = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightedHtml = useMemo(() => {
    return highlightCode(code.trim(), language);
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono overflow-hidden shadow-xs transition-colors ${className}`}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700/60 inline-block" />
            <span>{filename}</span>
          </div>
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded hover:bg-zinc-200/80 dark:hover:bg-zinc-800"
              title="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {!filename && showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 p-1.5 rounded-md bg-white/90 hover:bg-zinc-100 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors z-10 cursor-pointer shadow-xs"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}

      <pre
        style={maxHeight ? { maxHeight } : undefined}
        className={`p-4 text-zinc-800 dark:text-zinc-100 text-xs font-mono leading-relaxed overflow-y-auto ${
          wrap
            ? "whitespace-pre-wrap break-words overflow-x-hidden [word-break:break-word] [overflow-wrap:anywhere]"
            : "overflow-x-auto whitespace-pre"
        }`}
      >
        <code
          className={`language-${language} ${
            wrap ? "whitespace-pre-wrap break-words [word-break:break-word]" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
}
