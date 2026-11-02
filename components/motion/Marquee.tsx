"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/components/motion/useOnScreen";
import { useFinePointer } from "@/components/motion/useFinePointer";

/**
 * Infinite ticker. On mouse/trackpad devices its speed (and direction) reacts
 * to scroll velocity; on touch screens it is a plain CSS animation so the
 * compositor runs it with no per-frame JavaScript (much smoother on iOS Safari).
 * `baseVelocity` is in % of one copy per second; negative scrolls left.
 */
export function Marquee(props: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  innerClassName?: string;
  copies?: number;
}) {
  const fine = useFinePointer();
  return fine ? <ScrollMarquee {...props} /> : <CssMarquee {...props} />;
}

function Copies({
  children,
  copies,
  innerClassName,
}: {
  children: ReactNode;
  copies: number;
  innerClassName?: string;
}) {
  return Array.from({ length: copies }).map((_, i) => (
    <div
      key={i}
      className={cn("flex shrink-0 items-center", innerClassName)}
      aria-hidden={i > 0}
    >
      {children}
    </div>
  ));
}

function CssMarquee({
  children,
  baseVelocity = -4,
  className,
  innerClassName,
  copies = 4,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  innerClassName?: string;
  copies?: number;
}) {
  const [ref, onScreen] = useOnScreen();
  const style = {
    "--marquee-to": `${-100 / copies}%`,
    animation: `marquee-x ${100 / Math.max(0.5, Math.abs(baseVelocity))}s linear infinite`,
    animationDirection: baseVelocity > 0 ? "reverse" : "normal",
    animationPlayState: onScreen ? "running" : "paused",
  } as CSSProperties;
  return (
    <div ref={ref} className={cn("overflow-hidden whitespace-nowrap flex", className)}>
      <div className="flex flex-nowrap shrink-0 will-change-transform" style={style}>
        <Copies copies={copies} innerClassName={innerClassName}>
          {children}
        </Copies>
      </div>
    </div>
  );
}

function ScrollMarquee({
  children,
  baseVelocity = -4,
  className,
  innerClassName,
  copies = 4,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  innerClassName?: string;
  copies?: number;
}) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const dir = useRef(1);
  const hovered = useRef(false);
  const [ref, onScreen] = useOnScreen();

  const xPct = useTransform(x, (v) => `${wrap(-100 / copies, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!onScreen) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * baseVelocity * (delta / 1000) / copies;
    move += dir.current * move * Math.abs(f);
    if (hovered.current) move *= 0.25;
    x.set(x.get() + move);
  });

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden whitespace-nowrap flex", className)}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="flex flex-nowrap shrink-0" style={{ x: xPct }}>
        <Copies copies={copies} innerClassName={innerClassName}>
          {children}
        </Copies>
      </motion.div>
    </div>
  );
}
