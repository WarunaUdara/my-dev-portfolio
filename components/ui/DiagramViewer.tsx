"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
  IconZoomIn,
  IconZoomOut,
  IconRefresh,
  IconMaximize,
  IconMinimize,
  IconCopy,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconLayoutGrid,
} from "@tabler/icons-react";

interface DiagramViewerProps {
  code: string;
  type?: "mermaid" | "box" | "architecture";
  title?: string;
}

// Initialize Mermaid with dark monochrome theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    darkMode: true,
    background: "#0a0a0a",
    primaryColor: "#171717",
    primaryTextColor: "#f5f5f5",
    primaryBorderColor: "#404040",
    lineColor: "#a3a3a3",
    secondaryColor: "#262626",
    tertiaryColor: "#171717",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  securityLevel: "loose",
});

let diagramIdCounter = 0;

export const DiagramViewer: React.FC<DiagramViewerProps> = ({
  code,
  type = "mermaid",
  title = "Architecture Diagram",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Render Mermaid Diagram
  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      if (!code || type === "box") return;
      try {
        setError(null);
        const uniqueId = `mermaid-diagram-${++diagramIdCounter}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, code.trim());
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to render diagram");
        }
      }
    };

    renderDiagram();
    return () => {
      isMounted = false;
    };
  }, [code, type]);

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan directional controls
  const handlePan = (dx: number, dy: number) => {
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  // Mouse Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Copy diagram code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <figure
      className={`my-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-4 z-[100] m-0 max-w-none h-[calc(100vh-2rem)] flex flex-col"
          : "relative w-full"
      }`}
    >
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-neutral-900/60 border-b border-neutral-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <IconLayoutGrid className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-mono font-semibold text-neutral-300 tracking-wider uppercase">
            {title}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80">
          {/* Zoom Buttons */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <IconZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <IconZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-[10px] font-mono font-semibold px-2"
            title="Reset Zoom (1:1)"
          >
            1:1
          </button>

          <div className="w-px h-4 bg-neutral-800 my-auto" />

          {/* Pan Navigation Buttons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => handlePan(0, 30)}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Pan Up"
            >
              <IconArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePan(0, -30)}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Pan Down"
            >
              <IconArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePan(30, 0)}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Pan Left"
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePan(-30, 0)}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Pan Right"
            >
              <IconArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-px h-4 bg-neutral-800 my-auto" />

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Copy Diagram Source"
          >
            {copied ? <IconCheck className="w-4 h-4 text-emerald-400" /> : <IconCopy className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <IconMinimize className="w-4 h-4" /> : <IconMaximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Diagram Display Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center p-6 bg-radial from-neutral-900/40 to-neutral-950 ${
          isFullscreen ? "flex-1" : "min-h-[260px] max-h-[500px]"
        }`}
      >
        <div
          ref={svgWrapperRef}
          className="transition-transform duration-100 ease-out origin-center flex items-center justify-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {type === "box" ? (
            /* Render formatted ASCII / Box diagram */
            <pre className="font-mono text-xs sm:text-sm text-neutral-200 bg-neutral-900/90 p-6 rounded-xl border border-neutral-800 leading-relaxed shadow-lg overflow-x-auto">
              {code.trim()}
            </pre>
          ) : error ? (
            /* Error Fallback */
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center space-y-2">
              <p className="text-xs font-mono text-neutral-400">Syntax diagram format preview:</p>
              <pre className="font-mono text-xs text-neutral-300 text-left bg-neutral-950 p-3 rounded-lg overflow-x-auto border border-neutral-800">
                {code.trim()}
              </pre>
            </div>
          ) : (
            /* Rendered SVG Mermaid Diagram */
            <div
              className="mermaid-svg-container [&_svg]:max-w-none [&_svg]:h-auto [&_.node_rect]:fill-neutral-900 [&_.node_rect]:stroke-neutral-700 [&_.node_circle]:fill-neutral-900 [&_.node_circle]:stroke-neutral-700 [&_.edgeLabel]:bg-neutral-900 [&_.edgeLabel]:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      </div>
    </figure>
  );
};

export default DiagramViewer;
