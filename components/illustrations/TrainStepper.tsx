"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ToyTrain } from "./ToyTrain";

const STOP_COLORS = ["bg-tea", "bg-tunes", "bg-strings", "bg-lilac", "bg-sun"];

export type Stop = { label: string; caption?: string };

/** Ticket-stub selector with the toy train springing to the chosen stop. */
export function TrainStepper({
  stops,
  value,
  onChange,
  className,
}: {
  stops: Stop[];
  value: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  if (stops.length === 0) return null;
  const idx = Math.min(Math.max(0, value), stops.length - 1);
  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-16">
        <motion.div
          className="absolute bottom-1"
          // half the train is ~3.2rem; clamp so it never pokes past the track on phones
          animate={{
            left: `clamp(0px, calc(${(idx + 0.5) * (100 / stops.length)}% - 3.2rem), calc(100% - 6.5rem))`,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <ToyTrain />
        </motion.div>
      </div>
      <div className="h-2 rounded-full bg-ink" />
      <div className="mt-1 h-1 rounded-full bg-[repeating-linear-gradient(90deg,var(--ink)_0_6px,transparent_6px_18px)]" />

      <div
        role="tablist"
        aria-label="Stops"
        className="mt-6 grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 md:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1"
      >
        {stops.map((s, i) => {
          const active = i === idx;
          return (
            <motion.button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(i)}
              className={cn(
                "relative flex flex-col items-start rounded-2xl border-2 border-ink px-4 py-3 text-left transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tunes",
                active ? cn(STOP_COLORS[i % STOP_COLORS.length], "text-ink shadow-hard") : "bg-card hover:bg-paper-2"
              )}
              animate={{ rotate: active ? (i % 2 ? 2 : -2) : 0, y: active ? -6 : 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* ticket notches */}
              <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-ink bg-paper" />
              <span className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-ink bg-paper" />
              <span className="font-display text-xl font-extrabold uppercase sm:text-2xl">{s.label}</span>
              {s.caption && (
                <span className="font-mono text-xs uppercase tracking-widest opacity-75">{s.caption}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
