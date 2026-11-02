"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Color = { name: string; token: string; hex: string; role: string; light?: boolean };

export function Swatch({ color }: { color: Color }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
    } catch (err: unknown) {
      console.error("Clipboard write failed", err);
      setCopied("blocked");
    }
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border-2 border-ink bg-card shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg">
      <button
        type="button"
        onClick={() => copy(color.hex)}
        className={cn("relative flex h-28 w-full items-end justify-between border-b-2 border-ink p-3 text-left sm:h-32", color.light ? "text-ink" : "text-paper")}
        style={{ background: `var(${color.token})` }}
        aria-label={`Copy ${color.name} hex ${color.hex}`}
      >
        <span className="font-mono text-xs uppercase tracking-widest">{copied === color.hex ? "Copied!" : copied === "blocked" ? "Blocked" : color.hex}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-80 [@media(hover:none)]:opacity-80">
          tap to copy
        </span>
      </button>
      <div className="flex flex-col gap-1 p-3">
        <span className="font-display text-lg font-extrabold">{color.name}</span>
        <button
          type="button"
          onClick={() => copy(`var(${color.token})`)}
          className="w-fit truncate font-mono text-xs text-muted-foreground hover:text-ink"
        >
          {copied === `var(${color.token})` ? "copied ✓" : color.token}
        </button>
        <span className="text-sm text-muted-foreground">{color.role}</span>
      </div>
    </div>
  );
}
