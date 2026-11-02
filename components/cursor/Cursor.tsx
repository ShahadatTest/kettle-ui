"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/components/motion/useFinePointer";
import { LeafPick } from "./LeafPick";

export type CursorVariant = "leaf" | "ring" | "blob" | "trail" | "spark" | "kettle";

type Pointer = { x: MotionValue<number>; y: MotionValue<number>; down: boolean; hover: boolean };

const INTERACTIVE = "a, button, [role='button'], [role='tab'], label, summary, [data-cursor]";
const PALETTE = ["var(--tea)", "var(--tunes)", "var(--strings)", "var(--lilac)", "var(--sun)", "var(--sky)"];
const SPRING = { type: "spring", stiffness: 400, damping: 20 } as const;

/**
 * Custom cursor for mouse/trackpad users. Anything marked `data-cursor="Label"`
 * swaps the cursor for a label pill. Hidden on touch screens and with reduced motion.
 */
export function Cursor({ variant = "leaf" }: { variant?: CursorVariant }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  // some touch laptops report a fine pointer, so wait for a real mouse move
  const [mouse, setMouse] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      setMouse(e.pointerType === "mouse");
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      setLabel(target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
      setHover(!!target?.closest(INTERACTIVE));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled || !mouse) return;
    const root = document.documentElement.classList;
    root.add("has-custom-cursor");
    return () => root.remove("has-custom-cursor");
  }, [enabled, mouse]);

  if (!enabled || !mouse) return null;

  const p: Pointer = { x, y, down, hover };
  return (
    <div className="pointer-events-none fixed inset-0 z-[1000]" aria-hidden>
      {variant === "trail" && <Trail {...p} />}
      {variant === "spark" && <Sparks {...p} />}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <AnimatePresence mode="wait" initial={false}>
          {label ? (
            <motion.div
              key="label"
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper shadow-hard"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: down ? 0.9 : 1, rotate: -6 }}
              exit={{ scale: 0, rotate: 20 }}
              transition={SPRING}
            >
              {label}
            </motion.div>
          ) : (
            <motion.div key={variant} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={SPRING}>
              {variant === "leaf" && <Leaf {...p} />}
              {variant === "ring" && <Dot />}
              {variant === "blob" && null}
              {variant === "trail" && <Dot />}
              {variant === "spark" && <Arrow {...p} />}
              {variant === "kettle" && <Kettle {...p} />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* followers sit outside the label swap so they keep their lag */}
      {variant === "ring" && !label && <Ring {...p} />}
      {variant === "blob" && <Blob {...p} grow={!!label} />}
    </div>
  );
}

function Leaf({ down }: Pointer) {
  // flipped so the leaf tip (50,118 of the 100×120 box) sits on the click point
  return (
    <motion.div
      className="-translate-x-1/2 -translate-y-[98.3%] origin-[50%_98.3%]"
      animate={{ scale: down ? 0.75 : 1, rotate: down ? 210 : 200 }}
      transition={SPRING}
    >
      <LeafPick className="block size-6 drop-shadow-[-2px_-2px_0_var(--ink)]" />
    </motion.div>
  );
}

function Dot() {
  return <div className="size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tunes" />;
}

function Ring({ x, y, down, hover }: Pointer) {
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });
  return (
    <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
      <motion.div
        className="size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
        animate={{ scale: down ? 0.7 : hover ? 1.6 : 1, backgroundColor: hover ? "rgb(255 212 59 / 0.35)" : "rgb(255 212 59 / 0)" }}
        transition={SPRING}
      />
    </motion.div>
  );
}

function Blob({ x, y, down, hover, grow }: Pointer & { grow: boolean }) {
  const sx = useSpring(x, { stiffness: 500, damping: 35 });
  const sy = useSpring(y, { stiffness: 500, damping: 35 });
  return (
    <motion.div className="absolute left-0 top-0 mix-blend-difference" style={{ x: sx, y: sy }}>
      <motion.div
        className="size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{ scale: grow ? 0 : down ? 0.8 : hover ? 2.6 : 1 }}
        transition={SPRING}
      />
    </motion.div>
  );
}

