"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { LuHeart, LuX } from "react-icons/lu";
import { cn } from "@/lib/utils";

export type DeckCard = { id: string; title: string; body: ReactNode; tone: string };

const THRESHOLD = 110;

/** Swipe the top card left or right; it cycles to the back of the deck. Buttons do the same for keyboards. */
export function SwipeDeck({
  cards: initial,
  onSwipe,
  className,
}: {
  cards: DeckCard[];
  onSwipe?: (card: DeckCard, dir: "left" | "right") => void;
  className?: string;
}) {
  const [cards, setCards] = useState(initial);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-16, 16]);
  const yes = useTransform(x, [20, THRESHOLD], [0, 1]);
  const no = useTransform(x, [-THRESHOLD, -20], [1, 0]);

  // a second click mid-animation would skip two cards at once
  const busy = useRef(false);

  const fling = async (dir: "left" | "right") => {
    const top = cards[0];
    if (!top || busy.current) return;
    busy.current = true;
    await animate(x, dir === "right" ? 520 : -520, { duration: 0.3, ease: "easeIn" });
    onSwipe?.(top, dir);
    setCards((c) => [...c.slice(1), c[0]]);
    x.set(0);
    busy.current = false;
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="relative h-72 w-full max-w-xs">
        {cards
          .slice(0, 3)
          .reverse()
          .map((card, i, arr) => {
            const depth = arr.length - 1 - i;
            const top = depth === 0;
            return (
              <motion.div
                key={card.id}
                className={cn(
                  "absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border-2 border-ink p-6 shadow-hard-lg",
                  card.tone,
                  top && "cursor-grab active:cursor-grabbing"
                )}
                style={top ? { x, rotate } : undefined}
                animate={{ scale: 1 - depth * 0.05, y: depth * 14 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                drag={top ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.9}
                onDragEnd={(_, info) => {
                  if (info.offset.x > THRESHOLD || info.velocity.x > 600) fling("right");
                  else if (info.offset.x < -THRESHOLD || info.velocity.x < -600) fling("left");
                }}
                data-cursor={top ? "Swipe" : undefined}
              >
                {top && (
                  <>
                    <motion.span style={{ opacity: yes }} className="absolute right-5 top-5 rotate-12 rounded-lg border-2 border-ink bg-tea px-2 py-1 font-mono text-xs uppercase tracking-widest text-paper">
                      Keep
                    </motion.span>
                    <motion.span style={{ opacity: no }} className="absolute left-5 top-5 -rotate-12 rounded-lg border-2 border-ink bg-tunes px-2 py-1 font-mono text-xs uppercase tracking-widest text-paper">
                      Skip
                    </motion.span>
                  </>
                )}
                <span className="font-mono text-xs uppercase tracking-widest opacity-70">Card {card.id}</span>
                <div>
                  <h4 className="font-display text-3xl font-extrabold uppercase leading-none">{card.title}</h4>
                  <p className="mt-2 text-sm">{card.body}</p>
                </div>
              </motion.div>
            );
          })}
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={() => fling("left")} aria-label="Skip card" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-card shadow-hard transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
          <LuX className="size-5" />
        </button>
        <button type="button" onClick={() => fling("right")} aria-label="Keep card" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-strings shadow-hard transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
          <LuHeart className="size-5" />
        </button>
      </div>
    </div>
  );
}
