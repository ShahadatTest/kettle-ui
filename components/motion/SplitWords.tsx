"use client";

import { motion } from "motion/react";
import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tf } from "@/components/motion/tf";

type Word = string | { text: string; className?: string };

/**
 * Masked word-by-word reveal for headings.
 * Pass strings, or `{ text, className }` to colour/highlight single words.
 */
export function SplitWords({
  words,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
}: {
  words: Word[] | string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const list: Word[] = typeof words === "string" ? words.split(" ") : words;

  const children: ReactNode = list.map((w, i) => {
    const text = typeof w === "string" ? w : w.text;
    const wc = typeof w === "string" ? undefined : w.className;
    return (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
      >
        <motion.span
          className={cn("inline-block", wc)}
          variants={{
            hidden: { transform: tf({ y: "110%", rotate: 6, flat: true }) },
            show: {
              transform: tf({ y: "0%", flat: true }),
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * stagger,
              },
            },
          }}
        >
          {text}
        </motion.span>
        {i < list.length - 1 && " "}
      </span>
    );
  });

  return createElement(
    motion[as],
    {
      className,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, margin: "-5% 0px" },
      "aria-label": list.map((w) => (typeof w === "string" ? w : w.text)).join(" "),
    },
    children
  );
}
