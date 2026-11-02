"use client";

import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Throwable = { id: string; node: ReactNode; left: string; top: string; rotate?: number };

/** Fling items around a box; they keep momentum and bounce off the walls. */
export function ThrowBox({ items, className }: { items: Throwable[]; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className={cn("relative h-80 overflow-hidden rounded-[1.5rem] border-2 border-ink bg-paper-2", className)}>
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ left: it.left, top: it.top, rotate: it.rotate ?? 0 }}
          drag
          dragConstraints={box}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 320, bounceDamping: 14, power: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.12, zIndex: 10 }}
          data-cursor="Throw"
        >
          {it.node}
        </motion.div>
      ))}
    </div>
  );
}
