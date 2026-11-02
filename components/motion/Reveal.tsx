"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tf } from "@/components/motion/tf";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades/slides children up once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  rotate = 0,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      // one transform string runs on the compositor (see tf)
      initial={{ opacity: 0, transform: tf({ y, rotate }) }}
      whileInView={{ opacity: 1, transform: tf({}) }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggers each direct child in with a springy pop. */
export function Stagger({
  children,
  className,
  itemClassName,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={cn(itemClassName)}
          variants={{
            hidden: { opacity: 0, transform: tf({ y: 60, scale: 0.92, rotate: -3 }) },
            show: {
              opacity: 1,
              transform: tf({}),
              transition: { type: "spring", stiffness: 140, damping: 16 },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