function TrailDot({ x, y, i }: { x: MotionValue<number>; y: MotionValue<number>; i: number }) {
  const cfg = { stiffness: 420 - i * 45, damping: 24 + i * 2, mass: 0.6 + i * 0.12 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);
  const size = 14 - i * 1.2;
  return (
    <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
        style={{ width: size, height: size, background: PALETTE[i % PALETTE.length] }}
      />
    </motion.div>
  );
}

function Trail({ x, y }: Pointer) {
  // fixed length, so the hooks inside each dot are called in a stable order
  return Array.from({ length: 8 }, (_, i) => <TrailDot key={i} x={x} y={y} i={7 - i} />);
}

function Arrow({ down }: Pointer) {
  return (
    <motion.svg viewBox="0 0 24 24" className="size-7 -translate-x-[3px] -translate-y-[2px]" animate={{ scale: down ? 0.85 : 1 }} transition={SPRING}>
      <path d="M3 2l17 9-7.5 2L9 20.5Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    </motion.svg>
  );
}

type Spark = { id: number; x: number; y: number; dx: number; dy: number; color: string; size: number };

function Sparks({ x, y }: Pointer) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextId = useRef(0);
  const last = useRef(0);

  const spawn = (count: number, spread: number) => {
    const fresh = Array.from({ length: count }, () => {
      const a = Math.random() * Math.PI * 2;
      const r = spread * (0.4 + Math.random() * 0.6);
      return {
        id: nextId.current++,
        x: x.get(),
        y: y.get(),
        dx: Math.cos(a) * r,
        dy: Math.sin(a) * r + 12,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        size: 8 + Math.random() * 8,
      };
    });
    // cap the pool so a fast mouse never piles up hundreds of nodes
    setSparks((s) => [...s, ...fresh].slice(-40));
  };

  useEffect(() => {
    const burst = () => spawn(12, 60);
    window.addEventListener("pointerdown", burst);
    const stop = x.on("change", () => {
      const now = performance.now();
      if (now - last.current < 45) return;
      last.current = now;
      spawn(1, 22);
    });
    return () => {
      stop();
      window.removeEventListener("pointerdown", burst);
    };
    // spawn only reads refs and motion values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]);

  return sparks.map((s) => (
    <motion.svg
      key={s.id}
      viewBox="0 0 20 20"
      className="absolute left-0 top-0"
      style={{ width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2 }}
      initial={{ x: s.x, y: s.y, scale: 1, rotate: 0, opacity: 1 }}
      animate={{ x: s.x + s.dx, y: s.y + s.dy, scale: 0, rotate: 180, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onAnimationComplete={() => setSparks((all) => all.filter((o) => o.id !== s.id))}
    >
      <path d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6Z" fill={s.color} stroke="var(--ink)" strokeWidth="1.2" />
    </motion.svg>
  ));
}

function Kettle({ x, down }: Pointer) {
  const vx = useVelocity(x);
  const tilt = useSpring(useTransform(vx, [-1500, 0, 1500], [-28, 0, 28]), { stiffness: 300, damping: 20 });
  return (
    <motion.div className="-translate-x-1/2 -translate-y-1/2" style={{ rotate: tilt }}>
      <motion.svg viewBox="0 0 40 40" className="size-9 overflow-visible" animate={{ scale: down ? 0.85 : 1 }} transition={SPRING}>
        <AnimatePresence>
          {down && (
            <motion.circle
              cx="6"
              cy="8"
              r="4"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1.2, y: -6 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <path d="M10 16h20l2 14a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5Z" fill="var(--tunes)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 20 4 14l-1 2 6 9" fill="var(--tunes)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 16a6 6 0 0 1 12 0" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
        <circle cx="20" cy="9.5" r="2" fill="var(--ink)" />
        <path d="M13 24h14" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}
