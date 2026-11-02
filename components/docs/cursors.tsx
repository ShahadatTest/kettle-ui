"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cursor, type CursorVariant } from "@/components/cursor/Cursor";
import { LeafPick } from "@/components/cursor/LeafPick";
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

// a spring exit takes ~0.6s to settle and mode="wait" holds the next glyph back that long, so leave fast
const POP = {
  initial: { scale: 0, rotate: -20 },
  animate: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 18 } },
  exit: { scale: 0, rotate: 20, transition: { duration: 0.12, ease: "easeIn" } },
} as const;

/** Big still of each cursor for the lab's preview box. */
function Glyph({ id }: { id: CursorChoice }) {
  switch (id) {
    case "leaf":
      return <LeafPick shadow className="h-20 w-16 rotate-[200deg]" />;
    case "ring":
      return (
        <span className="relative grid size-20 place-items-center rounded-full border-[3px] border-ink bg-sun/35">
          <span className="absolute -left-3 -top-3 size-4 rounded-full bg-tunes" />
        </span>
      );
    case "blob":
      return (
        <span className="relative size-20 overflow-hidden rounded-full border-[3px] border-ink bg-ink">
          <span className="absolute inset-y-0 left-1/2 right-0 bg-paper" />
        </span>
      );
    case "trail":
      return (
        <span className="relative block size-24">
          {["--tea", "--tunes", "--strings", "--lilac", "--sun", "--sky"].map((c, i) => (
            <span
              key={c}
              className="absolute rounded-full border-2 border-ink"
              style={{ width: 22 - i * 2.5, height: 22 - i * 2.5, left: 70 - i * 13, top: 4 + i * 11 + i * i, background: `var(${c})` }}
            />
          ))}
        </span>
      );
    case "spark":
      return (
        <svg viewBox="0 0 48 48" className="size-24 overflow-visible">
          <path d="M14 10l26 14-11.5 3L23 38Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          {[[6, 32, "var(--strings)"], [38, 6, "var(--tea)"], [40, 38, "var(--sky)"]].map(([x, y, c]) => (
            <path key={String(c)} transform={`translate(${x} ${y}) scale(0.4)`} d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6Z" fill={String(c)} stroke="var(--ink)" strokeWidth="2.5" />
          ))}
        </svg>
      );
    case "kettle":
      return (
        <svg viewBox="0 0 40 40" className="size-24 -rotate-12 overflow-visible">
          <circle cx="5" cy="4" r="3.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M10 16h20l2 14a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5Z" fill="var(--tunes)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M10 20 4 14l-1 2 6 9" fill="var(--tunes)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 16a6 6 0 0 1 12 0" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="20" cy="9.5" r="2" fill="var(--ink)" />
          <path d="M13 24h14" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "native":
      return (
        <svg viewBox="0 0 24 24" className="size-20">
          <path d="M5 2v17l4.5-4.2 3 6.7 3-1.4-3-6.6H19Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}

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
  const current = CURSORS.find((c) => c.id === active) ?? CURSORS[0];
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
        <div className="relative flex min-h-48 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-ink bg-paper-2 p-5 text-center">
          <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Now using</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={current.id} {...POP} className="grid h-24 place-items-center">
              <Glyph id={current.id} />
            </motion.span>
          </AnimatePresence>
          <span className="font-display text-xl font-extrabold leading-none">{current.name}</span>
          <span className="text-xs text-muted-foreground">{active === "native" ? "Pick a style above to swap it." : "Move around in here."}</span>
        </div>
        <div
          data-cursor="View"
          className="relative flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-sun p-5 text-center"
        >
          <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-ink/60">Hover</span>
          <span className="-rotate-6 rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper shadow-hard">View</span>
          <code className="rounded-md bg-ink/10 px-2 py-0.5 font-mono text-xs">data-cursor=&quot;View&quot;</code>
          <span className="text-xs text-ink/70">
            {active === "native" ? "Labels need a custom cursor." : `Over this box ${current.name} turns into the label.`}
          </span>
        </div>
        <div className="relative flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-strings p-5 text-center">
          <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-ink/60">Click</span>
          <span className="font-display text-3xl font-extrabold leading-none">Tap in here</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-[16rem] text-sm font-semibold"
            >
              {current.click}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
