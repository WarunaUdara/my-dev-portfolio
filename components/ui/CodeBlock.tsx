"use client";

import React, { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { IconCopy, IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxCollapsedLines?: number;
}

const THEMES = {
  oneDark: { name: "One Dark Pro", theme: themes.oneDark },
  vsDark: { name: "VS Dark", theme: themes.vsDark },
  dracula: { name: "Dracula", theme: themes.dracula },
  nightOwl: { name: "Night Owl", theme: themes.nightOwl },
};

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
  maxCollapsedLines = 16,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeThemeKey, setActiveThemeKey] = useState<keyof typeof THEMES>("oneDark");

  // Clean raw code input
  const cleanCode = typeof code === "string" ? code.trim() : String(code || "").trim();
  const lines = cleanCode.split("\n");
  const isLongCode = lines.length > maxCollapsedLines;

  // Infer language normalize
  const normalizedLang = (language.replace(/^language-/, "") || "text").toLowerCase() as Language;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const currentTheme = THEMES[activeThemeKey].theme;

  return (
    <div className="my-8 rounded-2xl bg-[#0d0e15] border border-neutral-800/90 overflow-hidden shadow-2xl group relative transition-all duration-300">
      {/* ── IDE Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#13151f] border-b border-neutral-800/80 text-xs font-mono select-none">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
          {filename && (
            <span className="ml-3 text-neutral-400 font-sans text-xs font-medium tracking-wide">
              {filename}
            </span>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <select
            value={activeThemeKey}
            onChange={(e) => setActiveThemeKey(e.target.value as keyof typeof THEMES)}
            className="bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 rounded-lg px-2.5 py-1 text-[11px] font-mono cursor-pointer focus:outline-none focus:border-neutral-600 transition-colors"
            title="Change Code Theme"
          >
            {Object.entries(THEMES).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition-all active:scale-95 shadow-sm"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <IconCopy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Syntax Highlighted Code Container ── */}
      <div
        className={`relative transition-all duration-300 overflow-hidden ${
          isLongCode && !isExpanded ? "max-h-[380px]" : "max-h-none"
        }`}
      >
        <Highlight theme={currentTheme} code={cleanCode} language={normalizedLang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed no-visible-scrollbar m-0`}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps} className="table-row">
                    {/* Line Numbers */}
                    <span className="table-cell select-none text-right pr-5 text-neutral-600/70 font-mono text-[11px] sm:text-xs w-8 tracking-tighter">
                      {i + 1}
                    </span>
                    {/* Code Line Content */}
                    <span className="table-cell whitespace-pre">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>

        {/* Bottom Fade Gradient for Collapsed Snippets */}
        {isLongCode && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0e15] via-[#0d0e15]/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* ── Bottom Expand / Shrink Toggle Bar ── */}
      {isLongCode && (
        <div className="flex items-center justify-end px-4 py-2.5 bg-[#11121a] border-t border-neutral-800/60 relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-600 text-xs font-mono font-medium text-neutral-200 hover:text-white transition-all shadow-md active:scale-95"
          >
            {isExpanded ? (
              <>
                <IconChevronUp className="w-3.5 h-3.5 text-sky-400" />
                <span>Shrink Snippet</span>
              </>
            ) : (
              <>
                <IconChevronDown className="w-3.5 h-3.5 text-sky-400" />
                <span>Expand Snippet ({lines.length} lines)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
