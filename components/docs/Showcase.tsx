"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

type Tab = "preview" | "code";

export function Showcase({
  title,
  description,
  code,
  children,
  previewClassName,
}: {
  title: string;
  description?: ReactNode;
  code: string;
  children: ReactNode;
  previewClassName?: string;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const id = useId();
  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h3>
          {description && <p className="mt-1 max-w-2xl text-muted-foreground">{description}</p>}
        </div>
        <div role="tablist" aria-label={`${title} view`} className="flex rounded-full border-2 border-ink bg-card p-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`${id}-${t}-tab`}
              aria-controls={`${id}-${t}`}
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
                tab === t ? "bg-ink text-paper" : "hover:bg-paper-2"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink shadow-hard-lg">
        <div
          role="tabpanel"
          id={`${id}-preview`}
          aria-labelledby={`${id}-preview-tab`}
          hidden={tab !== "preview"}
          className={cn(
            "relative bg-card bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] p-5 sm:p-8 md:p-10",
            previewClassName
          )}
        >
          {children}
        </div>
        <div role="tabpanel" id={`${id}-code`} aria-labelledby={`${id}-code-tab`} hidden={tab !== "code"} className="relative bg-ink text-paper">
          <CopyButton value={code} className="absolute right-4 top-4 bg-ink text-sun hover:bg-paper/10" />
          <pre className="max-h-[32rem] overflow-auto p-5 pt-16 font-mono text-[13px] leading-relaxed sm:p-8 sm:pt-16">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
