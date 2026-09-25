import React from "react";

export interface AgentComposerIconProps {
  size?: number;
  className?: string;
}

export function AgentComposerIcon({ size = 32, className = "" }: AgentComposerIconProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-lg overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-2xs flex items-center justify-center bg-white shrink-0 select-none ${className}`}
    >
      <img src="/logo.svg" alt="ACUI Logo" className="w-full h-full object-contain" />
    </div>
  );
}

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textSize?: string;
  textVariant?: "full" | "short";
}

export function Logo({
  className = "",
  size = 32,
  showText = false,
  textSize = "text-sm",
  textVariant = "short",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AgentComposerIcon size={size} />
      {showText && (
        <span
          className={`font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center ${textSize}`}
        >
          {textVariant === "full" ? (
            <>
              Agent<span className="text-zinc-400 dark:text-zinc-500 font-medium">Composer</span>
              <span className="text-sky-500 dark:text-sky-400 font-semibold ml-0.5">UI</span>
            </>
          ) : (
            <>
              AC<span className="text-zinc-400 dark:text-zinc-500 font-medium">UI</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
