"use client";

import { Reorder, useDragControls } from "motion/react";
import { LuGripVertical } from "react-icons/lu";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Orderable = { id: string; label: ReactNode; tone: string };

/** Drag rows by the grip to reorder. The grip owns the gesture so the page still scrolls on touch. */
export function ReorderList({
  items,
  onReorder,
  className,
}: {
  items: Orderable[];
  onReorder: (items: Orderable[]) => void;
  className?: string;
}) {
  return (
    <Reorder.Group axis="y" values={items} onReorder={onReorder} className={cn("flex flex-col gap-3", className)}>
      {items.map((it) => (
        <Row key={it.id} item={it} />
      ))}
    </Reorder.Group>
  );
}

function Row({ item }: { item: Orderable }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="relative flex items-center gap-3 rounded-2xl border-2 border-ink bg-card p-3 shadow-hard"
      whileDrag={{ scale: 1.03, rotate: -1, boxShadow: "8px 8px 0 0 var(--ink)", zIndex: 10 }}
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        className="grid size-9 shrink-0 cursor-grab touch-none place-items-center rounded-xl border-2 border-ink bg-paper active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
        data-cursor="Drag"
      >
        <LuGripVertical className="size-4" />
      </button>
      <span className={cn("size-4 shrink-0 rounded-full border-2 border-ink", item.tone)} />
      <span className="min-w-0 truncate font-semibold">{item.label}</span>
    </Reorder.Item>
  );
}
