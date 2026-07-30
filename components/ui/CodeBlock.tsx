"use client";

import React, { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { IconCopy, IconCheck, IconChevronDown, IconChevronUp, IconCode } from "@tabler/icons-react";

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
    <div className="my-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden group relative transition-all duration-300">
      {/* ── IDE Window Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono select-none">
        {/* Minimalist Window Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-600/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700/50" />
          <div className="flex items-center gap-1.5 ml-2 text-neutral-400">
            <IconCode className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-mono text-xs font-medium tracking-wide uppercase text-neutral-300">
              {filename || normalizedLang}
            </span>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <select
            value={activeThemeKey}
            onChange={(e) => setActiveThemeKey(e.target.value as keyof typeof THEMES)}
            className="bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800 rounded-lg px-2.5 py-1 text-[11px] font-mono cursor-pointer focus:outline-none focus:border-neutral-600 transition-colors"
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
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition-all active:scale-95 shadow-sm"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-semibold">Copied</span>
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

      {/* ── Syntax Highlighted Code Container with Styled Horizontal Slider ── */}
      <div
        className={`relative transition-all duration-300 overflow-hidden ${
          isLongCode && !isExpanded ? "max-h-[380px]" : "max-h-none"
        }`}
      >
        <Highlight theme={currentTheme} code={cleanCode} language={normalizedLang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-5 font-mono text-xs sm:text-sm overflow-x-auto custom-scrollbar leading-relaxed m-0`}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps} className="table-row">
                    {/* Line Numbers */}
                    <span className="table-cell select-none text-right pr-5 text-neutral-600 font-mono text-[11px] sm:text-xs w-8 tracking-tighter">
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
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent pointer-events-none" />
        )}
      </div>

      {/* ── Bottom Expand / Shrink Toggle Bar ── */}
      {isLongCode && (
        <div className="flex items-center justify-end px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono font-medium text-neutral-300 hover:text-white transition-all shadow-md active:scale-95"
          >
            {isExpanded ? (
              <>
                <IconChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                <span>Shrink Snippet</span>
              </>
            ) : (
              <>
                <IconChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                <span>Expand Snippet ({lines.length} lines)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
