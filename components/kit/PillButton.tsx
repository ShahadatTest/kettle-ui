"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LuArrowUpRight } from "react-icons/lu";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "ink" | "tea" | "tunes" | "strings" | "sun" | "paper";

const TONE: Record<Tone, string> = {
  ink: "bg-ink text-paper",
  tea: "bg-tea text-paper",
  tunes: "bg-tunes text-paper",
  strings: "bg-strings text-ink",
  sun: "bg-sun text-ink",
  paper: "bg-paper text-ink",
};

const FLOOD: Record<Tone, string> = {
  ink: "bg-tunes",
  tea: "bg-ink",
  tunes: "bg-ink",
  strings: "bg-sun",
  sun: "bg-strings",
  paper: "bg-sun",
};

/**
 * Chunky pill with a hard ink shadow. On hover a second colour floods up
 * from the bottom and the arrow hops out and back in.
 */
export function PillButton({
  href,
  children,
  tone = "ink",
  className,
  external,
  arrow = true,
  onClick,
  type = "button",
  ...rest
}: {
  href?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  external?: boolean;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
} & Omit<ComponentProps<"a">, "href" | "onClick" | "type">) {
  const inner = (
    <>
      <span
        className={cn(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/pill:translate-y-0",
          FLOOD[tone]
        )}
      />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 grid size-6 place-items-center overflow-hidden rounded-full bg-current/15">
          <LuArrowUpRight className="size-4 transition-transform duration-300 group-hover/pill:-translate-y-6 group-hover/pill:translate-x-6" />
          <LuArrowUpRight className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover/pill:translate-x-0 group-hover/pill:translate-y-0" />
        </span>
      )}
    </>
  );

  const cls = cn(
    "group/pill relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-ink px-6 py-3 font-display text-base font-bold shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
    TONE[tone],
    className
  );

  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <motion.span className="inline-block" whileTap={{ scale: 0.96 }}>
        <Link
          href={href}
          className={cls}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...rest}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }
  return (
    <motion.button
      type={type}
      className={cls}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {inner}
    </motion.button>
  );
}
