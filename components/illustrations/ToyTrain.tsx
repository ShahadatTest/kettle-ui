"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/components/motion/useOnScreen";

/** Toy train, chugging (CSS animations in globals.css). */
export function ToyTrain({ className }: { className?: string }) {
  const [ref, on] = useOnScreen<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      viewBox="0 0 120 56"
      className={cn("toy-train h-12 w-auto overflow-visible md:h-14", className)}
      data-paused={!on}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="smoke"
          cx={96}
          cy={8}
          r={5 + i}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="2"
          style={{ "--dx": `${-10 - i * 8}px`, "--dy": `${-12 - i * 3}px`, animationDelay: `${i * 0.4}s` } as CSSProperties}
        />
      ))}
      <rect x="4" y="22" width="44" height="22" rx="4" fill="var(--sky)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="10" y="27" width="10" height="8" rx="1" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="26" y="27" width="10" height="8" rx="1" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="52" y="16" width="56" height="28" rx="4" fill="var(--tunes)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="90" y="8" width="10" height="10" fill="var(--ink)" />
      <rect x="58" y="21" width="14" height="10" rx="1" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      {[16, 36, 64, 92].map((cx) => (
        <g key={cx} className="wheel">
          <circle cx={cx} cy="46" r="7" fill="var(--ink)" />
          <rect x={cx - 1} y="40" width="2" height="12" fill="var(--paper)" />
        </g>
      ))}
    </svg>
  );
}
