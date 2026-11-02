"use client";

import { useSyncExternalStore } from "react";
import { Cursor, type CursorVariant } from "@/components/cursor/Cursor";
import { useFinePointer } from "@/components/motion/useFinePointer";
import { cn } from "@/lib/utils";

type CursorChoice = CursorVariant | "native";

const CURSORS: { id: CursorChoice; name: string; note: string; tone: string }[] = [
  { id: "leaf", name: "Leaf Pick", note: "The original. Tilts and presses on click.", tone: "bg-tea" },
  { id: "ring", name: "Lag Ring", note: "Dot plus a ring that trails behind and grows over links.", tone: "bg-sun" },
  { id: "blob", name: "Invert Blob", note: "Difference-blend circle that inverts whatever it covers.", tone: "bg-lilac" },
  { id: "trail", name: "Comet Trail", note: "Eight coloured dots, each a little slower than the last.", tone: "bg-strings" },
  { id: "spark", name: "Sparkler", note: "Arrow that sheds stars as it moves. Click for a burst.", tone: "bg-tunes" },
  { id: "kettle", name: "Kettle", note: "Leans into fast moves. Puffs steam on click.", tone: "bg-sky" },
  { id: "native", name: "Native", note: "Your system pointer.", tone: "bg-paper" },
];

// module-level so the hero strip, the lab and client-side page changes all share one choice
let choice: CursorChoice = "leaf";
const listeners = new Set<() => void>();
const pick = (c: CursorChoice) => {
  choice = c;
  listeners.forEach((l) => l());
};
const useChoice = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => choice,
    () => choice
  );

export function PageCursor() {
  const c = useChoice();
  return c === "native" ? null : <Cursor variant={c} />;
}

/** Compact picker for the home hero. Mouse devices only, via CSS so there is no layout shift. */
export function CursorStrip() {
  const active = useChoice();
  return (
    <div className="hidden border-b-2 border-ink bg-paper-2 pointer-fine:block">
      <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Pick a pointer</span>
        <div role="radiogroup" aria-label="Cursor style" className="hide-scroll flex gap-2 overflow-x-auto py-1 pr-1">
          {CURSORS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active === c.id}
              title={c.note}
              onClick={() => pick(c.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold transition-[transform,box-shadow] duration-200",
                active === c.id ? "bg-ink text-paper shadow-[2px_2px_0_0_var(--tunes)]" : "bg-card shadow-[2px_2px_0_0_var(--ink)] hover:-translate-y-0.5"
              )}
            >
              <span className={cn("size-3 rounded-full border-2", c.tone, active === c.id ? "border-paper" : "border-ink")} />
              {c.name}
            </button>
          ))}
        </div>
        <a href="#cursors" className="ml-auto hidden shrink-0 font-mono text-[11px] uppercase tracking-widest hover:text-tunes xl:block">
          All cursors ↓
        </a>
      </div>
    </div>
  );
}

export function CursorLab() {
  const active = useChoice();
  const fine = useFinePointer();
  return (
    <div className="flex flex-col gap-6">
      {!fine && (
        <p className="rounded-2xl border-2 border-dashed border-ink bg-paper-2 p-4 text-sm">
          Custom cursors only run with a mouse or trackpad. On touch screens the native behaviour stays as it is.
        </p>
      )}
      <div role="radiogroup" aria-label="Cursor style" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {CURSORS.map((c) => {
          const on = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => pick(c.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-2xl border-2 border-ink p-4 text-left transition-[transform,box-shadow] duration-200",
                on ? "-translate-x-0.5 -translate-y-0.5 bg-ink text-paper shadow-hard-lg" : "bg-card shadow-hard hover:-translate-y-0.5"
              )}
            >
              <span className={cn("size-5 rounded-full border-2", c.tone, on ? "border-paper" : "border-ink")} />
              <span className="font-display text-lg font-extrabold leading-tight">{c.name}</span>
              <span className={cn("text-xs", on ? "text-paper/70" : "text-muted-foreground")}>{c.note}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Plain area", undefined, "bg-paper-2"],
          ["Labelled: View", "View", "bg-sun"],
          ["Labelled: Play", "Play", "bg-strings"],
        ].map(([title, label, bg]) => (
          <div
            key={title}
            data-cursor={label}
            className={cn("grid h-36 place-items-center rounded-2xl border-2 border-ink font-mono text-xs uppercase tracking-widest", bg)}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}
