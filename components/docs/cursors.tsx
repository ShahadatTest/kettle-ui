"use client";

import { useSyncExternalStore } from "react";
import { Cursor, type CursorVariant } from "@/components/cursor/Cursor";
import { useFinePointer } from "@/components/motion/useFinePointer";
import { cn } from "@/lib/utils";

type CursorChoice = CursorVariant | "native";

const CURSORS: { id: CursorChoice; name: string; note: string; click: string; tone: string }[] = [
  { id: "leaf", name: "Leaf Pick", note: "The original. Tilts and presses on click.", click: "The pick flips and presses down.", tone: "bg-tea" },
  { id: "ring", name: "Lag Ring", note: "Dot plus a ring that trails behind and grows over links.", click: "The ring tightens around the dot.", tone: "bg-sun" },
  { id: "blob", name: "Invert Blob", note: "Difference-blend circle that inverts whatever it covers.", click: "The blob shrinks. Over links it swells.", tone: "bg-lilac" },
  { id: "trail", name: "Comet Trail", note: "Eight coloured dots, each a little slower than the last.", click: "Draw circles fast and watch the tail swing.", tone: "bg-strings" },
  { id: "spark", name: "Sparkler", note: "Arrow that sheds stars as it moves. Click for a burst.", click: "A burst of twelve stars.", tone: "bg-tunes" },
  { id: "kettle", name: "Kettle", note: "Leans into fast moves. Puffs steam on click.", click: "A puff of steam from the spout.", tone: "bg-sky" },
  { id: "native", name: "Native", note: "Your system pointer.", click: "Your system's own click. Pick another style above.", tone: "bg-paper" },
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

/** Picker strip above the home hero. Mouse devices only, via CSS so there is no layout shift. */
export function CursorStrip() {
  const active = useChoice();
  return (
    <div className="hidden border-b-2 border-ink bg-sun pointer-fine:block">
      <div className="mx-auto flex max-w-[90rem] items-center gap-5 px-4 py-3.5 sm:px-6 lg:px-10">
        <span className="flex shrink-0 items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="animate-swipe-hint size-6" aria-hidden>
            <path d="M4 3l6.5 17 2.4-7.1L20 10.4z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-xl font-extrabold leading-none">Try a cursor</span>
          <span className="-rotate-6 rounded-full border-2 border-ink bg-strings px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
            6 styles
          </span>
        </span>
        <div role="radiogroup" aria-label="Cursor style" className="hide-scroll flex gap-2.5 overflow-x-auto py-1.5 pl-1 pr-2">
          {CURSORS.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                title={c.note}
                onClick={() => pick(c.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-bold transition-[transform,box-shadow] duration-200 ease-[var(--ease-bounce)]",
                  on
                    ? "-translate-y-0.5 -rotate-2 bg-ink text-paper shadow-[3px_3px_0_0_var(--tunes)]"
                    : "bg-card shadow-[2px_2px_0_0_var(--ink)] hover:-translate-y-0.5 hover:rotate-2 hover:shadow-[3px_3px_0_0_var(--ink)] active:translate-y-0.5 active:shadow-none"
                )}
              >
                <span className={cn("size-3.5 rounded-full border-2", c.tone, on ? "border-paper" : "border-ink")} />
                {c.name}
              </button>
            );
          })}
        </div>
        <a href="#cursors" className="ml-auto hidden shrink-0 font-mono text-[11px] uppercase tracking-widest underline-offset-4 hover:underline xl:block">
          How it works ↓
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
