import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "sun" | "tea" | "tunes" | "strings" | "lilac" | "sky" | "paper" | "ink";

const TONE: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  tea: "bg-tea text-paper",
  tunes: "bg-tunes text-paper",
  strings: "bg-strings text-ink",
  lilac: "bg-lilac text-ink",
  sky: "bg-sky text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

/** Tilted mono eyebrow label. */
export function Chip({
  children,
  tone = "sun",
  tilt = true,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  tilt?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em]",
        tilt && "-rotate-2",
        TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
