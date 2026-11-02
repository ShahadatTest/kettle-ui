"use client";

import { useRef, useState } from "react";
import { LuCheck, LuCopy, LuX } from "react-icons/lu";
import { cn } from "@/lib/utils";

type State = "idle" | "copied" | "failed";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch (err: unknown) {
      // clipboard is blocked in insecure contexts / some iframes; tell the user instead of failing silently
      console.error("Clipboard write failed", err);
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 1600);
  };

  const Icon = state === "copied" ? LuCheck : state === "failed" ? LuX : LuCopy;
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-current px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
        className
      )}
      aria-live="polite"
    >
      <Icon className="size-3.5" aria-hidden />
      {state === "copied" ? "Copied" : state === "failed" ? "Blocked" : label}
    </button>
  );
}
