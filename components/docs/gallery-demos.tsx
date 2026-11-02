"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LuRotateCcw } from "react-icons/lu";
import { LeafPick } from "@/components/cursor/LeafPick";
import { BrewCup } from "@/components/motion/BrewCup";
import { ThrowBox, type Throwable } from "@/components/drag/ThrowBox";
import { ReorderList, type Orderable } from "@/components/drag/ReorderList";
import { SwipeDeck, type DeckCard } from "@/components/drag/SwipeDeck";

export function BrewDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-ink py-12">
      <BrewCup key={run} />
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="inline-flex items-center gap-2 rounded-full border-2 border-paper px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper/10"
      >
        <LuRotateCcw className="size-3.5" aria-hidden /> Replay
      </button>
    </div>
  );
}

const THROWABLES: Throwable[] = [
  { id: "a", left: "8%", top: "12%", rotate: -8, node: <span className="block rounded-full border-2 border-ink bg-sun px-5 py-3 font-display text-lg font-extrabold shadow-hard">Fling me</span> },
  { id: "b", left: "55%", top: "8%", rotate: 10, node: <span className="grid size-24 place-items-center rounded-full border-2 border-ink bg-tea font-display text-3xl text-paper shadow-hard">☕</span> },
  { id: "c", left: "30%", top: "52%", rotate: 4, node: <span className="block rounded-2xl border-2 border-ink bg-strings px-5 py-3 font-mono text-sm uppercase tracking-widest shadow-hard">Bouncy</span> },
  { id: "d", left: "70%", top: "58%", rotate: -14, node: <LeafPick className="w-14" shadow /> },
];

export function ThrowDemo() {
  return <ThrowBox items={THROWABLES} />;
}

const ROWS: Orderable[] = [
  { id: "1", label: "Boil the water", tone: "bg-sky" },
  { id: "2", label: "Warm the pot", tone: "bg-sun" },
  { id: "3", label: "Add the leaves", tone: "bg-tea" },
  { id: "4", label: "Steep for three minutes", tone: "bg-tunes" },
  { id: "5", label: "Pour and enjoy", tone: "bg-strings" },
];

export function ReorderDemo() {
  const [rows, setRows] = useState(ROWS);
  return (
    <div className="mx-auto w-full max-w-md">
      <ReorderList items={rows} onReorder={setRows} />
    </div>
  );
}

const CARDS: DeckCard[] = [
  { id: "01", title: "Lag Ring", body: "A cursor that takes its time.", tone: "bg-sun" },
  { id: "02", title: "Pill Button", body: "Floods with colour on hover.", tone: "bg-strings" },
  { id: "03", title: "Toy Train", body: "Chugs along in pure CSS.", tone: "bg-sky" },
  { id: "04", title: "Sticker", body: "Drag it, it snaps home.", tone: "bg-lilac" },
];

export function SwipeDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-center gap-4">
      <SwipeDeck cards={CARDS} onSwipe={(c, dir) => setLog((l) => [`${dir === "right" ? "Kept" : "Skipped"} ${c.title}`, ...l].slice(0, 3))} />
      <ul className="flex min-h-6 flex-wrap justify-center gap-2" aria-live="polite">
        {log.map((l, i) => (
          <motion.li
            key={`${l}-${log.length - i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border-2 border-ink bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest"
          >
            {l}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
