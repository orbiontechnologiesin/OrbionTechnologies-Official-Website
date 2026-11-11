"use client";

import React, { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Link as LinkIcon,
  Quote,
  Code,
  Eye,
  Edit3,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your article content using Markdown...",
  minHeight = "400px",
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  function insertFormatting(prefix: string, suffix = "") {
    const textarea = document.getElementById("cms-markdown-textarea") as HTMLTextAreaElement | null;
    if (!textarea) {
      onChange(value + prefix + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end);
    const replacement = prefix + (selection || "text") + suffix;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selection.length || 4)
      );
    }, 10);
  }

  // Safe client-side markdown to formatted HTML previewer
  function renderMarkdownPreview(md: string) {
    if (!md.trim()) {
      return '<p class="text-graphite-subtle italic">No content to preview yet.</p>';
    }

    const lines = md.split("\n");
    const htmlLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        htmlLines.push(`<h3 class="text-lg font-bold text-graphite mt-4 mb-2">${escapeHtml(trimmed.slice(4))}</h3>`);
      } else if (trimmed.startsWith("## ")) {
        htmlLines.push(`<h2 class="text-xl font-bold text-graphite mt-6 mb-3">${escapeHtml(trimmed.slice(3))}</h2>`);
      } else if (trimmed.startsWith("# ")) {
        htmlLines.push(`<h1 class="text-2xl font-extrabold text-graphite mt-8 mb-4">${escapeHtml(trimmed.slice(2))}</h1>`);
      } else if (trimmed.startsWith("> ")) {
        htmlLines.push(`<blockquote class="border-l-4 border-copper pl-4 py-1 italic my-3 text-graphite-muted bg-limestone-light/50 rounded-r">${escapeHtml(trimmed.slice(2))}</blockquote>`);
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        htmlLines.push(`<li class="ml-5 list-disc text-graphite my-1">${formatInline(trimmed.slice(2))}</li>`);
      } else if (trimmed === "") {
        htmlLines.push('<div class="h-3"></div>');
      } else {
        htmlLines.push(`<p class="text-graphite leading-relaxed my-2">${formatInline(trimmed)}</p>`);
      }
    }

    return htmlLines.join("");
  }

  function escapeHtml(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatInline(text: string) {
    let formatted = escapeHtml(text);
    // Bold: **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic: *text*
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Code: `code`
    formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-graphite/10 px-1 py-0.5 rounded font-mono text-xs">$1</code>');
    // Links: [text](url)
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-copper underline hover:text-copper-hover">$1</a>');
    return formatted;
  }

  return (
    <div className="border border-graphite-border rounded-xl overflow-hidden bg-limestone-card">
      {/* Editor Header & Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-limestone-light/70 border-b border-graphite-border flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            title="Bold"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            title="Italic"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-graphite-border mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("## ")}
            title="Heading 2"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            title="Heading 3"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-graphite-border mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("- ")}
            title="Bullet List"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("> ")}
            title="Blockquote"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("`", "`")}
            title="Inline Code"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("[link title](", ")")}
            title="Add Link"
            className="p-1.5 text-graphite-muted hover:text-graphite hover:bg-limestone-light rounded transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-limestone-card p-0.5 rounded-lg border border-graphite-border text-xs font-mono">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              tab === "edit"
                ? "bg-petrol text-pure-white font-medium"
                : "text-graphite-muted hover:text-graphite"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              tab === "preview"
                ? "bg-petrol text-pure-white font-medium"
                : "text-graphite-muted hover:text-graphite"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      {tab === "edit" ? (
        <textarea
          id="cms-markdown-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 bg-transparent text-sm text-graphite font-mono leading-relaxed focus:outline-none resize-y"
        />
      ) : (
        <div
          style={{ minHeight }}
          className="p-6 prose prose-sm max-w-none bg-limestone-light/30 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
        />
      )}

      {/* Footer Status Bar */}
      <div className="px-4 py-2 bg-limestone-light/40 border-t border-graphite-border/70 flex items-center justify-between text-[11px] font-mono text-graphite-subtle">
        <span>Markdown Supported</span>
        <span>
          {value.trim().split(/\s+/).filter(Boolean).length} words • {value.length} characters
        </span>
      </div>
    </div>
  );
}

