import type { ReactNode } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Word = string | { text: string; className?: string };

/** Eyebrow chip + giant split-reveal title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  eyebrowClassName,
  dark = false,
}: {
  eyebrow?: ReactNode;
  title: Word[] | string;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  eyebrowClassName?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={20} rotate={-6}>
          <span
            className={cn(
              "inline-flex -rotate-2 items-center gap-2 rounded-full border-2 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em]",
              dark
                ? "border-paper bg-paper text-ink"
                : "border-ink bg-sun text-ink",
              eyebrowClassName
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitWords
        words={title}
        className={cn(
          "font-display text-[clamp(2.2rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-balance [overflow-wrap:anywhere]",
          dark ? "text-paper" : "text-ink"
        )}
      />
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "max-w-xl text-base md:text-lg",
              dark ? "text-paper/75" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
